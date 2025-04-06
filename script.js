document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // Mobile Navigation
    // ====================
    function initMobileNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (!hamburger || !navMenu) return;
        
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        };
        
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ====================
    // Header Scroll Effect
    // ====================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        };
        
        // Use passive event listener for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initialize state
    }

    // ====================
    // Image Carousel
    // ====================
    class ImageCarousel {
        constructor() {
            this.carouselTrack = document.getElementById('carouselTrack');
            this.nextButton = document.querySelector('.carousel-button.next');
            this.prevButton = document.querySelector('.carousel-button.prev');
            this.dotsNav = document.querySelector('.carousel-nav');
            this.carousel = document.querySelector('.carousel');
            
            this.currentSlide = 0;
            this.slides = [];
            this.dots = [];
            this.autoSlideInterval = null;
            this.slideWidth = 0;
            this.resizeTimer = null;
            
            this.imageFiles = [
                {name: 'image29.webp', alt: 'Residential double doors installation'},
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
                {name: 'image1.webp', alt: 'Residential door installation'},
                {name: 'image30.webp', alt: 'Residential single door installation'},
                {name: 'image31.webp', alt: 'Commercial entry door'},
                {name: 'image32.webp', alt: 'Residential double doors installation.'},
                {name: 'image33.webp', alt: 'Residential single door installation.'},
                {name: 'image34.webp', alt: 'Commercial Hallow metal door installation.'},
                {name: 'image36.webp', alt: 'Residential solid wood door installation'},
                {name: 'image37.webp', alt: 'Commercial sliding door'},
                {name: 'image39.webp', alt: 'Commercial 4 1/2 hinge repair'},
                {name: 'image40.webp', alt: 'Commercial 4 1/2 hinge repair'},
                {name: 'image41.webp', alt: 'Commercial cylindrical lock conversion into a mortise lock'},
                {name: 'image42.webp', alt: 'Commercial cylindrical lock conversion into a mortise lock'},
                {name: 'image43.webp', alt: 'Commercial cylindrical lock conversion into a mortise lock'},
                {name: 'image44.webp', alt: 'Frame swing modification from a RH to a LH'},
                {name: 'image45.webp', alt: 'Frame swing modification from a RH to a LH'},
                {name: 'image46.webp', alt: 'Frame swing modification from a RH to a LH'},
            ];
            
            if (this.carouselTrack) {
                this.init();
            }
        }
        
        async init() {
            await this.loadCarouselImages();
            this.setupEventListeners();
        }
        
        async loadCarouselImages() {
            try {
                this.clearCarousel();
                
                this.imageFiles.forEach((file, index) => {
                    this.createSlide(file, index);
                    this.createDot(index);
                });
                
                await this.waitForImagesToLoad();
                this.initCarousel();
                
            } catch (error) {
                console.error('Error loading carousel images:', error);
            }
        }
        
        clearCarousel() {
            this.carouselTrack.innerHTML = '';
            this.dotsNav.innerHTML = '';
            this.slides = [];
            this.dots = [];
        }
        
        createSlide(file, index) {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = `./assets/carrusel/${file.name}`;
            img.alt = file.alt;
            img.loading = 'lazy';
            
            const caption = document.createElement('div');
            caption.className = 'slide-caption';
            caption.textContent = file.alt;
            
            slide.append(img, caption);
            this.carouselTrack.appendChild(slide);
            this.slides.push(slide);
        }
        
        createDot(index) {
            const dot = document.createElement('button');
            dot.className = 'carousel-indicator';
            dot.dataset.index = index;
            dot.ariaLabel = `Go to slide ${index + 1}`;
            this.dotsNav.appendChild(dot);
            this.dots.push(dot);
        }
        
        async waitForImagesToLoad() {
            await Promise.all(
                Array.from(document.querySelectorAll('.carousel-slide img')).map(img => 
                    img.complete 
                        ? Promise.resolve() 
                        : new Promise(resolve => {
                            img.addEventListener('load', resolve, { once: true });
                            img.addEventListener('error', resolve, { once: true });
                        })
            ));
        }
        
        initCarousel() {
            this.slideWidth = this.carouselTrack.parentElement.getBoundingClientRect().width;
            
            this.slides.forEach((slide, index) => {
                slide.style.position = 'absolute';
                slide.style.left = `${this.slideWidth * index}px`;
                slide.style.width = `${this.slideWidth}px`;
                slide.style.height = '100%';
            });
            
            this.carouselTrack.style.width = `${this.slideWidth * this.slides.length}px`;
            this.carouselTrack.style.height = '100%';
            
            this.moveToSlide(0);
            this.startAutoSlide();
        }
        
        moveToSlide(targetIndex) {
            this.currentSlide = targetIndex;
            this.carouselTrack.style.transform = `translateX(-${this.slideWidth * this.currentSlide}px)`;
            this.updateDots();
        }
        
        updateDots() {
            this.dots.forEach(dot => dot.classList.remove('current-slide'));
            if (this.dots[this.currentSlide]) {
                this.dots[this.currentSlide].classList.add('current-slide');
            }
        }
        
        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
        
        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
            }
        }
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.moveToSlide(nextIndex);
        }
        
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.moveToSlide(prevIndex);
        }
        
        handleResize() {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                if (this.slides.length > 0) {
                    this.slideWidth = this.carouselTrack.parentElement.getBoundingClientRect().width;
                    this.carouselTrack.style.width = `${this.slideWidth * this.slides.length}px`;
                    this.slides.forEach((slide, index) => {
                        slide.style.left = `${this.slideWidth * index}px`;
                    });
                    this.moveToSlide(this.currentSlide);
                }
            }, 250);
        }
        
        setupEventListeners() {
            this.nextButton?.addEventListener('click', () => this.nextSlide());
            this.prevButton?.addEventListener('click', () => this.prevSlide());
            
            this.dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const targetIndex = parseInt(dot.dataset.index);
                    this.moveToSlide(targetIndex);
                });
            });
            
            this.carousel?.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.carousel?.addEventListener('mouseleave', () => this.startAutoSlide());
            
            window.addEventListener('resize', () => this.handleResize());
        }
    }

    // ====================
    // Testimonials Slider
    // ====================
    class TestimonialsSlider {
        constructor() {
            this.track = document.querySelector('.testimonials-track');
            this.cards = Array.from(document.querySelectorAll('.testimonial-card'));
            this.prevBtn = document.querySelector('.slider-prev');
            this.nextBtn = document.querySelector('.slider-next');
            this.currentIndex = 0;
            this.cardWidth = 0;
            this.isAnimating = false;
    
            if (this.track && this.cards.length > 0) {
                this.init();
            }
        }
    
        init() {
            this.setupSlider();
            this.setupEventListeners();
            this.updateSlider();
    
            window.addEventListener('resize', () => {
                this.setupSlider();
                this.updateSlider();
            });
        }
    
        setupSlider() {
            // Calcular el ancho del contenedor
            const containerWidth = this.track.parentElement.clientWidth;
            
            // Establecer el ancho de cada tarjeta (80% del contenedor con máximo de 600px)
            this.cardWidth = Math.min(containerWidth * 0.8, 600);
            
            // Aplicar estilos a las tarjetas
            this.cards.forEach(card => {
                card.style.width = `${this.cardWidth}px`;
                card.style.flexShrink = '0';
            });
    
            // Configurar el track
            this.track.style.display = 'flex';
            this.track.style.gap = '32px';
            this.track.style.transition = 'transform 0.5s ease';
        }
    
        updateSlider() {
            if (this.isAnimating) return;
            this.isAnimating = true;
    
            // Calcular la posición de desplazamiento
            const scrollPosition = this.currentIndex * (this.cardWidth + 32);
            
            // Centrar la tarjeta actual
            const containerWidth = this.track.parentElement.clientWidth;
            const offset = (containerWidth - this.cardWidth) / 2 - (this.currentIndex * 32);
            
            this.track.style.transform = `translateX(calc(-${scrollPosition}px + ${offset}px))`;
    
            // Actualizar estado de los botones
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentIndex === 0;
            }
            if (this.nextBtn) {
                this.nextBtn.disabled = this.currentIndex >= this.cards.length - 1;
            }
    
            // Resetear flag de animación
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
    
        nextSlide() {
            if (this.currentIndex < this.cards.length - 1) {
                this.currentIndex++;
                this.updateSlider();
            }
        }
    
        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateSlider();
            }
        }
    
        setupEventListeners() {
            this.prevBtn?.addEventListener('click', () => this.prevSlide());
            this.nextBtn?.addEventListener('click', () => this.nextSlide());
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        new TestimonialsSlider();
    });

    // Initialize all components
    initMobileNavigation();
    initHeaderScroll();
    new ImageCarousel();
    new TestimonialsSlider();
});