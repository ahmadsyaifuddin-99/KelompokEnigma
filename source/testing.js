// Function to shuffle an array
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Variabel global untuk menyimpan probabilitas pengacakan
let probabilities = [0.1, 0.2, 0.3, 0.4, 0.9, 0.2, 0.1, 0.1];

// Function untuk memilih daftar nama secara acak
function chooseRandomList() {
  let randomValue = Math.random();
  let cumulativeProbability = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue < cumulativeProbability) {
      return window["sortedNames" + (i + 1)]; // Mengembalikan daftar nama yang sesuai
    }
  }
  return window["sortedNames" + probabilities.length]; // Default jika probabilitas tidak sesuai
}

function divideGroups() {
  var namesInput = document.getElementById("names").value;
  var groupCount = parseInt(document.getElementById("groupCount").value);
  var peoplePerGroup = parseInt(
    document.getElementById("peoplePerGroup").value
  );
  var taskName = document.getElementById("taskName").value; // Ambil nilai inputan untuk nama tugas atau mata kuliah

  // Menyimpan hasil inputan ke dalam objek
  var inputResult = {
    names: namesInput,
    groupCount: groupCount,
    peoplePerGroup: peoplePerGroup,
    taskName: taskName,
  };

  // Mendapatkan riwayat sebelumnya dari local storage
  var history = JSON.parse(localStorage.getItem("groupDivisionHistory")) || [];

  // Menambahkan hasil inputan ke dalam riwayat
  history.push(inputResult);

  // Menyimpan riwayat baru ke dalam local storage
  localStorage.setItem("groupDivisionHistory", JSON.stringify(history));

  var names = namesInput
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");

  if (
    names.length === 0 ||
    isNaN(groupCount) ||
    isNaN(peoplePerGroup) ||
    groupCount <= 0 ||
    peoplePerGroup <= 0
  ) {
    alert("Tolong Masukan Jumlah Inputan Kelompoknya");
    return;
  }

  var totalPeople = names.length;
  var remainingPeople = totalPeople % groupCount;
  var groupSizes = [];
  var currentGroupIndex = 0;

  // Shuffle the array of names
  names = shuffle(names);

  // Ambil daftar nama secara acak
  var chosenList = chooseRandomList();

  // Reorder names based on the chosen list (sortedNames1 or sortedNames2)
  names.sort((a, b, c) => {
    return chosenList.indexOf(a) - chosenList.indexOf(b);
  });

  var result = "";

  // Menambahkan bagian atas hanya sekali
  result += "<h3><strong>Nama Mata Kuliah:</strong> " + taskName + "</h3> <br>";

  for (var i = 0; i < groupCount; i++) {
    var groupSize = Math.floor(totalPeople / groupCount);
    if (remainingPeople > 0) {
      groupSize++;
      remainingPeople--;
    }
    groupSizes.push(groupSize);

    result += "<div class='group'>";
    result +=
      "<h3>*Kelompok " + (i + 1) + ": " + groupSizes[i] + " Orang*</h3>";
    for (var j = 0; j < groupSizes[i]; j++) {
      var currentName = names[currentGroupIndex];
      result += "<p class='member'>" + currentName + "</p>";
      currentGroupIndex++;
    }
    result += "</div>";
  }

  document.getElementById("result").innerHTML = result;

  // Menampilkan SweetAlert2 dengan timer auto close
  Swal.fire({
    title: "Memproses Pengacakan Kelompok!",
    html: "I will close in <b></b> milliseconds.",
    timer: 3000, // Waktu dalam milidetik (misalnya 5000 ms = 5 detik)
    timerProgressBar: true, // Menampilkan progress bar timer
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });

  // Menghentikan timer jika pengguna menutup SweetAlert2 sebelum waktu habis
  swalTimer = setTimeout(() => {
    Swal.close();
  }, 5000); // Sesuaikan dengan waktu timer di atas

  document.getElementById("copyButton").disabled = false; // Aktifkan tombol "Salin Data"
  document.getElementById("copyButton").classList.remove("cursor-not-allowed");

  // Mengacak ulang probabilitas setiap kali fungsi dipanggil
  probabilities = probabilities.map(() => Math.random());
}

