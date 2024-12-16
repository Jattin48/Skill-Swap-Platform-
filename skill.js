// Array to store user profiles
let userProfiles = [];
let currentUserIndex = -1;

// Function to handle profile creation
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const skillsOffered = document.getElementById('skillsOffered').value.split(',').map(skill => skill.trim());
    const skillsWanted = document.getElementById('skillsWanted').value.split(',').map(skill => skill.trim());

    // Create a new user profile
    const newUserProfile = {
        name: name,
        skillsOffered: skillsOffered,
        skillsWanted: skillsWanted
    };

    // Add the new profile to the array
    userProfiles.push(newUserProfile);
    currentUserIndex = userProfiles.length - 1;
    alert('Profile created successfully!');

    // Clear the form
    document.getElementById('profileForm').reset();
});

// Function to find a match
document.getElementById('findMatchBtn').addEventListener('click', function() {
    if (currentUserIndex < 0) {
        alert('Please create a profile first.');
        return;
    }

    const currentUser  = userProfiles[currentUserIndex];
    const matches = userProfiles.filter((profile, index) => {
        return index !== currentUserIndex &&
               (profile.skillsWanted.some(skill => currentUser.skillsOffered.includes(skill)) ||
                profile.skillsOffered.some(skill => currentUser.skillsWanted.includes(skill)));
    });

    const matchResultDiv = document.getElementById('matchResult');
    matchResultDiv.innerHTML = ''; // Clear previous results

    if (matches.length > 0) {
        matches.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.innerHTML = `<strong>${match.name}</strong>: Offers ${match.skillsOffered.join(', ')} | Wants ${match.skillsWanted.join(', ')}`;
            matchResultDiv.appendChild(matchElement);
        });
    } else {
        matchResultDiv.innerHTML = 'No matches found.';
    }
});

// Function to schedule a session
document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (currentUserIndex < 0) {
        alert('Please create a profile first.');
        return;
    }

    const sessionDetails = document.getElementById('sessionDetails').value;
    const sessionTime = document.getElementById('sessionTime').value;

    alert(`Session scheduled: ${sessionDetails} at ${sessionTime}`);

    // Clear the form
    document.getElementById('scheduleForm').reset();
});

// Function to handle community posts
const communityPosts = [];

document.getElementById('communityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (currentUserIndex < 0) {
        alert('Please create a profile first.');
        return;
    }

    const postContent = document.getElementById('postContent').value;

    // Add the post to the community posts array
    communityPosts.push({
        author: userProfiles[currentUserIndex].name,
        content: postContent
    });

    // Display the new post
    const communityPostsDiv = document.getElementById('communityPosts');
    const postElement = document.createElement('div');
    postElement.innerHTML = `<p><strong>${communityPosts[communityPosts.length - 1].author}</strong>: ${communityPosts[communityPosts.length - 1].content}</p>`;
    communityPostsDiv.appendChild(postElement);

    // Clear the textarea
    document.getElementById('postContent').value = '';
});