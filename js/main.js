// Set target tanggal
const countDownDate = new Date("Sep 26, 2025 00:00:00").getTime();

const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  // hitung hari, jam, menit, detik
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // tampilkan ke elemen HTML
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // kalau lewat tanggal target
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Acara sudah dimulai 🎉";
  }
}, 1000);



/* ===== Slider Fade =====
   Ganti daftar gambar di array di bawah */
const SLIDES = [
  "images/slider-1.jpg",
  "images/slider-2.jpg",
  "images/slider-3.jpg"
];
// opsional: posisi fokus tiap gambar (mis. geser sedikit ke kiri/atas)
const SLIDE_POS = ["center 30%", "center", "40% center"]; // boleh kosong atau samakan panjangnya

const sliderEl = document.getElementById("slider");
if (sliderEl) {
  // inject <img> untuk setiap slide
  SLIDES.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    if (SLIDE_POS[i]) img.style.objectPosition = SLIDE_POS[i];
    if (i === 0) img.classList.add("active");
    sliderEl.appendChild(img);
  });

  const imgs = Array.from(sliderEl.querySelectorAll("img"));
  let idx = 0;
  const change = () => {
    imgs[idx].classList.remove("active");
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add("active");
  };
  // ganti gambar tiap 4 detik
  setInterval(change, 4000);
  
}

// ===== Reveal on Scroll (alternate left/right per child) =====
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section, .mempelai, .gallery-section");

  sections.forEach((sec) => {
    const children = Array.from(sec.children)
      .filter(el => !el.classList.contains("img-gradient") && !el.matches("script, style"));

    children.forEach((el, i) => {
      el.classList.add("reveal-item");
      // item genap dari kiri, item ganjil dari kanan
      el.classList.add(i % 2 === 0 ? "reveal-left" : "reveal-right");
      el.style.setProperty("--delay", `${i * 100}ms`);
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".reveal-item").forEach(el => {
          el.classList.add("reveal-show");
        });
        io.unobserve(entry.target); // animasi sekali saja
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => io.observe(sec));
});




