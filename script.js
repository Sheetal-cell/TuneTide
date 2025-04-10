let playlistData = {};

// Load playlist.json data
fetch("playlist.json")
  .then(response => response.json())
  .then(data => {
    playlistData = data;
    console.log("Playlist Loaded:", playlistData);
  })
  .catch(error => console.error("Error loading playlist:", error));

// DOM references
const songsDropdown = document.getElementById("songs");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const playerContainer = document.querySelector(".player");
const moodSelection = document.getElementById("moodSelection");
const playlistSection = document.getElementById("playlistSection");
const moodTitle = document.getElementById("moodTitle");

function setMood(mood) {
    updateBackground(mood);           // Apply background & animation
    loadSongs(mood);                  // Load only that mood's songs
  
    // Show mood name in heading
    moodTitle.textContent = `Playlist for ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
  
    // 👇 Hide mood cards and search input
    moodSelection.style.display = "none";
    document.getElementById("moodSearch").style.display = "none";
  
    // 👇 Show playlist section only
    playlistSection.style.display = "block";
  }
  

  const toggle = document.getElementById("dropdownToggle");
  const list = document.getElementById("dropdownList");
  
  toggle.addEventListener("click", () => {
    list.classList.toggle("dropdown-hidden");
  });
  
  function loadSongs(mood) {
    toggle.textContent = "-- Select Song --";
    list.innerHTML = "";
  
    if (playlistData[mood]) {
      playlistData[mood].forEach(song => {
        const li = document.createElement("li");
        li.textContent = song.replace(".mp3", "");
        li.addEventListener("click", () => {
          toggle.textContent = li.textContent;
          list.classList.add("dropdown-hidden");
          playSelectedSong(song);
        });
        list.appendChild(li);
      });
    }
  }
  
  function playSelectedSong(song) {
    audioSource.src = `assets/music/${song}`;
    audioPlayer.load();
    audioPlayer.play();
    showPlayer();
  }
  
// Play selected song
function playMusic() {
    const selectedSong = songsDropdown.value;
  
    if (!selectedSong) {
      alert("Please select a song!");
      return;
    }
  
    audioSource.src = `assets/music/${selectedSong}`;
    audioPlayer.load();
    audioPlayer.play();
  
    audioPlayer.style.display = "block";  // <-- This makes the timeline appear
    showPlayer();
    audioPlayer.onended = playNextSong;
  }
  function showPlayer() {
    playerContainer.style.display = "block";
    playerContainer.classList.add("playing");
  
    // Make sure audioPlayer is visible
    audioPlayer.style.display = "block";
  }
  
    

// Auto-play next song
function playNextSong() {
  let currentIndex = songsDropdown.selectedIndex;

  if (currentIndex < songsDropdown.options.length - 1) {
    songsDropdown.selectedIndex = currentIndex + 1;
  } else {
    songsDropdown.selectedIndex = 1;
  }

  const nextSong = songsDropdown.value;
  audioSource.src = `assets/music/${nextSong}`;
  audioPlayer.load();
  audioPlayer.play();
  showPlayer();
}

// Show player
function showPlayer() {
  audioPlayer.style.display = "block";
  playerContainer.classList.add("playing");
}

function goBack() {
  // Show mood selection and search bar
  playlistSection.style.display = "none";
  moodSelection.style.display = "block";
  moodSearch.style.display = "flex";
  document.querySelector(".mood-sections").style.display = "flex";
  document.querySelector(".search-container").style.display = "block";
  document.querySelector("label[for='mood']").style.display = "block";
  
  

  // Stop music if playing
  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  // Hide audio player
  playerContainer.style.display = "none";

  // Reset background and remove mood-based effects
  document.body.className = "";
  document.querySelectorAll(".bubbles, .rain, .waves-container, .pulse-container, .flash, .pulse-ring").forEach(el => el.remove());

  // Clear search input and show all mood cards again
  document.getElementById("moodSearch").value = "";
  document.querySelectorAll(".mood-card").forEach(card => {
  card.style.display = "block";
  });
}


  

// Mood background effects
function updateBackground(mood) {
  document.body.className = "";
  document.body.classList.add(`${mood}-bg`);
  document.querySelectorAll(".bubbles, .rain, .waves-container, .pulse-container, .flash, .pulse-ring").forEach(el => el.remove());

  if (mood === "happy") createBubbles();
  if (mood === "sad") createRain();
  if (mood === "chill") createWaves();
  if (mood === "energetic") createScatteredFlash();
}

// Happy mood bubbles
function createBubbles() {
  const container = document.createElement("div");
  container.classList.add("bubbles");
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(bubble);
  }
  document.body.appendChild(container);
}

// Sad mood rain
function createRain() {
  const container = document.createElement("div");
  container.classList.add("rain");
  for (let i = 0; i < 30; i++) {
    const drop = document.createElement("div");
    drop.classList.add("drop");
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
    drop.style.animationDelay = `${Math.random()}s`;
    container.appendChild(drop);
  }
  document.body.appendChild(container);
}

// Chill mood waves
function createWaves() {
  const container = document.createElement("div");
  container.classList.add("waves-container");
  for (let i = 0; i < 3; i++) {
    const wave = document.createElement("div");
    wave.classList.add("wave");
    container.appendChild(wave);
  }
  document.body.appendChild(container);
}

// Energetic mood flash
function createScatteredFlash() {
  for (let i = 0; i < 7; i++) {
    const flash = document.createElement("div");
    flash.classList.add("flash");
    document.body.appendChild(flash);
  }

  const container = document.createElement("div");
  container.classList.add("pulse-container");

  for (let i = 0; i < 3; i++) {
    const ring = document.createElement("div");
    ring.classList.add("pulse-ring");
    container.appendChild(ring);
  }

  document.body.appendChild(container);
}

// Mood search filter
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("moodSearch");
  searchInput.addEventListener("input", function () {
    const filter = searchInput.value.toLowerCase();
    const moodCards = document.querySelectorAll(".mood-card");
    moodCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(filter) ? "block" : "none";
    });
  });
});
