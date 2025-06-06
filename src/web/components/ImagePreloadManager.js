/**
 * ImagePreloadManager.js
 *
 * A utility for preloading critical images to improve user experience
 * by preventing content layout shifts and ensuring images are ready
 * when needed.
 */

/**
 * A class to manage image preloading for critical UI elements
 */
class ImagePreloadManager {
  constructor() {
    this.loadedImages = new Set();
    this.preloadQueue = [];
    this.priorityImages = new Set();
    this.isProcessing = false;
    this.concurrentLoads = 3; // Number of simultaneous image loads
    this.activeLoads = 0;
  }

  /**
   * Add critical images that should be preloaded with high priority
   *
   * @param {Array|string} images - Single image URL or array of image URLs to preload
   * @returns {ImagePreloadManager} The manager instance for chaining
   */
  addCriticalImages(images) {
    const imageArray = Array.isArray(images) ? images : [images];

    imageArray.forEach(image => {
      if (!this.loadedImages.has(image)) {
        this.priorityImages.add(image);
        this.preloadQueue.unshift(image); // Add to front of queue
      }
    });

    if (!this.isProcessing) {
      this.processQueue();
    }

    return this;
  }

  /**
   * Add images to preload queue with normal priority
   *
   * @param {Array|string} images - Single image URL or array of image URLs to preload
   * @returns {ImagePreloadManager} The manager instance for chaining
   */
  preload(images) {
    const imageArray = Array.isArray(images) ? images : [images];

    imageArray.forEach(image => {
      if (!this.loadedImages.has(image) && !this.priorityImages.has(image)) {
        this.preloadQueue.push(image); // Add to end of queue
      }
    });

    if (!this.isProcessing) {
      this.processQueue();
    }

    return this;
  }

  /**
   * Process the preload queue
   *
   * @private
   */
  processQueue() {
    if (this.preloadQueue.length === 0 || this.activeLoads >= this.concurrentLoads) {
      this.isProcessing = this.activeLoads > 0;
      return;
    }

    this.isProcessing = true;
    const nextImage = this.preloadQueue.shift();
    this.activeLoads++;

    const img = new Image();

    img.onload = () => {
      this.loadedImages.add(nextImage);
      this.activeLoads--;
      this.processQueue();
    };

    img.onerror = () => {
      console.warn(`Failed to preload image: ${nextImage}`);
      this.activeLoads--;
      this.processQueue();
    };

    img.src = nextImage;

    // Process more images if we can load concurrently
    if (this.activeLoads < this.concurrentLoads) {
      this.processQueue();
    }
  }

  /**
   * Check if an image has been loaded
   *
   * @param {string} src - The image URL to check
   * @returns {boolean} True if the image has been loaded
   */
  isLoaded(src) {
    return this.loadedImages.has(src);
  }

  /**
   * Preload all images in the specified DOM subtree
   *
   * @param {Element} rootElement - The root DOM element to scan for images
   * @param {boolean} highPriority - Whether to load these images with high priority
   * @returns {ImagePreloadManager} The manager instance for chaining
   */
  preloadImagesInDOM(rootElement, highPriority = false) {
    if (!rootElement) return this;

    const images = rootElement.querySelectorAll('img');
    const imageUrls = Array.from(images)
      .map(img => img.src || img.dataset.src)
      .filter(Boolean);

    if (highPriority) {
      this.addCriticalImages(imageUrls);
    } else {
      this.preload(imageUrls);
    }

    return this;
  }

  /**
   * Clear all queued preloads
   *
   * @returns {ImagePreloadManager} The manager instance for chaining
   */
  clearQueue() {
    this.preloadQueue = [];
    return this;
  }

  /**
   * Configure the preload manager
   *
   * @param {Object} config - Configuration options
   * @param {number} config.concurrentLoads - Number of images to load simultaneously
   * @returns {ImagePreloadManager} The manager instance for chaining
   */
  configure(config = {}) {
    if (config.concurrentLoads) {
      this.concurrentLoads = config.concurrentLoads;
    }
    return this;
  }
}

// Create a singleton instance
const imagePreloader = new ImagePreloadManager();

export default imagePreloader;
