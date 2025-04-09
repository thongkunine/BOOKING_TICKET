// Sample event data
let events = [];
let currentSlide = 0;
let slideInterval;

// Sample data for carousel cards
const carouselData = [
    {
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "20/07",
        category: "Âm nhạc",
        title: "Live Concert Rock Nation",
        time: "19:00 - 23:00",
        location: "Hard Rock Cafe",
        price: "400.000đ - 1.200.000đ"
    },
    {
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "25/07",
        category: "Nghệ thuật",
        title: "Light Festival 2024",
        time: "18:00 - 22:00",
        location: "Phố đi bộ Nguyễn Huệ",
        price: "250.000đ"
    },
    {
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "15/08",
        category: "Công nghệ",
        title: "Tech Conference 2024",
        time: "08:30 - 17:30",
        location: "White Palace Convention Center",
        price: "1.900.000đ"
    },
    {
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "30/08",
        category: "Thể thao",
        title: "Marathon Quốc tế Hà Nội",
        time: "05:00 - 12:00",
        location: "Quảng trường Ba Đình",
        price: "500.000đ - 1.000.000đ"
    },
    {
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "10/09",
        category: "Ẩm thực",
        title: "Food Festival 2024",
        time: "10:00 - 22:00",
        location: "Công viên Thống Nhất",
        price: "200.000đ"
    },
    {
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "22/09",
        category: "Văn hóa",
        title: "Lễ hội Trung thu",
        time: "18:00 - 22:00",
        location: "Phố cổ Hà Nội",
        price: "Miễn phí"
    },
    {
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "05/10",
        category: "Giáo dục",
        title: "Hội thảo Giáo dục 4.0",
        time: "08:00 - 17:00",
        location: "Trung tâm Hội nghị Quốc gia",
        price: "1.500.000đ"
    },
    {
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "15/10",
        category: "Thời trang",
        title: "Vietnam Fashion Week",
        time: "19:00 - 22:00",
        location: "Nhà hát lớn Hà Nội",
        price: "2.000.000đ"
    }
];

// Fetch events data
async function fetchEvents() {
    try {
        const response = await fetch('images/events.json');
        const data = await response.json();
        events = data.featured_events;
        renderEvents();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Generate carousel cards first
    generateCarouselCards();
    
    // Then initialize other components
    initHeroSlider();
    fetchEvents();
    initEventFilters();
    initModals();
    initMobileMenu();
    initScrollHeader();
    initEventsCarousel();
    initFilterTabsScroll();
    initEventFiltersScroll();
    initTopicTagsCarousel();
    initCategoryCarousels();
    initCalendarFilters();
    initVenueCards();
    initBlogCards();
    initAppButtons();
    initLazyLoading();
    initNewsletterForm();
    userAuth.init();
    cartManager.init();
    
    // Initialize seat selector if on event detail page
    const seatContainer = document.getElementById('seat-selection');
    if (seatContainer) {
        seatSelector.init('seat-selection', 100, {
            0: 200000, // Regular seats
            1: 300000, // Premium seats
            2: 500000  // VIP seats
        });
    }

    // Initialize all carousel dots
    initAllCarouselDots();

    // Run auth check when page loads
    checkAuth();
});

// Hero Carousel
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let isAnimating = false;
    let autoSlideInterval;

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }

    // Event listeners for navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        }
    });

    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isAnimating) {
                showSlide(currentSlide + 1);
            }
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Pause auto slide on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        heroSection.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Initialize first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
        startAutoSlide();
    }
});

