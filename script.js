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
                {name: 'image1.webp', alt: 'Residential door installation'},
                {name: 'image2.webp', alt: 'Commercial door installation'},
                {name: 'image3.webp', alt: 'Elevator door lobby'},
                {name: 'image4.webp', alt: 'Finish solid core door with a timely frame and a panic.'},
                {name: 'image5.webp', alt: 'Storm exterior door'},
                {name: 'image6.webp', alt: 'Residential double doors'},
                {name: 'image7.webp', alt: 'Commercial hallow metal double doors'},
                {name: 'image8.webp', alt: 'Commercial full lite door with glass'},
                {name: 'image9.webp', alt: 'Aluminum frame with a finish door'},
                {name: 'image10.webp', alt: 'Residential door replacement with a storm door.'},
                {name: 'image11.webp', alt: 'Residential door replacement with a storm door.'},
                {name: 'image12.webp', alt: 'Preparation for door panic with lever'},
                {name: 'image13.webp', alt: 'Preparation for door panic with lever'},
                {name: 'image14.webp', alt: 'Commercial door frame and full lite door with glass.'},
                {name: 'image15.webp', alt: 'Single door installation'},
                {name: 'image16.webp', alt: 'Cylindrical door lock installation'},
                {name: 'image17.webp', alt: 'Commercial full lite  door with a timely frame'},
                {name: 'image18.webp', alt: 'Security  commercial gate and hardware'},
                {name: 'image19.webp', alt: 'Aluminum window installation'},
                {name: 'image20.webp', alt: 'Commercial entry doors'},
                {name: 'image21.webp', alt: 'Mortise door lock installation'},
                {name: 'image22.webp', alt: 'Privacy lock installation'},
                {name: 'image23.webp', alt: 'Mortise door lock installation'},
                {name: 'image24.webp', alt: 'Residential solid wood double doors'},
                {name: 'image25.webp', alt: 'Residential sliding door installation.'},
                {name: 'image26.webp', alt: 'Residential wood door with sidelights'},
                {name: 'image27.webp', alt: 'Residential solid wood double doors'},
                {name: 'image28.webp', alt: 'Commercial entry doors'},
                {name: 'image29.webp', alt: 'Residential double doors installation'},
                {name: 'image30.webp', alt: 'Residential single door installation'},
                {name: 'image31.webp', alt: 'Commercial entry door'},
                {name: 'image32.webp', alt: 'Residential double doors installation.'},
                {name: 'image33.webp', alt: 'Residential single door installation.'},
                {name: 'image34.webp', alt: 'Commercial Hallow metal door installation.'},
                {name: 'image36.webp', alt: 'Residential solid wood door installation'},
                {name: 'image37.webp', alt: 'Commercial sliding door'},
                {name: 'image38.webp', alt: 'Commercial sliding door'},
                {name: 'image39.webp', alt: 'Commercial sliding door'},
                {name: 'image40.webp', alt: 'Commercial sliding door'},
                {name: 'image41.webp', alt: 'Commercial sliding door'},
                {name: 'image42.webp', alt: 'Commercial sliding door'},
                {name: 'image43.webp', alt: 'Commercial sliding door'},
                {name: 'image44.webp', alt: 'Commercial sliding door'},
                {name: 'image45.webp', alt: 'Commercial sliding door'},
                {name: 'image46.webp', alt: 'Commercial sliding door'},
                
                

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
    
    // // Form submission
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         alert('Thank you for your message! We will contact you soon.');
    //         this.reset();
    //     });
    // }

    

});

  /* Testimonials Section */

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentIndex = 0;
    let visibleCards = getVisibleCards();
    let totalSlides = Math.ceil(cards.length / visibleCards);
    
    // Función para calcular cards visibles
    function getVisibleCards() {
      return window.innerWidth >= 992 ? 2 : 1;
    }
    
    // Función para actualizar totalSlides cuando cambia el tamaño
    function updateTotalSlides() {
      visibleCards = getVisibleCards();
      totalSlides = Math.ceil(cards.length / visibleCards);
      createDots();
      updateSlider();
    }
    
    // Crear dots basado en totalSlides
    function createDots() {
      dotsContainer.innerHTML = ''; // Limpiar dots existentes
      
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i * visibleCards));
        dotsContainer.appendChild(dot);
      }
    }
    
    function updateSlider() {
      const cardWidth = cards[0].offsetWidth + (window.innerWidth >= 992 ? 32 : 0);
      track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      
      // Actualizar dots
      const dots = document.querySelectorAll('.slider-dots button');
      const currentDot = Math.floor(currentIndex / visibleCards);
      
      dots.forEach((dot, index) => {
        dot.setAttribute('aria-selected', index === currentDot);
      });
      
      // Deshabilitar botones cuando corresponda
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= cards.length - visibleCards;
    }
    
    function nextSlide() {
      if (currentIndex < cards.length - visibleCards) {
        currentIndex += visibleCards;
        // Asegurarnos de no pasar el límite
        if (currentIndex > cards.length - visibleCards) {
          currentIndex = cards.length - visibleCards;
        }
        updateSlider();
      }
    }
    
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex -= visibleCards;
        if (currentIndex < 0) currentIndex = 0;
        updateSlider();
      }
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Redimensionamiento de ventana
    window.addEventListener('resize', function() {
      const prevVisibleCards = visibleCards;
      updateTotalSlides();
      
      // Ajustar currentIndex si es necesario
      if (prevVisibleCards !== visibleCards) {
        currentIndex = Math.floor(currentIndex / prevVisibleCards) * visibleCards;
        if (currentIndex > cards.length - visibleCards) {
          currentIndex = Math.max(0, cards.length - visibleCards);
        }
      }
      
      updateSlider();
    });
    
    // Inicializar
    updateTotalSlides();
  });