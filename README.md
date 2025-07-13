# MoodTunes

A fun, modern web app that suggests Spotify playlists based on your mood! Pick a mood, and MoodTunes will show you a random, mood-appropriate playlist with a live preview and a beautiful animated background.

## Features
- **Mood-based playlist suggestions** (Happy, Chill, Sad, Workout, Party, Focus)
- **Multiple playlists per mood** — always something new
- **Playlist preview** (cover, title, author) using Spotify oEmbed
- **Animated backgrounds**:
  - Starfield for dark mode
  - Floating bubbles for light mode
- **Dark/Light mode toggle**
- **Responsive design** (works on mobile and desktop)
- **Random Mood button** for surprise playlists

## Setup & Usage
1. **Download or clone this folder** to your computer.
2. Make sure the following files are present:
   - `index.html`
   - `style.css`
   - `script.js`
3. Open `index.html` in your web browser.
4. Click a mood button to get a playlist. Use the theme toggle (top right) to switch between dark and light mode.

## File Structure
```
IXD/vibecoding1/
├── index.html    # Main HTML file (links to CSS & JS)
├── style.css     # All styles (dark/light mode, responsive, animations)
├── script.js     # All JavaScript (playlist logic, background, theme toggle)
└── README.md     # This file
```

## Credits
- **Playlists:** All playlists are from [Spotify](https://spotify.com). Playlist covers, names, and authors are fetched using Spotify's public oEmbed API.
- **Icons/Emojis:** Used for visual mood cues.

---

Enjoy your music journey with MoodTunes! 🎧
