import { events, formatCurrency } from './events.js';

// Get current event ID from URL
function getCurrentEventId() {
    const path = window.location.pathname;
    const match = path.match(/event-detail-(\w+)\.html/);
    return match ? match[1] : null;
}

// Get current event data
function getCurrentEvent() {
    const eventId = getCurrentEventId();
    return events.find(event => event.id === eventId);
}

// Initialize ticket quantities and prices
let ticketQuantities = {};
let currentEvent = getCurrentEvent();

// Initialize page
function initializePage() {
    if (!currentEvent) return;

    // Update page title
    document.title = `${currentEvent.title} - EventBox`;

    // Update hero section
    updateHeroSection();

    // Initialize ticket quantities
    document.querySelectorAll('.ticket-type').forEach(ticketType => {
        const type = ticketType.dataset.type;
        ticketQuantities[type] = 0;
    });

    // Add event listeners
    addEventListeners();

    // Initialize gallery
    initializeGallery();

    // Initialize sticky ticket card
    initializeStickyCard();
}

// Update hero section with event data
function updateHeroSection() {
    const heroImage = document.querySelector('.event-hero-bg img');
    if (heroImage) {
        heroImage.src = currentEvent.image;
        heroImage.alt = currentEvent.title;
    }

    const title = document.querySelector('.event-title');
    if (title) title.textContent = currentEvent.title;

    const category = document.querySelector('.event-category');
    if (category) category.textContent = currentEvent.category;

    // Update event highlights
    updateEventHighlights();
}

// Update event highlights
function updateEventHighlights() {
    const highlights = document.querySelectorAll('.highlight-value');
    if (!highlights.length) return;

    const highlightData = {
        date: formatDate(currentEvent.date),
        time: currentEvent.time,
        duration: currentEvent.duration,
        location: `${currentEvent.venue}, ${currentEvent.location}`
    };

    highlights.forEach((highlight, index) => {
        const key = Object.keys(highlightData)[index];
        if (key) highlight.textContent = highlightData[key];
    });
}

// Add event listeners
function addEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', handleQuantityChange);
    });

    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', handleAddToCart);
    }

    // Buy now button
    const buyNowBtn = document.querySelector('.buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', handleBuyNow);
    }

    // Contact organizer button
    const contactBtn = document.querySelector('.contact-organizer');
    if (contactBtn) {
        contactBtn.addEventListener('click', handleContactOrganizer);
    }
}

// Handle quantity change
function handleQuantityChange(e) {
    const button = e.target;
    const ticketType = button.closest('.ticket-type');
    const type = ticketType.dataset.type;
    const input = ticketType.querySelector('input');
    const isIncrement = button.classList.contains('plus');

    if (isIncrement && ticketQuantities[type] < 10) {
        ticketQuantities[type]++;
    } else if (!isIncrement && ticketQuantities[type] > 0) {
        ticketQuantities[type]--;
    }

    input.value = ticketQuantities[type];
    updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
    let totalQuantity = 0;
    let totalPrice = 0;

    Object.entries(ticketQuantities).forEach(([type, quantity]) => {
        totalQuantity += quantity;
        totalPrice += quantity * currentEvent.price[type];
    });

    document.getElementById('total-quantity').textContent = `${totalQuantity} vé`;
    document.getElementById('total-price').textContent = formatCurrency(totalPrice);

    // Enable/disable action buttons based on selection
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.disabled = totalQuantity === 0;
    });
}

// Handle add to cart
function handleAddToCart() {
    if (Object.values(ticketQuantities).every(q => q === 0)) {
        showNotification('Vui lòng chọn số lượng vé', 'error');
        return;
    }

    const cartItem = {
        eventId: currentEvent.id,
        eventTitle: currentEvent.title,
        tickets: { ...ticketQuantities },
        timestamp: new Date().toISOString()
    };

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('eventbox_cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('eventbox_cart', JSON.stringify(cart));

    showNotification('Đã thêm vé vào giỏ hàng', 'success');
    resetTicketQuantities();
}

// Handle buy now
function handleBuyNow() {
    if (Object.values(ticketQuantities).every(q => q === 0)) {
        showNotification('Vui lòng chọn số lượng vé', 'error');
        return;
    }
    
    // Store selected tickets in session storage
    sessionStorage.setItem('checkout_tickets', JSON.stringify({
        eventId: currentEvent.id,
        eventTitle: currentEvent.title,
        tickets: { ...ticketQuantities }
    }));

    // Redirect to checkout page
    window.location.href = '/checkout.html';
}

// Handle contact organizer
function handleContactOrganizer() {
    const subject = encodeURIComponent(`Thông tin về ${currentEvent.title}`);
    window.location.href = `mailto:organizer@eventbox.vn?subject=${subject}`;
}

// Initialize gallery
function initializeGallery() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    if (!galleryImages.length) return;

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openGalleryModal(img.src);
        });
    });
}

// Open gallery modal
function openGalleryModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="Gallery image">
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
    if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
}

// Initialize sticky ticket card
function initializeStickyCard() {
    const ticketCard = document.querySelector('.ticket-card');
    if (!ticketCard) return;

    const observer = new IntersectionObserver(
        ([e]) => ticketCard.classList.toggle('sticky', e.intersectionRatio < 1),
        { threshold: [1] }
    );

    observer.observe(ticketCard);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Reset ticket quantities
function resetTicketQuantities() {
    Object.keys(ticketQuantities).forEach(type => {
        ticketQuantities[type] = 0;
        const input = document.querySelector(`.ticket-type[data-type="${type}"] input`);
        if (input) input.value = 0;
    });
    updateTotalPrice();
}

// Format date helper
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 