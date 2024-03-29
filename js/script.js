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

  // ... kode lainnya untuk membagi kelompok dan menampilkan hasil

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

  // Check if npm 2210010111 is present
  var has2210010111 = names.includes("2210010111");
  // Check if npm 2210010477 is present
  var has2210010477 = names.includes("2210010477");

  var result = "";

  // Menambahkan bagian atas hanya sekali
  result +=
    "<h3><strong>Nama Tugas atau Mata Kuliah:</strong> " + taskName + "</h3>";

  for (var i = 0; i < groupCount; i++) {
    var groupSize = Math.floor(totalPeople / groupCount);
    if (remainingPeople > 0) {
      groupSize++;
      remainingPeople--;
    }
    groupSizes.push(groupSize);

    result += "<div class='group'>";
    result += "<h3>Kelompok " + (i + 1) + ": " + groupSizes[i] + " Orang</h3>";
    for (var j = 0; j < groupSizes[i]; j++) {
      var currentName = names[currentGroupIndex];
      result += "<p class='member'>" + currentName + "</p>";
      currentGroupIndex++;
      // Check if current name is npm 2210010111 and assign other npm numbers to the same group
      if (currentName === "2210010111" && has2210010111) {
        var otherNPMs = [
          "2210010366",
          "2210010546",
          "2210010283",
          "2210010095",
          "2210010477",
          "2210010187",
          "2210010347",
        ];
        otherNPMs.forEach((npm) => {
          if (names.includes(npm)) {
            result += "<p class='member'>" + npm + "</p>";
            currentGroupIndex++;
          }
        });
      }
      // Check if current name is npm 2210010477 and assign other npm numbers to the same group
      else if (currentName === "2210010477" && has2210010477) {
        var otherNPMs = ["2210010049", "2210010187", "2210010347"];
        otherNPMs.forEach((npm) => {
          if (names.includes(npm)) {
            result += "<p class='member'>" + npm + "</p>";
            currentGroupIndex++;
          }
        });
      }
    }
    result += "</div>";
  }

  document.getElementById("result").innerHTML = result;
  document.getElementById("copyButton").disabled = false; // Aktifkan tombol "Salin Data"
  document.getElementById("copyButton").classList.remove("cursor-not-allowed");
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
