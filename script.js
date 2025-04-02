document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Carousel functionality with dynamic image loading
    const carouselTrack = document.getElementById('carouselTrack');
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-nav');
    
    let currentSlide = 0;
    let slides = [];
    let dots = [];
    let autoSlideInterval;
    let slideWidth = 0;
    
    // Function to load images from the carrusel folder
    async function loadCarouselImages() {
        try {
            const imageFiles = [
                {name: 'image1.webp', alt: 'Commercial door installation'},
                {name: 'image2.webp', alt: 'Residential door repair'},
                {name: 'image3.webp', alt: 'Custom door solution'},
                {name: 'image4.webp', alt: 'Automatic door system'},
                {name: 'image5.webp', alt: 'Door frame repair'},
                {name: 'image6.webp', alt: 'Glass door installation'},
                {name: 'image7.webp', alt: 'Sliding door repair'},
                {name: 'image8.webp', alt: 'Commercial entry doors'},
                {name: 'image9.webp', alt: 'Commercial entry doors'},
                {name: 'image10.webp', alt: 'Commercial entry doors'},
                {name: 'image11.webp', alt: 'Commercial entry doors'},
                {name: 'image12.webp', alt: 'Commercial entry doors'},
                {name: 'image13.webp', alt: 'Commercial entry doors'},
                {name: 'image14.webp', alt: 'Commercial entry doors'},
                {name: 'image15.webp', alt: 'Commercial entry doors'},
                {name: 'image16.webp', alt: 'Commercial entry doors'},
                {name: 'image17.webp', alt: 'Commercial entry doors'},
                {name: 'image18.webp', alt: 'Commercial entry doors'},
                {name: 'image19.webp', alt: 'Commercial entry doors'},
                {name: 'image20.webp', alt: 'Commercial entry doors'}
            ];
            
            // Clear existing content
            carouselTrack.innerHTML = '';
            dotsNav.innerHTML = '';
            slides = [];
            dots = [];
            
            // Create slides and dots for each image
            imageFiles.forEach((file, index) => {
                // Create slide
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.dataset.index = index;
                
                // Create image with vertical photo handling
                const img = document.createElement('img');
                img.src = `./assets/carrusel/${file.name}`;
                img.alt = file.alt;
                img.loading = 'lazy';
                
                // Create caption
                const caption = document.createElement('div');
                caption.className = 'slide-caption';
                caption.textContent = file.alt;
                
                slide.appendChild(img);
                slide.appendChild(caption);
                carouselTrack.appendChild(slide);
                slides.push(slide);
                
                // Create dot indicator
                const dot = document.createElement('button');
                dot.className = 'carousel-indicator';
                dot.dataset.index = index;
                dot.ariaLabel = `Go to slide ${index + 1}`;
                dotsNav.appendChild(dot);
                dots.push(dot);
            });
            
            // Wait for images to load before initializing
            await Promise.all(Array.from(document.querySelectorAll('.carousel-slide img')).map(img => {
                return new Promise(resolve => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.addEventListener('load', resolve);
                        img.addEventListener('error', resolve); // Continue even if some images fail
                    }
                });
            }));
            
            
            // Initialize carousel after images are loaded
            initCarousel();
            
        } catch (error) {
            console.error('Error loading carousel images:', error);
        }
    }
    
    function initCarousel() {
        // Calculate slide width based on container
        slideWidth = carouselTrack.parentElement.getBoundingClientRect().width;
        
        // Arrange slides next to each other
        slides.forEach((slide, index) => {
            slide.style.position = 'absolute';
            slide.style.left = `${slideWidth * index}px`;
            slide.style.width = `${slideWidth}px`;
            slide.style.height = '100%';
        });
        
        // Set carousel track width
        carouselTrack.style.width = `${slideWidth * slides.length}px`;
        carouselTrack.style.height = '100%';
        
        // Move to slide function
        function moveToSlide(targetIndex) {
            currentSlide = targetIndex;
            carouselTrack.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            updateDots();
        }
        
        // Update dots indicator
        function updateDots() {
            dots.forEach(dot => dot.classList.remove('current-slide'));
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('current-slide');
            }
        }
        
        // Next slide
        nextButton.addEventListener('click', function() {
            const nextIndex = (currentSlide + 1) % slides.length;
            moveToSlide(nextIndex);
        });
        
        // Previous slide
        prevButton.addEventListener('click', function() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            moveToSlide(prevIndex);
        });
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetIndex = parseInt(this.dataset.index);
                moveToSlide(targetIndex);
            });
        });
        
        // Auto-advance carousel
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                const nextIndex = (currentSlide + 1) % slides.length;
                moveToSlide(nextIndex);
            }, 5000);
        }
        
        // Pause auto-advance on hover
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carousel.addEventListener('mouseleave', startAutoSlide);
        
        // Initialize first slide and dot as active
        if (slides.length > 0) {
            moveToSlide(0);
            startAutoSlide();
        }
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (slides.length > 0) {
                slideWidth = carouselTrack.parentElement.getBoundingClientRect().width;
                carouselTrack.style.width = `${slideWidth * slides.length}px`;
                slides.forEach((slide, index) => {
                    slide.style.left = `${slideWidth * index}px`;
                });
                moveToSlide(currentSlide);
            }
        }, 250);
    });
    
    // Start loading the carousel images
    loadCarouselImages();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }
});