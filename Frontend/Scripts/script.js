document.addEventListener("DOMContentLoaded", function () {
  // Get the toggle switch and the tab content elements
  const toggleSwitch = document.getElementById("toggleSwitch");
  const loginForm = document.getElementById("pills-login");
  const registerForm = document.getElementById("pills-register");

  // Function to switch between login and register forms
  function switchForms() {
    if (toggleSwitch.checked) {
      loginForm.classList.add("show", "active");
      registerForm.classList.remove("show", "active");
    } else {
      loginForm.classList.remove("show", "active");
      registerForm.classList.add("show", "active");
    }
  }

  // Initially load the correct form based on the toggle state
  switchForms();

  // Event listener for the toggle switch change
  toggleSwitch.addEventListener("change", switchForms);

  // Event listener for the "Register" link in the login form
  document.getElementById("registerLink").addEventListener("click", function (e) {
    e.preventDefault();
    toggleSwitch.checked = !toggleSwitch.checked; // Toggle the switch
    toggleSwitch.dispatchEvent(new Event("change")); // Trigger the change event
  });
});

// JavaScript to highlight the active tab
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.sidebar a');
  links.forEach(link => {
    link.addEventListener('click', function () {
      links.forEach(l => l.classList.remove('active')); // Remove active class from all links
      this.classList.add('active'); // Add active class to clicked link
    });
  });

  // Optionally, add an active class based on the current page
  const currentPage = window.location.pathname;
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});



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

          window.location.href = 'home.html';
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

// userprofile
document.addEventListener("DOMContentLoaded", function () {
  const userId = "6730407923af6ed86bf9ac3b";  // Replace with dynamic user ID
  const apiUrl = `${process.env.REACT_APP_URL}/api/user/${userId}`;

  // Fetch user data from API and populate the form
  axios.get(apiUrl)
      .then(response => {
          const user = response.data.user;
          populateUserData(user);
      })
      .catch(error => {
          console.error('Error fetching user data:', error);
      });
});

// Populate user data into the form
function populateUserData(user) {
  document.getElementById('firstName').value = user.firstName;
  document.getElementById('lastName').value = user.lastName;
  document.getElementById('email').value = user.email;
  document.getElementById('phoneNumber').value = user.phoneNumber;
  document.getElementById('dateOfBirth').value = user.dateOfBirth || '';
  document.getElementById('billingCycle').value = user.billingCycle;
  document.getElementById('address').value = `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zipCode}`;
  // You can add logic to display profile picture if available
}

// Toggle the edit mode
function toggleEdit() {
  const isEditing = document.getElementById('firstName').disabled;

  // Toggle the disabled property of inputs
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.disabled = !isEditing);

  // Show/Hide the Edit and Save buttons
  document.getElementById('editBtn').style.display = isEditing ? 'none' : 'inline-block';
  document.getElementById('saveBtn').style.display = isEditing ? 'inline-block' : 'none';
}

// Save the profile data
function saveProfile() {
  
  const userId = JSON.parse(localStorage.getItem('authuser')).user._id; 
  const apiUrl = `https://electricity-billing-system.onrender.com/api/auth/user/${userId}`;
  
  // Gather updated data
  const updatedData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      dateOfBirth: document.getElementById('dateOfBirth').value,
      billingCycle: document.getElementById('billingCycle').value,
      address: document.getElementById('address').value,
      // Handle profile picture upload if needed
  };

  axios.put(apiUrl, updatedData)
      .then(response => {
          alert('Profile updated successfully');
          toggleEdit();  // Switch back to non-editable mode
      })
      .catch(error => {
          console.error('Error saving profile:', error);
      });
}
