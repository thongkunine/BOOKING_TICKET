import { events, formatCurrency, formatDate } from './events.js';

// Get stored tickets from localStorage
const getStoredTickets = () => {
    return JSON.parse(localStorage.getItem('purchasedTickets')) || [];
};

// Get cart items from localStorage
const getCartItems = () => {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
};

// Update statistics
const updateStats = () => {
    const purchasedTickets = getStoredTickets();
    const cartItems = getCartItems();
    const currentDate = new Date();

    const totalTickets = purchasedTickets.length;
    const upcomingEvents = purchasedTickets.filter(ticket => 
        new Date(ticket.event.date) > currentDate
    ).length;

    document.getElementById('totalTickets').textContent = totalTickets;
    document.getElementById('upcomingEvents').textContent = upcomingEvents;
    document.getElementById('cartItems').textContent = cartItems.length;
};

// Create ticket card
const createTicketCard = (ticket, status = 'active') => {
    const event = ticket.event;
    return `
        <div class="ticket-card" data-ticket-id="${ticket.id}">
            <div class="ticket-image">
                <img src="${event.image}" alt="${event.title}">
                <span class="ticket-status status-${status}">${
                    status === 'active' ? 'Sắp diễn ra' : 
                    status === 'used' ? 'Đã sử dụng' : 'Đã hủy'
                }</span>
            </div>
            <div class="ticket-content">
                <h3 class="ticket-title">${event.title}</h3>
                <div class="ticket-info">
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(event.date)} ${event.time}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.venue}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-ticket-alt"></i>
                        <span>${ticket.quantity} vé - ${formatCurrency(ticket.totalPrice)}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-qrcode"></i>
                        <span>Mã vé: ${ticket.id}</span>
                    </div>
                </div>
                <div class="ticket-actions">
                    ${status === 'active' ? `
                        <button class="btn-download">
                            <i class="fas fa-download"></i>
                            <span>Tải vé</span>
                        </button>
                    ` : ''}
                    <button class="btn-view">
                        <i class="fas fa-eye"></i>
                        <span>Xem chi tiết</span>
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Create cart item
const createCartItem = (item) => {
    const event = events.find(e => e.id === item.eventId);
    return `
        <div class="ticket-card" data-cart-id="${item.id}">
            <div class="ticket-image">
                <img src="${event.image}" alt="${event.title}">
                <span class="ticket-status status-active">Trong giỏ hàng</span>
            </div>
            <div class="ticket-content">
                <h3 class="ticket-title">${event.title}</h3>
                <div class="ticket-info">
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(event.date)} ${event.time}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.venue}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-ticket-alt"></i>
                        <span>${item.quantity} vé - ${formatCurrency(item.totalPrice)}</span>
                    </div>
                </div>
                <div class="ticket-actions">
                    <button class="btn-remove" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                        <span>Xóa</span>
                    </button>
                    <button class="btn-view" onclick="window.location.href='${event.detailUrl}'">
                        <i class="fas fa-eye"></i>
                        <span>Xem chi tiết</span>
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Render tickets
const renderTickets = () => {
    const purchasedTickets = getStoredTickets();
    const currentDate = new Date();

    // Upcoming tickets
    const upcomingTickets = purchasedTickets.filter(ticket => 
        new Date(ticket.event.date) > currentDate
    );
    const upcomingContainer = document.querySelector('#upcoming .tickets-grid');
    if (upcomingContainer) {
        upcomingContainer.innerHTML = upcomingTickets.length ? 
            upcomingTickets.map(ticket => createTicketCard(ticket, 'active')).join('') :
            '<div class="empty-state">Không có vé cho sự kiện sắp tới</div>';
    }

    // Past tickets
    const pastTickets = purchasedTickets.filter(ticket => 
        new Date(ticket.event.date) <= currentDate
    );
    const pastContainer = document.querySelector('#past .tickets-grid');
    if (pastContainer) {
        pastContainer.innerHTML = pastTickets.length ?
            pastTickets.map(ticket => createTicketCard(ticket, 'used')).join('') :
            '<div class="empty-state">Không có vé đã sử dụng</div>';
    }
};

// Render cart
const renderCart = () => {
    const cartItems = getCartItems();
    const cartContainer = document.querySelector('.cart-items');
    const totalCartTickets = document.getElementById('totalCartTickets');
    const totalAmount = document.getElementById('totalAmount');

    if (cartContainer) {
        cartContainer.innerHTML = cartItems.length ?
            cartItems.map(item => createCartItem(item)).join('') :
            '<div class="empty-state">Giỏ hàng trống</div>';

        // Update summary
        const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const ticketCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        totalCartTickets.textContent = ticketCount;
        totalAmount.textContent = formatCurrency(total);
    }
};

// Remove item from cart
window.removeFromCart = (cartId) => {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id !== cartId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
    updateStats();
};

// Handle tab switching
const initTabs = () => {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            // Show selected content
            const targetId = tab.dataset.tab;
            document.getElementById(targetId).classList.add('active');
        });
    });
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    updateStats();
    renderTickets();
    renderCart();

    // Handle checkout button
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cartItems = getCartItems();
            if (cartItems.length === 0) {
                alert('Giỏ hàng trống!');
                return;
            }
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    }
}); 