// Render Events
function renderEvents(filter = 'all') {
    const eventGrid = document.querySelector('.event-grid');
    eventGrid.innerHTML = '';

    const filteredEvents = filter === 'all' 
        ? events 
        : events.filter(event => event.category === filter);

    filteredEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="images/${event.image}" alt="${event.title}">
                <div class="event-date">${event.date}</div>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p class="event-price">${event.price}</p>
                <p class="event-description">${event.description}</p>
                <button class="btn btn-primary" onclick="bookEvent(${event.id})">Đặt vé</button>
            </div>
        `;
        eventGrid.appendChild(eventCard);
    });
}

// Event Filters
function initEventFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEvents(btn.dataset.filter);
        });
    });
}

// Modals
function initModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Mobile Menu
const mobileMenu = {
    button: document.querySelector('.mobile-menu-btn'),
    nav: document.querySelector('.nav-links'),
    navRight: document.querySelector('.nav-right'),
    isOpen: false,

    init() {
        if (this.button) {
            this.button.addEventListener('click', () => this.toggle());
        }
    },

    toggle() {
        this.isOpen = !this.isOpen;
        this.button.classList.toggle('active');
        this.nav.classList.toggle('show');
        this.navRight.classList.toggle('active');
        
        if (this.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
};

// Scroll Header
function initScrollHeader() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Book Event
function bookEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        showToast(`Đã thêm "${event.title}" vào giỏ hàng`);
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Search Functionality
const search = {
    input: document.querySelector('.search-input'),
    filters: document.querySelectorAll('.filter-select'),
    button: document.querySelector('.search-btn'),

    init() {
        if (this.button) {
            this.button.addEventListener('click', () => this.performSearch());
        }

        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    },

    performSearch() {
        const query = this.input.value;
        const filters = Array.from(this.filters).map(filter => filter.value);
        
        // Here you would typically make an API call with the search parameters
        console.log('Searching for:', query, 'with filters:', filters);
    }
};

// Events Carousel
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.events-slider');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const slideWidth = 325; // card width (300) + gap (25)
    const slidesPerView = Math.floor(slider.clientWidth / slideWidth);
    const totalSlides = slider.children.length;
    const maxSlide = totalSlides - slidesPerView;
    
    // Initialize
    updateCarousel();
    updateDots();
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
            updateDots();
        }
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
            updateDots();
        }
    });
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            updateDots();
        });
    });
    
    // Update carousel position
    function updateCarousel() {
        const offset = -currentSlide * slideWidth;
        slider.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === maxSlide ? '0.5' : '1';
    }
    
    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto slide every 5 seconds
    let autoSlideInterval = setInterval(autoSlide, 5000);
    
    function autoSlide() {
        if (currentSlide < maxSlide) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateCarousel();
        updateDots();
    }
    
    // Pause auto slide on hover
    const carousel = document.querySelector('.events-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(autoSlide, 5000);
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesPerView = Math.floor(slider.clientWidth / slideWidth);
            const newMaxSlide = totalSlides - newSlidesPerView;
            if (currentSlide > newMaxSlide) {
                currentSlide = newMaxSlide;
                updateCarousel();
            }
        }, 100);
    });
});

// Filter buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value (text content without the icon)
            const filterValue = this.textContent.trim();
            
            // Here you can add logic to filter the events based on the selected category
            console.log('Selected category:', filterValue);
            
            // Example: Filter events (you can customize this based on your needs)
            const events = document.querySelectorAll('.event-card');
            events.forEach(event => {
                const category = event.getAttribute('data-category');
                if (filterValue === 'Tất cả' || category === filterValue) {
                    event.style.display = 'block';
                } else {
                    event.style.display = 'none';
                }
            });
        });
    });
});

// Handle filter tabs scrolling
function initFilterTabsScroll() {
    const filterTabs = document.querySelector('.filter-tabs');
    
    function updateOverflowIndicators() {
        const hasLeftOverflow = filterTabs.scrollLeft > 0;
        const hasRightOverflow = (filterTabs.scrollWidth - filterTabs.clientWidth) > filterTabs.scrollLeft;
        
        filterTabs.classList.toggle('has-overflow-left', hasLeftOverflow);
        filterTabs.classList.toggle('has-overflow-right', hasRightOverflow);
    }
    
    // Update on scroll
    filterTabs.addEventListener('scroll', updateOverflowIndicators);
    
    // Update on window resize
    window.addEventListener('resize', updateOverflowIndicators);
    
    // Initial check
    updateOverflowIndicators();
    
    // Optional: Add keyboard navigation
    filterTabs.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            filterTabs.scrollBy({ left: -100, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            filterTabs.scrollBy({ left: 100, behavior: 'smooth' });
        }
    });
}

// Handle event filters scrolling
function initEventFiltersScroll() {
    const eventFilters = document.querySelector('.event-filters');
    
    function updateOverflowIndicators() {
        const hasLeftOverflow = eventFilters.scrollLeft > 0;
        const hasRightOverflow = (eventFilters.scrollWidth - eventFilters.clientWidth) > eventFilters.scrollLeft;
        
        eventFilters.classList.toggle('has-overflow-left', hasLeftOverflow);
        eventFilters.classList.toggle('has-overflow-right', hasRightOverflow);
    }
    
    // Update on scroll
    eventFilters.addEventListener('scroll', updateOverflowIndicators);
    
    // Update on window resize
    window.addEventListener('resize', updateOverflowIndicators);
    
    // Initial check
    updateOverflowIndicators();
    
    // Optional: Add keyboard navigation
    eventFilters.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            eventFilters.scrollBy({ left: -100, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            eventFilters.scrollBy({ left: 100, behavior: 'smooth' });
        }
    });
}

// Initialize category event carousels
function initCategoryCarousels() {
    const categoryCarousels = document.querySelectorAll('.category-events .events-carousel');
    
    categoryCarousels.forEach(carousel => {
        const slider = carousel.querySelector('.events-slider');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dots = carousel.querySelectorAll('.dot');
        
        let currentSlide = 0;
        const slideWidth = 320; // card width (300) + gap (20)
        const slidesPerView = Math.floor(slider.clientWidth / slideWidth);
        const totalSlides = slider.children.length;
        const maxSlide = Math.max(0, Math.ceil(totalSlides - slidesPerView));
        
        // Initialize
        updateCarousel();
        updateDots();
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
                updateDots();
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateCarousel();
                updateDots();
            }
        });
        
        // Dot click
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
                updateDots();
            });
        });
        
        // Update carousel position
        function updateCarousel() {
            const offset = -currentSlide * slideWidth;
            slider.style.transform = `translateX(${offset}px)`;
            
            // Update button states
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentSlide === maxSlide ? '0.5' : '1';
        }
        
        // Update dots
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === Math.floor(currentSlide / 2));
            });
        }
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newSlidesPerView = Math.floor(slider.clientWidth / slideWidth);
                const newMaxSlide = Math.max(0, Math.ceil(totalSlides - newSlidesPerView));
                if (currentSlide > newMaxSlide) {
                    currentSlide = newMaxSlide;
                    updateCarousel();
                }
            }, 100);
        });
    });
}

// Event Carousel
class EventCarousel {
    constructor(element) {
        this.container = element;
        this.slider = element.querySelector('.events-slider');
        this.cards = element.querySelectorAll('.event-card');
        this.dots = element.querySelectorAll('.dot');
        this.currentIndex = 0;
        this.cardWidth = this.cards[0]?.offsetWidth || 0;
        this.gap = 20;
        this.visibleCards = Math.floor(this.container.offsetWidth / (this.cardWidth + this.gap));
        
        this.init();
    }

    init() {
        if (this.cards.length > this.visibleCards) {
            this.bindEvents();
            this.updateDots();
        }
    }

    slideTo(index) {
        const maxIndex = Math.ceil(this.cards.length / this.visibleCards) - 1;
        this.currentIndex = Math.min(Math.max(index, 0), maxIndex);
        
        const translateX = -(this.currentIndex * (this.cardWidth + this.gap) * this.visibleCards);
        this.slider.style.transform = `translateX(${translateX}px)`;
        
        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    bindEvents() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.slideTo(index));
        });

        window.addEventListener('resize', () => {
            this.cardWidth = this.cards[0].offsetWidth;
            this.visibleCards = Math.floor(this.container.offsetWidth / (this.cardWidth + this.gap));
            this.slideTo(this.currentIndex);
        });
    }
}

// Sticky Header
const header = {
    element: document.querySelector('.header'),
    offset: 100,
    scrolled: false,

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    },

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > this.offset && !this.scrolled) {
            this.element.classList.add('scrolled');
            this.scrolled = true;
        } else if (currentScroll <= this.offset && this.scrolled) {
            this.element.classList.remove('scrolled');
            this.scrolled = false;
        }
    }
};

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
}

// Calendar Filters
function initCalendarFilters() {
    const filters = document.querySelectorAll('.calendar-filter');
    const events = document.querySelectorAll('.calendar-event');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const filterValue = filter.textContent.trim();
            
            // Filter events based on selected time period
            events.forEach(event => {
                const eventDate = new Date(event.getAttribute('data-date'));
                const today = new Date();
                
                switch(filterValue) {
                    case 'Hôm nay':
                        event.style.display = isSameDay(eventDate, today) ? 'flex' : 'none';
                        break;
                    case 'Tuần này':
                        event.style.display = isThisWeek(eventDate) ? 'flex' : 'none';
                        break;
                    case 'Tháng này':
                        event.style.display = isSameMonth(eventDate, today) ? 'flex' : 'none';
                        break;
                    default:
                        event.style.display = 'flex';
                }
            });
        });
    });
}

// Date helper functions
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
}

function isThisWeek(date) {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return date >= firstDay && date <= lastDay;
}

function isSameMonth(date1, date2) {
    return date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
}

// Venue Cards Animation
function initVenueCards() {
    const venueCards = document.querySelectorAll('.venue-card');
    
    venueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Blog Cards
function initBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const image = card.querySelector('img');
        const readMore = card.querySelector('.read-more');
        
        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            readMore.style.gap = '10px';
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            readMore.style.gap = '5px';
        });
    });
}

// App Download Buttons Animation
function initAppButtons() {
    const appButtons = document.querySelectorAll('.app-btn');
    
    appButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Newsletter form submission
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically make an API call to subscribe the user
            console.log('Newsletter subscription for:', email);
            
            // Show success message
            const successMessage = this.querySelector('.newsletter-success');
            if (successMessage) {
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }
            
            // Clear the form
            this.reset();
        });
    }
}

// Carousel Dot Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all carousels
    const carousels = document.querySelectorAll('.events-carousel');
    
    carousels.forEach(carousel => {
        const slider = carousel.querySelector('.events-slider');
        const dots = carousel.querySelectorAll('.dot');
        const cards = carousel.querySelectorAll('.event-card');
        const cardWidth = cards[0].offsetWidth;
        let currentSlide = 0;
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all dots
                dots.forEach(d => d.classList.remove('active'));
                // Add active class to clicked dot
                dot.classList.add('active');
                
                // Calculate slide position
                const slidePosition = -index * cardWidth;
                slider.style.transform = `translateX(${slidePosition}px)`;
                currentSlide = index;
            });
        });
    });
});

// User Authentication
const userAuth = {
    init() {
        this.checkLoginStatus();
        this.bindEvents();
    },

    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userMenu = document.querySelector('.user-menu');
        const authButtons = document.querySelector('.auth-buttons');
        const buyTicketBtns = document.querySelectorAll('.btn-primary');
        const createEventBtn = document.querySelector('.create-event-btn');

        if (isLoggedIn) {
            // Hiển thị menu người dùng
            if (userMenu) userMenu.style.display = 'block';
            if (authButtons) authButtons.style.display = 'none';
            
            // Kích hoạt nút mua vé
            buyTicketBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('disabled');
                btn.removeEventListener('click', showLoginPrompt);
            });

            // Hiển thị nút tạo sự kiện nếu có
            if (createEventBtn) createEventBtn.style.display = 'block';
            
            // Cập nhật thông tin người dùng
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                this.updateUserInfo(user);
            }
        } else {
            // Ẩn menu người dùng
            if (userMenu) userMenu.style.display = 'none';
            if (authButtons) authButtons.style.display = 'flex';
            
            // Vô hiệu hóa nút mua vé
            buyTicketBtns.forEach(btn => {
                btn.disabled = true;
                btn.classList.add('disabled');
                btn.addEventListener('click', showLoginPrompt);
            });

            // Ẩn nút tạo sự kiện
            if (createEventBtn) createEventBtn.style.display = 'none';
        }
    },

    updateUserInfo(user) {
        const userAvatar = document.querySelector('.user-avatar');
        const userName = document.querySelector('.user-name');
        const userEmail = document.querySelector('.user-email');
        
        if (userAvatar && user.avatar) {
            userAvatar.src = user.avatar;
        }
        
        if (userName && user.name) {
            userName.textContent = user.name;
        }

        if (userEmail && user.email) {
            userEmail.textContent = user.email;
        }
    },

    bindEvents() {
        // Handle login form submission
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Simulate login
                const mockUser = {
                    id: Date.now(),
                    name: 'Nguyễn Văn A',
                    email: email,
                    avatar: 'images/avatar.jpg'
                };
                
                localStorage.setItem('userData', JSON.stringify(mockUser));
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            });
        }

        // Handle logout
        const logoutButton = document.querySelector('.text-danger');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userData');
                window.location.href = 'index.html';
            });
        }
    }
};

// Cart Management
const cartManager = {
    cart: [],

    init() {
        this.loadCart();
        this.bindEvents();
    },

    loadCart() {
        const savedCart = localStorage.getItem('userCart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
    },

    saveCart() {
        localStorage.setItem('userCart', JSON.stringify(this.cart));
    },

    addToCart(eventId, seats) {
        if (!userAuth.currentUser) {
            showLoginPrompt();
            return false;
        }

        this.cart.push({
            eventId,
            seats,
            timestamp: new Date().toISOString()
        });
        this.saveCart();
        return true;
    },

    removeFromCart(eventId) {
        this.cart = this.cart.filter(item => item.eventId !== eventId);
        this.saveCart();
    },

    checkout() {
        if (this.cart.length === 0) return;

        // Move items from cart to tickets
        const userTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
        const newTickets = this.cart.map(item => ({
            ...item,
            purchaseDate: new Date().toISOString(),
            status: 'active'
        }));

        userTickets.push(...newTickets);
        localStorage.setItem('userTickets', JSON.stringify(userTickets));

        // Clear cart
        this.cart = [];
        this.saveCart();
    },

    bindEvents() {
        // Bind cart-related events here
    }
};

// Seat Selection
const seatSelector = {
    selectedSeats: new Set(),
    
    init(containerId, totalSeats, pricing) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.renderSeats(totalSeats, pricing);
        this.bindEvents();
    },

    renderSeats(totalSeats, pricing) {
        // Create seat map
        const seatMap = document.createElement('div');
        seatMap.className = 'seat-map';
        
        for (let i = 1; i <= totalSeats; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.dataset.seatId = i;
            seat.dataset.price = pricing[Math.floor((i-1)/10)];
            seat.innerHTML = `<span>${i}</span>`;
            seatMap.appendChild(seat);
        }
        
        this.container.appendChild(seatMap);
    },

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const seat = e.target.closest('.seat');
            if (!seat || seat.classList.contains('occupied')) return;

            seat.classList.toggle('selected');
            const seatId = seat.dataset.seatId;

            if (this.selectedSeats.has(seatId)) {
                this.selectedSeats.delete(seatId);
            } else {
                this.selectedSeats.add(seatId);
            }

            this.updateTotalPrice();
        });
    },

    updateTotalPrice() {
        const total = Array.from(this.selectedSeats).reduce((sum, seatId) => {
            const seat = this.container.querySelector(`[data-seat-id="${seatId}"]`);
            return sum + parseFloat(seat.dataset.price);
        }, 0);

        const priceDisplay = document.getElementById('total-price');
        if (priceDisplay) {
            priceDisplay.textContent = `Tổng tiền: ${total.toLocaleString()}đ`;
        }
    },

    getSelectedSeats() {
        return Array.from(this.selectedSeats);
    }
};

function showLoginPrompt() {
    alert('Vui lòng đăng nhập để tiếp tục!');
    window.location.href = 'login.html';
}

// Blog carousel dots navigation
document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.querySelector('.blog-section .blog-grid');
    const blogDots = document.querySelectorAll('.blog-section .carousel-dots .dot');
    const blogCards = document.querySelectorAll('.blog-section .blog-card');
    
    if (blogGrid && blogDots.length && blogCards.length) {
        // Set card width for calculation
        const cardWidth = blogCards[0].offsetWidth + 24; // Add gap (24px)
        
        // Add click event to each dot
        blogDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Calculate scroll position
                const scrollPos = index * cardWidth;
                
                // Smooth scroll to position
                blogGrid.scrollTo({
                    left: scrollPos,
                    behavior: 'smooth'
                });
                
                // Update active dot
                blogDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
        
        // Update dots when scrolling
        blogGrid.addEventListener('scroll', () => {
            const scrollPos = blogGrid.scrollLeft;
            const activeIndex = Math.round(scrollPos / cardWidth);
            
            // Update active dot based on scroll position
            blogDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }
});

// Popular Locations dots navigation
document.addEventListener('DOMContentLoaded', function() {
    const locationGrid = document.querySelector('.popular-locations .location-grid');
    const locationDots = document.querySelectorAll('.popular-locations .location-dots .dot');
    const locationCards = document.querySelectorAll('.popular-locations .location-card');
    
    if (locationGrid && locationDots.length && locationCards.length) {
        const cardWidth = locationCards[0].offsetWidth + 30; // Add gap (30px)
        let currentIndex = 0;
        let isScrolling = false;
        
        // Function to update dots
        function updateDots(index) {
            locationDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Function to scroll to position
        function scrollToPosition(index) {
            if (isScrolling) return;
            isScrolling = true;
            
            const maxIndex = Math.ceil(locationCards.length / 2) - 1;
            index = Math.max(0, Math.min(index, maxIndex));
            
            const scrollPos = index * cardWidth * 2;
            locationGrid.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
            
            currentIndex = index;
            updateDots(index);
            
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        }
        
        // Add click event to each dot
        locationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToPosition(index);
            });
        });
        
        // Update dots when scrolling
        locationGrid.addEventListener('scroll', () => {
            if (isScrolling) return;
            
            const scrollPos = locationGrid.scrollLeft;
            const newIndex = Math.round(scrollPos / (cardWidth * 2));
            
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateDots(newIndex);
            }
        });
        
        // Initialize
        updateDots(0);
        locationGrid.scrollTo({
            left: 0,
            behavior: 'instant'
        });
    }
});

// Function to initialize all carousel dots
function initAllCarouselDots() {
    const carouselSections = document.querySelectorAll('.events-carousel, .popular-locations');
    
    carouselSections.forEach(section => {
        const slider = section.querySelector('.events-slider, .location-grid');
        const dots = section.querySelectorAll('.carousel-dots .dot, .location-dots .dot');
        const cards = section.querySelectorAll('.event-card, .location-card');
        
        if (slider && dots.length && cards.length) {
            // Calculate card width including gap
            const cardWidth = cards[0].offsetWidth + 20; // Assuming 20px gap
            let currentIndex = 0;
            let isScrolling = false;
            
            // Function to update dots
            function updateDots(index) {
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Function to scroll to position
            function scrollToPosition(index) {
                if (isScrolling) return;
                isScrolling = true;
                
                const scrollPos = index * cardWidth;
                
                // Different handling for different slider types
                if (slider.classList.contains('location-grid')) {
                    // For location grid, use scrollTo
                    slider.scrollTo({
                        left: scrollPos,
                        behavior: 'smooth'
                    });
                } else if (slider.classList.contains('events-slider')) {
                    // For events slider, use transform
                    slider.style.transform = `translateX(-${scrollPos}px)`;
                    slider.style.transition = 'transform 0.3s ease';
                }
                
                currentIndex = index;
                updateDots(index);
                
                // Reset scrolling state after animation
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }
            
            // Add click event to each dot
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    if (currentIndex !== index) {
                        scrollToPosition(index);
                    }
                });
            });
            
            // Update dots when scrolling
            if (slider.classList.contains('location-grid')) {
                slider.addEventListener('scroll', () => {
                    if (isScrolling) return;
                    
                    const scrollPos = slider.scrollLeft;
                    const newIndex = Math.round(scrollPos / cardWidth);
                    
                    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < dots.length) {
                        currentIndex = newIndex;
                        updateDots(newIndex);
                    }
                });
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
                const newCardWidth = cards[0].offsetWidth + 20;
                if (newCardWidth !== cardWidth) {
                    scrollToPosition(currentIndex);
                }
            });
            
            // Initialize dots and slider position
            updateDots(0);
            if (slider.classList.contains('events-slider')) {
                slider.style.transform = 'translateX(0)';
                slider.style.transition = 'transform 0.3s ease';
            }
        }
    });
}

// Function to generate carousel cards
function generateCarouselCards() {
    const featuredEventsSection = document.querySelector('.featured-events .events-carousel');
    if (!featuredEventsSection) return;
    
    const slider = featuredEventsSection.querySelector('.events-slider');
    if (!slider) return;
    
    // Clear existing cards
    slider.innerHTML = '';
    
    // Generate new cards
    carouselData.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                <div class="event-date">${event.date}</div>
                <div class="event-category">${event.category}</div>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-meta">
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p><i class="fas fa-ticket-alt"></i> ${event.price}</p>
                </div>
                <div class="event-actions">
                    <a href="event-detail.html" class="btn btn-primary">Xem chi tiết</a>
                </div>
            </div>
        `;
        slider.appendChild(card);
    });
    
    // Update dots based on number of cards
    const dotsContainer = featuredEventsSection.querySelector('.location-dots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        carouselData.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dotsContainer.appendChild(dot);
        });
    }
}

