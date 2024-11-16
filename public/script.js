// Modal functionality
const showModal = (modal) => {
    modal.style.display = 'block';
};

const hideModal = (modal) => {
    modal.style.display = 'none';
};

// Open modal for Your Connections
const connectionsBtn = document.getElementById('connections-btn');
const connectionsModal = document.getElementById('connections-modal');
const closeConnectionsModal = document.getElementsByClassName('close')[0];

// Open modal when clicking on the navbar link
connectionsBtn.addEventListener('click', () => {
    showModal(connectionsModal);
    getSimilarUsers('Coding,Music'); // Call this function with appropriate interests
});

// Close modal when clicking on the close button
closeConnectionsModal.addEventListener('click', () => {
    hideModal(connectionsModal);
});

// Close modal when clicking anywhere outside the modal
window.addEventListener('click', (event) => {
    if (event.target === connectionsModal) {
        hideModal(connectionsModal);
    }
});

// Login and Signup Modal Functionality
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const authModal = document.getElementById('auth-modal');
const loginCard = document.getElementById('login-card');
const signupCard = document.getElementById('signup-card');

// Open Login Card
loginBtn.addEventListener('click', () => {
    showModal(authModal);
    loginCard.style.display = 'block'; // Show login card
    signupCard.style.display = 'none'; // Hide signup card
});

// Open Signup Card
signupBtn.addEventListener('click', () => {
    showModal(authModal);
    signupCard.style.display = 'block'; // Show signup card
    loginCard.style.display = 'none'; // Hide login card
});

// Close modal when clicking on the close button for both modals
document.querySelectorAll('.close').forEach(close => {
    close.addEventListener('click', () => {
        hideModal(authModal);
        loginCard.style.display = 'block'; // Reset to login card when closing
        signupCard.style.display = 'none';
    });
});

// Close modal when clicking anywhere outside the modal for both modals
window.addEventListener('click', (event) => {
    if (event.target === authModal) {
        hideModal(authModal);
        loginCard.style.display = 'block'; // Reset to login card when closing
        signupCard.style.display = 'none';
    }
});

// Validate Email for Signup
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const rollnumberInput = document.getElementById('rollnumber');
    const branchInput = document.getElementById('branch');
    const yearInput = document.getElementById('year');
    const interestsInput = document.getElementById('interests');  // Add any other inputs needed
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const nameValue = nameInput.value.trim();
    const rollnumberValue = rollnumberInput.value.trim();
    const branchValue = branchInput.value.trim();
    const yearValue = yearInput.value.trim();
    const interestsValue = interestsInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Validate required fields
    if (!nameValue || !rollnumberValue || !branchValue || !yearValue || !interestsValue || !emailValue || !passwordValue) {
        alert('All fields are required');
        return;
    }

    // Restrict to college email format
    if (!emailValue.endsWith('@nitj.ac.in')) {
        alert('Please use a valid college email address ending with @nitj.ac.in');
        return;
    }

    // Handle signup logic here, e.g., send data to the server
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameValue,
                rollnumber: rollnumberValue,
                branch: branchValue,
                year: yearValue,
                interests: interestsValue.split(','),  // Split interests by comma
                email: emailValue,
                password: passwordValue  // Consider hashing password on backend
            })
        });

        if (response.ok) {
            alert('Signup successful!');
            hideModal(authModal);
        } else {
            const errorData = await response.json();
            alert(`Signup failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again later.');
    }
});

// Login functionality
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('input[type="email"]'); // Adjust to match the email input in login
    const passwordInput = document.querySelector('input[type="password"]'); // Adjust to match the password input in login
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Handle login logic here, e.g., send data to the server
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailValue, password: passwordValue })
        });

        if (response.ok) {
            const userData = await response.json();
            alert(`Logged in as: ${userData.email}`); // Handle successful login
            hideModal(authModal);
            // You might want to redirect or update UI here
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`); // Handle failure
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
    }
});
