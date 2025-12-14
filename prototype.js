// Mock Data
const mockMentors = [
    {
        id: 1,
        name: "John Doe",
        initials: "JD",
        title: "Software Engineer",
        company: "Google",
        graduation: "Bilkent CS '18",
        expertise: ["Software Engineering", "Career Planning", "Interview Prep"],
        bio: "I'm a software engineer at Google with 6 years of experience. I specialize in backend systems and love helping students navigate their tech careers.",
        matchScore: 95,
        availability: "High"
    },
    {
        id: 2,
        name: "Sarah Miller",
        initials: "SM",
        title: "Product Manager",
        company: "Microsoft",
        graduation: "Bilkent IE '16",
        expertise: ["Product Management", "Career Transition", "Leadership"],
        bio: "Product Manager at Microsoft. I help students understand product management and career transitions. Happy to share my journey!",
        matchScore: 88,
        availability: "Medium"
    },
    {
        id: 3,
        name: "Ahmet Kaya",
        initials: "AK",
        title: "Data Scientist",
        company: "Amazon",
        graduation: "Bilkent CS '19",
        expertise: ["Data Science", "Machine Learning", "Research"],
        bio: "Data Scientist at Amazon working on recommendation systems. I can help with data science careers and research opportunities.",
        matchScore: 82,
        availability: "High"
    },
    {
        id: 4,
        name: "Zeynep Yılmaz",
        initials: "ZY",
        title: "UX Designer",
        company: "Apple",
        graduation: "Bilkent CTIS '17",
        expertise: ["UX Design", "Creative Careers", "Portfolio Building"],
        bio: "UX Designer at Apple. I help students build portfolios and navigate the design industry. Let's chat about your creative career!",
        matchScore: 79,
        availability: "Medium"
    },
    {
        id: 5,
        name: "Mehmet Demir",
        initials: "MD",
        title: "Investment Banker",
        company: "Goldman Sachs",
        graduation: "Bilkent Business '15",
        expertise: ["Finance", "Investment Banking", "Career Planning"],
        bio: "Investment banker with 9 years of experience. I mentor students interested in finance and investment banking careers.",
        matchScore: 75,
        availability: "Low"
    }
];

const mockSessions = [
    {
        id: 1,
        mentor: "John Doe",
        mentorInitials: "JD",
        date: "Today",
        time: "2:00 PM - 2:15 PM",
        topic: "Software Engineering Interview Prep",
        status: "upcoming"
    },
    {
        id: 2,
        mentor: "Sarah Miller",
        mentorInitials: "SM",
        date: "Tomorrow",
        time: "10:00 AM - 10:15 AM",
        topic: "Product Management Career Path",
        status: "upcoming"
    },
    {
        id: 3,
        mentor: "Ahmet Kaya",
        mentorInitials: "AK",
        date: "Last Week",
        time: "3:00 PM - 3:15 PM",
        topic: "Data Science Opportunities",
        status: "past"
    }
];

// Screen Management
function showScreen(screenId) {
    console.log('Showing screen:', screenId);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Load content based on screen
        if (screenId === 'mentee-dashboard') {
            loadDashboard();
        } else if (screenId === 'mentor-dashboard') {
            loadMentorDashboard();
        } else if (screenId === 'matching') {
            startMatchingProcess();
        } else if (screenId === 'my-sessions' || screenId === 'mentor-sessions') {
            loadSessions('upcoming');
        } else if (screenId === 'mentor-requests') {
            loadAllRequests();
        }
    } else {
        console.error('Screen not found:', screenId);
    }
}

// Make functions globally accessible immediately
window.showScreen = showScreen;

function loginAs(role) {
    console.log('Login as:', role);
    try {
        if (role === 'mentee') {
            showScreen('mentee-dashboard');
        } else {
            // For demo, show mentee dashboard (mentor dashboard can be added later)
            showScreen('mentee-dashboard');
        }
    } catch (error) {
        console.error('Error in loginAs:', error);
        alert('Error logging in. Please check console for details.');
    }
}

// Make loginAs globally accessible immediately
window.loginAs = loginAs;

function logout() {
    showScreen('login-screen');
}

// Make logout globally accessible immediately
window.logout = logout;
window.showScreen = showScreen; // Ensure it's available