// Check login status and update UI
function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user'));
    const navRight = document.querySelector('.nav-right');

    if (isLoggedIn && user) {
        // Add logged in class to body
        document.body.classList.add('is-logged-in');

        // Update nav-right content
        navRight.innerHTML = `
            <div class="user-menu">
                <img src="${user.avatar}" alt="Avatar" class="user-avatar">
                <span class="user-name">${user.name}</span>
                <div class="dropdown-menu">
                    <a href="/profile.html">
                        <i class="fas fa-user"></i>
                        Tài khoản của tôi
                    </a>
                    <a href="/my-events.html">
                        <i class="fas fa-calendar-alt"></i>
                        Sự kiện của tôi
                    </a>
                    <a href="/my-tickets.html">
                        <i class="fas fa-ticket-alt"></i>
                        Vé đã mua
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" onclick="handleLogout(event)">
                        <i class="fas fa-sign-out-alt"></i>
                        Đăng xuất
                    </a>
                </div>
            </div>
        `;
    } else {
        // Remove logged in class from body
        document.body.classList.remove('is-logged-in');

        // Restore default nav-right content
        navRight.innerHTML = `
            <div class="auth-buttons">
                <a href="login.html" class="btn-login">
                    <i class="fas fa-sign-in-alt"></i>
                    Đăng nhập
                </a>
                <a href="register.html" class="btn-register">
                    <i class="fas fa-user-plus"></i>
                    Đăng ký
                </a>
            </div>
        `;
    }
}

// Handle logout
function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.href = '/';
}

// Update UI when page loads
document.addEventListener('DOMContentLoaded', updateAuthUI);

// Authentication check
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    
    // Check if trying to access create event pages
    if (currentPath.includes('create-event') && !isLoggedIn) {
        // Save the intended destination
        localStorage.setItem('redirectAfterLogin', currentPath);
        // Redirect to login
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
}); 