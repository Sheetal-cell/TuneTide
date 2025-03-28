async function playMusic() {
    const mood = document.getElementById("mood").value;
    const audioSource = document.getElementById("audioSource");
    const audioPlayer = document.getElementById("audioPlayer");

    try {
        const response = await fetch("playlist.json");
        const playlist = await response.json();

        if (playlist[mood]) {
            const songs = playlist[mood];
            const randomSong = songs[Math.floor(Math.random() * songs.length)]; // Pick a random song
            audioSource.src = `assets/${randomSong}`;
            audioPlayer.load();
            audioPlayer.play();
        } else {
            alert("No songs available for this mood!");
        }
    } catch (error) {
        console.error("Error loading playlist:", error);
    }
}
