// === Danh sách nhạc mặc định ===
const musicList_music = [
  {
    title: "Agharta Super Slowed",
    img: "agharta.jpg",
    src: "https://pdftourl.net/audio/1777979566620-a0aadc76-e69b-4c91-a6a6-24b61d5d04a4.mp3",
  },
  {
    title: "Illuminati Sped Up",
    img: "illuminati.jpg",
    src: "https://pdftourl.net/audio/1777979496675-f6c40081-97c9-412c-bbd1-86530b158f1d.mp3",
  },
];

let customTracks_music = []; // danh sách bài người dùng chọn
let isPlaying_music = false;
let musicExists = false;
updateActionsMap();
let currentIndex_music = 0;

const playlist_music = document.getElementById("playlist_music");
const popup_music = document.getElementById("playerPopup_music");
const popupImage_music = document.getElementById("popupImage_music");
const popupTitle_music = document.getElementById("popupTitle_music");
const popupTitle_music2 = document.getElementById("popupTitle_music2");
const audioPlayer_music = document.getElementById("audioPlayer_music");
const playPauseIcon_music = document.getElementById("playPauseIcon_music");
const playPauseIcon_music2 = document.getElementById("playPauseIcon_music2");
const playPauseIcon_music3 = document.getElementById("playPauseIcon_music3");
const progressBar_music = document.getElementById("progressBar_music");
const progressBar_music2 = document.getElementById("progressBar_music2");

function updatePlaylist_music() {
  playlist_music.innerHTML = "";
  [...musicList_music, ...customTracks_music].forEach((track, index) => {
    const trackDiv = document.createElement("div");
    trackDiv.className = "track_music";
    trackDiv.onclick = () => playTrack_music(index);
    trackDiv.innerHTML = `
      <img src="${track.img}" alt="Art">
      <div class="track-info_music">
        <div class="track-title_music">${track.title}</div>
      </div>`;
    playlist_music.appendChild(trackDiv);
  });

  set_dark_mode(dark_mode);
}

function playTrack_music(index) {
  const allTracks = [...musicList_music, ...customTracks_music];
  const track = allTracks[index];
  currentIndex_music = index;

  popupImage_music.src = track.img;
  popupTitle_music.textContent = track.title;
  popupTitle_music2.textContent = track.title;

  document.getElementById(
    "music_textControlsCenter"
  ).textContent = `${track.title}`;

  document.querySelector(
    ".image_island_right2"
  ).style.backgroundImage = `url('${track.img}')`;
  document.querySelector(
    ".island_circle_img"
  ).style.backgroundImage = `url('${track.img}')`;
  document.getElementById(
    "img_musicControlsCenter"
  ).style.backgroundImage = `url('${track.img}')`;

  audioPlayer_music.src = track.src;
  audioPlayer_music.play();
  playPauseIcon_music.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="gray"><path d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z"/></svg>`;
  playPauseIcon_music2.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#fff"><path d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z"/></svg>`;
  playPauseIcon_music3.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#fff"><path d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z"/></svg>`;
  popup_music.style.display = "flex";
  showPopup_open_close(playerPopup_music);
  playlist_music.style.height = "28vh";
  isPlaying_music = true;
  musicExists = true;
  updateActionsMap();

  audioPlayer_music.onended = () => nextTrack_music();
}

function togglePlay_music() {
  if (!musicExists) return;
  if (audioPlayer_music.paused) {
    audioPlayer_music.play();
    playPauseIcon_music.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="gray"><path d="M548.22-174v-612h214v612h-214Zm-350.44 0v-612h214v612h-214Z"/></svg>
`;
    playPauseIcon_music2.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#fff"><path d="M548.22-174v-612h214v612h-214Zm-350.44 0v-612h214v612h-214Z"/></svg>
`;
    playPauseIcon_music3.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#fff"><path d="M548.22-174v-612h214v612h-214Zm-350.44 0v-612h214v612h-214Z"/></svg>
`;

    isPlaying_music = true;
  } else {
    audioPlayer_music.pause();
    playPauseIcon_music.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="gray"><path d="M320-200v-560l440 280-440 280Z"/></svg>`;
    playPauseIcon_music2.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#fff"><path d="M320-200v-560l440 280-440 280Z"/></svg>`;
    playPauseIcon_music3.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#fff"><path d="M320-200v-560l440 280-440 280Z"/></svg>`;
    isPlaying_music = false;
  }
  updateActionsMap();
}

function nextTrack_music() {
  if (!musicExists) return;
  const total = musicList_music.length + customTracks_music.length;
  currentIndex_music = (currentIndex_music + 1) % total;
  playTrack_music(currentIndex_music);
}

