// Chat System - Placeholder function
const messages = document.getElementById('messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Send chat message
sendBtn.addEventListener('click', () => {
    const messageText = chatInput.value.trim();
    if (messageText !== "") {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.textContent = `You: ${messageText}`;
        messages.appendChild(newMessage);
        chatInput.value = '';
        messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
    }
});

// Connection Message Functionality
document.querySelectorAll('.connect-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Opening Chat with this user!'); // Placeholder alert for chat functionality
    });
});

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

// Fetch Similar Users Function
const getSimilarUsers = async (interests) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/similar/${interests}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();
        displaySimilarUsers(users);
    } catch (error) {
        console.error('Error fetching similar users:', error);
        alert('Failed to load similar users. Please try again later.'); // User feedback
    }
};

// Function to display similar users in the modal
const displaySimilarUsers = (users) => {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ''; // Clear previous users
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card'; // Add any class for styling
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Interests: ${user.interests.join(', ')}</p>
        `;
        userContainer.appendChild(userCard);
    });
};

// Search functionality
document.getElementById('search-input').addEventListener('keyup', function () {
    const searchTerm = this.value.toLowerCase();
    const userCards = document.querySelectorAll('.user-card');

    userCards.forEach(card => {
        const userName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = userName.includes(searchTerm) ? '' : 'none';
    });
});

// Login and Signup Modal Functionality
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginModal = document.getElementById('auth-modal'); // Update to the actual modal ID
const signupModal = document.getElementById('auth-modal'); // Update to the actual modal ID

// Open Login Modal
loginBtn.addEventListener('click', () => {
    showModal(loginModal);
    //hideModal(signupModal); // Hide signup modal
});

// Open Signup Modal
signupBtn.addEventListener('click', () => {
    showModal(signupModal);
    //hideModal(loginModal); // Hide login modal
});

// Close modal when clicking on the close button for both modals
document.querySelectorAll('.close').forEach(close => {
    close.addEventListener('click', () => {
        hideModal(loginModal);
        hideModal(signupModal);
    });
});

// Close modal when clicking anywhere outside the modal for both modals
window.addEventListener('click', (event) => {
    if (event.target === loginModal || event.target === signupModal) {
        hideModal(loginModal);
        hideModal(signupModal);
    }
});

// Validate Email for Signup
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email'); // Ensure this matches the actual input ID
    const emailValue = emailInput.value.trim();

    // Restrict to college email format
    if (!emailValue.endsWith('@nitj.ac.in')) {
        alert('Please use a valid college email address ending with @nitj.ac.in');
        return;
    }

    // Handle signup logic here, e.g., send data to the server
    alert('Signup successful!'); // Placeholder alert for demo
});

// Login functionality (just a placeholder for now)
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('login-email'); // Ensure this matches the actual input ID
    const passwordInput = document.getElementById('login-password'); // Ensure this matches the actual input ID
    
    // Handle login logic here, e.g., send data to the server
    alert(`Logged in as: ${emailInput.value}`); // Placeholder alert for demo
});