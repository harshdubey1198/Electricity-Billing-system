(function () {
    // Sidebar Toggle Function
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content');

        // Toggle sidebar and content margin
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('sidebar-collapsed');
    }

    // Edit and Save Phone Number
    function editPhone() {
        document.getElementById('phone-text').style.display = 'none';
        document.getElementById('phone-input').style.display = 'block';
        document.getElementById('edit-phone-btn').style.display = 'none';
        document.getElementById('save-phone-btn').style.display = 'inline-block';
    }

    function savePhone() {
        var phoneValue = document.getElementById('phone-input').value;
        document.getElementById('phone-text').textContent = phoneValue;
        document.getElementById('phone-text').style.display = 'block';
        document.getElementById('phone-input').style.display = 'none';
        document.getElementById('edit-phone-btn').style.display = 'inline-block';
        document.getElementById('save-phone-btn').style.display = 'none';
    }

    // Edit and Save Address
    function editAddress() {
        document.getElementById('address-text').style.display = 'none';
        document.getElementById('address-input').style.display = 'block';
        document.getElementById('edit-address-btn').style.display = 'none';
        document.getElementById('save-address-btn').style.display = 'inline-block';
    }

    function saveAddress() {
        var addressValue = document.getElementById('address-input').value;
        document.getElementById('address-text').textContent = addressValue;
        document.getElementById('address-text').style.display = 'block';
        document.getElementById('address-input').style.display = 'none';
        document.getElementById('edit-address-btn').style.display = 'inline-block';
        document.getElementById('save-address-btn').style.display = 'none';
    }

    // Set active link (both on page load and on click)
    function setActiveLink() {
        const currentLocation = window.location.pathname;
        const menuItems = document.querySelectorAll('.sidebar a');

        menuItems.forEach(item => {
            if (item.href.includes(currentLocation)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', setActiveLink);

    // Set active link on click
    document.querySelectorAll('.sidebar ul li').forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelectorAll('.sidebar ul li').forEach(function (item) {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Expose functions if needed outside of IIFE
    window.toggleSidebar = toggleSidebar;
    window.editPhone = editPhone;
    window.savePhone = savePhone;
    window.editAddress = editAddress;
    window.saveAddress = saveAddress;
})();

// User Data Management - Populating Data Differently Based on Active Page
document.addEventListener('DOMContentLoaded', () => {
    const authData = JSON.parse(localStorage.getItem('authuser'));

    if (authData && authData.user) {
        const user = authData.user;

        // Get the current page or section (e.g., 'home', 'profile', 'settings', etc.)
        const currentPage = window.location.pathname.split("/").pop().split(".")[0]; // e.g., 'profile.html' -> 'profile'

        // Populate data based on the page
        switch (currentPage) {
            case 'home':
                // Home page data population
                document.querySelector('.header h1').textContent = `Welcome, ${user.firstName}!`;
                document.querySelector('.profile-info h3').textContent = `${user.firstName} ${user.lastName}`;
                document.querySelector('.profile-info p').textContent = `Email: ${user.email}`;

                // If you have the profile picture URL stored, update it
                if (user.profilePicture) {
                    document.querySelector('.profile-image img').src = user.profilePicture;
                }
                break;

            case 'profile':
                //Profile page data population
                break;

            case 'setting':
                // Settings page data population (e.g., phone, address, and profile picture)

                // Update Profile Picture (if user has one)
                if (user.profilePicture) {
                    document.getElementById('profile-picture-text').value = user.profilePicture;
                }

                // Update Account Holder Name
                document.getElementById('account-holder-name').textContent = `${user.firstName} ${user.lastName}`;

                // Update Email
                document.getElementById('email').textContent = user.email;

                // Update Phone Number
                document.getElementById('phone-text').textContent = user.phoneNumber;
                document.getElementById('phone-input').value = user.phoneNumber;

                // Update Address
                document.getElementById('address-text').textContent = user.address;
                document.getElementById('address-input').value = user.address;

                // Add Role and Billing Cycle (optional, based on your data structure)
                document.querySelector('.profile-info').insertAdjacentHTML('beforeend', `
                        <p>Role: ${user.role}</p>
                        <p>Billing Cycle: ${user.billingCycle}</p>
                    `);
                break;

            case 'payments':
                // Payments page data population
                // Add logic to display payment data (this would depend on your app's logic)
                break;

            case 'bills':
                // Bills page data population
                // Add logic to display bill data (this would depend on your app's logic)
                break;

            default:
                console.error('No data to display for this page');
        }
    } else {
        console.error('No user data found');
    }
});

// Logout Functionality
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('authuser');
    window.location.href = 'login.html';
    window.location.reload(true);
});
