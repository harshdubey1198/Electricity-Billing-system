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
