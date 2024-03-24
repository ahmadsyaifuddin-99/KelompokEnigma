// Tambahkan variabel global untuk status audio
var audioStatus = true;

// Fungsi untuk mengaktifkan/menonaktifkan audio
function toggleAudio() {
  var audio = document.getElementById("audio");
  var audioButton = document.getElementById("audioButton");
  var note = document.querySelector(".note");
  if (audio.paused) {
    audio.play();
    audioStatus = true;
    audioButton.innerHTML = '<i class="fas fa-music fa-lg"></i>'; // Mengubah ikon menjadi mute
    note.style.animation = "none"; // Menonaktifkan animasi
    note.offsetHeight; // Trigger reflow
    note.style.animation = "noteAnimation 2s ease forwards"; // Mengaktifkan kembali animasi
  } else {
    audio.pause();
    audioStatus = false;
    audioButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Mengubah ikon menjadi music
  }
}

// Tambahkan audio di sini
var audio = new Audio("./asset/fireflies.mp3");
audio.setAttribute("id", "audio");
document.body.appendChild(audio);

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
