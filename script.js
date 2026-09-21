let button = document.getElementById("song-button");
let nextButton = document.getElementById("next-button");
let backButton = document.getElementById("back-button");
let topButton =document.getElementById("top-button");
let saveButton = document.getElementById("save-button");
let songs = [];
let index =0;
let favorites = [];



async function loadSongs() {
  let response = await fetch("https://student-data-api.shantess90.workers.dev/api/v1/datasets/viral-50-usa/records?limit=50");
  console.log("Status: " + response.status);
  let data = await response.json();
  songs = data.records;
  console.log("Records: " + songs.length);
  
  showSong ();
}
function showSong() {
  let song = songs[index];

  document.getElementById("track-name").textContent = song["Track Name"];
  document.getElementById("track-facts").textContent = "#" + song.Position + " — " + song.Artist;
  document.getElementById("track-count").textContent = (index + 1) + " of " + songs.length;
}
function renderFavorites() {
  let text = "";

  favorites.forEach(function (favorite) {
    text = text + "• " + favorite + " " ;
  });

  document.getElementById("favorites-list").textContent = text;
}


button.addEventListener("click", function () {
  loadSongs();
});

nextButton.addEventListener("click", function () {
  index = index + 1;

  if (index > songs.length - 1) {
    index = 0;
  }

  showSong();
});

backButton.addEventListener("click", function () {
  index = index - 1;

  if (index < 0) {
    index = songs.length - 1;
  }

  showSong();
});


clearButton.addEventListener("click", function () {
  favorites = [];
  renderFavorites();
  document.getElementById("save-message").textContent = "";
});


topButton.addEventListener("click", function () {
  index = 0;
  showSong();
});

saveButton.addEventListener("click", function () {
  let song = songs[index];

  if (favorites.length < 5) {
    favorites.push(song["Track Name"] + " — " + song.Artist);
    renderFavorites();
  }
});


