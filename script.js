let playlistData = {}; // Store playlist data

// Fetch and store playlist data when the page loads
fetch("playlist.json")
    .then(response => response.json())
    .then(data => {
        playlistData = data;
        console.log("Playlist Loaded:", playlistData);
    })
    .catch(error => console.error("Error loading playlist:", error));

// Function to load songs based on selected mood
function loadSongs() {
    const mood = document.getElementById("mood").value;
    const songsDropdown = document.getElementById("songs");

    // Clear previous song options
    songsDropdown.innerHTML = '<option value="">-- Select Song --</option>';

    if (mood && playlistData[mood]) {
        playlistData[mood].forEach(song => {
            let option = document.createElement("option");
            option.value = song;
            option.textContent = song.replace(".mp3", ""); // Display song name without extension
            songsDropdown.appendChild(option);
        });

        // Change background gradient based on mood
        updateBackground(mood);
    }
}

const audioPlayer = document.getElementById("audioPlayer");
const playerContainer = document.querySelector(".player");

// Function to play the selected song
function playMusic() {
    const songList = document.getElementById("songs");
    const audioSource = document.getElementById("audioSource");

    const song = songList.value;
    if (song) {
        audioSource.src = `assets/${song}`;
        audioPlayer.load();
        audioPlayer.play();

        // Ensure the player is always visible when a song is playing
        showPlayer();

        // Autoplay the next song when the current one ends
        audioPlayer.onended = playNextSong;
    } else {
        alert("Please select a song!");
    }
}

// Function to autoplay next song while keeping the player visible
function playNextSong() {
    const songList = document.getElementById("songs");
    const audioSource = document.getElementById("audioSource");

    let currentIndex = songList.selectedIndex;

    if (currentIndex < songList.options.length - 1) {
        songList.selectedIndex = currentIndex + 1;
    } else {
        songList.selectedIndex = 1; // Loop back to first song (after placeholder)
    }

    const nextSong = songList.value;
    if (nextSong) {
        audioSource.src = `assets/${nextSong}`;
        audioPlayer.load();
        audioPlayer.play();

        // Ensure the player remains visible when a new song plays
        showPlayer();
    }
}

// Function to update background and animations dynamically
function updateBackground(mood) {
    document.body.className = ""; // Reset classes
    document.body.classList.add(`${mood}-bg`); // Apply mood-based background

    // Remove old effects
    document.querySelectorAll(".bubbles, .rain, .waves-container, .pulse-container, .flash,.pulse-ring").forEach(el => el.remove());
    

    // Add corresponding animation overlay
    if (mood === "happy") createBubbles();
    if (mood === "sad") createRain();  // No shake in sad!
    if (mood === "chill") createWaves();
    if (mood === "energetic") createScatteredFlash();
}

// 🌊 Create flowing waves for Chill mood
function createWaves() {
    let container = document.createElement("div");
    container.classList.add("waves-container");

    for (let i = 0; i < 3; i++) {
        let wave = document.createElement("div");
        wave.classList.add("wave");
        container.appendChild(wave);
    }

    document.body.appendChild(container);
}


function createScatteredFlash() {
    for (let i = 0; i < 7; i++) {  // Increased to 7 flashes
        let flash = document.createElement("div");
        flash.classList.add("flash");
        document.body.appendChild(flash);
    }

    // Add pulse effect
    let container = document.createElement("div");
    container.classList.add("pulse-container");

    for (let i = 0; i < 3; i++) {
        let ring = document.createElement("div");
        ring.classList.add("pulse-ring");
        container.appendChild(ring);
    }

    document.body.appendChild(container);
}

// ☔ Create smooth rain effect for Sad mood (No shake)
function createRain() {
    let container = document.createElement("div");
    container.classList.add("rain");
    for (let i = 0; i < 30; i++) {
        let drop = document.createElement("div");
        drop.classList.add("drop");
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        drop.style.animationDelay = `${Math.random()}s`;
        container.appendChild(drop);
    }
    document.body.appendChild(container);
}

// 🌟 Existing Happy (Bubbles) Animation
function createBubbles() {
    let container = document.createElement("div");
    container.classList.add("bubbles");
    for (let i = 0; i < 15; i++) {
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(bubble);
    }
    document.body.appendChild(container);
}

// Event listener for Mood selection
document.getElementById("mood").addEventListener("change", function() {
    updateBackground(this.value);
});


// Function to make sure the player is always visible
function showPlayer() {
    playerContainer.style.display = "block";
    playerContainer.classList.add("playing");
}