// Dashboard Functions
function loadDashboard() {
    console.log('Loading dashboard...');
    const container = document.getElementById('matches-container');
    if (!container) {
        console.error('Matches container not found');
        return;
    }
    
    container.innerHTML = '';
    
    // Show top 3 matches
    const topMatches = mockMentors.slice(0, 3);
    topMatches.forEach(mentor => {
        const matchCard = createMatchCard(mentor);
        container.appendChild(matchCard);
    });
    console.log('Dashboard loaded with', topMatches.length, 'matches');
}

// Make loadDashboard available globally
window.loadDashboard = loadDashboard;

// Mentor Dashboard Functions
function loadMentorDashboard() {
    console.log('Loading mentor dashboard...');
    const container = document.getElementById('mentor-requests-container');
    if (!container) {
        console.error('Mentor requests container not found');
        return;
    }
    
    container.innerHTML = '';
    
    // Mock mentorship requests
    const mockRequests = [
        {
            id: 1,
            studentName: "Ali Yılmaz",
            studentInitials: "AY",
            major: "Computer Science",
            request: "I need help preparing for software engineering interviews at tech companies.",
            matchScore: 92,
            urgency: "high"
        },
        {
            id: 2,
            studentName: "Zeynep Demir",
            studentInitials: "ZD",
            major: "Industrial Engineering",
            request: "Looking for guidance on transitioning from engineering to product management.",
            matchScore: 88,
            urgency: "medium"
        },
        {
            id: 3,
            studentName: "Mehmet Kaya",
            studentInitials: "MK",
            major: "Computer Science",
            request: "Want to learn about data science career paths and required skills.",
            matchScore: 85,
            urgency: "low"
        }
    ];
    
    mockRequests.forEach(request => {
        const requestCard = document.createElement('div');
        requestCard.className = 'match-card';
        requestCard.innerHTML = `
            <div class="match-card-header">
                <div class="match-avatar">${request.studentInitials}</div>
                <div class="match-info">
                    <h3>${request.studentName}</h3>
                    <p>${request.major} Student</p>
                </div>
            </div>
            <p style="color: var(--text-light); margin: 1rem 0; line-height: 1.6;">${request.request}</p>
            <div class="match-score" style="margin-top: 1rem;">
                <i class="fas fa-star"></i>
                <span>${request.matchScore}% Match</span>
                <span style="margin-left: 1rem; padding: 0.25rem 0.75rem; background: ${request.urgency === 'high' ? '#fee' : request.urgency === 'medium' ? '#ffe' : '#efe'}; border-radius: 12px; font-size: 0.85rem;">
                    ${request.urgency === 'high' ? 'High Priority' : request.urgency === 'medium' ? 'Medium Priority' : 'Low Priority'}
                </span>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <button class="action-btn primary" style="flex: 1; padding: 0.75rem;" onclick="acceptRequest(${request.id})">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="action-btn secondary" style="flex: 1; padding: 0.75rem;" onclick="declineRequest(${request.id})">
                    <i class="fas fa-times"></i> Decline
                </button>
            </div>
        `;
        container.appendChild(requestCard);
    });
    
    console.log('Mentor dashboard loaded with', mockRequests.length, 'requests');
}

// Make loadMentorDashboard available globally
window.loadMentorDashboard = loadMentorDashboard;

function acceptRequest(requestId) {
    console.log('Accepting request:', requestId);
    showModal('Request Accepted!', 'You can now schedule a 15-minute session with this student.');
    // In real app, this would update the database
}

function declineRequest(requestId) {
    console.log('Declining request:', requestId);
    if (confirm('Are you sure you want to decline this mentorship request?')) {
        showModal('Request Declined', 'The student has been notified.');
        // In real app, this would update the database
    }
}

window.acceptRequest = acceptRequest;
window.declineRequest = declineRequest;

function loadAllRequests() {
    console.log('Loading all requests...');
    const container = document.getElementById('all-requests-list');
    if (!container) {
        console.error('All requests container not found');
        return;
    }
    
    // Same mock data as mentor dashboard
    loadMentorDashboard();
    
    // Also populate the all-requests-list if it exists
    if (container && container !== document.getElementById('mentor-requests-container')) {
        const mentorContainer = document.getElementById('mentor-requests-container');
        if (mentorContainer) {
            container.innerHTML = mentorContainer.innerHTML;
        }
    }
}

window.loadAllRequests = loadAllRequests;

