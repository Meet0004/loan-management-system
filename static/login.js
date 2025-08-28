var inP = $(".input-field"); // Ensure this is a jQuery object

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

document.querySelector("#go").addEventListener("click",async (event) => {
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

    // check karne ki username exists in RegisterUser collection
    try {
      const response = await fetch(`/check-username/${username}`);
      const result = await response.json();

      if (result.exists) {
        // alert("Proceeding...");
      } else {
        alert("Username doesn't already exists. Please get Register.");
        return;
      }
    } catch (error) {
        alert("Error checking username. Please try again.");
        console.error("Error:", error);
    }

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
          window.location.href = '';
      } else {
          alert("Invalid username or password.");
          return;
      }
      } catch (error) {
        alert("Error checking credentials. Please try again.");
        console.error("Error:", error);
      }
    //fetchUserData(username);
    //redirect to a new URL
    window.location.href = '';
});

document.getElementById("next").addEventListener('click', async (event) => {
    event.preventDefault();

    const newUser = document.getElementById('newUserName').value;
    const newPassword = document.getElementById('newPassword1').value;
    const confirmPassword = document.getElementById('newPassword2').value;

    if(newPassword !== confirmPassword){
        alert("Passwords do not match!");
        return;
    }
    if(!newUser || !newPassword || !confirmPassword){
        alert("Please enter all fields!");
        return;
    }
    try {
        const response = await fetch(`/check-username/${newUser}`);
        const result = await response.json();

        if (result.exists) {
            alert("Username already exists. Please choose another.");
            return;
        } else {
            alert("Username is available! Proceeding...");
            // document.getElementById("paisa").innerText = '50000';  // lol ye ni hoga
        }
    } catch (error) {
        alert("Error checking username. Please try again.");
        console.error("Error:", error); 
    }

    localStorage.setItem("username", newUser);
    localStorage.setItem("password", newPassword);

    console.log("Username:", newUser);
    console.log("Password:", newPassword);

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
    await console.log('data sent')
    const result = await response.json();
    alert(result.message)
    await console.log('Hogya?')

    
    $(".regTag").trigger("click");
    setTimeout(() => {
        $(".formBox").removeClass("level-reg").addClass("level-login level-reg-revers");
    }, 100);

});
