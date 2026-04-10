// 1. Lấy tên từ Google Sheet thông qua URL Parameter
// Link gửi khách sẽ có dạng: index.html?name=Anh+Hoang
// Tự động thêm class reveal cho các khối nội dung khi trang vừa load
window.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả các khối nội dung chính mà bạn muốn nó chuyển động
    const autoRevealElements = document.querySelectorAll('.card-content, .hero-img, .details-text, .countdown-container, .mini-calendar');
    
    autoRevealElements.forEach((el) => {
        el.classList.add('reveal');
    });
});
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('name') || "Quý khách";

document.getElementById('guest-name').innerText = guestName;
document.getElementById('input-name').value = guestName;

// 2. Hiện/Ẩn QR Hộp quà
function toggleQR() {
    const modal = document.getElementById('qr-popup');
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

// 3. Hàm gửi RSVP (Gợi ý dùng Google Forms để lưu lời chúc)
function sendRSVP() {
    const name = document.getElementById('input-name').value;
    const msg = document.getElementById('message').value;
    alert(`Cảm ơn ${name} đã gửi lời chúc: ${msg}`);
    // Chỗ này bạn có thể dùng Fetch API để gửi dữ liệu lên Google Sheet
}
// Thiết lập ngày cưới
const weddingDate = new Date("May 20, 2026 09:00:00").getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Tính toán ngày, giờ, phút, giây
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị kết quả
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Nếu hết thời gian
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "HÔM NAY LÀ NGÀY CƯỚI!";
    }
}, 1000);
function addToGoogleCalendar() {
    const event = {
        title: "Lễ Thành Hôn: Minh Thông & Thu Thảo",
        details: "Trân trọng mời bạn đến dự lễ thành hôn và tiệc rượu chung vui cùng gia đình chúng mình!",
        location: "Thôn 6a, xã Ea Knốp, Tỉnh Đắk Lắk",
        start: "20260520T090000", // Định dạng: YYYYMMDDTHHMMSS
        end: "20260520T140000"
    };

    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleUrl, '_blank');
}
function toggleQR() {
    const modal = document.getElementById('qr-popup');
    if (modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Cho phép cuộn lại
    } else {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Khóa cuộn khi mở popup
    }
}

// Đóng modal khi click ra ngoài vùng trắng
window.onclick = function(event) {
    const modal = document.getElementById('qr-popup');
    if (event.target == modal) {
        toggleQR();
    }
}
// Hàm xử lý phóng to/thu nhỏ mã QR
function toggleZoomQR() {
    const qrImg = document.querySelector('.qr-img');
    const overlay = document.getElementById('qr-overlay');

    // Kiểm tra xem ảnh có đang được phóng to không
    if (qrImg.classList.contains('zoomed')) {
        // Nếu có, thu nhỏ lại
        qrImg.classList.remove('zoomed');
        overlay.style.display = 'none';
    } else {
        // Nếu không, phóng to lên
        qrImg.classList.add('zoomed');
        overlay.style.display = 'block';
    }
}

// Gán sự kiện click vào ảnh QR khi trang tải xong
window.addEventListener('DOMContentLoaded', (event) => {
    const qrImg = document.querySelector('.qr-img');
    if (qrImg) {
        qrImg.addEventListener('click', toggleZoomQR);
    }
});
function sendRSVP() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx_mSuonF61BfPbrbx6mhy7MoQcTnVt4e9ZXrayomOIA3A0LJ3UzDSyLjy4V9emGsuF/exec'; // Link vừa copy ở Bước 2
    
    const name = document.getElementById('input-name').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('message').value;

    if(!message.trim()) {
        alert("Bạn hãy nhập lời chúc cho tụi mình nhé! ❤️");
        return;
    }

    const btn = document.querySelector("#rsvp-form .btn");
    
    // Bước 1: Thay đổi giao diện nút ngay lập tức
    btn.innerHTML = '<span class="loader"></span> Đang gửi...';
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // Bước 2: Gửi dữ liệu đi
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Mẹo: Dùng no-cors để gửi nhanh hơn (nhưng sẽ không đọc được phản hồi JSON)
        body: JSON.stringify({
            "name": name,
            "attendance": attendance,
            "message": message
        })
    })
    .then(() => {
        // Bước 3: Thông báo thành công nhanh
        alert('Cảm ơn ' + name + '! Lời chúc đã được gửi đi thành công. ❤️');
        btn.innerHTML = "Xác nhận & Gửi lời chúc";
        btn.style.opacity = "1";
        btn.disabled = false;
        document.getElementById('message').value = "";
    })
    .catch(error => {
        console.error('Error!', error.message);
        btn.innerHTML = "Thử lại";
        btn.disabled = false;
    });
}
// hiệu ứng
function reveal() {
    var reveals = document.querySelectorAll(".page > div"); // Chọn các box nội dung

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Chạy hàm ngay khi load trang để hiện trang đầu tiên
reveal();
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 5 + 5 + "s";
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Cứ 500ms tạo ra 1 trái tim
setInterval(createHeart, 300);
// chuyển động
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100; // Khoảng cách từ mép dưới màn hình để bắt đầu hiện

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        } else {
            // Nếu bạn muốn mỗi lần cuộn lên nó ẩn đi rồi hiện lại thì giữ dòng dưới
            // element.classList.remove('active'); 
        }
    });
}

// Lắng nghe sự kiện cuộn chuột
window.addEventListener('scroll', handleScrollReveal);

// Gọi lần đầu để hiện các khối ở trang đầu tiên ngay khi mở web
handleScrollReveal();