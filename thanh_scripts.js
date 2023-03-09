function getData(peopleList) {
  var people = peopleList || ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];
  var groups = [];

  // Shuffle people array to randomize the order
  people = shuffle(people);

  // Divide people into groups
  var groupSize = Math.floor(people.length / 7); // round down to ensure all groups have equal or fewer members
  var remainder = people.length % 7; // find the remainder of people that don't fit into an equal number of groups
  var startIndex = 0;
  for (var i = 0; i < 7; i++) {
    var group = [];
    for (var j = startIndex; j < startIndex + groupSize; j++) {
      if (people[j]) {
        group.push(people[j]);
      }
    }
    startIndex += groupSize;
    if (remainder > 0 && startIndex < people.length) { // if there are people remaining, add them to a group
      group.push(people[startIndex]);
      startIndex++;
      remainder--;
    }
    groups.push(group);
  }

  // Randomly distribute remaining people to groups
  while (remainder > 0) {
    var randomIndex = Math.floor(Math.random() * groups.length);
    if (groups[randomIndex].length < groupSize + 1) { // only add to group if it won't exceed groupSize
      groups[randomIndex].push(people[startIndex]);
      startIndex++;
      remainder--;
    }
  }

  // Return the new data
  var newData = { 
    "Thứ 2": groups[0],
    "Thứ 3": groups[1],
    "Thứ 4": groups[2],
    "Thứ 5": groups[3],
    "Thứ 6": groups[4],
    "Thứ 7": groups[5],
    "Chủ Nhật": groups[6]
  };
  return newData;
}



function updateHTML(newData) {
  var html = "";
  for (var key in newData) {
    if (newData.hasOwnProperty(key)) {
      html += "<p>" + key + ":</p><ul>";
      for(var i = 0; i < newData[key].length; i++) {
        html += "<li>" + newData[key][i] + "</li>";
      }
      html += "</ul>";
    }
  }
  // Clear old data before updating with new data
  $("#result").empty();
  // Update HTML with new data
  $("#result").html(html);
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


// Refresh data when button is clicked
$("#refresh-button").off("click").on("click", function() {
  // Get new data
  var newData = getData();
let arrayGroups = shuffle(Object.values(newData))
var finalData = {}
for(var i=0;i<7;i++){
  finalData[Object.keys(newData)[i]] = arrayGroups[i];
}
  // Update HTML with new data
  updateHTML(finalData);

});
