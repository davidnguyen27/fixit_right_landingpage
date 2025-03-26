// Tạo QR code sử dụng thư viện qrcode.js
function generateQRCode() {
  // URL để tải APK
  const apkUrl = "assets/fixitright.apk";

  // Tạo QR code
  const qrContainer = document.querySelector(".qr-code");
  new QRCode(qrContainer, {
    text: apkUrl,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Thêm sự kiện click vào QR code
  qrContainer.addEventListener("click", () => {
    downloadAPK(apkUrl);
  });
}

// Hàm tải APK
function downloadAPK(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "fixitright.apk";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Hàm cuộn đến phần QR
function scrollToQR() {
  const qrSection = document.getElementById("qr-section");
  qrSection.scrollIntoView({ behavior: "smooth" });
}

// Biến toàn cục để lưu trạng thái carousel
let slideIndex = 0;

// Hàm chuyển slide
function changeSlide(n) {
  showSlide((slideIndex += n));
}

// Hàm hiển thị slide hiện tại
function currentSlide(n) {
  showSlide((slideIndex = n));
}

// Hàm xử lý hiển thị slide
function showSlide(n) {
  const slides = document.querySelectorAll(".carousel-image");
  const dots = document.querySelectorAll(".carousel-dots .dot");

  // Xử lý trường hợp vượt quá giới hạn
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  // Ẩn tất cả slides với hiệu ứng phù hợp
  slides.forEach((slide, index) => {
    slide.classList.remove("active");

    // Hiệu ứng di chuyển tùy theo hướng
    if (index < slideIndex) {
      slide.style.transform = "translateX(-100%)";
    } else if (index > slideIndex) {
      slide.style.transform = "translateX(100%)";
    }
  });

  // Loại bỏ class active từ tất cả các dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Hiển thị slide hiện tại
  slides[slideIndex].classList.add("active");
  slides[slideIndex].style.transform = "translateX(0)";
  dots[slideIndex].classList.add("active");
}

// Tự động chạy carousel
function autoSlide() {
  changeSlide(1);
  setTimeout(autoSlide, 5000); // Chuyển slide mỗi 5 giây
}

// Chạy các hàm khi trang web được tải
document.addEventListener("DOMContentLoaded", function () {
  generateQRCode();
  showSlide(slideIndex);
  setTimeout(autoSlide, 5000); // Bắt đầu tự động chuyển slide sau 5 giây
});
