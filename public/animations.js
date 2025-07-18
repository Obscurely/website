(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  class AnimationHandler {
    constructor(options = {}) {
      this.observer = null;
      this.timeouts = new Map();

	  // Mobile detection
	  const isMobile = this.isMobileDevice(); 

      this.config   = {
        threshold : isMobile ? 0.025 : 0.1,
        rootMargin: '0px 0px 0px 0px',
        ...options,
      };

      this.handleIntersection = this.handleIntersection.bind(this);
      this.init();
    }

	// Detect mobile devices
	isMobileDevice() {
	  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
			 window.innerWidth <= 768;
	}

	// check if an element is in the viewport
    isInViewport(el, threshold = 0) {
      const rect      = el.getBoundingClientRect();
      const vHeight   = window.innerHeight || document.documentElement.clientHeight;
      const vWidth    = window.innerWidth  || document.documentElement.clientWidth;

      return (
        rect.bottom  >= 0 - threshold &&
        rect.top     <= vHeight + threshold &&
        rect.right   >= 0 - threshold &&
        rect.left    <= vWidth  + threshold
      );
    }

	// handle intersection events
    handleIntersection(entries) {
      entries.forEach((entry) => {
        const el      = entry.target;
        const delay   = parseInt(el.dataset.delay || '0', 10);
        const isOnce  = el.dataset.once === 'true';

        if (this.timeouts.has(el)) {
          clearTimeout(this.timeouts.get(el));
          this.timeouts.delete(el);
        }

        if (entry.isIntersecting) {
          const id = setTimeout(() => {
            el.dataset.state = isOnce ? 'once' : 'show';
            this.timeouts.delete(el);
            if (isOnce) this.observer.unobserve(el);
          }, Math.max(0, delay));

          this.timeouts.set(el, id);

        } else if (!isOnce) {
          el.dataset.state = 'hide';
        }
      });
    }

	// initialise the observer and animations
    init() {
      try {
        this.observer = new IntersectionObserver(this.handleIntersection, {
          threshold : this.config.threshold,
          rootMargin: this.config.rootMargin,
        });

        this.initAnimations();
      } catch (err) {
        console.warn('Animation handler failed to initialise:', err);
      }
    }

	// initialise animations on elements with data-state
    initAnimations() {
	  const els = document.querySelectorAll('[data-state]:not([data-animation-exclude="true"])'); 

      els.forEach((el) => {
        if (el.dataset.state === 'once') {
          el.dataset.once = 'true'; // mark as once-element

          if (this.isInViewport(el)) {
			// already in viewport trigger immediately
            return;
          }

		  // prevent premature triggering
          el.dataset.state = 'hide';
        }

		// observe other cases
        this.observer.observe(el);
      });
    }

	// destroy the observer and clear timeouts
    destroy() {
      if (this.observer) this.observer.disconnect();
      this.timeouts.forEach((id) => clearTimeout(id));
      this.timeouts.clear();
    }

    observe(el)   { if (this.observer && el) this.observer.observe(el); }
    unobserve(el) {
      if (this.observer && el) {
        this.observer.unobserve(el);
        if (this.timeouts.has(el)) {
          clearTimeout(this.timeouts.get(el));
          this.timeouts.delete(el);
        }
      }
    }
  }

  // Initialize the AnimationHandler when the DOM is ready
  let animationHandler;

  const initHandler = () => {
    animationHandler = new AnimationHandler();
    window.animationHandler = animationHandler; // debugging and access
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHandler);
  } else {
    initHandler();
  }

  window.addEventListener('beforeunload', () => {
    if (animationHandler) animationHandler.destroy();
  });
})();
