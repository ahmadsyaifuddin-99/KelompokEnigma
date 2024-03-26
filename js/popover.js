document.addEventListener("DOMContentLoaded", function () {
  var popoverButton = document.getElementById("popoverButton");
  var customPopover = document.getElementById("customPopover");

  // Tampilkan popover saat tombol diklik
  popoverButton.addEventListener("click", function () {
    customPopover.style.display = "block";
  });

  // Sembunyikan popover saat dokumen diklik di luar popover
  document.addEventListener("click", function (event) {
    if (
      !popoverButton.contains(event.target) &&
      !customPopover.contains(event.target)
    ) {
      customPopover.style.display = "none";
    }
  });
});
