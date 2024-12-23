(function () {
    // Sidebar Toggle Function
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content');

        // Toggle sidebar and content margin
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('sidebar-collapsed');
    }

    // Set active link on page load
    document.addEventListener("DOMContentLoaded", function () {
        const currentLocation = window.location.pathname;
        const menuItems = document.querySelectorAll('.sidebar a');

        menuItems.forEach(item => {
            if (item.href.includes(currentLocation)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });


    // Set active link on click
    document.querySelectorAll('.sidebar ul li').forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelectorAll('.sidebar ul li').forEach(function (item) {
                item.classList.remove('active'); // Remove 'active' class from all items
            });
            this.classList.add('active'); // Add 'active' class to clicked item
        });
    });

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

    // Expose functions if needed outside of IIFE
    window.toggleSidebar = toggleSidebar;
    window.editPhone = editPhone;
    window.savePhone = savePhone;
    window.editAddress = editAddress;
    window.saveAddress = saveAddress;

})();
