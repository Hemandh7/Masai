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
        processUserData(data);
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  });
  
  function processUserData(users) {
    renderUserCards(users);
    var searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function() {
      var searchTerm = searchInput.value.toLowerCase();
      var filteredUsers = filterUsers(users, searchTerm);
      renderUserCards(filteredUsers);
    });
    var sortSelect = document.getElementById("sort-select");
    sortSelect.addEventListener("change", function() {
      var sortBy = sortSelect.value;
      var sortedUsers = sortUsers(users, sortBy);
      renderUserCards(sortedUsers);
    });
    var filterSelect = document.getElementById("filter-select");
    filterSelect.addEventListener("change", function() {
      var filterBy = filterSelect.value;
      var filteredUsers = filterUsers(users, "", filterBy);
      renderUserCards(filteredUsers);
    });
  }
  
  function renderUserCards(users) {
    var usersContainer = document.getElementById("users-container");
    usersContainer.innerHTML = "";
  
    users.forEach(function(user) {
      var userCard = createUserCard(user);
      usersContainer.appendChild(userCard);
    });
  }
  
  function createUserCard(user) {
    var card = document.createElement("div");
    card.classList.add("user-card");
  
    var name = document.createElement("h3");
    name.textContent = user.name;
    card.appendChild(name);
  
    var age = document.createElement("p");
    age.textContent = "Age: " + user.age;
    card.appendChild(age);
  
    var place = document.createElement("p");
    place.textContent = "Place: " + user.place;
    card.appendChild(place);
  
    var batch = document.createElement("p");
    batch.textContent = "Batch Name: " + user.batch_name;
    card.appendChild(batch);
  
    var profession = document.createElement("p");
    profession.textContent = "Profession: " + user.profession;
    card.appendChild(profession);
  
    var editIcon = document.createElement("span");
    editIcon.classList.add("edit-icon");
    editIcon.innerHTML = 'Edit';
    editIcon.addEventListener("click", function() {
      openEditForm(user);
    });
    card.appendChild(editIcon);
  
    var deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = 'Delete';
    deleteIcon.addEventListener("click", function() {
      deleteUser(user);
    });
    card.appendChild(deleteIcon);
  
    return card;
  }
  
  function openEditForm(user) {
    var editFormContainer = document.getElementById("edit-form-container");
    editFormContainer.style.display = "block";
  
    var editNameInput = document.getElementById("edit-name");
    var editAgeInput = document.getElementById("edit-age");
    var editPlaceInput = document.getElementById("edit-place");
    var editBatchInput = document.getElementById("edit-batch");
    var editProfessionInput = document.getElementById("edit-profession");
  
    editNameInput.value = user.name;
    editAgeInput.value = user.age;
    editPlaceInput.value = user.place;
    editBatchInput.value = user.batch_name;
    editProfessionInput.value = user.profession;
  
    var editForm = document.getElementById("edit-form");
    editForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      var updatedUser = {
        id: user.id,
        name: editNameInput.value,
        age: editAgeInput.value,
        place: editPlaceInput.value,
        batch_name: editBatchInput.value,
        profession: editProfessionInput.value
      };
      fetch("https://masaiverse-y4z6.onrender.com/users/" + user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
      })
        .then(function(response) {
          if (response.ok) {
            var userCard = document.getElementById("user-" + user.id);
            userCard.innerHTML = "";
            userCard.appendChild(createUserCard(updatedUser));
            editFormContainer.style.display = "none";
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .catch(function(error) {
          console.error("Error:", error);
        });
    });
  
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.addEventListener("click", function() {
      editFormContainer.style.display = "none";
    });
  }
  
  function deleteUser(user) {
    fetch("https://masaiverse-y4z6.onrender.com/users/" + user.id, {
      method: "DELETE"
    })
      .then(function(response) {
        if (response.ok) {
          var userCard = document.getElementById("user-" + user.id);
          userCard.remove();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  }
  
  function filterUsers(users, searchTerm, filterBy) {
    return users.filter(function(user) {
      var name = user.name.toLowerCase();
      var profession = user.profession.toLowerCase();
  
      var nameMatch = name.includes(searchTerm);
      var professionMatch = filterBy === "" || profession === filterBy.toLowerCase();
  
      return nameMatch && professionMatch;
    });
  }
  
  function sortUsers(users, sortBy) {
    var sortedUsers = users.slice();
  
    if (sortBy === "age") {
      sortedUsers.sort(function(a, b) {
        return a.age - b.age;
      });
    }
  
    return sortedUsers;
  }
  