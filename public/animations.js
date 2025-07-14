(function() {
  'use strict';
  
  if (typeof window === 'undefined') return;
  
  class AnimationHandler {
    constructor(options = {}) {
      this.observer = null;
      this.timeouts = new Map();
      this.config = {
        threshold: options.threshold || 0.2,
        rootMargin: options.rootMargin || '0px 0px 100px 0px',
        once: options.once || false,
        ...options
      };
      
      this.handleIntersection = this.handleIntersection.bind(this);
      this.init();
    }
    
    handleIntersection(entries) {
      entries.forEach((entry) => {
        const element = entry.target;
        const delay = parseInt(element.dataset.delay || '0', 10);
        const once = element.dataset.once === 'true' || this.config.once;
        
        // Clear existing timeout for this element
        if (this.timeouts.has(element)) {
          clearTimeout(this.timeouts.get(element));
          this.timeouts.delete(element);
        }
        
        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            element.dataset.state = 'show';
            this.timeouts.delete(element);
            
            // Unobserve if one-time animation
            if (once) {
              this.observer.unobserve(element);
            }
          }, Math.max(0, delay));
          
          this.timeouts.set(element, timeoutId);
        } else if (!once) {
          // Only hide if not a one-time animation
          element.dataset.state = 'hide';
        }
      });
    }
    
    init() {
      try {
        this.observer = new IntersectionObserver(
          this.handleIntersection,
          {
            threshold: this.config.threshold,
            rootMargin: this.config.rootMargin
          }
        );
        
        this.initAnimations();
      } catch (error) {
        console.warn('Animation handler failed to initialize:', error);
      }
    }
    
    initAnimations() {
      const elements = document.querySelectorAll('[data-state]');
      elements.forEach((el) => {
        this.observer.observe(el);
      });
    }
    
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
      
      // Clear all pending timeouts
      this.timeouts.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      this.timeouts.clear();
    }
    
    // Method to add new elements dynamically
    observe(element) {
      if (this.observer && element) {
        this.observer.observe(element);
      }
    }
    
    unobserve(element) {
      if (this.observer && element) {
        this.observer.unobserve(element);
        if (this.timeouts.has(element)) {
          clearTimeout(this.timeouts.get(element));
          this.timeouts.delete(element);
        }
      }
    }
  }
  
  // Initialize when DOM is ready
  let animationHandler;
  
  const initHandler = () => {
    animationHandler = new AnimationHandler({
      threshold: 0.2,
      rootMargin: '0px 0px 100px 0px'
    });
    
    // Expose handler globally after it's created
    window.animationHandler = animationHandler;
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHandler);
  } else {
    initHandler();
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationHandler) {
      animationHandler.destroy();
    }
  });
})();
