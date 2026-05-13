// 1. Tự động nạp dữ liệu từ JSON vào LocalStorage nếu chưa có
async function initUserData() {
    if (!localStorage.getItem('users')) {
        try {
            const response = await fetch('data/users.json');
            const defaultUsers = await response.json();
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            console.log("Đã nạp dữ liệu mẫu từ JSON vào LocalStorage.");
        } catch (error) {
            console.error("Lỗi khi nạp file JSON:", error);
        }
    }
}

function updateNavigation() {
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    const navUserName = document.getElementById('navUserName');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        if (authButtons) authButtons.classList.add('d-none');
        if (userProfile) userProfile.classList.remove('d-none');
        if (navUserName) navUserName.innerText = currentUser.fullname || currentUser.phone;
    } else {
        if (authButtons) authButtons.classList.remove('d-none');
        if (userProfile) userProfile.classList.add('d-none');
    }
}

function checkSessionTimeout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser && currentUser.loginTime) {
        const now = new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000; // 5 phút quy đổi ra miligiây
        
        // Kiểm tra nếu thời gian trôi qua vượt quá 5 phút
        if (now - currentUser.loginTime > fiveMinutes) {
            logout();
        }
    }
}
function logout() {
    localStorage.removeItem('currentUser');
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
    window.location.href = "Login.html";
}

// Chạy khởi tạo ngay khi web load
document.addEventListener('DOMContentLoaded', () => {
    initUserData();
    checkSessionTimeout();
    updateNavigation();
});