document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const loginForm = document.getElementById('pills-login');
  const registerForm = document.getElementById('pills-register');
  const switchLabel = document.getElementById('switchLabel');
  
  // Initially show the login form
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';

  // Listen for changes to the toggle switch
  toggleSwitch.addEventListener('change', function() {
    if (toggleSwitch.checked) {
      // If switch is on, show login form
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      switchLabel.innerText = "Login";
    } else {
      // If switch is off, show register form
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
      switchLabel.innerText = "Register";
    }
  });

  // Ensure initial state of the toggle corresponds to the login form
  if (!toggleSwitch.checked) {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    switchLabel.innerText = "Register";
  }
});


//login function
document.getElementById('login').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the values from the input fields
  const email = document.getElementById('loginName').value;
  const password = document.getElementById('loginPassword').value;

  // Validate input
  if (!email || !password) {
      alert('Please enter both email and password.');
      return;
  }

  const loginData = {
      email: email,
      password: password
  };

  fetch('https://electricity-billing-system.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(loginData) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Login failed. Please check your credentials.');
      }
      return response.json(); // Parse the JSON response
  })
  .then(data => {
      if (data.message === 'Login successful') {
          localStorage.setItem('authuser', JSON.stringify(data));

          window.location.href = 'dashboard.html';
      } else {
          alert('Login failed: ' + (data.message || 'Unknown error'));
      }
  })
  .catch(error => {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
  });
});


// Register
document.getElementById("register").addEventListener("click", function (event) {
  event.preventDefault(); 

  const firstName = document.getElementById("registerFirstName").value;
  const lastName = document.getElementById("registerLastName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!firstName || !lastName || !email || !password) {
    alert("All fields are required.");
    return;
  }

  const registerData = { firstName, lastName, email, password };

  fetch("https://electricity-billing-system.onrender.com/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((response) => {
      console.log('Response status:', response.status); 
      return response.json();
    })
    .then((data) => {
      console.log('Response data:', data);
      if (data.message) {
        alert("Registration successful!");
        localStorage.setItem('authuser', JSON.stringify(data));
        window.location.href = 'userprofile.html'; 
      } else {
        alert(data.error || data.message || "Unknown error");
      }
    })
    .catch((error) => {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    });
});