function createMatchCard(mentor) {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.onclick = () => viewMentorProfile(mentor);
    
    card.innerHTML = `
        <div class="match-card-header">
            <div class="match-avatar">${mentor.initials}</div>
            <div class="match-info">
                <h3>${mentor.name}</h3>
                <p>${mentor.title} at ${mentor.company}</p>
            </div>
        </div>
        <div class="match-tags">
            ${mentor.expertise.slice(0, 2).map(e => `<span class="tag">${e}</span>`).join('')}
        </div>
        <div class="match-score">
            <i class="fas fa-star"></i>
            <span>${mentor.matchScore}% Match</span>
        </div>
    `;
    
    return card;
}

// Matching Process
function startMatchingProcess() {
    const processDiv = document.querySelector('.matching-process');
    const resultsDiv = document.getElementById('match-results');
    
    if (processDiv) {
        processDiv.style.display = 'block';
    }
    if (resultsDiv) {
        resultsDiv.classList.remove('active');
    }
    
    // Simulate matching process
    setTimeout(() => {
        if (processDiv) {
            processDiv.style.display = 'none';
        }
        if (resultsDiv) {
            resultsDiv.classList.add('active');
            displayMatchResults();
        }
    }, 2500);
}

function displayMatchResults() {
    const matchesList = document.getElementById('matches-list');
    if (!matchesList) return;
    
    matchesList.innerHTML = '';
    
    // Sort by match score
    const sortedMentors = [...mockMentors].sort((a, b) => b.matchScore - a.matchScore);
    
    sortedMentors.forEach(mentor => {
        const matchItem = document.createElement('div');
        matchItem.className = 'match-card';
        matchItem.onclick = () => viewMentorProfile(mentor);
        
        matchItem.innerHTML = `
            <div class="match-card-header">
                <div class="match-avatar">${mentor.initials}</div>
                <div class="match-info">
                    <h3>${mentor.name}</h3>
                    <p>${mentor.title} at ${mentor.company} | ${mentor.graduation}</p>
                </div>
            </div>
            <div class="match-tags">
                ${mentor.expertise.map(e => `<span class="tag">${e}</span>`).join('')}
            </div>
            <div class="match-score">
                <i class="fas fa-star"></i>
                <span>${mentor.matchScore}% Match - ${mentor.availability} Availability</span>
            </div>
        `;
        
        matchesList.appendChild(matchItem);
    });
}

// Mentor Profile
function viewMentorProfile(mentor) {
    console.log('Viewing mentor profile:', mentor.name);
    const header = document.getElementById('profile-header');
    const content = document.getElementById('profile-content');
    
    if (header) {
        header.innerHTML = `
            <div class="profile-avatar-large">${mentor.initials}</div>
            <h2>${mentor.name}</h2>
            <p style="color: var(--text-light); margin-bottom: 0.5rem;">${mentor.title} at ${mentor.company}</p>
            <p style="color: var(--text-light); font-size: 0.9rem;">${mentor.graduation}</p>
            <div style="margin-top: 1rem;">
                <span class="tag" style="background: var(--accent-color); color: white; font-weight: 600;">
                    ${mentor.matchScore}% Match
                </span>
            </div>
        `;
    }
    
    if (content) {
        content.innerHTML = `
            <div class="profile-section">
                <h3>About</h3>
                <p>${mentor.bio}</p>
            </div>
            <div class="profile-section">
                <h3>Areas of Expertise</h3>
                <div class="match-tags">
                    ${mentor.expertise.map(e => `<span class="tag">${e}</span>`).join('')}
                </div>
            </div>
            <div class="profile-section">
                <h3>Availability</h3>
                <p>${mentor.availability} - Multiple time slots available this week</p>
            </div>
        `;
    }
    
    // Store current mentor for scheduling
    window.currentMentor = mentor;
    showScreen('mentor-profile');
}

// Make globally accessible
window.viewMentorProfile = viewMentorProfile;

function requestSession() {
    console.log('Requesting session');
    showScreen('schedule-screen');
}

// Make globally accessible
window.requestSession = requestSession;

function startChat() {
    console.log('Starting chat');
    showScreen('chat-screen');
}

// Make globally accessible
window.startChat = startChat;

