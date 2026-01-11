document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================================
    // 1. UTILITY FUNCTION: START COUNT ANIMATION
    // (Used by the Legacy Grid numbers: 45+ and 10K+)
    // =======================================================
    function startCount(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2500; // 2.5 seconds animation duration
        let start = 0;
        const isK = el.textContent.includes('K+'); // Check for 10K+ format

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            let currentValue = Math.floor(percentage * target);

            if (isK) {
                el.textContent = `${currentValue}K+`;
            } else {
                el.textContent = `${currentValue}+`;
            }

            // Continue the animation loop until 100% is reached
            if (percentage < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // =======================================================
    // 2. SLIDER HOVER PAUSE (If woodSlider exists and Bootstrap is available)
    // =======================================================
    const sliderElement = document.getElementById('woodSlider');
    if (sliderElement && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
        const woodSlider = new bootstrap.Carousel(sliderElement);
        sliderElement.addEventListener('mouseenter', () => woodSlider.pause());
        sliderElement.addEventListener('mouseleave', () => woodSlider.cycle());
    }


    // =======================================================
    // 3. COUNT-UP ANIMATION TRIGGER (For Legacy Grid Stats)
    // =======================================================
    const legacyCounterElements = document.querySelectorAll('.stat-number-large');
    let legacyAnimationStarted = false;
    
    // Intersection Observer to run animation only when the section comes into view
    const legacyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !legacyAnimationStarted) {
                legacyCounterElements.forEach(startCount);
                legacyAnimationStarted = true;
                // Stop observing once animation has run
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.4 }); 

    const legacyStatSection = document.querySelector('.legacy-grid-section');
    if (legacyStatSection) {
        legacyObserver.observe(legacyStatSection);
    }
    
    
    // =======================================================
    // 4. MOBILE TAP 3D FLIP FUNCTIONALITY (For Flip Cards)
    // =======================================================
    const flipCards = document.querySelectorAll('.flip-card-container');

    flipCards.forEach(container => {
        
        // Handle click/tap events for all devices
        container.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            // Toggle the 'flipped' class on click/tap
            this.classList.toggle('flipped');
        });
        
        // Optional: Add a brief timeout on touch devices to reset the card
        // This makes it feel like a quick interaction rather than a permanent flip.
        container.addEventListener('touchend', function() {
            // Check if the card is flipped and reset after a short delay
            if (this.classList.contains('flipped')) {
                 setTimeout(() => {
                     this.classList.remove('flipped');
                 }, 3000); // 3 second display time before resetting
            }
        });
        
        // Note: For desktop, the flip is primarily handled by the :hover CSS rule.
        // The JS click/tap handles the mobile/touch scenario.
    });
});

