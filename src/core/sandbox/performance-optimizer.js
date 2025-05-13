/**
 * Sandbox Performance Optimizer
 *
 * Improves performance of sandbox execution environments by managing resources,
 * implementing caching strategies, and optimizing execution paths.
 */

const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const LRU = require('lru-cache');
const { performance } = require('perf_hooks');
const crypto = require('crypto');

class SandboxPerformanceOptimizer {
  /**
   * Create a new Sandbox Performance Optimizer
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    this.config = {
      // Cache settings
      cacheDir: config.cacheDir || path.join(os.tmpdir(), 'web3fuzzforge-cache'),
      cacheSize: config.cacheSize || 500, // Max number of entries
      cacheMaxAge: config.cacheMaxAge || 60 * 60 * 1000, // 1 hour

      // Resource management
      maxConcurrentEnvironments:
        config.maxConcurrentEnvironments || Math.max(1, Math.floor(os.cpus().length / 2)),
      maxMemoryPercent: config.maxMemoryPercent || 70, // Max % of system memory to use
      idleTimeoutMs: config.idleTimeoutMs || 5 * 60 * 1000, // 5 minutes

      // Optimization settings
      enableJITCaching: config.enableJITCaching !== false,
      enableResultCaching: config.enableResultCaching !== false,
      enableResourceManagement: config.enableResourceManagement !== false,

      // Profiling settings
      enableProfiling: config.enableProfiling || false,
      profileOutputDir: config.profileOutputDir || path.join(process.cwd(), 'profiles'),

      ...config,
    };

    // Create cache directory
    fs.ensureDirSync(this.config.cacheDir);

    // Initialize caches
    this.resultCache = new LRU({
      max: this.config.cacheSize,
      maxAge: this.config.cacheMaxAge,
      updateAgeOnGet: true,
    });

    this.compilationCache = new LRU({
      max: this.config.cacheSize,
      maxAge: this.config.cacheMaxAge * 2, // Keep compilations longer
      updateAgeOnGet: true,
    });

    // Resource tracking
    this.activeEnvironments = new Map();
    this.resourceStats = {
      totalCpuTime: 0,
      totalMemoryUsed: 0,
      peakConcurrentEnvironments: 0,
      cacheSavings: {
        timeMs: 0,
        executions: 0,
      },
    };

    // Performance metrics
    this.metrics = {
      requestsProcessed: 0,
      cacheHits: 0,
      cacheMisses: 0,
      avgExecutionTime: 0,
      executionTimeSum: 0,
    };

    // Initialize profiling if enabled
    if (this.config.enableProfiling) {
      fs.ensureDirSync(this.config.profileOutputDir);
    }

    // Set up idle environment cleanup interval
    if (this.config.enableResourceManagement) {
      this.cleanupInterval = setInterval(() => {
        this.cleanupIdleEnvironments();
      }, 60000); // Check every minute
    }
  }

  /**
   * Generate a cache key for a specific execution
   * @param {Object} exploitInfo - Exploit information
   * @param {Object} environmentConfig - Environment configuration
   * @returns {string} Cache key
   */
  generateCacheKey(exploitInfo, environmentConfig) {
    // Generate a deterministic key based on the inputs
    const dataToHash = JSON.stringify({
      code: exploitInfo.code,
      language: exploitInfo.language,
      targetContract: exploitInfo.targetContract,
      mode: environmentConfig.mode || 'local',
      chainId: environmentConfig.chainId || 1337,
    });

    return crypto.createHash('sha256').update(dataToHash).digest('hex');
  }

  /**
   * Check if a result is cached
   * @param {string} cacheKey - Cache key to check
   * @returns {Object|null} Cached result or null if not found
   */
  getCachedResult(cacheKey) {
    if (!this.config.enableResultCaching) {
      return null;
    }

    const cachedResult = this.resultCache.get(cacheKey);

    if (cachedResult) {
      this.metrics.cacheHits++;
      return cachedResult;
    }

    this.metrics.cacheMisses++;
    return null;
  }

  /**
   * Store a result in the cache
   * @param {string} cacheKey - Cache key
   * @param {Object} result - Result to cache
   */
  cacheResult(cacheKey, result) {
    if (!this.config.enableResultCaching) {
      return;
    }

    this.resultCache.set(cacheKey, result);

    // Also save to disk cache for persistence across restarts
    const diskCachePath = path.join(this.config.cacheDir, `${cacheKey}.json`);
    fs.writeJsonSync(diskCachePath, {
      result,
      timestamp: Date.now(),
    });
  }

