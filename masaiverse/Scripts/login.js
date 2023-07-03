
function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "admin.html";
  }
  function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(function(response) {
      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "admin.html";
      } else {
        alert("Login failed");
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });
  }
  document.getElementById("admin-login-form").addEventListener("submit", handleSubmit);
  