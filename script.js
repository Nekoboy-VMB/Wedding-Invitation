// 1. Lấy tên từ Google Sheet thông qua URL Parameter
// Link gửi khách sẽ có dạng: index.html?name=Anh+Hoang
window.addEventListener('DOMContentLoaded', () => {
    // 1. Tự động thêm class reveal (Bạn đã có)
    const autoRevealElements = document.querySelectorAll('.card-content, .hero-img, .details-text, .countdown-container, .mini-calendar');
    autoRevealElements.forEach((el) => {
        el.classList.add('reveal');
    });

    // 2. XỬ LÝ LẤY TÊN KHÁCH MỜI TỪ URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('name'); // Lấy giá trị sau ?name=

    if (guestName) {
        // Chuyển đổi dấu cộng (+) hoặc %20 thành khoảng trắng cho dễ đọc
        const formattedName = decodeURIComponent(guestName).replace(/\+/g, ' ');

        // Đổ tên vào thẻ H1 có id="guest-name"
        const nameDisplay = document.getElementById('guest-name');
        if (nameDisplay) {
            nameDisplay.innerText = formattedName;
        }

        // Nếu bạn có ô input nhập tên ở cuối trang (phần RSVP), nó cũng tự điền luôn
        const nameInput = document.getElementById('input-name');
        if (nameInput) {
            nameInput.value = formattedName;
        }
    }
});
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
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx_mSuonF61BfPbrbx6mhy7MoQcTnVt4e9ZXrayomOIA3A0LJ3UzDSyLjy4V9emGsuF/exec'; // Link vừa copy ở Bước 2
    
    const name = document.getElementById('input-name').value;
    const attendance = document.getElementById('attendance').value;
    const guest_count = document.getElementById('nguoi').value;
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
            "guest_count": guest_count,
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
// Thiết lập ngày cưới
const weddingDate = new Date(targetWeddingDate).getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Tính toán ngày, giờ, phút, giây
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị kết quả (thêm số 0 phía trước nếu < 10)
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Nếu hết thời gian
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "<h3 style='color:#8b0000'>HÔM NAY LÀ NGÀY CƯỚI!</h3>";
    }
}, 1000);
function addToGoogleCalendar() {
    const event = {
        title: "Lễ Thành Hôn: Thu Thảo & Minh Thông",
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
    const guest_count = document.getElementById('nguoi').value;
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
            "guest_count": guest_count,
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
    heart.classList.add("floating-heart");
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
setInterval(createHeart, 200);
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
// nhạc
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// Hàm để bật/tắt nhạc
// Hàm kích hoạt nhạc khi khách tương tác
function enableAutoPlay() {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.play().then(() => {
            // Nếu phát nhạc thành công, gỡ bỏ các sự kiện lắng nghe để tránh chạy lại
            document.removeEventListener('touchstart', enableAutoPlay);
            document.removeEventListener('scroll', enableAutoPlay);
            document.removeEventListener('click', enableAutoPlay);
            console.log("Nhạc đã bắt đầu phát!");
        }).catch(error => {
            console.log("Trình duyệt vẫn chưa cho phát nhạc: ", error);
        });
    }
}

// Lắng nghe các hành động vuốt (touchstart), cuộn (scroll) hoặc bấm (click)
document.addEventListener('touchstart', enableAutoPlay);
document.addEventListener('scroll', enableAutoPlay);
document.addEventListener('click', enableAutoPlay);
// mở cửa
function openDoor() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.body.classList.remove('overlay-locked');

    const overlay = document.getElementById('door-overlay');
    overlay.classList.add('door-open');
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('bg-music').play();
    }, 1000); // Thời gian để hiệu ứng xong
}

// Gán sự kiện click vào ảnh QR khi trang tải xong
window.addEventListener('DOMContentLoaded', (event) => {
    const qrImg = document.querySelector('.qr-img');
    if (qrImg) {
        qrImg.addEventListener('click', toggleZoomQR);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('overlay-locked');
});

document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.gallery img'));
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showOverlay(img.src);
        });
    });

    function showOverlay(src) {
        const existing = document.querySelector('#image-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'image-overlay';
        overlay.innerHTML = `<img src="${src}" class="zoomed-img">`;
        document.body.appendChild(overlay);

        // Đóng khi click
        overlay.addEventListener('click', () => overlay.remove());

        // Xử lý Vuốt (Swipe)
        overlay.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        overlay.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const threshold = 50; // Độ dài vuốt tối thiểu để nhận diện
            if (touchEndX < touchStartX - threshold) {
                // Vuốt sang trái -> Ảnh tiếp theo
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }
            if (touchEndX > touchStartX + threshold) {
                // Vuốt sang phải -> Ảnh trước đó
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateImage();
            }
        }

        function updateImage() {
            const newSrc = images[currentIndex].src;
            overlay.querySelector('img').src = newSrc;
        }

        // Thoát bằng phím Esc
        document.addEventListener('keydown', function handleEsc(event) {
            if (event.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleEsc);
            }
        });
    }
});
function rotateSlides() {
    const slides = document.querySelectorAll('.slide-item');
    const positions = ['position-1', 'position-2', 'position-3'];
    
    // Lấy danh sách các class hiện tại của các ảnh
    let currentClasses = [];
    slides.forEach(slide => {
        positions.forEach(p => {
            if (slide.classList.contains(p)) {
                currentClasses.push(p);
            }
        });
    });

    // Đẩy class cuối lên đầu để tạo vòng xoay
    currentClasses.unshift(currentClasses.pop());

    // Cập nhật lại class mới cho từng ảnh
    slides.forEach((slide, index) => {
        positions.forEach(p => slide.classList.remove(p));
        slide.classList.add(currentClasses[index]);
    });
}

// Chạy vòng xoay mỗi 3 giây
setInterval(rotateSlides, 3000);