function copyResult() {
  var resultText = document.getElementById("result").innerText;

  // Buat sebuah elemen textarea untuk menampung data hasil
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = resultText;

  // Sembunyikan elemen textarea dari tampilan
  tempTextArea.style.position = "absolute";
  tempTextArea.style.left = "-9999px";
  tempTextArea.style.top = "0";

  // Tambahkan elemen textarea ke dalam dokumen
  document.body.appendChild(tempTextArea);

  // Pilih dan salin teks dalam elemen textarea
  tempTextArea.select();
  document.execCommand("copy");

  // Hapus elemen textarea setelah menyalin
  document.body.removeChild(tempTextArea);

  // Beri tahu pengguna bahwa data telah disalin
  Swal.fire({
    title: "Data Berhasil disalin!",
    text: "Data Hasil Pembagian Kelompok Siap di Bagikan",
    icon: "success",
  });
}

// Menambahkan event listener untuk event sebelum halaman ditinggalkan (refresh atau tutup)
window.addEventListener("beforeunload", function (event) {
  event.preventDefault(); // Mencegah browser melakukan refresh atau menutup tab tanpa konfirmasi
  event.returnValue = ""; // Menetapkan pesan konfirmasi untuk browser (pada browser yang mendukung)
});

// Pada awalnya, tombol "Salin Data" akan dinonaktifkan
document.getElementById("copyButton").disabled = true;
document.getElementById("copyButton").classList.add("cursor-not-allowed");

// Array of names for sorting
var sortedNames1 = [
  "Tiara Desmitha (2210010477)",
  "Ahmad Syaifuddin (2210010111)",
  "Gita (2210010187)",
  "Angri (2210010366)",
  "Syauqan Tsauri (2210010192)",
  "Aldy Rahmatillah (2210010340)",
  "Diah (2210010049)",
  "Aqli (2210010633)",
  "Haliza (2210010347)",
  "Riza (2210010234)",
  "Ammar (2210010463)",
  "Nur Falah (2210010511)",
  "Mariyani (2210010095)",
  "Ismu (2210010105)",
  "Mellyta (2210010449)",
  "Haldi (2210010283)",
  "Geraldi (2210010492)",
  "Rifqi (2210010194)",
  "Zia (2210010107)",
  "Hambali Abdan (2210010143)",
  "Januar Muzzaki (2210010182)",
  "Rio (2210010275)",
  "Amalia Putri (2210010453)",
  "Niko (2210010395)",
  "Ryandy (2210010456)",
  "Maulidi (2210010663)",
  "Akmal (2210010546)",
  "Wiza (2210010495)",
];

// Array kedua untuk pengurutan
var sortedNames2 = [
  "Mariyani (2210010095)",
  "Tiara Desmitha (2210010477)",
  "Ahmad Syaifuddin (2210010111)",
  "Diah (2210010049)",
  "Ismu (2210010105)",
  "Syauqan Tsauri (2210010192)",
  "Aldy Rahmatillah (2210010340)",
  "Aqli (2210010633)",
  "Gita (2210010187)",
  "Haliza (2210010347)",
  "Riza (2210010234)",
  "Ammar (2210010463)",
  "Nur Falah (2210010511)",
  "Angri (2210010366)",
  "Mellyta (2210010449)",
  "Haldi (2210010283)",
  "Geraldi (2210010492)",
  "Rifqi (2210010194)",
  "Hambali Abdan (2210010143)",
  "Januar Muzzaki (2210010182)",
  "Akmal (2210010546)",
  "Amalia Putri (2210010453)",
  "Niko (2210010395)",
  "Ryandy (2210010456)",
  "Maulidi (2210010663)",
  "Rio (2210010275)",
  "Wiza (2210010495)",
  "Zia (2210010107)",
];

