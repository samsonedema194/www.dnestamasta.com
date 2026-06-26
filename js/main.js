// ==========================================================================
// D'NESTA MASTA - MASTER ENGAGEMENT ENGINE (UNIFIED MAIN & PROJECT SCRIPT)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const navAnchors = document.querySelectorAll(".nav-anchor");
    
    // Get the current URL from the address bar
    const currentUrl = window.location.href;

    // 🎯 STRICT ROUTING: If on project-1.html OR project-2.html, run this block
    if (/project-1\.html/i.test(currentUrl) || /project-2\.html/i.test(currentUrl)){
        
        // Force ONLY the Projects link to be active and green on these pages
        navAnchors.forEach((anchor) => {
            const anchorHref = anchor.getAttribute("href");
            
            // Link matches project-1 OR project-2 OR ends with #projects
            if (/project-1\.html/i.test(anchorHref) || /project-2\.html/i.test(anchorHref) || anchorHref.endsWith("#projects")) {
                anchor.classList.add("active-anchor");
            } else {
                anchor.classList.remove("active-anchor");
            }
        });

    } else {
        // 🎯 SCROLL RADAR DIRECTION: If they are on index.html, run the scroll-tracking logic
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

// ==========================================================================
// MASTER LANDING PAGE INTERACTIONS ENGINE
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


    // --- MAIN LANDING PAGE: PROJECTS SLIDER CAROUSEL TRACKER ---
    const track = document.querySelector('.projects-slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        let currentSlideIndex = 0;
        const cardWidth = 584; 
        const totalGap = 32;   

        const updateSliderPosition = () => {
            const totalCards = track.children.length;
            const maxSteps = Math.max(0, totalCards - 2);

            if (currentSlideIndex > maxSteps) currentSlideIndex = maxSteps;
            if (currentSlideIndex < 0) currentSlideIndex = 0;

            const amountToMove = (cardWidth + totalGap) * currentSlideIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;

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

        updateSliderPosition();
        
        const observer = new MutationObserver(updateSliderPosition);
        observer.observe(track, { childList: true });
    }

});

// ==========================================================================
// FAQ ACCORDION COMPONENT ACTIONS ENGINE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const accordionTriggers = document.querySelectorAll('.faq-trigger-bar');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.closest('.faq-accordion-item');
            const currentPanel = currentItem.querySelector('.faq-panel-expand');
            const isActive = currentItem.classList.contains('is-active');

            document.querySelectorAll('.faq-accordion-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('is-active');
                    item.querySelector('.faq-panel-expand').style.maxHeight = null;
                }
            });

            if (isActive) {
                currentItem.classList.remove('is-active');
                currentPanel.style.maxHeight = null;
            } else {
                currentItem.classList.add('is-active');
                currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
            }
        });
    });
});

