// Determine API base URL based on environment
const API_BASE_URL = window.location.origin; // This will work for both localhost and production

// Rest of your jQuery code remains the same
var inP = $(".input-field");

inP
  .on("blur", function () {
    if (!this.value) {
      $(this).parent(".f_row").removeClass("focus");
    } else {
      $(this).parent(".f_row").addClass("focus");
    }
  })
  .on("focus", function () {
    $(this).parent(".f_row").addClass("focus");
    $(".btn").removeClass("active");
    $(".f_row").removeClass("shake");
  });

$(".resetTag").click(function (e) {
  e.preventDefault();
  $(".formBox").addClass("level-forget").removeClass("level-reg");
});

$(".back").click(function (e) {
  e.preventDefault();
  $(".formBox").removeClass("level-forget").addClass("level-login");
});

$(".regTag").click(function (e) {
  e.preventDefault();
  $(".formBox").removeClass("level-reg-revers");
  $(".formBox").toggleClass("level-login").toggleClass("level-reg");
  if (!$(".formBox").hasClass("level-reg")) {
    $(".formBox").addClass("level-reg-revers");
  }
});

$("#go").each(function () {
  $(this).on("click", function (e) {
    e.preventDefault();

    var finp = $(this).parent("form").find("input");

    console.log(finp.html());

    if (!finp.val() == 0) {
      $(this).addClass("active");
    }

    setTimeout(function () {
      inP.val("");

      $(".f_row").removeClass("shake focus");
      $("#go").removeClass("active");
    }, 2000);

    if (inP.val() == 0) {
      inP.parent(".f_row").addClass("shake");
    }
  });
});

// Updated login function with proper API URLs
document.querySelector("#go").addEventListener("click", async (event) => {
  event.preventDefault();

  const username = document.getElementById('userName').value;  
  const password = document.getElementById('password').value;

  if ((!username || !password)) {
    alert("Please enter both username and password!");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  console.log("Username:", username);
  console.log("Password:", password);

  // Check if username exists - using relative URL
  try {
    const response = await fetch(`/check-username/${username}`);
    const result = await response.json();

    if (result.exists) {
      // Username exists, proceed with login
    } else {
      alert("Username doesn't exist. Please register first.");
      return;
    }
  } catch (error) {
    alert("Error checking username. Please try again.");
    console.error("Error:", error);
  }

  // Check user credentials - using relative URL
  try {
    const response = await fetch("/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.valid) {
      alert("Login successful! Proceeding...");
      localStorage.setItem("username", username);
      window.location.href = '/'; // Redirect to home page
    } else {
      alert("Invalid username or password.");
      return;
    }
  } catch (error) {
    alert("Error checking credentials. Please try again.");
    console.error("Error:", error);
  }
});

// Updated registration function with proper API URLs
document.getElementById("next").addEventListener('click', async (event) => {
  event.preventDefault();

  const newUser = document.getElementById('newUserName').value;
  const newPassword = document.getElementById('newPassword1').value;
  const confirmPassword = document.getElementById('newPassword2').value;

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  
  if (!newUser || !newPassword || !confirmPassword) {
    alert("Please enter all fields!");
    return;
  }
  
  // Check if username exists - using relative URL
  try {
    const response = await fetch(`/check-username/${newUser}`);
    const result = await response.json();

    if (result.exists) {
      alert("Username already exists. Please choose another.");
      return;
    }
  } catch (error) {
    alert("Error checking username. Please try again.");
    console.error("Error:", error); 
  }

  localStorage.setItem("username", newUser);
  localStorage.setItem("password", newPassword);

  console.log("Username:", newUser);
  console.log("Password:", newPassword);

  // Register user - using relative URL
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser,
        password: newPassword
      })
    });
    
    const result = await response.json();
    alert(result.message);
    
    // Switch back to login form
    $(".regTag").trigger("click");
    setTimeout(() => {
      $(".formBox").removeClass("level-reg").addClass("level-login level-reg-revers");
    }, 100);
  } catch (error) {
    alert("Registration failed. Please try again.");
    console.error("Error:", error);
  }
});
