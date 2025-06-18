/**
 * Main.js - Optimized JavaScript for Web3 Security Test Kit
 * This file handles non-critical functionality and is loaded with defer attribute
 */

// Use IIFE to avoid polluting global scope
(function() {
  'use strict';
  
  // Constants and configurations
  const CONFIG = {
    animationDelay: 50,
    intersectionThreshold: 0.1,
    idleTimeout: 200
  };
  
  // DOM references - query once and store references
  const domRefs = {};
  
  /**
   * Initialize the application when DOM is fully loaded
   */
  function init() {
    // Store DOM references
    cacheElements();
    
    // Set up event handlers
    setupEventListeners();
    
    // Initialize UI components
    initializeIntersectionObserver();
    
    // Schedule non-critical operations during idle time
    scheduleIdleTasks();
  }
  
  /**
   * Cache DOM element references
   */
  function cacheElements() {
    domRefs.featureCards = Array.from(document.querySelectorAll('.feature-card'));
    domRefs.stepElements = Array.from(document.querySelectorAll('.step'));
    domRefs.animatedElements = [...domRefs.featureCards, ...domRefs.stepElements];
  }
  
  /**
   * Set up event listeners using delegation where possible
   */
  function setupEventListeners() {
    // Use passive listeners for scroll events
    window.addEventListener('scroll', debounce(handleScroll, 20), { passive: true });
    
    // Use event delegation for click events
    document.addEventListener('click', handleDocumentClick);
    
    // Add resize listener with debounce
    window.addEventListener('resize', debounce(handleResize, 150), { passive: true });
  }
  
  /**
   * Handle document click with event delegation
   * @param {Event} event - The click event object
   */
  function handleDocumentClick(event) {
    // Example of event delegation - handle button clicks
    if (event.target.closest('.btn')) {
      const button = event.target.closest('.btn');
      
      // Add click animation
      button.classList.add('btn-clicked');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        button.classList.remove('btn-clicked');
      }, 300);
    }
  }
  
  /**
   * Handle scroll events
   */
  function handleScroll() {
    // Implement any scroll-based functionality
    // This is a debounced handler, so it won't fire too frequently
  }
  
  /**
   * Handle window resize events
   */
  function handleResize() {
    // Handle responsive adjustments if needed
  }
  
  /**
   * Initialize intersection observer for revealing elements as they scroll into view
   */
  function initializeIntersectionObserver() {
    // Only proceed if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: CONFIG.intersectionThreshold
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class with sequential delay
          const index = domRefs.animatedElements.indexOf(entry.target);
          const delay = index * CONFIG.animationDelay;
          
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          
          // Stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Start observing elements
    domRefs.animatedElements.forEach(element => {
      // Add initial hidden class
      element.classList.add('hidden');
      observer.observe(element);
    });
  }
  
  /**
   * Schedule non-critical tasks during browser idle time
   */
  function scheduleIdleTasks() {
    // Use requestIdleCallback if available, or fallback to setTimeout
    const scheduler = window.requestIdleCallback || 
      (cb => setTimeout(cb, CONFIG.idleTimeout));
    
    scheduler(() => {
      // Preload additional resources
      preloadAdditionalResources();
      
      // Initialize analytics or other non-critical features
      initializeAnalytics();
    });
  }
  
  /**
   * Preload additional resources that might be needed later
   */
  function preloadAdditionalResources() {
    // Example: preload images that aren't immediately visible
    const imagesToPreload = [
      '/assets/img/icons/documentation.png',
      '/assets/img/icons/settings.png'
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  /**
   * Initialize analytics (mock implementation)
   */
  function initializeAnalytics() {
    // Mock analytics implementation
  }
  
  /**
   * Debounce function to limit how often a function is called
   * @param {Function} func - The function to debounce
   * @param {number} wait - The debounce delay in milliseconds
   * @return {Function} - The debounced function
   */
  function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Add the CSS class to body when animations should be applied
  // This is used to prevent animations during page load
  document.body.classList.add('js-enabled');
  
  // Initialize the application when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 