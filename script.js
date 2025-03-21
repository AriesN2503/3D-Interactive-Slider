(function initTestimonialCarousel() {
    function initCarousel() {
      const container = document.querySelector(".testimonial-carousel");
      if (!container) {
        console.log("Waiting for testimonial carousel element...");
        setTimeout(initCarousel, 100);
        return;
      }

      const circleContainer = container.querySelector(".testimonial-circle-container"); 
      const scrollContainer = container.querySelector(".scroll-container");
      const scrollIndicator = container.querySelector(".scroll-indicator");
      const sections = container.querySelectorAll(".section");

      if (!circleContainer || !sections.length) {
        console.log("Waiting for carousel elements...");
        setTimeout(initCarousel, 100);
        return;
      }

      let currentRotation = 0;
      let targetRotation = 0;
      let activeIndex = 0;
      let scrolling = false;
      let lastScrollTime = 0;
      let scrollTimeout;
      let animationFrame;
      let lastScrollPos = 0;
      let isAnimating = false;
      const ANIMATION_DURATION = 600; 
      const SCROLL_DELAY = 600; 
      const radius = 400;
      const angleIncrement = 360 / sections.length;

      function isMobile() {
        return window.innerWidth <= 768;
      }

      function updateSections() {
        
        sections.forEach((section) => section.classList.remove("active"));

        requestAnimationFrame(() => {
          sections.forEach((section, index) => {
            const relativePosToActive = (index - activeIndex + sections.length) % sections.length;
            section.style.display = "block";

            let y = 0;
            let x = 0;
            let opacity = 0;
            let scale = 1;
            let zIndex = 0;
            section.classList.remove("clickable");

            if (isMobile()) {
              switch (relativePosToActive) {
                case 0:
                  y = 0;
                  x = 30;
                  opacity = 1;
                  scale = 1;
                  zIndex = 4;
                  break;
                case 1:
                  y = 160;
                  x = 0;
                  opacity = 0.9;
                  scale = 0.95;
                  zIndex = 3;
                  section.classList.add("clickable");
                  break;
                case sections.length - 1:
                  y = -160;
                  x = 0;
                  opacity = 0.9;
                  scale = 0.95;
                  zIndex = 3;
                  section.classList.add("clickable");
                  break;
                case 2:
                  y = 0;
                  x = -40;
                  opacity = 0.2;
                  scale = 0.8;
                  zIndex = 1;
                  break;
              }
            } else {
              switch (relativePosToActive) {
                case 0:
                  y = 0;
                  x = 50;
                  opacity = 1;
                  scale = 1;
                  zIndex = 4;
                  break;
                case 1:
                  y = 170;
                  x = 0;
                  opacity = 0.9;
                  scale = 0.95;
                  zIndex = 3;
                  section.classList.add("clickable");
                  break;
                case sections.length - 1:
                  y = -170;
                  x = 0;
                  opacity = 0.9;
                  scale = 0.95;
                  zIndex = 3;
                  section.classList.add("clickable");
                  break;
                case 2:
                  y = 0;
                  x = -100;
                  opacity = 0.2;
                  scale = 0.8;
                  zIndex = 1;
                  break;
              }
            }

           
            requestAnimationFrame(() => {
              section.style.transform = `translate(${x}px, calc(-50% + ${y}px)) scale(${scale})`;
              section.style.opacity = opacity;
              section.style.zIndex = zIndex;

              
              if (relativePosToActive === 0) {
                setTimeout(() => {
                  section.classList.add("active");
                }, 50);
              }
            });
          });
        });
      }

      function handleScroll() {
        if (isAnimating) return;
        const scrollPosition = scrollContainer.scrollTop;
        const scrollDelta = scrollPosition - lastScrollPos;
        if (Math.abs(scrollDelta) > 20) {
          const direction = scrollDelta > 0 ? 1 : -1;
          queueScroll(direction);
        }
        lastScrollPos = scrollPosition;
      }

      function queueScroll(direction) {
        if (isAnimating) return;
        isAnimating = true;

        // Add delay before starting animation
        setTimeout(() => {
          activeIndex = (activeIndex + direction + sections.length) % sections.length;
          updateSections();

          setTimeout(() => {
            isAnimating = false;
          }, ANIMATION_DURATION + 50);
        }, 50);
      }

      // Add click handler for sections
      sections.forEach((section, index) => {
        section.addEventListener("click", () => {
          if (isAnimating || !section.classList.contains("clickable")) return;

          const currentIndex = parseInt(section.dataset.index);
          const direction = currentIndex > activeIndex ? (currentIndex - activeIndex <= sections.length / 2 ? 1 : -1) : activeIndex - currentIndex <= sections.length / 2 ? -1 : 1;
          queueScroll(direction);
        });
      });

      // Initialize
      try {
        sections.forEach((section, index) => {
          section.dataset.index = index;
        });
        circleContainer.style.transformOrigin = `center center -${radius}px`;

        // Add error handling to event listeners
        scrollContainer.addEventListener("scroll", () => {
          try {
            const now = Date.now();
            if (now - lastScrollTime > 50) {
              handleScroll();
              lastScrollTime = now;
            } else {
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(handleScroll, 50);
            }
          } catch (error) {
            console.error("Scroll handler error:", error);
          }
        });

        scrollContainer.addEventListener(
          "wheel",
          (e) => {
            e.preventDefault();
            if (isAnimating) return;
            const direction = e.deltaY > 0 ? 1 : -1;
            queueScroll(direction);
          },
          { passive: false }
        );

        const scrollHeight = window.innerHeight * 2;
        const dummy = document.createElement("div");
        dummy.style.height = `${scrollHeight}px`;
        scrollContainer.appendChild(dummy);

        function initializeSections() {
          document.body.classList.add("init-transitions");
          updateSections();
          void document.body.offsetHeight;
          document.body.classList.remove("init-transitions");
        }

        initializeSections();

        window.addEventListener("unload", () => {
          cancelAnimationFrame(animationFrame);
        });
      } catch (error) {
        console.error("Carousel initialization error:", error);
        setTimeout(initCarousel, 100);
      }
    }

    // Start initialization
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initCarousel);
    } else {
      initCarousel();
    }

    window.addEventListener("resize", updateSections);
  })();