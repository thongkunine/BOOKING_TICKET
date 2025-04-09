document.addEventListener('DOMContentLoaded', function() {
    // Profile navigation
    const navLinks = document.querySelectorAll('.profile-nav a');
    const sections = document.querySelectorAll('.profile-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // Update active state
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Profile form submission
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                birthday: document.getElementById('birthday').value,
                address: document.getElementById('address').value
            };

            // TODO: Implement profile update logic
            console.log('Profile update attempt:', formData);
        });
    }

    // Avatar change
    const avatarInput = document.createElement('input');
    avatarInput.type = 'file';
    avatarInput.accept = 'image/*';
    avatarInput.style.display = 'none';

    const changeAvatarButton = document.querySelector('.profile-avatar button');
    if (changeAvatarButton) {
        changeAvatarButton.addEventListener('click', function() {
            avatarInput.click();
        });
    }

    avatarInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.querySelector('.profile-avatar img').src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Ticket actions
    const ticketCards = document.querySelectorAll('.ticket-card');
    ticketCards.forEach(card => {
        const viewButton = card.querySelector('.btn-primary');
        const cancelButton = card.querySelector('.btn-outline');

        if (viewButton) {
            viewButton.addEventListener('click', function() {
                // TODO: Implement ticket viewing logic
                console.log('View ticket clicked');
            });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                // TODO: Implement ticket cancellation logic
                console.log('Cancel ticket clicked');
            });
        }
    });

    // Event actions
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        const editButton = card.querySelector('.btn-primary');
        const deleteButton = card.querySelector('.btn-outline');

        if (editButton) {
            editButton.addEventListener('click', function() {
                // TODO: Implement event editing logic
                console.log('Edit event clicked');
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', function() {
                // TODO: Implement event deletion logic
                console.log('Delete event clicked');
            });
        }
    });

    // Settings
    const notificationSwitches = document.querySelectorAll('.setting-options input[type="checkbox"]');
    notificationSwitches.forEach(switch_ => {
        switch_.addEventListener('change', function() {
            const setting = this.closest('.setting-options').querySelector('span').textContent;
            const isEnabled = this.checked;

            // TODO: Implement notification settings update logic
            console.log('Notification setting changed:', { setting, isEnabled });
        });
    });

    // Change password
    const changePasswordButton = document.querySelector('.setting-options .btn-primary');
    if (changePasswordButton) {
        changePasswordButton.addEventListener('click', function() {
            // TODO: Implement password change logic
            console.log('Change password clicked');
        });
    }

    // Two-factor authentication
    const twoFactorButton = document.querySelector('.setting-options .btn-primary:nth-child(2)');
    if (twoFactorButton) {
        twoFactorButton.addEventListener('click', function() {
            // TODO: Implement two-factor authentication logic
            console.log('Two-factor authentication clicked');
        });
    }

    // Delete account
    const deleteAccountButton = document.querySelector('.btn-danger');
    if (deleteAccountButton) {
        deleteAccountButton.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
                // TODO: Implement account deletion logic
                console.log('Delete account clicked');
            }
        });
    }
}); 