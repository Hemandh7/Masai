
function checkLogin() {
    isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
      window.location.href = "login.html";
    }
  }
  
  function logout() {
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "login.html";
  }
 
  document.addEventListener("DOMContentLoaded", function() {
    checkLogin();
 
    var dataLink = document.getElementById("data-link");
    var reportsLink = document.getElementById("reports-link");
  
    dataLink.addEventListener("click", function(event) {
      event.preventDefault();
  
      if (isLoggedIn) {
        window.location.href = "data.html";
      } else {
        window.location.href = "login.html";
      }
    });
    reportsLink.addEventListener("click", function(event) {
      event.preventDefault();
      if (isLoggedIn) {
        window.location.href = "reports.html";
      } else {
        window.location.href = "login.html";
      }
    });
    document.getElementById("logout-button").addEventListener("click", function() {
      logout();
    });
  });
  checkLogin();
  