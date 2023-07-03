document.getElementById("user-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const place = document.getElementById("place").value;
    const batch = document.getElementById("batch-name").value;
    const profession = document.getElementById("profession").value;
  
    const user = {
      name: name,
      age: age,
      place: place,
      batch_name: batch,
      profession: profession
    };
    fetch("https://masaiverse-y4z6.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(function(response) {
      if (response.ok) {
        alert("Successfully registered");
      } else {
        alert("An Error has occurred. Please try again");
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });
  });
  