var sortedNames3 = [
  "Haldi (2210010283)",
  "Maulidi (2210010663)",
  "Riza (2210010234)",
  "Diah (2210010049)",
  "Ammar (2210010463)",
  "Gita (2210010187)",
  "Mariyani (2210010095)",
  "Tiara Desmitha (2210010477)",
  "Ahmad Syaifuddin (2210010111)",
  "Aldy Rahmatillah (2210010340)",
  "Syauqan Tsauri (2210010192)",
  "Ismu (2210010105)",
  "Haliza (2210010347)",
  "Mellyta (2210010449)",
  "Aqli (2210010633)",
  "Angri (2210010366)",
  "Januar Muzzaki (2210010182)",
  "Ryandy (2210010456)",
  "Wiza (2210010495)",
  "Zia (2210010107)",
  "Niko (2210010395)",
  "Akmal (2210010546)",
  "Geraldi (2210010492)",
  "Amalia Putri (2210010453)",
  "Rifqi (2210010194)",
  "Nur Falah (2210010511)",
  "Rio (2210010275)",
  "Hambali Abdan (2210010143)",
];

var sortedNames4 = [
  "Januar Muzzaki (2210010182)",
  "Haldi (2210010283)",
  "Rifqi (2210010194)",
  "Ismu (2210010105)",
  "Riza (2210010234)",
  "Syauqan Tsauri (2210010192)",
  "Zia (2210010107)",
  "Gita (2210010187)",
  "Rio (2210010275)",
  "Niko (2210010395)",
  "Akmal (2210010546)",
  "Haliza (2210010347)",
  "Diah (2210010049)",
  "Angri (2210010366)",
  "Mellyta (2210010449)",
  "Ammar (2210010463)",
  "Tiara Desmitha (2210010477)",
  "Ahmad Syaifuddin (2210010111)",
  "Wiza (2210010495)",
  "Nur Falah (2210010511)",
  "Hambali Abdan (2210010143)",
  "Geraldi (2210010492)",
  "Ryandy (2210010456)",
  "Mariyani (2210010095)",
  "Amalia Putri (2210010453)",
  "Aldy Rahmatillah (2210010340)",
  "Aqli (2210010633)",
  "Maulidi (2210010663)",
];

var sortedNames5 = [
  "Diah (2210010049)",
  "Aqli (2210010633)",
  "Haliza (2210010347)",
  "Riza (2210010234)",
  "Ammar (2210010463)",
  "Nur Falah (2210010511)",
  "Mariyani (2210010095)",
  "Ismu (2210010105)",
  "Mellyta (2210010449)",
  "Haldi (2210010283)",
  "Geraldi (2210010492)",
  "Rifqi (2210010194)",
  "Zia (2210010107)",
  "Hambali Abdan (2210010143)",
  "Januar Muzzaki (2210010182)",
  "Akmal (2210010546)",
  "Amalia Putri (2210010453)",
  "Niko (2210010395)",
  "Ryandy (2210010456)",
  "Maulidi (2210010663)",
  "Rio (2210010275)",
  "Wiza (2210010495)",
  "Aldy Rahmatillah (2210010340)",
  "Ahmad Syaifuddin (2210010111)",
  "Gita (2210010187)",
  "Angri (2210010366)",
  "Syauqan Tsauri (2210010192)",
  "Tiara Desmitha (2210010477)",
];

var sortedNames6 = [
  "Syauqan Tsauri (2210010192)",
  "Haliza (2210010347)",
  "Januar Muzzaki (2210010182)",
  "Maulidi (2210010663)",
  "Riza (2210010234)",
  "Gita (2210010187)",
  "Ismu (2210010105)",
  "Ahmad Syaifuddin (2210010111)",
  "Angri (2210010366)",
  "Mariyani (2210010095)",
  "Tiara Desmitha (2210010477)",
  "Aqli (2210010633)",
  "Haldi (2210010283)",
  "Diah (2210010049)",
  "Ammar (2210010463)",
  "Geraldi (2210010492)",
  "Aldy Rahmatillah (2210010340)",
  "Nur Falah (2210010511)",
  "Zia (2210010107)",
  "Hambali Abdan (2210010143)",
  "Rifqi (2210010194)",
  "Rio (2210010275)",
  "Akmal (2210010546)",
  "Wiza (2210010495)",
  "Amalia Putri (2210010453)",
  "Niko (2210010395)",
  "Ryandy (2210010456)",
  "Mellyta (2210010449)",
  "Ahmad Syaifuddin (2210010111)",
];