// Chat Functions
function sendMessage() {
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (!input || !messagesContainer || !input.value.trim()) return;
    
    const message = input.value.trim();
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
    
    // Simulate response after 1 second
    setTimeout(() => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'message received';
        responseDiv.innerHTML = `
            <div class="message-content">
                <p>Thanks for your message! I'll get back to you shortly.</p>
                <span class="message-time">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;
        messagesContainer.appendChild(responseDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

// Make globally accessible
window.sendMessage = sendMessage;

// Allow Enter key to send message
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Scheduling Functions
function selectTimeSlot(element) {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    element.classList.add('selected');
    window.selectedTimeSlot = element;
}

// Make globally accessible
window.selectTimeSlot = selectTimeSlot;

function confirmBooking() {
    if (!window.selectedTimeSlot) {
        showModal('Please select a time slot', 'You need to choose an available time slot before confirming.');
        return;
    }
    
    const date = window.selectedTimeSlot.querySelector('.date').textContent;
    const time = window.selectedTimeSlot.querySelector('.time').textContent;
    const mentorName = window.currentMentor ? window.currentMentor.name : 'Mentor';
    
    showModal(
        'Session Booked!',
        `Your 15-minute session with ${mentorName} has been scheduled for ${date} at ${time}. You'll receive a confirmation email shortly.`
    );
    
    // Reset selection
    setTimeout(() => {
        if (window.selectedTimeSlot) {
            window.selectedTimeSlot.classList.remove('selected');
        }
        showScreen('mentee-dashboard');
    }, 2000);
}

// Make globally accessible
window.confirmBooking = confirmBooking;

// Sessions Functions
function loadSessions(tab) {
    const sessionsList = document.getElementById('sessions-list');
    if (!sessionsList) return;
    
    sessionsList.innerHTML = '';
    
    const filteredSessions = mockSessions.filter(s => 
        tab === 'upcoming' ? s.status === 'upcoming' : s.status === 'past'
    );
    
    if (filteredSessions.length === 0) {
        sessionsList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No sessions found.</p>';
        return;
    }
    
    filteredSessions.forEach(session => {
        const sessionItem = document.createElement('div');
        sessionItem.className = 'session-item';
        sessionItem.innerHTML = `
            <div class="match-avatar">${session.mentorInitials}</div>
            <div style="flex: 1;">
                <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">${session.mentor}</h3>
                <p style="color: var(--text-light); margin-bottom: 0.25rem;">${session.topic}</p>
                <p style="color: var(--text-light); font-size: 0.9rem;">${session.date} • ${session.time}</p>
            </div>
            ${session.status === 'upcoming' ? 
                '<button class="action-btn secondary" style="padding: 0.5rem 1rem;"><i class="fas fa-video"></i> Join</button>' : 
                '<span class="tag" style="background: #eee;">Completed</span>'
            }
        `;
        sessionsList.appendChild(sessionItem);
    });
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    loadSessions(tab);
}

// Make globally accessible
window.switchTab = switchTab;

// Modal Functions
function showModal(title, message) {
    const modal = document.getElementById('success-modal');
    const titleEl = document.getElementById('success-title');
    const messageEl = document.getElementById('success-message');
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (modal) modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.remove('active');
}

// Make globally accessible
window.closeModal = closeModal;
window.showModal = showModal;

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Make all functions globally accessible (must be after function definitions)
// These will be set after DOM loads

// Initialize - verify all functions are available
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DOM LOADED ===');
    
    // Verify critical functions
    const criticalFunctions = {
        'loginAs': window.loginAs,
        'showScreen': window.showScreen,
        'logout': window.logout,
        'loadDashboard': window.loadDashboard,
        'loadMentorDashboard': window.loadMentorDashboard,
        'requestSession': window.requestSession,
        'startChat': window.startChat,
        'sendMessage': window.sendMessage,
        'viewMentorProfile': window.viewMentorProfile,
        'selectTimeSlot': window.selectTimeSlot,
        'confirmBooking': window.confirmBooking,
        'switchTab': window.switchTab,
        'showModal': window.showModal,
        'closeModal': window.closeModal
    };
    
    let allGood = true;
    for (const [name, func] of Object.entries(criticalFunctions)) {
        if (typeof func === 'function') {
            console.log('✓', name, 'is available');
        } else {
            console.error('✗', name, 'is MISSING!');
            allGood = false;
        }
    }
    
    if (allGood) {
        console.log('✓ All functions are available!');
    } else {
        console.error('✗ Some functions are missing!');
    }
    
    // Show login screen by default
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.classList.add('active');
        console.log('✓ Login screen activated');
    } else {
        console.error('✗ Login screen not found');
    }
    
    console.log('=== INITIALIZATION COMPLETE ===');
});

