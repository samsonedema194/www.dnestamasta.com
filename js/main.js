document.addEventListener('DOMContentLoaded', () => {
    const metricNumbers = document.querySelectorAll('.metric-num-display');
    const animationDuration = 1300; // 🛠️ Total duration of the counting effect in milliseconds (2 seconds)

    const startCounting = (counterElement) => {
        const targetValue = parseInt(counterElement.getAttribute('data-target'), 10);
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            
            // Calculate progress percentage (capped at 1)
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // Linear mathematical distribution to determine current step value
            const currentValue = Math.floor(progress * targetValue);
            
            // Update the text safely while preserving your '+' string suffix
            counterElement.innerHTML = `${currentValue}+`;

            // If the total animation duration hasn't finished, request next frame execution
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                counterElement.innerHTML = `${targetValue}+`; // Ensure exact final alignment lock
            }
        };

        requestAnimationFrame(updateNumber);
    };

    // SETUP INTERSECTION OBSERVER RADAR BOUNDARIES
    const observerOptions = {
        root: null,         // Watches relative to the primary browser screen window
        threshold: 0.3      // 🛠️ Triggers exactly when 20% of the About section card element comes into view
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the card grid container has entered the active viewing plane
            if (entry.isIntersecting) {
                // Initialize counter loops independently for each selector match
                metricNumbers.forEach(number => startCounting(number));
                
                // Disconnect observer tracking immediately after execution so it only runs once per page load
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target the main section container wrapper to initiate tracking
    const targetSection = document.querySelector('.about-viewport-section');
    if (targetSection) {
        sectionObserver.observe(targetSection);
    }
});

// SERVICES TEXT ACCORDION EXPANSION ENGINE (EXCLUSIVE MODE)
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.btn-service-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentWrapper = this.previousElementSibling;
            const currentCard = this.closest('.service-custom-card');
            const isAlreadyExpanded = this.classList.contains('active-expanded');

            // 🛠️ STEP 1: IF WE ARE OPENING A CARD, CLOSE ALL OTHER OPEN CARDS FIRST
            if (!isAlreadyExpanded) {
                toggleButtons.forEach(otherButton => {
                    // Skip the card that the user just clicked
                    if (otherButton !== button) {
                        const otherWrapper = otherButton.previousElementSibling;
                        const otherCard = otherButton.closest('.service-custom-card');
                        
                        // If another card is active, collapse it cleanly
                        if (otherButton.classList.contains('active-expanded')) {
                            otherWrapper.style.maxHeight = "48px";
                            otherButton.textContent = "Read more";
                            otherButton.classList.remove('active-expanded');
                            
                            // Restore its perfect square layout boundary after collapse completes
                            setTimeout(() => {
                                if (!otherButton.classList.contains('active-expanded')) {
                                    otherCard.classList.remove('is-expanded-card');
                                }
                            }, 400);
                        }
                    }
                });

                // 🛠️ STEP 2: EXPAND THE CURRENT CARD
                currentCard.classList.add('is-expanded-card');
                currentWrapper.style.maxHeight = currentWrapper.scrollHeight + "px";
                this.textContent = "Read less";
                this.classList.add('active-expanded');
                
            } else {
                // 🛠️ STEP 3: COLLAPSE THE CURRENT CARD IF CLICKED AGAIN
                currentWrapper.style.maxHeight = "48px";
                this.textContent = "Read more";
                this.classList.remove('active-expanded');
                
                setTimeout(() => {
                    if (!this.classList.contains('active-expanded')) {
                        currentCard.classList.remove('is-expanded-card');
                    }
                }, 400); // Matches the 0.4s transition timing
            }
        });
    });
});

// ==========================================================================
// MASTER SITE ENGAGEMENT ENGINE (LOADED SAFELY FROM THE HEAD)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- ABOUT SECTION: NUMBERS COUNT-UP ENGINE ---
    const metricNumbers = document.querySelectorAll('.metric-num-display');
    const animationDuration = 2000; 

    const startCounting = (counterElement) => {
        const targetValue = parseInt(counterElement.getAttribute('data-target'), 10);
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            const currentValue = Math.floor(progress * targetValue);
            
            counterElement.innerHTML = `${currentValue}+`;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                counterElement.innerHTML = `${targetValue}+`; 
            }
        };
        requestAnimationFrame(updateNumber);
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                metricNumbers.forEach(number => startCounting(number));
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.2 });

    const targetSection = document.querySelector('.about-viewport-section');
    if (targetSection) {
        sectionObserver.observe(targetSection);
    }


    // --- SERVICES SECTION: TEXT ACCORDION EXPANSION ENGINE ---
    const toggleButtons = document.querySelectorAll('.btn-service-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentWrapper = this.previousElementSibling;
            const currentCard = this.closest('.service-custom-card');
            const isAlreadyExpanded = currentCard.classList.contains('is-expanded');

            if (!isAlreadyExpanded) {
                toggleButtons.forEach(otherButton => {
                    const otherCard = otherButton.closest('.service-custom-card');
                    if (otherCard && otherCard !== currentCard && otherCard.classList.contains('is-expanded')) {
                        const otherWrapper = otherButton.previousElementSibling;
                        otherWrapper.style.maxHeight = "48px";
                        otherButton.textContent = "Read more";
                        otherCard.classList.remove('is-expanded');
                    }
                });

                currentCard.classList.add('is-expanded');
                currentWrapper.style.maxHeight = currentWrapper.scrollHeight + "px";
                this.textContent = "Read less";
                
            } else {
                currentWrapper.style.maxHeight = "48px";
                this.textContent = "Read more";
                currentCard.classList.remove('is-expanded');
            }
        });
    });


    // --- PROJECTS SECTION: SLIDER TRACK ENGINE ---
    const track = document.querySelector('.projects-slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        let currentSlideIndex = 0;
        const cardWidth = 584; // Width of one card
        const totalGap = 32;   // Gap between cards

        const updateSliderPosition = () => {
            const totalCards = track.children.length;
            const maxSteps = Math.max(0, totalCards - 2);

            // Constraint check bounds
            if (currentSlideIndex > maxSteps) currentSlideIndex = maxSteps;
            if (currentSlideIndex < 0) currentSlideIndex = 0;

            const amountToMove = (cardWidth + totalGap) * currentSlideIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;

            // Toggle active/inactive states
            prevBtn.disabled = (currentSlideIndex === 0);
            nextBtn.disabled = (currentSlideIndex >= maxSteps);
        };

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlideIndex++;
            updateSliderPosition();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlideIndex--;
            updateSliderPosition();
        });

        // Initialize immediately
        updateSliderPosition();
        
        // Watch for changes if extra cards get appended later
        const observer = new MutationObserver(updateSliderPosition);
        observer.observe(track, { childList: true });
    }

});

// ==========================================================================
    // 4. FAQ SECTION: INTERACTIVE ACCORDION EXPANSION ENGINE
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
    const accordionTriggers = document.querySelectorAll('.faq-trigger-bar');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.closest('.faq-accordion-item');
            const currentPanel = currentItem.querySelector('.faq-panel-expand');
            const isActive = currentItem.classList.contains('is-active');

            // 1. Close all other open accordion items safely
            document.querySelectorAll('.faq-accordion-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('is-active');
                    item.querySelector('.faq-panel-expand').style.maxHeight = null;
                }
            });

            // 2. Toggle the targeted item
            if (isActive) {
                currentItem.classList.remove('is-active');
                currentPanel.style.maxHeight = null;
            } else {
                currentItem.classList.add('is-active');
                // Dynamically sets the perfect height including padding
                currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
            }
        });
    });
});