function prevTrack_music() {
  if (!musicExists) return;
  const total = musicList_music.length + customTracks_music.length;
  currentIndex_music = (currentIndex_music - 1 + total) % total;
  playTrack_music(currentIndex_music);
}

audioPlayer_music.ontimeupdate = () => {
  const percent =
    (audioPlayer_music.currentTime / audioPlayer_music.duration) * 100;
  progressBar_music.value = percent || 0;
  progressBar_music2.value = percent || 0;
};

progressBar_music.oninput = () => {
  audioPlayer_music.currentTime =
    (progressBar_music.value / 100) * audioPlayer_music.duration;
};
progressBar_music2.oninput = () => {
  audioPlayer_music.currentTime =
    (progressBar_music2.value / 100) * audioPlayer_music.duration;
};

function closePlayer_music() {
  audioPlayer_music.pause();
  audioPlayer_music.currentTime = 0;
  hidePopup_open_close(playerPopup_music);
  playlist_music.style.height = "60vh";
  playPauseIcon_music.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="gray"><path d="M320-200v-560l440 280-440 280Z"/></svg>`;
  isPlaying_music = false;
  musicExists = false;
  updateActionsMap();
  document.getElementById(
    "img_musicControlsCenter"
  ).style.backgroundImage = `none`;
  document.getElementById(
    "music_textControlsCenter"
  ).textContent = `Not playing`;
}

function openFilePicker_music() {
  const input = document.getElementById("fileInput_music");
  input.value = "";
  input.click();
}

document
  .getElementById("fileInput_music")
  .addEventListener("change", function (e) {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith("audio/"));
    if (!files.length) return;

    let processedCount = 0;
    const totalFiles = files.length;

    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      jsmediatags.read(file, {
        onSuccess: function (tag) {
          const tags = tag.tags;
          const title = tags.title || file.name.replace(/\.[^/.]+$/, "");
          const artist = tags.artist || "Unknown Artist";

          let imgUrl = "originos_data/iconPacks/hype_icon/system_music.png";
          if (tags.picture) {
            const { data, format } = tags.picture;
            const byteArray = new Uint8Array(data);
            const blob = new Blob([byteArray], { type: format });
            imgUrl = URL.createObjectURL(blob);
          }

          const newTrack = { title, img: imgUrl, src: url };
          customTracks_music.push(newTrack);

          processedCount++;
          if (processedCount === totalFiles) {
            updatePlaylist_music();
            playTrack_music(musicList_music.length + customTracks_music.length - totalFiles);
          }
        },
        onError: function () {
          const fallbackTrack = {
            title: file.name.replace(/\.[^/.]+$/, ""),
            img: "originos_data/iconPacks/hype_icon/system_music.png",
            src: url,
          };
          customTracks_music.push(fallbackTrack);

          processedCount++;
          if (processedCount === totalFiles) {
            updatePlaylist_music();
            playTrack_music(musicList_music.length + customTracks_music.length - totalFiles);
          }
        },
      });
    });
  });

// Khởi tạo giao diện ban đầu
updatePlaylist_music();

const soundCache = {};

function preLoadSound(url) {
  if (!soundCache[url]) {
    const audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    soundCache[url] = audio;
  }
}

// Pre-load common system sounds
const systemSounds = [
  "https://cropgif.net/audio/1776965686907-f4ab76ce-4428-40c0-afb5-a6a3f6935865.ogg", // click
  "https://cropgif.net/audio/1776964946251-c868ee69-c7d5-4373-9aeb-5d07786adda3.ogg", // lock
  "https://cropgif.net/audio/1776965211523-43063b4c-3e63-4adc-85e2-e22fd2799d41.ogg", // unlock
  "https://cropgif.net/audio/1776965251083-5ccb7558-3b9e-4b87-aceb-e908015ffb8c.ogg", // app close
  "originos_data/ui/LowBattery.ogg"
];
systemSounds.forEach(preLoadSound);

function playmusic(url, volume = 1.0) {
  if (volume <= 0) return;

  let audio;
  if (soundCache[url]) {
    audio = soundCache[url].cloneNode(); 
  } else {
    audio = new Audio(url);
    soundCache[url] = audio;
  }

  audio.volume = Math.min(volume, 1);
  audio.play().catch(e => console.warn("Audio play failed:", e));
}

phone.addEventListener("pointerdown", clickSound);
function clickSound() {
  playmusic(
    "https://cropgif.net/audio/1776965686907-f4ab76ce-4428-40c0-afb5-a6a3f6935865.ogg",
    volume_click_volume
  );
}