var sortedNames7 = [
  "Mariyani (2210010095)",
  "Ahmad Syaifuddin (2210010111)",
  "Nur Falah (2210010511)",
  "Aqli (2210010633)",
  "Diah (2210010049)",
  "Ryandy (2210010456)",
  "Haldi (2210010283)",
  "Gita (2210010187)",
  "Ammar (2210010463)",
  "Haliza (2210010347)",
  "Riza (2210010234)",
  "Hambali Abdan (2210010143)",
  "Angri (2210010366)",
  "Niko (2210010395)",
  "Rifqi (2210010194)",
  "Ismu (2210010105)",
  "Maulidi (2210010663)",
  "Zia (2210010107)",
  "Januar Muzzaki (2210010182)",
  "Tiara Desmitha (2210010477)",
  "Amalia Putri (2210010453)",
  "Wiza (2210010495)",
  "Syauqan Tsauri (2210010192)",
  "Aldy Rahmatillah (2210010340)",
  "Geraldi (2210010492)",
  "Rio (2210010275)",
  "Akmal (2210010546)",
  "Mellyta (2210010449)",
];

var sortedNames8 = [
  "Mariyani (2210010095)",
  "Aldy Rahmatillah (2210010340)",
  "Mellyta (2210010449)",
  "Diah (2210010049)",
  "Haliza (2210010347)",
  "Hambali Abdan (2210010143)",
  "Ismu (2210010105)",
  "Niko (2210010395)",
  "Ahmad Syaifuddin (2210010111)",
  "Aqli (2210010633)",
  "Geraldi (2210010492)",
  "Gita (2210010187)",
  "Rifqi (2210010194)",
  "Ammar (2210010463)",
  "Rio (2210010275)",
  "Syauqan Tsauri (2210010192)",
  "Zia (2210010107)",
  "Nur Falah (2210010511)",
  "Angri (2210010366)",
  "Akmal (2210010546)",
  "Ryandy (2210010456)",
  "Januar Muzzaki (2210010182)",
  "Amalia Putri (2210010453)",
  "Tiara Desmitha (2210010477)",
  "Haldi (2210010283)",
  "Wiza (2210010495)",
  "Maulidi (2210010663)",
  "Riza (2210010234)",
];

// Daftar semua pengaturan untuk diakses dalam fungsi chooseRandomList
var sortedNamesList = [
  sortedNames1,
  sortedNames2,
  sortedNames3,
  sortedNames4,
  sortedNames5,
  sortedNames6,
  sortedNames7,
  sortedNames8,
];

// Kode untuk menampilkan riwayat sebelumnya
function displayHistory() {
  var history = JSON.parse(localStorage.getItem("groupDivisionHistory")) || [];
  var historyHtml = "<h2>Riwayat Pembagian Kelompok Sebelumnya</h2>";
  history.forEach(function (inputResult, index) {
    historyHtml +=
      "<div class='history-item'><h3>Hasil " +
      (index + 1) +
      ":</h3><p><strong>Nama Mata Kuliah:</strong> " +
      inputResult.taskName +
      "</p><p><strong>Jumlah Kelompok:</strong> " +
      inputResult.groupCount +
      "</p><p><strong>Anggota Per Kelompok:</strong> " +
      inputResult.peoplePerGroup +
      "</p><p><strong>Daftar Nama:</strong> " +
      inputResult.names +
      "</p></div>";
  });
  document.getElementById("history").innerHTML = historyHtml;
}

// Panggil fungsi untuk menampilkan riwayat saat halaman dimuat
displayHistory();
