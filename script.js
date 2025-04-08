// Tạo QR code sử dụng thư viện qrcode.js
function generateQRCode() {
  const apkUrl = "assets/app-release.apk"; // URL đến file APK

  const qrContainer = document.querySelector(".qr-code");
  if (!qrContainer) return;

  // Xoá QR cũ nếu có
  qrContainer.innerHTML = "";

  new QRCode(qrContainer, {
    text: apkUrl,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Bấm vào QR code cũng tải
  qrContainer.addEventListener("click", () => {
    downloadAPK(apkUrl);
  });
}

// Hàm tải APK
function downloadAPK(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "app-release.apk";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Hàm cuộn đến QR section
function scrollToQR() {
  const qrSection = document.getElementById("qr-section");
  if (qrSection) {
    qrSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Carousel logic (nếu có)
let slideIndex = 0;

function changeSlide(n) {
  showSlide((slideIndex += n));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  const slides = document.querySelectorAll(".carousel-image");
  const dots = document.querySelectorAll(".carousel-dots .dot");
  if (!slides.length) return;

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    slide.style.transform = index < slideIndex ? "translateX(-100%)" : "translateX(100%)";
  });

  dots.forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex].classList.add("active");
  slides[slideIndex].style.transform = "translateX(0)";
  dots[slideIndex].classList.add("active");
}

function autoSlide() {
  changeSlide(1);
  setTimeout(autoSlide, 5000);
}

// Init khi trang load
document.addEventListener("DOMContentLoaded", function () {
  generateQRCode();
  showSlide(slideIndex);
  setTimeout(autoSlide, 5000);

  // Gán sự kiện cho nút Google Play
  const downloadBtn = document.getElementById("download-apk-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      e.preventDefault();
      downloadAPK("assets/app-release.apk");
    });
  }
});
