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

  for (var i = 0; i < groupCount; i++) {
    var groupSize = Math.floor(totalPeople / groupCount);
    if (remainingPeople > 0) {
      groupSize++;
      remainingPeople--;
    }
    groupSizes.push(groupSize);

    result += "<div class='group'>";
    result += "<h3>Group " + (i + 1) + ": " + groupSizes[i] + " people</h3>";
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
}
