let playlistData = {}; // Store playlist data

// Fetch and store playlist data when page loads
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

        // Change background gradient
        document.body.classList.remove("happy-bg", "sad-bg", "chill-bg", "energetic-bg");
        document.body.classList.add(`${mood}-bg`);
    }
}


const audioPlayer = document.getElementById("audioPlayer");
const playerContainer = document.querySelector(".player");

// Function to play the selected song
function playMusic() {
    const mood = document.getElementById("mood").value;
    const songList = document.getElementById("songs");
    const audioSource = document.getElementById("audioSource");

    const song = songList.value;
    if (song) {
        audioSource.src = `assets/${song}`;
        audioPlayer.load();
        audioPlayer.play();
        
        // Show the player when music starts
        playerContainer.style.display = "block";
        playerContainer.classList.add("playing");
    } else {
        alert("Please select a song!");
    }
}

// Hide the player when music ends
audioPlayer.addEventListener("ended", () => {
    playerContainer.style.display = "none";
    playerContainer.classList.remove("playing");
});
function updateBackground(mood) {
    document.body.className = ""; // Remove previous classes
    document.body.classList.add(`${mood}-bg`); // Apply new mood class
}

document.getElementById("mood").addEventListener("change", function() {
    updateBackground(this.value);
});

