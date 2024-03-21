// Inisialisasi objek untuk menyimpan frekuensi munculnya setiap sortedNames
var nameFrequency = {
  sortedNames1: 0,
  sortedNames2: 0,
  sortedNames3: 0,
  sortedNames4: 0,
  sortedNames5: 0,
};

// Jumlah panggilan chooseRandomList()
var totalCalls = 1000; // Ubah sesuai kebutuhan

// Melakukan panggilan chooseRandomList() sebanyak totalCalls kali
for (var i = 0; i < totalCalls; i++) {
  var result = chooseRandomList();
  switch (result) {
    case sortedNames1:
      nameFrequency.sortedNames1++;
      break;
    case sortedNames2:
      nameFrequency.sortedNames2++;
      break;
    case sortedNames3:
      nameFrequency.sortedNames3++;
      break;
    case sortedNames4:
      nameFrequency.sortedNames4++;
      break;
    case sortedNames5:
      nameFrequency.sortedNames5++;
      break;
    default:
      break;
  }
}

// Menampilkan hasil frekuensi munculnya setiap sortedNames
console.log("Frekuensi munculnya setiap sortedNames:");
console.log(nameFrequency);