  /**
   * Check if a compilation is cached
   * @param {string} code - Code to compile
   * @param {string} language - Language of the code
   * @returns {Object|null} Cached compilation or null if not found
   */
  getCachedCompilation(code, language) {
    if (!this.config.enableJITCaching) {
      return null;
    }

    const compilationKey = crypto.createHash('sha256').update(`${language}:${code}`).digest('hex');
    return this.compilationCache.get(compilationKey);
  }

  /**
   * Store a compilation in the cache
   * @param {string} code - Compiled code
   * @param {string} language - Language of the code
   * @param {Object} compilation - Compilation result
   */
  cacheCompilation(code, language, compilation) {
    if (!this.config.enableJITCaching) {
      return;
    }

    const compilationKey = crypto.createHash('sha256').update(`${language}:${code}`).digest('hex');
    this.compilationCache.set(compilationKey, compilation);

    // Save to disk for persistence
    const diskCachePath = path.join(this.config.cacheDir, `compilation-${compilationKey}.json`);
    fs.writeJsonSync(diskCachePath, {
      compilation,
      timestamp: Date.now(),
    });
  }

  /**
   * Register an active sandbox environment
   * @param {string} environmentId - Environment ID
   * @param {Object} config - Environment configuration
   * @returns {boolean} Whether the environment was allowed to start
   */
  registerEnvironment(environmentId, config) {
    if (!this.config.enableResourceManagement) {
      return true;
    }

    // Check if we're at capacity
    if (this.activeEnvironments.size >= this.config.maxConcurrentEnvironments) {
      return false;
    }

    // Check system resources
    const memInfo = os.totalmem();
    const freeMem = os.freemem();
    const usedMemoryPercent = ((memInfo - freeMem) / memInfo) * 100;

    if (usedMemoryPercent > this.config.maxMemoryPercent) {
      return false;
    }

    // Register the environment
    this.activeEnvironments.set(environmentId, {
      startTime: Date.now(),
      lastActive: Date.now(),
      config,
      cpuTime: 0,
      memoryUsed: 0,
    });

    // Update peak metric
    if (this.activeEnvironments.size > this.resourceStats.peakConcurrentEnvironments) {
      this.resourceStats.peakConcurrentEnvironments = this.activeEnvironments.size;
    }

    return true;
  }

  /**
   * Update environment activity timestamp
   * @param {string} environmentId - Environment ID
   */
  updateEnvironmentActivity(environmentId) {
    if (!this.config.enableResourceManagement) {
      return;
    }

    const environment = this.activeEnvironments.get(environmentId);
    if (environment) {
      environment.lastActive = Date.now();
    }
  }

  /**
   * Unregister an environment when it's stopped
   * @param {string} environmentId - Environment ID
   * @param {Object} stats - Environment statistics
   */
  unregisterEnvironment(environmentId, stats = {}) {
    if (!this.config.enableResourceManagement) {
      return;
    }

    const environment = this.activeEnvironments.get(environmentId);
    if (environment) {
      // Update resource stats
      this.resourceStats.totalCpuTime += stats.cpuTime || 0;
      this.resourceStats.totalMemoryUsed += stats.memoryUsed || 0;

      // Remove from active environments
      this.activeEnvironments.delete(environmentId);
    }
  }

  /**
   * Clean up idle environments
   */
  cleanupIdleEnvironments() {
    if (!this.config.enableResourceManagement) {
      return;
    }

    const now = Date.now();
    const idleTimeout = this.config.idleTimeoutMs;

    // Find idle environments
    const idleEnvironments = [];
    for (const [id, env] of this.activeEnvironments.entries()) {
      if (now - env.lastActive > idleTimeout) {
        idleEnvironments.push(id);
      }
    }

    // Return list of environments to stop
    return idleEnvironments;
  }

  /**
   * Start profiling for a specific operation
   * @param {string} operationId - Operation identifier
   * @returns {Object} Profiling context
   */
  startProfiling(operationId) {
    if (!this.config.enableProfiling) {
      return { enabled: false };
    }

    return {
      enabled: true,
      id: operationId,
      startTime: performance.now(),
      startMemory: process.memoryUsage().heapUsed,
      events: [],
    };
  }

  /**
   * Record a profiling event
   * @param {Object} profile - Profiling context
   * @param {string} event - Event name
   * @param {Object} data - Event data
   */
  recordProfilingEvent(profile, event, data = {}) {
    if (!profile.enabled) {
      return;
    }

    profile.events.push({
      event,
      time: performance.now(),
      timeFromStart: performance.now() - profile.startTime,
      memory: process.memoryUsage().heapUsed,
      data,
    });
  }

