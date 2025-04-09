document.addEventListener('DOMContentLoaded', function() {
    // Ticket quantity controls
    const quantityInputs = document.querySelectorAll('.ticket-quantity input');
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');

    quantityInputs.forEach((input, index) => {
        minusButtons[index].addEventListener('click', function() {
            if (input.value > 0) {
                input.value = parseInt(input.value) - 1;
                updateTotal();
            }
        });

        plusButtons[index].addEventListener('click', function() {
            if (input.value < parseInt(input.max)) {
                input.value = parseInt(input.value) + 1;
                updateTotal();
            }
        });

        input.addEventListener('change', function() {
            if (this.value < 0) this.value = 0;
            if (this.value > parseInt(this.max)) this.value = this.max;
            updateTotal();
        });
    });

    // Promo code application
    const promoInput = document.querySelector('.promo-input input');
    const applyPromoButton = document.querySelector('.promo-input button');
    let appliedPromo = null;

    applyPromoButton.addEventListener('click', function() {
        const promoCode = promoInput.value.trim();
        if (promoCode) {
            // TODO: Validate promo code with backend
            appliedPromo = {
                code: promoCode,
                value: 10 // Example: 10% discount
            };
            updateTotal();
        }
    });

    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option input');
    const paymentForm = document.querySelector('.payment-form');

    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.id === 'bank') {
                paymentForm.style.display = 'block';
            } else {
                paymentForm.style.display = 'none';
            }
        });
    });

    // Update total amount
    function updateTotal() {
        let subtotal = 0;
        const ticketOptions = document.querySelectorAll('.ticket-option');
        
        ticketOptions.forEach((option, index) => {
            const price = parseInt(option.querySelector('.ticket-info p').textContent.replace(/[^0-9]/g, ''));
            const quantity = parseInt(quantityInputs[index].value);
            subtotal += price * quantity;
        });

        let discount = 0;
        if (appliedPromo) {
            discount = subtotal * (appliedPromo.value / 100);
        }

        const total = subtotal - discount;

        // Update summary
        document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = formatCurrency(subtotal);
        document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = formatCurrency(discount);
        document.querySelector('.summary-item.total span:last-child').textContent = formatCurrency(total);
    }

    // Format currency
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    }

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }

    // Card name formatting
    const cardNameInput = document.getElementById('cardName');
    if (cardNameInput) {
        cardNameInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.toUpperCase();
        });
    }

    // Payment submission
    const paymentButton = document.querySelector('.payment-actions .btn-primary');
    if (paymentButton) {
        paymentButton.addEventListener('click', function() {
            const selectedPayment = document.querySelector('input[name="payment"]:checked').id;
            const paymentData = {
                tickets: [],
                paymentMethod: selectedPayment,
                total: parseInt(document.querySelector('.summary-item.total span:last-child').textContent.replace(/[^0-9]/g, ''))
            };

            // Collect ticket data
            const ticketOptions = document.querySelectorAll('.ticket-option');
            ticketOptions.forEach((option, index) => {
                const quantity = parseInt(quantityInputs[index].value);
                if (quantity > 0) {
                    const name = option.querySelector('.ticket-info h4').textContent;
                    const price = parseInt(option.querySelector('.ticket-info p').textContent.replace(/[^0-9]/g, ''));
                    paymentData.tickets.push({
                        name,
                        price,
                        quantity
                    });
                }
            });

            // TODO: Implement payment processing
            console.log('Payment attempt:', paymentData);
        });
    }
}); 