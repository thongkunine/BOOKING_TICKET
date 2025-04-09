// Event data
const events = [
    {
        id: 'kpop-festival',
        title: 'KPOP Music Festival 2024',
        category: 'Âm nhạc',
        date: '2024-06-15',
        time: '18:00',
        duration: '2 ngày',
        venue: 'Sân vận động Mỹ Đình',
        location: 'Hà Nội',
        image: 'images/events/kpop-festival.jpg',
        price: {
            vip: 5000000,
            a: 3000000,
            b: 2000000
        },
        description: 'Đại nhạc hội KPOP quy tụ các ngôi sao hàng đầu Hàn Quốc',
        features: [
            '10+ nhóm nhạc nổi tiếng',
            'Khu vực giao lưu fan',
            'Quà tặng độc quyền',
            'Fansign với idol'
        ],
        detailUrl: 'event-detail-kpop.html'
    },
    {
        id: 'edm-festival',
        title: 'EDM Summer Beach Festival',
        category: 'Âm nhạc',
        date: '2024-07-01',
        time: '16:00',
        duration: '3 ngày',
        venue: 'Bãi biển Nha Trang',
        location: 'Nha Trang',
        image: 'images/events/edm-festival.jpg',
        price: {
            vip: 4000000,
            standard: 2500000,
            early: 1500000
        },
        description: 'Lễ hội âm nhạc điện tử lớn nhất mùa hè với các DJ hàng đầu thế giới',
        features: [
            '20+ DJ quốc tế',
            'Sân khấu trên biển',
            'Khu camping độc đáo',
            'Pool party hằng ngày'
        ],
        detailUrl: 'event-detail-edm.html'
    },
    {
        id: 'wine-expo',
        title: 'Vietnam Wine & Spirits Expo 2024',
        category: 'Ẩm thực',
        date: '2024-08-25',
        time: '10:00',
        duration: '4 ngày',
        venue: 'JW Marriott Hotel',
        location: 'TP.HCM',
        image: 'images/events/wine-expo.jpg',
        price: {
            premium: 3000000,
            standard: 1500000,
            basic: 800000
        },
        description: 'Triển lãm rượu vang và spirits lớn nhất Đông Nam Á',
        features: [
            'Thử rượu không giới hạn',
            'Workshop với chuyên gia',
            'Tiệc tối gala dinner',
            'Quà tặng cao cấp'
        ],
        detailUrl: 'event-detail-wine.html'
    },
    {
        id: 'startup-conference',
        title: 'Vietnam Startup Conference 2024',
        category: 'Công nghệ',
        date: '2024-09-05',
        time: '09:00',
        duration: '2 ngày',
        venue: 'Gem Center',
        location: 'TP.HCM',
        image: 'images/events/startup-conf.jpg',
        price: {
            vip: 2500000,
            business: 1500000,
            startup: 800000
        },
        description: 'Hội nghị khởi nghiệp với sự tham gia của các nhà đầu tư hàng đầu châu Á',
        features: [
            'Pitching competition',
            'Gặp gỡ nhà đầu tư',
            'Mentoring sessions',
            'Networking lunch'
        ],
        detailUrl: 'event-detail-startup.html'
    },
    {
        id: 'fashion-week',
        title: 'Vietnam International Fashion Week',
        category: 'Thời trang',
        date: '2024-10-15',
        time: '19:30',
        duration: '5 ngày',
        venue: 'White Palace',
        location: 'TP.HCM',
        image: 'images/events/fashion-week.jpg',
        price: {
            front_row: 8000000,
            vip: 5000000,
            standard: 2000000
        },
        description: 'Tuần lễ thời trang quốc tế với sự góp mặt của các NTK nổi tiếng thế giới',
        features: [
            'Show diễn từ 20+ NTK',
            'Gặp gỡ người mẫu quốc tế',
            'Pop-up shopping zone',
            'After party độc quyền'
        ],
        detailUrl: 'event-detail-fashion.html'
    },
    {
        id: 'web-summit',
        title: 'Vietnam Web Summit 2024',
        category: 'Công nghệ',
        date: '2024-07-20',
        time: '09:00',
        duration: '3 ngày',
        venue: 'Trung tâm Hội nghị Quốc gia',
        location: 'Hà Nội',
        image: 'images/events/web-summit.jpg',
        price: {
            vip: 5000000,
            standard: 3000000,
            economy: 1500000
        },
        description: 'Sự kiện công nghệ quy mô lớn nhất Việt Nam',
        features: [
            '100+ diễn giả quốc tế',
            'Startup showcase',
            'Hackathon challenge',
            'Networking events'
        ],
        detailUrl: 'event-detail-tech.html'
    },
    {
        id: 'food-festival',
        title: 'Saigon Food Festival 2024',
        category: 'Ẩm thực',
        date: '2024-08-15',
        time: '10:00',
        duration: '4 ngày',
        venue: 'Công viên 23/9',
        location: 'TP.HCM',
        image: 'images/events/food-festival.jpg',
        price: {
            vip: 1500000,
            standard: 800000,
            daily: 300000
        },
        description: 'Lễ hội ẩm thực lớn nhất Sài Gòn',
        features: [
            '200+ gian hàng ẩm thực',
            'Biểu diễn nghệ thuật',
            'Workshop nấu ăn',
            'Cuộc thi đầu bếp'
        ],
        detailUrl: 'event-detail-food.html'
    },
    {
        id: 'art-exhibition',
        title: 'Contemporary Art Exhibition 2024',
        category: 'Nghệ thuật',
        date: '2024-09-10',
        time: '09:30',
        duration: '7 ngày',
        venue: 'Bảo tàng Mỹ thuật TP.HCM',
        location: 'TP.HCM',
        image: 'images/events/art-exhibition.jpg',
        price: {
            vip: 2000000,
            standard: 1000000,
            daily: 200000
        },
        description: 'Triển lãm nghệ thuật đương đại quy tụ các nghệ sĩ trong nước và quốc tế',
        features: [
            '100+ tác phẩm nghệ thuật',
            '50+ nghệ sĩ tham gia',
            'Workshop nghệ thuật',
            'Tiệc khai mạc'
        ],
        detailUrl: 'event-detail-art.html'
    }
];

