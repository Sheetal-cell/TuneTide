let playlistData = {};
let currentMood = "";
let currentSongIndex = 0;
let currentPlaylist = [];

// Load playlist.json data
fetch("playlist.json")
  .then(response => response.json())
  .then(data => {
    playlistData = data;
    console.log("Playlist Loaded:", playlistData);
  })
  .catch(error => console.error("Error loading playlist:", error));

// DOM references
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const playerContainer = document.querySelector(".player");
const moodSelection = document.getElementById("moodSelection");
const playlistSection = document.getElementById("playlistSection");
const moodTitle = document.getElementById("moodTitle");
const moodSearch = document.getElementById("moodSearch");

const toggle = document.getElementById("dropdownToggle");
const list = document.getElementById("dropdownList");

// Mood selection
function setMood(mood) {
  currentMood = mood;
  updateBackground(mood);
  loadSongs(mood);
  moodTitle.textContent = `Playlist for ${capitalize(mood)}`;

  moodSelection.style.display = "none";
  moodSearch.style.display = "none";
  document.querySelector(".search-container").style.display = "none";
  document.querySelector("label[for='mood']").style.display = "none";

  playlistSection.style.display = "block";
}

// Load songs for mood
function loadSongs(mood) {
  currentPlaylist = playlistData[mood] || [];
  currentSongIndex = 0;

  toggle.textContent = "-- Select Song --";
  list.innerHTML = "";

  currentPlaylist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.replace(".mp3", "");
    li.addEventListener("click", () => {
      toggle.textContent = li.textContent;
      list.classList.add("dropdown-hidden");
      currentSongIndex = index;
      playSelectedSong(song);
    });
    list.appendChild(li);
  });
}

function playSelectedSong(song) {
  audioSource.src = `assets/music/${song}`;
  audioPlayer.load();
  audioPlayer.play();
  showPlayer();
}

// Play next from same playlist
function playNextFromPlaylist() {
  currentSongIndex++;
  if (currentSongIndex >= currentPlaylist.length) {
    currentSongIndex = 0;
  }

  const nextSong = currentPlaylist[currentSongIndex];
  if (nextSong) {
    toggle.textContent = nextSong.replace(".mp3", "");
    playSelectedSong(nextSong);
  }
}

// Show player
function showPlayer() {
  audioPlayer.style.display = "block";
  playerContainer.style.display = "block";
  playerContainer.classList.add("playing");
}

// Back to mood screen
function goBack() {
  playlistSection.style.display = "none";
  moodSelection.style.display = "block";
  document.querySelector(".mood-sections").style.display = "flex";
  document.querySelector(".search-container").style.display = "flex";
  moodSearch.style.display = "block";
  document.querySelector("label[for='mood']").style.display = "block";

  // Reset player
  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  // Keep audio timeline
  audioPlayer.style.display = "block";
  playerContainer.style.display = "block";

  // Reset background
  document.body.className = "";
  document.querySelectorAll(".bubbles, .rain, .waves-container, .pulse-container, .flash, .pulse-ring")
    .forEach(el => el.remove());

  // Reset mood cards
  moodSearch.value = "";
  document.querySelectorAll(".mood-card").forEach(card => {
    card.style.display = "block";
  });
}

// Autoplay next
audioPlayer.onended = () => {
  console.log("Song ended, moving to next...");
  playNextFromPlaylist();
};

// Mood search filter
document.addEventListener("DOMContentLoaded", () => {
  moodSearch.addEventListener("input", () => {
    const filter = moodSearch.value.toLowerCase();
    document.querySelectorAll(".mood-card").forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(filter) ? "block" : "none";
    });
  });
});

// Dropdown toggle
toggle.addEventListener("click", () => {
  list.classList.toggle("dropdown-hidden");
});

// Background effects
function updateBackground(mood) {
  document.body.className = "";
  document.body.classList.add(`${mood}-bg`);
  document.querySelectorAll(".bubbles, .rain, .waves-container, .pulse-container, .flash, .pulse-ring")
    .forEach(el => el.remove());

  if (mood === "happy") createBubbles();
  if (mood === "sad") createRain();
  if (mood === "chill") createWaves();
  if (mood === "energetic") createScatteredFlash();
}

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

// Helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
