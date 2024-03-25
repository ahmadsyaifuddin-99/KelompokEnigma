// Tambahkan variabel global untuk status audio dan array untuk note
var audioStatus = true;
var notes = document.querySelectorAll(".note");

// Fungsi untuk mengaktifkan/menonaktifkan audio
function toggleAudio() {
  var audio = document.getElementById("audio");
  var audioButton = document.getElementById("audioButton");
  if (audio.paused) {
    audio.play();
    audioStatus = true;
    audioButton.innerHTML = '<i class="fas fa-music fa-lg"></i>'; // Mengubah ikon menjadi mute
    animateNotes(); // Memulai animasi note
  } else {
    audio.pause();
    audioStatus = false;
    audioButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Mengubah ikon menjadi music
    stopAnimation(); // Menghentikan animasi note
  }
}

// Fungsi untuk memulai animasi note
function animateNotes() {
  // Memulai animasi secara bergantian untuk setiap note
  notes.forEach((note, index) => {
    setTimeout(() => {
      note.style.animation = "noteAnimation 2s ease forwards infinite";
    }, index * 500); // Mengatur jeda antara setiap note
  });
}

// Fungsi untuk menghentikan animasi note
function stopAnimation() {
  // Menghentikan animasi dan mengatur kembali ke nilai awal
  notes.forEach((note) => {
    note.style.animation = "none";
    note.style.opacity = 0;
    note.style.transform = "translateY(0)";
  });
}

// Tambahkan audio di sini
var audio = new Audio("./asset/Lagu_Banjar1.mp3");
audio.setAttribute("id", "audio");
document.body.appendChild(audio);

// Event listener untuk ketika lagu selesai diputar
audio.addEventListener("ended", function () {
  this.currentTime = 0; // Mengatur ulang waktu audio ke awal
  this.play(); // Memulai lagu lagi
});

// Gaya untuk widget audio
var audioWidget = document.getElementById("audioWidget");
audioWidget.style.position = "fixed";
audioWidget.style.bottom = "20px"; // Ubah ke 20px atau sesuai kebutuhan
audioWidget.style.right = "20px";
audioWidget.style.zIndex = "999";

// Panggil fungsi scroll
window.addEventListener("scroll", function () {
  // Ubah posisi widget audio saat digulir
  audioWidget.style.bottom = "20px"; // Tetapkan nilai tetap
});

// Jalankan fungsi toggleAudio() saat konten dimuat
window.addEventListener("DOMContentLoaded", function () {
  toggleAudio(); // Memastikan audio diputar otomatis saat halaman dimuat
});