// Format currency in VND
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Create featured event card for carousel
function createFeaturedEventCard(event) {
    return `
        <div class="swiper-slide">
            <div class="featured-event-card">
                <div class="featured-image">
                    <img src="${event.image}" alt="${event.title}">
                    <div class="featured-overlay">
                        <span class="event-date">
                            <i class="fas fa-calendar"></i>
                            ${formatDate(event.date)}
                        </span>
                        <span class="event-time">
                            <i class="fas fa-clock"></i>
                            ${event.time}
                        </span>
                        <span class="event-duration">
                            <i class="fas fa-hourglass-half"></i>
                            ${event.duration}
                        </span>
                    </div>
                    <div class="category-badge">${event.category}</div>
                </div>
                <div class="featured-content">
                    <h3 class="featured-title">${event.title}</h3>
                    <div class="featured-info">
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.venue}</span>
                            <small>${event.location}</small>
                        </div>
                        <div class="price-range">
                            <i class="fas fa-ticket-alt"></i>
                            <span>Từ ${formatCurrency(Math.min(...Object.values(event.price)))}</span>
                        </div>
                    </div>
                    <p class="featured-description">${event.description}</p>
                    <div class="featured-features">
                        ${event.features.map(feature => `
                            <span class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                ${feature}
                            </span>
                        `).join('')}
                    </div>
                    <div class="featured-actions">
                        <a href="${event.detailUrl}" class="btn-view-details" data-event-id="${event.id}">
                            <span>Xem chi tiết</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                        <button class="btn-add-calendar" data-event-id="${event.id}">
                            <i class="fas fa-calendar-plus"></i>
                            <span>Thêm vào lịch</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize Swiper for featured events
function initSwiper() {
    const featuredEvents = events.slice(0, 5); // Get first 5 events for featured section
    const featuredContainer = document.querySelector('.featured-events-slider .swiper-wrapper');
    
    if (featuredContainer) {
        featuredContainer.innerHTML = featuredEvents.map(event => createFeaturedEventCard(event)).join('');
        
        new Swiper('.featured-events-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    effect: 'slide'
                },
                1024: {
                    slidesPerView: 3,
                    effect: 'slide'
                }
            }
        });

        // Add calendar functionality
        document.querySelectorAll('.btn-add-calendar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const eventId = btn.dataset.eventId;
                const event = events.find(e => e.id === eventId);
                addToCalendar(event);
            });
        });
    }
}

// Add to calendar function
function addToCalendar(event) {
    const startDate = new Date(event.date + ' ' + event.time);
    const endDate = new Date(startDate.getTime() + (24 * 60 * 60 * 1000)); // Add 1 day

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue + ', ' + event.location)}`;
    
    window.open(calendarUrl, '_blank');
}

// Render event card
function createEventCard(event) {
    return `
        <div class="event-card" data-category="${event.category}">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                <span class="event-category">${event.category}</span>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(event.date)}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.venue}</span>
                    </div>
                </div>
                <div class="event-price">
                    <span>Từ ${formatCurrency(Math.min(...Object.values(event.price)))}</span>
                </div>
                <a href="${event.detailUrl}" class="view-details" data-event-id="${event.id}">
                    Xem chi tiết
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

// Render all events
function renderEvents(filteredEvents = events) {
    const eventsContainer = document.querySelector('.events-grid');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
}

// Filter events by category
function filterEvents(category) {
    const filteredEvents = category === 'all' 
        ? events 
        : events.filter(event => event.category === category);
    renderEvents(filteredEvents);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}

// Search events
function searchEvents(query) {
    const searchQuery = query.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchQuery) ||
        event.description.toLowerCase().includes(searchQuery) ||
        event.venue.toLowerCase().includes(searchQuery) ||
        event.location.toLowerCase().includes(searchQuery)
    );
    renderEvents(filteredEvents);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper if featured events section exists
    if (document.querySelector('.featured-events-slider')) {
        initSwiper();
    }

    // Initialize event grid if it exists
    if (document.querySelector('.events-grid')) {
        renderEvents();
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            filterEvents(button.dataset.category);
        });
    });

    // Search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchEvents(e.target.value);
        });
    }
});

// Export for use in other files
export { events, formatCurrency, formatDate }; 