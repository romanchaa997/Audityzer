/**
 * Tutorial Manager
 *
 * Manages interactive tutorials for learning web3 security concepts.
 * Handles tutorial progress tracking, rendering, and completion.
 */

const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class TutorialManager {
  /**
   * Create a new Tutorial Manager
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    this.config = {
      tutorialsDir:
        config.tutorialsDir || path.join(process.cwd(), 'src', 'core', 'education', 'tutorials'),
      userDataDir: config.userDataDir || path.join(process.cwd(), 'user-data', 'education'),
      defaultLanguage: config.defaultLanguage || 'en',
      ...config,
    };

    // Create necessary directories
    fs.ensureDirSync(this.config.tutorialsDir);
    fs.ensureDirSync(this.config.userDataDir);

    // Load tutorials
    this.tutorials = this._loadTutorials();

    // Initialize user progress
    this.userProgress = {};
  }

  /**
   * Load all available tutorials
   * @returns {Object} Map of tutorial IDs to tutorial data
   * @private
   */
  _loadTutorials() {
    const tutorials = {};

    try {
      // Get tutorial index file first
      const indexPath = path.join(this.config.tutorialsDir, 'index.json');

      if (fs.existsSync(indexPath)) {
        const index = fs.readJsonSync(indexPath);

        // Load tutorials specified in the index
        if (index.tutorials && Array.isArray(index.tutorials)) {
          index.tutorials.forEach(tutorialId => {
            const tutorialPath = path.join(this.config.tutorialsDir, `${tutorialId}.json`);

            if (fs.existsSync(tutorialPath)) {
              try {
                const tutorial = fs.readJsonSync(tutorialPath);
                tutorials[tutorialId] = tutorial;
              } catch (err) {
                console.error(`Error loading tutorial ${tutorialId}:`, err);
              }
            }
          });
        }
      } else {
        // Fallback to loading all JSON files in the directory
        const files = fs.readdirSync(this.config.tutorialsDir);

        files.forEach(file => {
          if (file.endsWith('.json') && file !== 'index.json') {
            try {
              const tutorialPath = path.join(this.config.tutorialsDir, file);
              const tutorial = fs.readJsonSync(tutorialPath);
              const tutorialId = file.replace('.json', '');

              tutorials[tutorialId] = tutorial;
            } catch (err) {
              console.error(`Error loading tutorial ${file}:`, err);
            }
          }
        });
      }
    } catch (err) {
      console.error('Error loading tutorials:', err);
    }

    return tutorials;
  }

  /**
   * Get all available tutorials
   * @param {string} language - Language to get tutorials for
   * @returns {Array} List of available tutorials
   */
  listTutorials(language = null) {
    const lang = language || this.config.defaultLanguage;

    return Object.values(this.tutorials).map(tutorial => {
      // Get localized title and description if available
      const title = tutorial.localization?.[lang]?.title || tutorial.title;
      const description = tutorial.localization?.[lang]?.description || tutorial.description;

      return {
        id: tutorial.id,
        title,
        description,
        difficulty: tutorial.difficulty,
        categories: tutorial.categories,
        duration: tutorial.duration,
        prerequisites: tutorial.prerequisites,
      };
    });
  }

  /**
   * Get a specific tutorial
   * @param {string} tutorialId - Tutorial ID
   * @param {string} language - Language to get tutorial in
   * @returns {Object} Tutorial data
   */
  getTutorial(tutorialId, language = null) {
    const tutorial = this.tutorials[tutorialId];

    if (!tutorial) {
      throw new Error(`Tutorial with ID ${tutorialId} not found`);
    }

    // Get localized content if available
    const lang = language || this.config.defaultLanguage;

    if (tutorial.localization?.[lang]) {
      // Apply localized content
      return {
        ...tutorial,
        title: tutorial.localization[lang].title || tutorial.title,
        description: tutorial.localization[lang].description || tutorial.description,
        sections: tutorial.localization[lang].sections || tutorial.sections,
      };
    }

    return tutorial;
  }

  /**
   * Load user progress for a specific user
   * @param {string} userId - User ID
   * @returns {Object} User progress data
   */
  loadUserProgress(userId) {
    if (this.userProgress[userId]) {
      return this.userProgress[userId];
    }

    const progressPath = path.join(this.config.userDataDir, `${userId}_progress.json`);

    if (fs.existsSync(progressPath)) {
      try {
        const progress = fs.readJsonSync(progressPath);
        this.userProgress[userId] = progress;
        return progress;
      } catch (err) {
        console.error(`Error loading progress for user ${userId}:`, err);
      }
    }

    // Initialize empty progress
    const newProgress = {
      userId,
      tutorials: {},
      lastUpdated: new Date().toISOString(),
    };

    this.userProgress[userId] = newProgress;
    return newProgress;
  }

  /**
   * Save user progress
   * @param {string} userId - User ID
   * @returns {boolean} Success status
   */
  saveUserProgress(userId) {
    if (!this.userProgress[userId]) {
      return false;
    }

    const progressPath = path.join(this.config.userDataDir, `${userId}_progress.json`);

    try {
      // Update timestamp
      this.userProgress[userId].lastUpdated = new Date().toISOString();

      fs.writeJsonSync(progressPath, this.userProgress[userId], { spaces: 2 });
      return true;
    } catch (err) {
      console.error(`Error saving progress for user ${userId}:`, err);
      return false;
    }
  }

  /**
   * Start a tutorial for a user
   * @param {string} userId - User ID
   * @param {string} tutorialId - Tutorial ID
   * @returns {Object} Tutorial session info
   */
  startTutorial(userId, tutorialId) {
    const tutorial = this.getTutorial(tutorialId);

    if (!tutorial) {
      throw new Error(`Tutorial with ID ${tutorialId} not found`);
    }

    const progress = this.loadUserProgress(userId);

    // Create or update tutorial progress
    const sessionId = progress.tutorials[tutorialId]?.sessionId || uuidv4();

    progress.tutorials[tutorialId] = {
      tutorialId,
      sessionId,
      started: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      completed: false,
      currentSection: 0,
      progress: 0, // 0-100 percentage
      answers: {},
      notes: '',
    };

    this.saveUserProgress(userId);

    return {
      sessionId,
      tutorial: {
        id: tutorial.id,
        title: tutorial.title,
        description: tutorial.description,
        sections: tutorial.sections.map(section => ({
          title: section.title,
          type: section.type,
        })),
      },
      currentSection: 0,
    };
  }

  /**
   * Get current tutorial section for a user
   * @param {string} userId - User ID
   * @param {string} tutorialId - Tutorial ID
   * @returns {Object} Current section data
   */
  getCurrentSection(userId, tutorialId) {
    const tutorial = this.getTutorial(tutorialId);

    if (!tutorial) {
      throw new Error(`Tutorial with ID ${tutorialId} not found`);
    }

    const progress = this.loadUserProgress(userId);

    if (!progress.tutorials[tutorialId]) {
      throw new Error(`User ${userId} has not started tutorial ${tutorialId}`);
    }

    const currentSectionIndex = progress.tutorials[tutorialId].currentSection || 0;

    if (currentSectionIndex >= tutorial.sections.length) {
      throw new Error('Tutorial completed - no more sections');
    }

    const section = tutorial.sections[currentSectionIndex];

    return {
      ...section,
      index: currentSectionIndex,
      isFirst: currentSectionIndex === 0,
      isLast: currentSectionIndex === tutorial.sections.length - 1,
      userAnswer: progress.tutorials[tutorialId].answers[currentSectionIndex],
    };
  }

  /**
   * Submit an answer for the current section
   * @param {string} userId - User ID
   * @param {string} tutorialId - Tutorial ID
   * @param {any} answer - User's answer
   * @returns {Object} Answer validation results
   */
  submitAnswer(userId, tutorialId, answer) {
    const tutorial = this.getTutorial(tutorialId);

    if (!tutorial) {
      throw new Error(`Tutorial with ID ${tutorialId} not found`);
    }

    const progress = this.loadUserProgress(userId);

    if (!progress.tutorials[tutorialId]) {
      throw new Error(`User ${userId} has not started tutorial ${tutorialId}`);
    }

    const currentSectionIndex = progress.tutorials[tutorialId].currentSection || 0;

    if (currentSectionIndex >= tutorial.sections.length) {
      throw new Error('Tutorial completed - no more sections');
    }

    const section = tutorial.sections[currentSectionIndex];

    // Store user's answer
    progress.tutorials[tutorialId].answers[currentSectionIndex] = answer;
    progress.tutorials[tutorialId].lastAccessed = new Date().toISOString();

    let isCorrect = false;
    let feedback = '';

    // Validate answer based on section type
    if (section.type === 'quiz' && section.correctAnswer !== undefined) {
      isCorrect = this._validateQuizAnswer(section, answer);
      feedback = isCorrect
        ? section.correctFeedback || 'Correct!'
        : section.incorrectFeedback || 'Incorrect, try again.';
    } else if (section.type === 'code' && section.validation) {
      const validation = this._validateCodeAnswer(section, answer);
      isCorrect = validation.isCorrect;
      feedback = validation.feedback;
    } else {
      // For content sections or sections without validation
      isCorrect = true;
    }

    // Update progress
    this.saveUserProgress(userId);

    return {
      isCorrect,
      feedback,
      section: {
        index: currentSectionIndex,
        isFirst: currentSectionIndex === 0,
        isLast: currentSectionIndex === tutorial.sections.length - 1,
      },
    };
  }

  /**
   * Validate a quiz answer
   * @param {Object} section - Quiz section
   * @param {any} answer - User's answer
   * @returns {boolean} Whether the answer is correct
   * @private
   */
  _validateQuizAnswer(section, answer) {
    if (section.correctAnswer === undefined) {
      return true; // No correct answer defined
    }

    if (Array.isArray(section.correctAnswer)) {
      // Multiple correct answers possible
      if (Array.isArray(answer)) {
        // Check if arrays have the same values (regardless of order)
        return (
          section.correctAnswer.length === answer.length &&
          section.correctAnswer.every(val => answer.includes(val))
        );
      } else {
        // Single answer provided for multiple-choice question
        return section.correctAnswer.includes(answer);
      }
    } else {
      // Single correct answer
      return section.correctAnswer === answer;
    }
  }

  /**
   * Validate a code answer
   * @param {Object} section - Code section
   * @param {string} answer - User's code
   * @returns {Object} Validation results
   * @private
   */
  _validateCodeAnswer(section, answer) {
    if (!section.validation) {
      return { isCorrect: true, feedback: 'No validation defined for this section.' };
    }

    // Simple pattern matching validation
    if (section.validation.type === 'pattern') {
      const pattern = new RegExp(section.validation.pattern, section.validation.flags || '');
      const isCorrect = pattern.test(answer);

      return {
        isCorrect,
        feedback: isCorrect
          ? section.validation.correctFeedback || 'Your code looks good!'
          : section.validation.incorrectFeedback || "Your code doesn't match the expected pattern.",
      };
    }

    // Check for required strings
    if (section.validation.type === 'required-strings') {
      const requiredStrings = section.validation.requiredStrings || [];
      const missingStrings = requiredStrings.filter(str => !answer.includes(str));

      const isCorrect = missingStrings.length === 0;

      return {
        isCorrect,
        feedback: isCorrect
          ? section.validation.correctFeedback || 'Your code includes all required elements!'
          : section.validation.incorrectFeedback ||
            `Your code is missing: ${missingStrings.join(', ')}`,
      };
    }

    // Default case
    return { isCorrect: true, feedback: 'Code accepted.' };
  }

  /**
   * Move to the next section in a tutorial
   * @param {string} userId - User ID
   * @param {string} tutorialId - Tutorial ID
   * @returns {Object} Next section info
   */
  nextSection(userId, tutorialId) {
    const tutorial = this.getTutorial(tutorialId);

    if (!tutorial) {
      throw new Error(`Tutorial with ID ${tutorialId} not found`);
    }

    const progress = this.loadUserProgress(userId);

    if (!progress.tutorials[tutorialId]) {
      throw new Error(`User ${userId} has not started tutorial ${tutorialId}`);
    }

    const currentSectionIndex = progress.tutorials[tutorialId].currentSection || 0;
    const nextSectionIndex = currentSectionIndex + 1;

    if (nextSectionIndex >= tutorial.sections.length) {
      // Mark tutorial as completed
      progress.tutorials[tutorialId].completed = true;
      progress.tutorials[tutorialId].completedDate = new Date().toISOString();
      progress.tutorials[tutorialId].progress = 100;

      this.saveUserProgress(userId);

      return {
        completed: true,
        tutorialId,
        summary: {
          title: tutorial.title,
          sectionsCompleted: tutorial.sections.length,
          duration: tutorial.duration,
        },
      };
    }

    // Update progress
    progress.tutorials[tutorialId].currentSection = nextSectionIndex;
    progress.tutorials[tutorialId].lastAccessed = new Date().toISOString();
    progress.tutorials[tutorialId].progress = Math.round(
      (nextSectionIndex / tutorial.sections.length) * 100
    );

    this.saveUserProgress(userId);

    const section = tutorial.sections[nextSectionIndex];

    return {
      completed: false,
      section: {
        ...section,
        index: nextSectionIndex,
        isFirst: nextSectionIndex === 0,
        isLast: nextSectionIndex === tutorial.sections.length - 1,
      },
    };
  }

  /**
   * Move to the previous section in a tutorial
   * @param {string} userId - User ID
   * @param {string} tutorialId - Tutorial ID
   * @returns {Object} Previous section info
   */
  previousSection(userId, tutorialId) {
    const tutorial = this.getTutorial(tutorialId);

    if (!tutorial) {
      throw new Error(`Tutorial with ID ${tutorialId} not found`);
    }

    const progress = this.loadUserProgress(userId);

    if (!progress.tutorials[tutorialId]) {
      throw new Error(`User ${userId} has not started tutorial ${tutorialId}`);
    }

    const currentSectionIndex = progress.tutorials[tutorialId].currentSection || 0;

    if (currentSectionIndex === 0) {
      throw new Error('Already at the first section');
    }

    const prevSectionIndex = currentSectionIndex - 1;

    // Update progress
    progress.tutorials[tutorialId].currentSection = prevSectionIndex;
    progress.tutorials[tutorialId].lastAccessed = new Date().toISOString();

    this.saveUserProgress(userId);

    const section = tutorial.sections[prevSectionIndex];

    return {
      section: {
        ...section,
        index: prevSectionIndex,
        isFirst: prevSectionIndex === 0,
        isLast: prevSectionIndex === tutorial.sections.length - 1,
        userAnswer: progress.tutorials[tutorialId].answers[prevSectionIndex],
      },
    };
  }

  /**
   * Get summary of user's tutorial progress
   * @param {string} userId - User ID
   * @returns {Object} Progress summary
   */
  getUserProgressSummary(userId) {
    const progress = this.loadUserProgress(userId);
    const tutorials = this.tutorials;

    const completedTutorials = [];
    const inProgressTutorials = [];

    // Process each tutorial the user has interacted with
    Object.entries(progress.tutorials).forEach(([tutorialId, tutorialProgress]) => {
      const tutorial = tutorials[tutorialId];

      if (!tutorial) {
        return; // Skip if tutorial no longer exists
      }

      const progressData = {
        id: tutorialId,
        title: tutorial.title,
        progress: tutorialProgress.progress,
        lastAccessed: tutorialProgress.lastAccessed,
      };

      if (tutorialProgress.completed) {
        completedTutorials.push({
          ...progressData,
          completedDate: tutorialProgress.completedDate,
        });
      } else {
        inProgressTutorials.push(progressData);
      }
    });

    // Sort by last accessed, most recent first
    inProgressTutorials.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
    completedTutorials.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));

    return {
      userId,
      completedCount: completedTutorials.length,
      inProgressCount: inProgressTutorials.length,
      totalAvailable: Object.keys(tutorials).length,
      completedTutorials,
      inProgressTutorials,
      lastUpdated: progress.lastUpdated,
    };
  }

  /**
   * Reset progress for a specific tutorial
   * @param {string} userId - User ID
   * @param {string} tutorialId - Tutorial ID
   * @returns {boolean} Success status
   */
  resetTutorialProgress(userId, tutorialId) {
    const progress = this.loadUserProgress(userId);

    if (!progress.tutorials[tutorialId]) {
      return false; // Nothing to reset
    }

    // Reset progress but keep session ID
    const sessionId = progress.tutorials[tutorialId].sessionId;

    progress.tutorials[tutorialId] = {
      tutorialId,
      sessionId,
      started: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      completed: false,
      currentSection: 0,
      progress: 0,
      answers: {},
      notes: progress.tutorials[tutorialId].notes || '', // Keep any notes
    };

    return this.saveUserProgress(userId);
  }

  /**
   * Create a new tutorial
   * @param {Object} tutorialData - Tutorial data
   * @returns {Object} Created tutorial
   */
  createTutorial(tutorialData) {
    if (!tutorialData.id) {
      tutorialData.id = `tutorial-${uuidv4()}`;
    }

    if (!tutorialData.title) {
      throw new Error('Tutorial title is required');
    }

    if (
      !tutorialData.sections ||
      !Array.isArray(tutorialData.sections) ||
      tutorialData.sections.length === 0
    ) {
      throw new Error('Tutorial must have at least one section');
    }

    // Add metadata
    const tutorial = {
      ...tutorialData,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };

    // Save tutorial
    const tutorialPath = path.join(this.config.tutorialsDir, `${tutorial.id}.json`);
    fs.writeJsonSync(tutorialPath, tutorial, { spaces: 2 });

    // Update internal cache
    this.tutorials[tutorial.id] = tutorial;

    // Update index
    this._updateTutorialIndex();

    return tutorial;
  }

  /**
   * Update tutorial index file
   * @private
   */
  _updateTutorialIndex() {
    const indexPath = path.join(this.config.tutorialsDir, 'index.json');

    const index = {
      lastUpdated: new Date().toISOString(),
      tutorials: Object.keys(this.tutorials),
    };

    fs.writeJsonSync(indexPath, index, { spaces: 2 });
  }
}

module.exports = TutorialManager;
