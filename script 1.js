 document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelector('.slides');
            const slideItems = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dots = document.querySelectorAll('.dot');
            
            let currentSlide = 0;
            const slideCount = slideItems.length;
            
            function goToSlide(slideIndex) {
                if (slideIndex < 0) {
                    slideIndex = slideCount - 1;
                } else if (slideIndex >= slideCount) {
                    slideIndex = 0;
                }
                
                slides.style.transform = `translateX(-${slideIndex * 100}%)`;
                currentSlide = slideIndex;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
            
            prevBtn.addEventListener('click', function() {
                goToSlide(currentSlide - 1);
            });
            
            nextBtn.addEventListener('click', function() {
                goToSlide(currentSlide + 1);
            });
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
            });
            
            let slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
            
            const slider = document.querySelector('.slider');
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 5000);
            });

            const animateElements = document.querySelectorAll('.animate-on-scroll');
            
            function checkScroll() {
                animateElements.forEach((element) => {
                    const elementTop = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementTop < windowHeight - 100) {
                        element.classList.add('animated');
                    }
                });
            }
            
            checkScroll();

            window.addEventListener('scroll', checkScroll);
        });