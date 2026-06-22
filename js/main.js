document.addEventListener("DOMContentLoaded", () => {
    const navAnchors = document.querySelectorAll(".nav-anchor");
    
    // Get the current URL from the address bar
    const currentUrl = window.location.href;

    // 🎯 STEP 1: Strict Check for the Subpage using a RegEx search
    if (/project-1\.html/i.test(currentUrl)) {
        
        // Force ONLY the Projects link to be active and green on this page
        navAnchors.forEach((anchor) => {
            const anchorHref = anchor.getAttribute("href");
            
            // If the nav link points to project-1.html or ends with #projects, light it up green
            if (/project-1\.html/i.test(anchorHref) || anchorHref.endsWith("#projects")) {
                anchor.classList.add("active-anchor");
            } else {
                anchor.classList.remove("active-anchor");
            }
        });

    } else {
        // 🎯 STEP 2: If they are on index.html, run the scroll-tracking logic
        const sections = document.querySelectorAll("section[id], header[id]");

        const observerOptions = {
            root: null, 
            rootMargin: "-30% 0px -60% 0px" 
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let currentSectionId = entry.target.getAttribute("id");

                    // Keep your Foundation section linked to About
                    if (currentSectionId === "foundation") {
                        currentSectionId = "about";
                    }

                    navAnchors.forEach((anchor) => {
                        const anchorHref = anchor.getAttribute("href");

                        if (anchorHref.endsWith(`#${currentSectionId}`)) {
                            anchor.classList.add("active-anchor");
                        } else {
                            anchor.classList.remove("active-anchor");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }
});

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

// ==========================================================================
    // 5. FULL PROJECT BEACH HOUSE
    // ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("btn-load-more");
    
    // Set layout page display parameters (3x3 grid blocks)
    const IMAGES_PER_PAGE = 9;

    function revealNextBatch() {
        // Look inside the live document for elements holding the hidden class rule
        const hiddenCards = Array.from(document.querySelectorAll(".project-media-card.hidden-row"));
        
        // Isolate a maximum payload slicing window of 9 elements
        const currentBatch = hiddenCards.slice(0, IMAGES_PER_PAGE);

        currentBatch.forEach((card, index) => {
            card.classList.remove("hidden-row");
            card.classList.add("dynamic-append-card");
            
            // Stagger animation timing slightly for a premium, non-abrupt reveal sequence
            card.style.animationDelay = `${(index % 3) * 0.1}s`;
        });

        // If no more hidden elements remain in the HTML code tree, deactivate the button
        if (hiddenCards.length <= IMAGES_PER_PAGE && loadMoreBtn) {
            loadMoreBtn.textContent = "All Projects Loaded";
            loadMoreBtn.disabled = true;
            loadMoreBtn.classList.add("is-inactive");
        }
    }

    function revertLastBatch() {
        const revealedCards = Array.from(document.querySelectorAll(".dynamic-append-card"));
        if (revealedCards.length === 0) return;

        // Target the last appended 9 images to hide them again
        const batchToHide = revealedCards.slice(-IMAGES_PER_PAGE);

        batchToHide.forEach(card => {
            card.classList.remove("dynamic-append-card");
            card.classList.add("hidden-row");
            card.style.animationDelay = "0s";
        });

        if (loadMoreBtn) {
            loadMoreBtn.textContent = "Load More";
            loadMoreBtn.disabled = false;
            loadMoreBtn.classList.remove("is-inactive");
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            revealNextBatch();
            
            // Log state history anchor to capture browser back arrow events
            history.pushState({ galleryPageActive: true }, "");
        });
    }

    // Capture state adjustments to roll back rows gracefully
    window.addEventListener("popstate", (event) => {
        if (!event.state || !event.state.galleryPageActive) {
            revertLastBatch();
        }
    });
});

// ==========================================================================
// LIGHTBOX MODAL CORE CONTROLLER (WITH ARROW LOCKING)
// ==========================================================================
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImg = document.getElementById("lightbox-target-img");
const closeBtn = document.querySelector(".lightbox-close");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

let currentIndex = 0;
let visibleCards = [];

function updateActiveVisibleDeck() {
    // Only capture elements currently active and visible in the DOM grid
    visibleCards = Array.from(document.querySelectorAll(".project-media-card:not(.hidden-row)"));
}

function updateArrowVisibilityStates() {
    // 🔒 Lock Left Arrow if on the absolute first image
    if (currentIndex === 0) {
        leftArrow.disabled = true;
        leftArrow.classList.add("nav-locked");
    } else {
        leftArrow.disabled = false;
        leftArrow.classList.remove("nav-locked");
    }

    // 🔒 Lock Right Arrow if on the absolute final image currently loaded
    if (currentIndex === visibleCards.length - 1) {
        rightArrow.disabled = true;
        rightArrow.classList.add("nav-locked");
    } else {
        rightArrow.disabled = false;
        rightArrow.classList.remove("nav-locked");
    }
}

function displayImageAtIndex(index) {
    if (index < 0 || index >= visibleCards.length) return;
    
    currentIndex = index;
    const targetImgSrc = visibleCards[currentIndex].querySelector("img").src;
    const targetImgAlt = visibleCards[currentIndex].querySelector("img").alt;
    
    lightboxImg.src = targetImgSrc;
    lightboxImg.alt = targetImgAlt;

    // 🎯 Trigger the safety locks after updating the index position
    updateArrowVisibilityStates();
}

function openLightbox(index) {
    updateActiveVisibleDeck();
    displayImageAtIndex(index);
    lightbox.classList.add("is-visible");
    document.body.classList.add("lightbox-open");
}

function closeLightbox() {
    lightbox.classList.remove("is-visible");
    document.body.classList.remove("lightbox-open");
    setTimeout(() => { lightboxImg.src = ""; }, 400); 
}

// Attach listeners cleanly across parent container nodes
document.getElementById("project-gallery-grid").addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".project-media-card");
    if (!clickedCard || clickedCard.classList.contains("hidden-row")) return;
    
    updateActiveVisibleDeck();
    const resolvedIndex = visibleCards.indexOf(clickedCard);
    openLightbox(resolvedIndex);
});

// Stepping backward safely
leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
        displayImageAtIndex(currentIndex - 1);
    }
});

// Stepping forward safely
rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex < visibleCards.length - 1) {
        displayImageAtIndex(currentIndex + 1);
    }
});

// Exit Modal Closures
closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard mapping overrides with built-in boundary checks
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-visible")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && currentIndex > 0) leftArrow.click();
    if (e.key === "ArrowRight" && currentIndex < visibleCards.length - 1) rightArrow.click();
});