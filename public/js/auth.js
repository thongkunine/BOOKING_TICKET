document.addEventListener('DOMContentLoaded', function() {
    // Tạo tài khoản mẫu nếu chưa có
    if (!localStorage.getItem('mockUser')) {
        const mockUser = {
            email: 'admin@example.com',
            password: 'admin123',
            name: 'Admin User',
            avatar: 'images/default-avatar.png'
        };
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
    }

    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Lấy thông tin tài khoản mẫu
            const mockUser = JSON.parse(localStorage.getItem('mockUser'));

            // Kiểm tra đăng nhập
            if (email === mockUser.email && password === mockUser.password) {
                // Lưu token giả và thông tin user
                localStorage.setItem('authToken', 'mock-token-123');
                localStorage.setItem('userData', JSON.stringify({
                    name: mockUser.name,
                    email: mockUser.email,
                    avatar: mockUser.avatar
                }));

                // Chuyển hướng về trang trước đó hoặc trang tạo sự kiện
                const redirectUrl = localStorage.getItem('redirectUrl') || '/create-event-info.html';
                localStorage.removeItem('redirectUrl');
                window.location.href = redirectUrl;
            } else {
                alert('Email hoặc mật khẩu không đúng!\n\nGợi ý: Sử dụng\nEmail: admin@example.com\nPassword: admin123');
            }
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Tính năng đăng ký tạm thời không khả dụng.\nVui lòng sử dụng tài khoản mẫu để đăng nhập:\nEmail: admin@example.com\nPassword: admin123');
        });
    }

    // Handle forgot password form submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;

            // TODO: Implement password recovery logic
            console.log('Password recovery attempt:', { email });
        });
    }

    // Handle social login buttons
    const googleButton = document.querySelector('.btn-google');
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // TODO: Implement Google login
            console.log('Google login clicked');
        });
    }

    const facebookButton = document.querySelector('.btn-facebook');
    if (facebookButton) {
        facebookButton.addEventListener('click', function() {
            // TODO: Implement Facebook login
            console.log('Facebook login clicked');
        });
    }
});

// Kiểm tra trạng thái đăng nhập
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Lưu lại URL hiện tại để sau khi đăng nhập xong có thể quay lại
        const currentPath = window.location.pathname;
        // Nếu đang ở trang tạo sự kiện nhưng không phải trang đầu tiên, chuyển về trang đầu
        if (currentPath.includes('create-event') && !currentPath.includes('create-event-info.html')) {
            localStorage.setItem('redirectUrl', '/create-event-info.html');
        } else {
            localStorage.setItem('redirectUrl', currentPath);
        }
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

// Kiểm tra và cập nhật UI dựa trên trạng thái đăng nhập
function updateAuthUI() {
    const token = localStorage.getItem('authToken');
    const navActions = document.querySelector('.nav-actions');
    
    if (token) {
        // Đã đăng nhập - hiển thị menu user
        const userData = JSON.parse(localStorage.getItem('userData'));
        navActions.innerHTML = `
            <div class="user-menu">
                <img src="${userData.avatar || 'images/default-avatar.png'}" alt="Avatar" class="user-avatar">
                <span class="user-name">${userData.name}</span>
                <div class="dropdown-menu">
                    <a href="/profile.html">Tài khoản</a>
                    <a href="/my-events.html">Sự kiện của tôi</a>
                    <a href="#" onclick="logout()">Đăng xuất</a>
                </div>
            </div>
        `;
    } else {
        // Chưa đăng nhập - hiển thị nút đăng nhập/đăng ký
        navActions.innerHTML = `
            <a href="/login.html" class="btn-login">Đăng nhập</a>
            <a href="/register.html" class="btn-register">Đăng ký</a>
        `;
    }
}

// Xử lý đăng xuất
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
}

// Thêm styles cho user menu
const style = document.createElement('style');
style.textContent = `
    .user-menu {
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
    }

    .user-menu:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }

    .user-name {
        font-weight: 500;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 8px 0;
        min-width: 180px;
        display: none;
    }

    .user-menu:hover .dropdown-menu {
        display: block;
    }

    .dropdown-menu a {
        display: block;
        padding: 8px 16px;
        color: #1a1a1a;
        text-decoration: none;
        transition: background 0.2s;
    }

    .dropdown-menu a:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`;
document.head.appendChild(style); 