// ==========================================================================
// UNIFIED PORTFOLIO GALLERY CONTROL ENGINE (PROJECT 1 & PROJECT 2 DUAL SUPPORT)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    const loadMoreBtn = document.getElementById("btn-load-more");
    const tabImages = document.getElementById("tab-show-images");
    const tabVideos = document.getElementById("tab-show-videos");
    const imageGrid = document.getElementById("project-gallery-grid");
    const videoGrid = document.getElementById("project-video-grid");
    
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-target-img");
    const lightboxVid = document.getElementById("lightbox-target-video");
    const closeBtn = document.querySelector(".lightbox-close");
    const leftArrow = document.querySelector(".arrow-left");
    const rightArrow = document.querySelector(".arrow-right");

    const IMAGES_PER_PAGE = 9;
    let currentIndex = 0;
    let visibleCards = [];

    // --- MODULE 1: INTERACTIVE LOAD MORE SYSTEM ---
    function revealNextBatch() {
        const hiddenCards = Array.from(document.querySelectorAll(".project-media-card.hidden-row"));
        const currentBatch = hiddenCards.slice(0, IMAGES_PER_PAGE);

        currentBatch.forEach((card, index) => {
            card.classList.remove("hidden-row");
            card.classList.add("dynamic-append-card");
            card.style.animationDelay = `${(index % 3) * 0.1}s`;
        });

        if (hiddenCards.length <= IMAGES_PER_PAGE && loadMoreBtn) {
            loadMoreBtn.textContent = "All Projects Loaded";
            loadMoreBtn.disabled = true;
            loadMoreBtn.classList.add("is-inactive");
        }
    }

    function revertLastBatch() {
        const revealedCards = Array.from(document.querySelectorAll(".dynamic-append-card"));
        if (revealedCards.length === 0) return;

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
            history.pushState({ galleryPageActive: true }, "");
        });
    }

    window.addEventListener("popstate", (event) => {
        if (!event.state || !event.state.galleryPageActive) {
            revertLastBatch();
        }
    });

    // --- MODULE 2: IMAGES / VIDEOS FILTER TABS CONTROLLER ---
    if (tabImages && tabVideos) {
        tabImages.addEventListener("click", () => {
            tabImages.classList.add("is-active");
            tabVideos.classList.remove("is-active");
            if (imageGrid) imageGrid.classList.remove("hidden-pane");
            if (videoGrid) videoGrid.classList.add("hidden-pane");
            
            if (loadMoreBtn && !loadMoreBtn.classList.contains("is-inactive")) {
                loadMoreBtn.style.display = "block";
            }
        });

        tabVideos.addEventListener("click", () => {
            tabVideos.classList.add("is-active");
            tabImages.classList.remove("is-active");
            if (videoGrid) videoGrid.classList.remove("hidden-pane");
            if (imageGrid) imageGrid.classList.add("hidden-pane");
            
            closeLightbox();
            if (loadMoreBtn) loadMoreBtn.style.display = "none";
        });
    }

    // --- MODULE 3: MODAL PREVIEW GRID CONTROL INTERACTION ---
    function updateActiveVisibleDeck() {
        if (imageGrid && !imageGrid.classList.contains("hidden-pane")) {
            visibleCards = Array.from(imageGrid.querySelectorAll(".project-media-card:not(.hidden-row)"));
        } else if (videoGrid) {
            visibleCards = Array.from(videoGrid.querySelectorAll(".project-media-card"));
        }
    }

    function updateArrowVisibilityStates() {
        if (!leftArrow || !rightArrow) return;
        
        if (currentIndex === 0) {
            leftArrow.disabled = true;
            leftArrow.classList.add("nav-locked");
        } else {
            leftArrow.disabled = false;
            leftArrow.classList.remove("nav-locked");
        }

        if (currentIndex === visibleCards.length - 1) {
            rightArrow.disabled = true;
            rightArrow.classList.add("nav-locked");
        } else {
            rightArrow.disabled = false;
            rightArrow.classList.remove("nav-locked");
        }
    }

    function displayMediaAtIndex(index) {
        if (index < 0 || index >= visibleCards.length) return;
        
        currentIndex = index;
        const card = visibleCards[currentIndex];
        
        const hasImg = card.querySelector("img");
        const hasVid = card.querySelector("video source") || card.querySelector("video");

        if (hasImg && !card.classList.contains("video-card")) {
            if (lightboxVid) {
                lightboxVid.style.display = "none";
                lightboxVid.src = "";
            }
            if (lightboxImg) {
                lightboxImg.src = hasImg.src;
                lightboxImg.alt = hasImg.alt;
                lightboxImg.style.display = "block";
            }
        } 
        else if (hasVid && lightboxVid) {
            if (lightboxImg) {
                lightboxImg.style.display = "none";
                lightboxImg.src = "";
            }
            lightboxVid.src = hasVid.src || card.querySelector("video").src;
            lightboxVid.style.display = "block";
            lightboxVid.load();
            lightboxVid.play().catch(() => {});
        }

        updateArrowVisibilityStates();
    }

    function openLightbox(index) {
        updateActiveVisibleDeck();
        displayMediaAtIndex(index);
        if (lightbox) lightbox.classList.add("is-visible");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove("is-visible");
        document.body.classList.remove("lightbox-open");
        setTimeout(() => { 
            if (lightboxImg) lightboxImg.src = ""; 
            if (lightboxVid) {
                lightboxVid.pause();
                lightboxVid.src = ""; 
            }
        }, 400); 
    }

    [imageGrid, videoGrid].forEach(grid => {
        if (grid) {
            grid.addEventListener("click", (e) => {
                const clickedCard = e.target.closest(".project-media-card");
                if (!clickedCard || clickedCard.classList.contains("hidden-row")) return;
                
                if (e.target.tagName === "VIDEO") e.preventDefault();
                
                updateActiveVisibleDeck();
                const resolvedIndex = visibleCards.indexOf(clickedCard);
                openLightbox(resolvedIndex);
            });
        }
    });

    if (leftArrow) {
        leftArrow.addEventListener("click", (e) => {
            e.stopPropagation();
            if (currentIndex > 0) displayMediaAtIndex(currentIndex - 1);
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", (e) => {
            e.stopPropagation();
            if (currentIndex < visibleCards.length - 1) displayMediaAtIndex(currentIndex + 1);
        });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!lightbox || !lightbox.classList.contains("is-visible")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft" && currentIndex > 0 && leftArrow) leftArrow.click();
        if (e.key === "ArrowRight" && currentIndex < visibleCards.length - 1 && rightArrow) rightArrow.click();
    });
});