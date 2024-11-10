document.addEventListener("DOMContentLoaded", function() {
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
  