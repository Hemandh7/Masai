document.addEventListener("DOMContentLoaded", function() {
   
    fetch("https://masaiverse-y4z6.onrender.com/users")
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(function(data) {
        generateReport(data);
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  });
  
  function generateReport(users) {
    var reportTable = document.getElementById("report-table");
    var totalGuests = users.length;
    var studentsCount = 0;
    var workingProfessionalsCount = 0;
    var totalAge = 0;
  
    users.forEach(function(user) {
      if (user.profession.toLowerCase() === "student") {
        studentsCount++;
      } else  {
        workingProfessionalsCount++;
      }
  
      totalAge += parseInt(user.age);
    });
  
    var averageAge = totalAge / totalGuests;

    // let table = document.getElementById("report-table")
  
    var row = document.createElement("tr");
  
    var totalGuestsCell = document.createElement("td");
    totalGuestsCell.innerText = totalGuests;
    row.append(totalGuestsCell);
  
    var studentsCountCell = document.createElement("td");
    studentsCountCell.innerText = studentsCount;
    row.append(studentsCountCell);
  
    var workingProfessionalsCountCell = document.createElement("td");
    workingProfessionalsCountCell.innerText = workingProfessionalsCount;
    row.append(workingProfessionalsCountCell);
  
    var averageAgeCell = document.createElement("td");
    averageAgeCell.innerText = averageAge.toFixed(2);
    row.append(averageAgeCell);
  
    reportTable.append(row);
  }
  console.log(workingProfessionalsCount);