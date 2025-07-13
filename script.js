const playlists = {
  happy: [
    "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC", // Happy Hits!
    "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0", // Good Vibes
    "https://open.spotify.com/playlist/37i9dQZF1DX1BzILRveYHb", // Mood Booster
    "https://open.spotify.com/playlist/37i9dQZF1DX7KNKjOK0o75", // Have a Great Day!
    "https://open.spotify.com/playlist/37i9dQZF1DX9XIFQuFvzM4", // Feelin' Good
    "https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL", // Happy Favourites
  ],
  chill: [
    "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6", // Chill Hits
    "https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj", // Chill Vibes
    "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT", // Chillout Lounge
    "https://open.spotify.com/playlist/37i9dQZF1DX4E3UdUs7fUx", // Chill Tracks
    "https://open.spotify.com/playlist/37i9dQZF1DX6VdMW310YC7", // Chill Lofi Study Beats
    "https://open.spotify.com/playlist/37i9dQZF1DX82GYcclJ3Ug", // Chillhop Essentials
  ],
  sad: [
    "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1", // Life Sucks
    "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634", // Sad Songs
    "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0", // Good Vibes (for contrast)
    "https://open.spotify.com/playlist/37i9dQZF1DX7gIoKXt0gmx", // Sad Indie
    "https://open.spotify.com/playlist/37i9dQZF1DX59NCqCqJtoH", // Sad Bops
    "https://open.spotify.com/playlist/37i9dQZF1DX7gIoKXt0gmx", // Sad Indie (repeat for 6)
  ],
  workout: [
    "https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh", // Beast Mode
    "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP", // Power Workout
    "https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy", // Motivation Mix
    "https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xif", // Cardio
    "https://open.spotify.com/playlist/37i9dQZF1DX8FwnYE6PRvL", // Workout Twerkout
    "https://open.spotify.com/playlist/37i9dQZF1DXe6bgV3TmZOL", // HIIT Workout
  ],
  party: [
    "https://open.spotify.com/playlist/37i9dQZF1DWYBO1MoTDhZI", // Party Hits
    "https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xif", // Cardio (party energy)
    "https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO", // Dance Party
    "https://open.spotify.com/playlist/37i9dQZF1DX1YPTAhWEgu7", // Pop Party
    "https://open.spotify.com/playlist/37i9dQZF1DX5Ozry5U6G0d", // Ultimate Party Classics
    "https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt", // Party Starters
  ],
  focus: [
    "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO", // Deep Focus
    "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS", // Focus Flow
    "https://open.spotify.com/playlist/37i9dQZF1DXc2aPBXGmXrt", // Productive Morning
    "https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us", // Workday Lounge
    "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ", // Brain Food
    "https://open.spotify.com/playlist/37i9dQZF1DX6VdMW310YC7", // Chill Lofi Study Beats
  ],
};

const moodNames = {
  happy: "Happy",
  chill: "Chill",
  sad: "Sad",
  workout: "Workout",
  party: "Party",
  focus: "Focus",
};

// Store last shown playlist per mood
const lastShown = {};

function play(mood) {
  showPreview(mood);
}

function randomMood() {
  const keys = Object.keys(playlists);
  const mood = keys[Math.floor(Math.random() * keys.length)];
  showPreview(mood);
}

function showPreview(mood) {
  const moodPlaylists = playlists[mood];
  let url;
  if (Array.isArray(moodPlaylists)) {
    // Avoid repeating the last shown playlist for this mood
    let available = moodPlaylists;
    if (lastShown[mood] && moodPlaylists.length > 1) {
      available = moodPlaylists.filter((u) => u !== lastShown[mood]);
    }
    url = available[Math.floor(Math.random() * available.length)];
    lastShown[mood] = url;
  } else {
    url = moodPlaylists;
    lastShown[mood] = url;
  }
  const previewBox = document.getElementById("previewBox");
  const cover = document.getElementById("playlistCover");
  const title = document.getElementById("playlistTitle");
  const desc = document.getElementById("playlistDesc");
  const link = document.getElementById("spotifyLink");
  // Reset
  cover.style.display = "none";
  title.textContent = "";
  desc.textContent = "";
  link.href = url;
  link.textContent = "Open in Spotify";
  previewBox.classList.add("active");
  // Fetch playlist info from Spotify oEmbed
  fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`)
    .then((res) => res.json())
    .then((data) => {
      cover.src = data.thumbnail_url;
      cover.style.display = "block";
      title.textContent = data.title || moodNames[mood];
      desc.textContent = data.author_name ? `By ${data.author_name}` : "";
    })
    .catch(() => {
      cover.style.display = "none";
      title.textContent = moodNames[mood];
      desc.textContent = "";
    });
}

// Dark/Light mode toggle
const modeToggle = document.getElementById("modeToggle");
let isLight = false;
modeToggle.addEventListener("click", () => {
  isLight = !isLight;
  document.body.classList.toggle("light-mode", isLight);
  modeToggle.textContent = isLight ? "☀️" : "🌙";
  drawBg();
});

// --- Animated Background ---
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Starfield for dark, bubbles for light
// --- Starfield ---
const STAR_COUNT = 120;
let stars = [];
function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
    });
  }
}
// --- Bubbles ---
const BUBBLE_COUNT = 40;
let bubbles = [];
function initBubbles() {
  bubbles = [];
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: height + Math.random() * height,
      r: Math.random() * 18 + 8,
      speed: Math.random() * 0.7 + 0.3,
      alpha: Math.random() * 0.4 + 0.3,
    });
  }
}
// --- Animation Loop ---
function drawBg() {
  ctx.clearRect(0, 0, width, height);
  if (!isLight) {
    // Starfield
    ctx.fillStyle = "#0a1026";
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    for (const s of stars) {
      ctx.globalAlpha = 0.7 + Math.random() * 0.3;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 8;
      ctx.fill();
    }
    ctx.restore();
  } else {
    // Bubbles
    ctx.fillStyle = "#f6faff";
    ctx.fillRect(0, 0, width, height);
    for (const b of bubbles) {
      ctx.globalAlpha = b.alpha;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
      ctx.fillStyle = "#aee7ff";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}
function animateBg() {
  if (!isLight) {
    for (const s of stars) {
      s.y += s.speed;
      if (s.y > height) {
        s.x = Math.random() * width;
        s.y = 0;
      }
    }
  } else {
    for (const b of bubbles) {
      b.y -= b.speed;
      if (b.y + b.r < 0) {
        b.x = Math.random() * width;
        b.y = height + b.r;
      }
    }
  }
  drawBg();
  requestAnimationFrame(animateBg);
}
// Init
function initBg() {
  if (!isLight) {
    initStars();
  } else {
    initBubbles();
  }
  drawBg();
}
// Re-init on resize or theme change
window.addEventListener("resize", () => {
  if (!isLight) {
    initStars();
  } else {
    initBubbles();
  }
});
// Initial
initBg();
animateBg();
// On theme toggle
modeToggle.addEventListener("click", () => {
  if (!isLight) {
    initStars();
  } else {
    initBubbles();
  }
});
