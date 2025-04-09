document.addEventListener('DOMContentLoaded', function() {
    // Handle event form submission
    const createEventForm = document.getElementById('createEventForm');
    if (createEventForm) {
        createEventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const eventData = {
                basicInfo: {
                    name: formData.get('eventName'),
                    category: formData.get('eventCategory'),
                    description: formData.get('eventDescription'),
                    image: formData.get('eventImage')
                },
                timeLocation: {
                    startDate: formData.get('startDate'),
                    startTime: formData.get('startTime'),
                    endDate: formData.get('endDate'),
                    endTime: formData.get('endTime'),
                    venueName: formData.get('venueName'),
                    venueAddress: formData.get('venueAddress')
                },
                tickets: [],
                promoCodes: []
            };

            // Collect ticket data
            const ticketNames = formData.getAll('ticketName[]');
            const ticketPrices = formData.getAll('ticketPrice[]');
            const ticketQuantities = formData.getAll('ticketQuantity[]');
            const ticketDescriptions = formData.getAll('ticketDescription[]');

            for (let i = 0; i < ticketNames.length; i++) {
                eventData.tickets.push({
                    name: ticketNames[i],
                    price: ticketPrices[i],
                    quantity: ticketQuantities[i],
                    description: ticketDescriptions[i]
                });
            }

            // Collect promo code data
            const promoCodes = formData.getAll('promoCode[]');
            const promoValues = formData.getAll('promoValue[]');
            const promoQuantities = formData.getAll('promoQuantity[]');
            const promoStartDates = formData.getAll('promoStartDate[]');
            const promoEndDates = formData.getAll('promoEndDate[]');

            for (let i = 0; i < promoCodes.length; i++) {
                eventData.promoCodes.push({
                    code: promoCodes[i],
                    value: promoValues[i],
                    quantity: promoQuantities[i],
                    startDate: promoStartDates[i],
                    endDate: promoEndDates[i]
                });
            }

            // TODO: Implement event creation logic
            console.log('Event creation attempt:', eventData);
        });
    }

    // Add new ticket type
    const addTicketTypeButton = document.getElementById('addTicketType');
    if (addTicketTypeButton) {
        addTicketTypeButton.addEventListener('click', function() {
            const ticketTypes = document.getElementById('ticketTypes');
            const newTicketType = document.createElement('div');
            newTicketType.className = 'ticket-type';
            newTicketType.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>Tên loại vé</label>
                        <input type="text" name="ticketName[]" required>
                    </div>
                    <div class="form-group">
                        <label>Giá vé</label>
                        <input type="number" name="ticketPrice[]" min="0" required>
                    </div>
                    <div class="form-group">
                        <label>Số lượng</label>
                        <input type="number" name="ticketQuantity[]" min="1" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Mô tả</label>
                    <input type="text" name="ticketDescription[]">
                </div>
                <button type="button" class="btn btn-danger remove-ticket">Xóa</button>
            `;
            ticketTypes.appendChild(newTicketType);

            // Add remove functionality
            const removeButton = newTicketType.querySelector('.remove-ticket');
            removeButton.addEventListener('click', function() {
                ticketTypes.removeChild(newTicketType);
            });
        });
    }

    // Add new promo code
    const addPromoCodeButton = document.getElementById('addPromoCode');
    if (addPromoCodeButton) {
        addPromoCodeButton.addEventListener('click', function() {
            const promoCodes = document.getElementById('promoCodes');
            const newPromoCode = document.createElement('div');
            newPromoCode.className = 'promo-code';
            newPromoCode.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>Mã giảm giá</label>
                        <input type="text" name="promoCode[]" required>
                    </div>
                    <div class="form-group">
                        <label>Giá trị giảm (%)</label>
                        <input type="number" name="promoValue[]" min="1" max="100" required>
                    </div>
                    <div class="form-group">
                        <label>Số lượng</label>
                        <input type="number" name="promoQuantity[]" min="1" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Ngày bắt đầu</label>
                        <input type="date" name="promoStartDate[]" required>
                    </div>
                    <div class="form-group">
                        <label>Ngày kết thúc</label>
                        <input type="date" name="promoEndDate[]" required>
                    </div>
                </div>
                <button type="button" class="btn btn-danger remove-promo">Xóa</button>
            `;
            promoCodes.appendChild(newPromoCode);

            // Add remove functionality
            const removeButton = newPromoCode.querySelector('.remove-promo');
            removeButton.addEventListener('click', function() {
                promoCodes.removeChild(newPromoCode);
            });
        });
    }

    // Date validation
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', function() {
            endDateInput.min = this.value;
        });
    }
}); 