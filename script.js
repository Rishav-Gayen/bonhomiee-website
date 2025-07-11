
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const cards = carousel.querySelectorAll('.card');
            const prev = carousel.querySelector('.prev');
            const next = carousel.querySelector('.next');
            const dots = carousel.querySelectorAll('.dot');
            let currentIndex = 0;

            function updateCarousel() {
                cards.forEach(card => card.classList.remove('active'));
                cards[currentIndex].classList.add('active');
                if (dots.length) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[currentIndex].classList.add('active');
                }
            }

            next.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCarousel();
            });

            prev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateCarousel();
            });

            if (dots.length) {
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                    });
                });
            }

            updateCarousel();
        });

document.addEventListener("DOMContentLoaded", function () {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", function () {
            const item = this.parentElement;

            // Close all items
            document.querySelectorAll(".accordion-item").forEach(i => {
                if (i !== item) {
                    i.classList.remove("active");
                }
            });

            // Toggle the clicked item
            item.classList.toggle("active");
        });
    });



            const hamburger = document.querySelector('.hamburger');
            const navUl = document.querySelector('nav ul');

            hamburger.addEventListener('click', () => {
                navUl.classList.toggle('active');
            });

            navUl.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navUl.classList.remove('active');
                });
            });
        });


        document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel functionality for Team Section ---
    const carouselTrack = document.querySelector('.carousel-track');
    const teamCards = document.querySelectorAll('.team-member-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Safety check - exit if required elements don't exist
    if (!carouselTrack || !teamCards.length || !prevButton || !nextButton || !dotsContainer) {
        console.warn('Carousel elements not found');
        return;
    }

    let currentIndex = 0;
    let cardsPerView = 1; // Start with 1 for safety
    let totalCards = teamCards.length;

    // Debounce function to limit resize event frequency
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Function to update cardsPerView based on screen size
    const updateCardsPerView = () => {
        const width = window.innerWidth;
        
        if (width <= 480) {
            cardsPerView = 1; // Mobile phones
        } else if (width <= 768) {
            cardsPerView = 1; // Tablets portrait
        } else if (width <= 992) {
            cardsPerView = 2; // Tablets landscape
        } else if (width <= 1200) {
            cardsPerView = 3; // Small desktops
        } else {
            cardsPerView = 3; // Large desktops
        }

        // Ensure currentIndex doesn't exceed bounds
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateCarousel();
        createDots();
    };

    // Initialize dots based on the number of pages
    const createDots = () => {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = ''; // Clear existing dots
        const numPages = Math.ceil(totalCards / cardsPerView);
        
        // Only create dots if we have more than one page
        if (numPages <= 1) return;
        
        for (let i = 0; i < numPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-page', i);
            
            // Calculate which page the current index belongs to
            const currentPage = Math.floor(currentIndex / cardsPerView);
            if (i === currentPage) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                const targetIndex = i * cardsPerView;
                // Ensure we don't exceed the maximum valid index
                currentIndex = Math.min(targetIndex, totalCards - cardsPerView);
                updateCarousel();
            });
            
            dotsContainer.appendChild(dot);
        }
    };

    // Function to update the carousel's display
    const updateCarousel = () => {
        if (!carouselTrack || !teamCards.length) return;
        
        // Get the actual width of a card including margins
        const cardStyle = window.getComputedStyle(teamCards[0]);
        const cardWidth = teamCards[0].offsetWidth;
        const marginRight = parseFloat(cardStyle.marginRight) || 0;
        const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
        const totalCardWidth = cardWidth + marginRight + marginLeft;
        
        // Calculate the translation distance
        const translateX = currentIndex * totalCardWidth;
        
        // Apply the transformation
        carouselTrack.style.transform = `translateX(-${translateX}px)`;
        
        // Update button states
        updateButtonStates();
        updateDots();
    };

    // Function to update button disabled states
    const updateButtonStates = () => {
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        
        // Disable prev button at start
        prevButton.disabled = currentIndex <= 0;
        prevButton.style.opacity = currentIndex <= 0 ? '0.5' : '1';
        
        // Disable next button at end
        nextButton.disabled = currentIndex >= maxIndex;
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    };

    // Function to update active dot
    const updateDots = () => {
        const dots = document.querySelectorAll('.dot');
        const currentPage = Math.floor(currentIndex / cardsPerView);
        
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Function to go to next slide
    const goToNext = () => {
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        
        if (currentIndex < maxIndex) {
            currentIndex += 1;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    };

    // Function to go to previous slide
    const goToPrev = () => {
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = maxIndex; // Loop to end
        }
        updateCarousel();
    };

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', goToNext);
    prevButton.addEventListener('click', goToPrev);

    // Accordion functionality
    document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    let activeItem = null;

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // If clicking the currently active item, close it
            if (item === activeItem) {
                item.classList.remove('active');
                activeItem = null;
                return;
            }
            
            // Close the previously active item
            if (activeItem) {
                activeItem.classList.remove('active');
            }
            
            // Open the clicked item
            item.classList.add('active');
            activeItem = item;
        });
    });

    // Close all when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.accordion-item')) {
            if (activeItem) {
                activeItem.classList.remove('active');
                activeItem = null;
            }
        }
    });
});

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;

    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent scrolling
    });

    carouselTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Minimum swipe distance
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                goToNext(); // Swipe left - go to next
            } else {
                goToPrev(); // Swipe right - go to previous
            }
        }
        
        isDragging = false;
    });

    // Initial setup on page load
    updateCardsPerView();
    
    // Debounced resize listener
    const debouncedResize = debounce(updateCardsPerView, 250);
    window.addEventListener('resize', debouncedResize);


    // Font awesome

    
})
  