  /**
   * End profiling and save results
   * @param {Object} profile - Profiling context
   * @returns {Object} Profiling results
   */
  endProfiling(profile) {
    if (!profile.enabled) {
      return null;
    }

    const endTime = performance.now();
    const endMemory = process.memoryUsage().heapUsed;

    const results = {
      id: profile.id,
      duration: endTime - profile.startTime,
      memoryDelta: endMemory - profile.startMemory,
      startTime: profile.startTime,
      endTime,
      events: profile.events,
    };

    // Save profile to disk if enabled
    if (this.config.enableProfiling) {
      const profilePath = path.join(
        this.config.profileOutputDir,
        `profile-${profile.id}-${Date.now()}.json`
      );

      fs.writeJsonSync(profilePath, results);
    }

    return results;
  }

  /**
   * Optimize a sandbox execution
   * @param {Function} executionFunc - Function that performs the actual execution
   * @param {Object} exploitInfo - Exploit information
   * @param {Object} environmentConfig - Environment configuration
   * @returns {Promise<Object>} Execution result
   */
  async optimizeExecution(executionFunc, exploitInfo, environmentConfig) {
    this.metrics.requestsProcessed++;

    // Start profiling
    const profile = this.startProfiling(`execute-${Date.now()}`);

    // Generate cache key
    const cacheKey = this.generateCacheKey(exploitInfo, environmentConfig);

    // Check cache
    const cachedResult = this.getCachedResult(cacheKey);
    if (cachedResult) {
      this.recordProfilingEvent(profile, 'cache-hit', { cacheKey });

      // Update metrics
      const savedTime = cachedResult.performance?.executionTime || 100;
      this.resourceStats.cacheSavings.timeMs += savedTime;
      this.resourceStats.cacheSavings.executions++;

      // End profiling
      this.endProfiling(profile);

      return {
        ...cachedResult,
        fromCache: true,
      };
    }

    this.recordProfilingEvent(profile, 'cache-miss', { cacheKey });

    // Check compilation cache if it's a Solidity exploit
    if (exploitInfo.language === 'solidity' && this.config.enableJITCaching) {
      const cachedCompilation = this.getCachedCompilation(exploitInfo.code, exploitInfo.language);
      if (cachedCompilation) {
        this.recordProfilingEvent(profile, 'compilation-cache-hit');
        // Attach cached compilation to exploit info
        exploitInfo.compiledContract = cachedCompilation;
      }
    }

    // Start performance measurement
    const startTime = performance.now();

    try {
      // Execute the function
      const result = await executionFunc(exploitInfo, environmentConfig);

      // Calculate execution time
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Update metrics
      this.metrics.executionTimeSum += executionTime;
      this.metrics.avgExecutionTime =
        this.metrics.executionTimeSum / this.metrics.requestsProcessed;

      // Record profiling event
      this.recordProfilingEvent(profile, 'execution-complete', {
        executionTime,
        success: result.success,
      });

      // Add performance data to result
      const resultWithPerformance = {
        ...result,
        performance: {
          ...(result.performance || {}),
          executionTime,
        },
      };

      // Cache result
      this.cacheResult(cacheKey, resultWithPerformance);

      // If this was a Solidity execution and we have compilation data, cache it
      if (
        exploitInfo.language === 'solidity' &&
        result.compiledContract &&
        this.config.enableJITCaching
      ) {
        this.cacheCompilation(exploitInfo.code, exploitInfo.language, result.compiledContract);
      }

      // End profiling
      this.endProfiling(profile);

      return resultWithPerformance;
    } catch (error) {
      // Record error in profiling
      this.recordProfilingEvent(profile, 'execution-error', {
        error: error.message,
      });

      // End profiling
      this.endProfiling(profile);

      throw error;
    }
  }

  /**
   * Get optimizer statistics
   * @returns {Object} Optimizer statistics
   */
  getStats() {
    return {
      metrics: {
        ...this.metrics,
        cacheHitRate:
          this.metrics.requestsProcessed > 0
            ? (this.metrics.cacheHits / this.metrics.requestsProcessed) * 100
            : 0,
      },
      resources: {
        ...this.resourceStats,
        activeEnvironments: this.activeEnvironments.size,
      },
      system: {
        cpus: os.cpus().length,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        memoryUsagePercent: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100,
      },
      cache: {
        resultCacheSize: this.resultCache.size,
        compilationCacheSize: this.compilationCache.size,
      },
      config: {
        maxConcurrentEnvironments: this.config.maxConcurrentEnvironments,
        enableJITCaching: this.config.enableJITCaching,
        enableResultCaching: this.config.enableResultCaching,
        enableResourceManagement: this.config.enableResourceManagement,
      },
    };
  }

  /**
   * Clean up resources
   */
  cleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

module.exports = SandboxPerformanceOptimizer;
