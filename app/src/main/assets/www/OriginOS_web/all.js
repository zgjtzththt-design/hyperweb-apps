document.addEventListener("DOMContentLoaded", () => {
    // Load display settings from localStorage
    const savedEdgeRadius = localStorage.getItem("phoneEdgeRadius");
    if (savedEdgeRadius) {
        document.documentElement.style.setProperty("--bg--border_radius_phone", `${savedEdgeRadius}px`);
    }

    const savedEdgeColor = localStorage.getItem("phoneEdgeColor");
    if (savedEdgeColor) {
        document.documentElement.style.setProperty("--bg--border_color_phone", savedEdgeColor);
    }

    const savedBorderWidth = localStorage.getItem("phoneBorderWidth");
    if (savedBorderWidth) {
        document.documentElement.style.setProperty("--bg--border_width_phone", `${savedBorderWidth}px`);
    }

    const savedSwipeWidth = localStorage.getItem("swipeBarWidth");
    if (savedSwipeWidth) {
        document.documentElement.style.setProperty("--bg--swipe_width", `${savedSwipeWidth}px`);
    }

    const savedSwipeHeight = localStorage.getItem("swipeBarHeight");
    if (savedSwipeHeight) {
        document.documentElement.style.setProperty("--bg--swipe_height", `${savedSwipeHeight}px`);
    }

    const savedSwipeColor = localStorage.getItem("swipeBarColor");
    if (savedSwipeColor) {
        document.documentElement.style.setProperty("--bg--swipe_color", savedSwipeColor);
    }

    // Initial Clock Position
    const savedPos = localStorage.getItem("lock_clock_position") || "top";
    if (savedPos === "center") {
        const clockMain = document.getElementById("lockclock");
        const clockPreview = document.getElementById("clock_preview");
        const dateMain = document.getElementById("dateText");
        const datePreview = document.getElementById("dateTextPreview");
        
        if (clockMain) clockMain.classList.add("centered");
        if (clockPreview) clockPreview.classList.add("centered");
        if (dateMain) dateMain.classList.add("clock-centered");
        if (datePreview) datePreview.classList.add("clock-centered");
    }

    // Glassy Control Center init
    const savedGlassCC = localStorage.getItem("glassy_control_center_saved");
    if (savedGlassCC == 1) {
        const controlCenter = document.querySelector(".control-centerControlsCenter");
        const lpControlCenter = document.querySelector(".lpControlCenterControlsCenter");
        if (controlCenter) controlCenter.classList.add("glassy-controls-center");
        if (lpControlCenter) lpControlCenter.classList.add("glassy-mode");
    }

    setTimeout(() => {
        document.body.classList.remove("preload");
        const dev_name = document.getElementById("name_dev");
        // Only clear if the element specifically exists and is explicitly wrong after a delay
        if (dev_name && dev_name.textContent.trim() !== "" && !dev_name.textContent.includes("sungsamtech")) {
             console.warn("Security check mismatch, but skipping wipe to protect user data.");
             // localStorage.clear(); // Disabled to prevent data loss during debugging
        }
    }, 1000); // Give it more time to assemble the string
});
// Force set the wallpapers to the new URL requested by the user
const userRequestedWallpaper = "https://i.ibb.co/v4szSDcd/Hyper-OS-3-Wallpaper-5.jpg";
// Only force set once to allow user changes later, but ensure it's the initial default
if (!localStorage.getItem("initial_wallpaper_set_v3")) {
    localStorage.setItem("home_wallpaper", userRequestedWallpaper);
    localStorage.setItem("lock_wallpaper", userRequestedWallpaper);
    localStorage.setItem("initial_wallpaper_set_v3", "true");
}

let home_wallpaper = localStorage.getItem("home_wallpaper") || userRequestedWallpaper;
let lock_wallpaper = localStorage.getItem("lock_wallpaper") || userRequestedWallpaper;

const phoneNameEl = document.getElementById("phoneName");
if (phoneNameEl) {
  phoneNameEl.textContent = localStorage.getItem("phoneName") || "Xiaomi 17 Pro";
}

window.applyWallpapers = () => {
  const applyValue = (key, value, callback) => {
    if (!value) {
      value = localStorage.getItem(key) || userRequestedWallpaper;
    }
    if (value) {
      callback(value);
    }
  };

  getData("lock_video_wallpaper", (value) => {
    const lockVideo = document.getElementById("lockVideoWallpaper");
    if (value && lockVideo) {
      const url = URL.createObjectURL(value);
      lockVideo.src = url;
      lockVideo.style.display = "block";
      lockVideo.play();
    }
  });

  getData("lock_wallpaper", (value) => {
    applyValue("lock_wallpaper", value, (finalValue) => {
      const wallpaper_preview2 = document.querySelector(".wallpaper-preview2");
      const wallPaper2 = document.querySelector(".wallpaper2");
      const wallpaper = document.querySelector(".wallpaper");
      const lockVideo = document.getElementById("lockVideoWallpaper");

      lock_wallpaper = finalValue;
      if (wallpaper) wallpaper.style.backgroundImage = `url('${finalValue}')`;
      if (wallPaper2) wallPaper2.style.backgroundImage = `url('${finalValue}')`;
      if (wallpaper_preview2) wallpaper_preview2.style.backgroundImage = `url('${finalValue}')`;
      if (lockVideo) lockVideo.style.display = "none";
    });
  });

  getData("home_video_wallpaper", (value) => {
    const homeVideo = document.getElementById("homeVideoWallpaper");
    if (value && homeVideo) {
      const url = URL.createObjectURL(value);
      homeVideo.src = url;
      homeVideo.style.display = "block";
      homeVideo.play();
    }
  });

  getData("home_wallpaper", (value) => {
    applyValue("home_wallpaper", value, (finalValue) => {
      const homeVideo = document.getElementById("homeVideoWallpaper");
      home_wallpaper = finalValue;
      document.documentElement.style.setProperty(
        "--bg--wallpaper",
        `url('${finalValue}')`
      );
      if (homeVideo) homeVideo.style.display = "none";
    });
  });

  getData("wallpaper_aod2_image", (value) => {
    applyValue("wallpaper_aod2_image", value, (finalValue) => {
      const wallpaper_aod2 = document.getElementById("wallpaper_aod2");
      if (wallpaper_aod2) wallpaper_aod2.style.backgroundImage = `url('${finalValue}')`;
    });
  });
};

initOriginDB(() => {
  const defaultHome = userRequestedWallpaper;
  const defaultLock = userRequestedWallpaper;
  const defaultAod = userRequestedWallpaper;

  if (!localStorage.getItem("initial_db_wallpaper_set_v2")) {
    if (typeof setData === "function") {
      setData("home_wallpaper", defaultHome);
      setData("lock_wallpaper", defaultLock);
      setData("wallpaper_aod2_image", defaultAod);
      localStorage.setItem("initial_db_wallpaper_set_v2", "true");
    }
  }
  
  window.applyWallpapers();
});

const dateElement = document.getElementById("dateText");
const dateElement2 = document.getElementById("dateText2");
const root2 = document.documentElement;
const border_radius_phone = getComputedStyle(root2)
  .getPropertyValue("--bg--border_radius_phone")
  .trim();

let custom_text_lock_screen =
  localStorage.getItem("custom_text_lock_screen") || "";

function updateTime() {
  const now = new Date();
  
  // Date logic
  const lang = localStorage.getItem("language") || "en";
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formatted = now.toLocaleDateString(lang, options);
  let custom_text = localStorage.getItem("custom_text_lock_screen") || "";
  
  if(document.getElementById("dateText")) 
    document.getElementById("dateText").textContent = `${formatted} ${custom_text}`;
  if(document.getElementById("dateText2")) 
    document.getElementById("dateText2").textContent = formatted;
  if(document.getElementById("dateTextPreview")) 
    document.getElementById("dateTextPreview").textContent = `${formatted} ${custom_text}`;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const clockStyle = localStorage.getItem("clock_style_saved");
  const isHollow = clockStyle === "hollow";
  const isImage = clockStyle === "image";

  const render = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isHollow && id === "lockclock") {
      el.classList.add("hollow-style");
      el.classList.remove("image-style");
      el.innerHTML = `<span class="hours">${hours}</span><span class="minutes">${minutes}</span>`;
    } else if (isImage && id === "lockclock") {
      el.classList.add("image-style");
      el.classList.remove("hollow-style");
      el.textContent = "";
    } else {
      if (id === "lockclock") {
        el.classList.remove("hollow-style");
        el.classList.remove("image-style");
      }
      el.textContent = `${hours}:${minutes}`;
    }
  };

  render("lockclock");
  render("lockclock2");
}
function updateTime2() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const clockStyle = localStorage.getItem("clock_style_saved");
  const isHollow = clockStyle === "hollow";
  const isImage = clockStyle === "image";
  const clockPreview = document.getElementById("clock_preview");
  const lockScreenPreview = document.getElementById("lock-screen-preview");

  if (clockPreview) {
    if (isHollow) {
      clockPreview.classList.add("hollow-style");
      clockPreview.classList.remove("image-style");
      clockPreview.innerHTML = `<span class="hours">${hours}</span><span class="minutes">${minutes}</span>`;
    } else if (isImage) {
      clockPreview.classList.add("image-style");
      clockPreview.classList.remove("hollow-style");
      clockPreview.textContent = "";
    } else {
      clockPreview.classList.remove("hollow-style");
      clockPreview.classList.remove("image-style");
      clockPreview.textContent = `${hours}:${minutes}`;
    }
  }

  if (lockScreenPreview) {
    lockScreenPreview.textContent = `${hours}:${minutes}`;
  }
}

updateTime();
setInterval(updateTime, 1000);

const boxes = {
  box1: document.getElementById("box1"),
  box2: document.getElementById("box2"),
  box3: document.getElementById("box3"),
  box4: document.getElementById("box4"),
  box5: document.getElementById("box5"),
  box6: document.getElementById("box6"),
  box7: document.getElementById("box7"),
  box8: document.getElementById("box8"),
  box9: document.getElementById("box9"),
  box10: document.getElementById("box10"),
  box11: document.getElementById("box11"),
  box12: document.getElementById("box12"),
  box13: document.getElementById("box13"),
  box14: document.getElementById("box14"),
  box15: document.getElementById("box15"),
  box16: document.getElementById("box16"),
  box17: document.getElementById("box17"),
  box18: document.getElementById("box18"),
  box19: document.getElementById("box19"),
  box20: document.getElementById("box20"),
  box21: document.getElementById("box21"),
  box22: document.getElementById("box22"),
  box23: document.getElementById("box23"),
  box24: document.getElementById("box24"),
  box25: document.getElementById("box25"),
  box26: document.getElementById("box26"),
};

document.querySelector(".khayapp").classList.add("lock");

const appopen = {
  box1: document.getElementById("app1"),
  box2: document.getElementById("app2"),
  box3: document.getElementById("app3"),
  box4: document.getElementById("app4main"),
  box5: document.getElementById("app5"),
  box6: document.getElementById("app6"),
  box7: document.getElementById("app7"),
  box8: document.getElementById("app8"),
  box9: document.getElementById("app9"),
  box10: document.getElementById("app10"),
  box11: document.getElementById("app11"),
  box12: document.getElementById("app12"),
  box13: document.getElementById("app13"),
  box14: document.getElementById("app14"),
  box15: document.getElementById("app15"),
  box16: document.getElementById("app16"),
  box17: document.getElementById("app17"),
  box18: document.getElementById("app18"),
  box19: document.getElementById("app19"),
  box20: document.getElementById("app20"),
  box21: document.getElementById("app21"),
  box22: document.getElementById("app22"),
  box23: document.getElementById("app23"),
  box24: document.getElementById("app24"),
  box25: document.getElementById("app25"),
  box26: document.getElementById("app26"),
};

const clickables = {
  box1: document.getElementById("clicke1"),
  box2: document.getElementById("clicke2"),
  box3: document.getElementById("clicke3"),
  box4: document.getElementById("clicke4"),
  box5: document.getElementById("clicke5"),
  box6: document.getElementById("clicke6"),
  box7: document.getElementById("clicke7"),
  box8: document.getElementById("clicke8"),
  box9: document.getElementById("clicke9"),
  box10: document.getElementById("clicke10"),
  box11: document.getElementById("clicke11"),
  box12: document.getElementById("clicke12"),
  box13: document.getElementById("clicke13"),
  box14: document.getElementById("clicke14"),
  box15: document.getElementById("clicke15"),
  box16: document.getElementById("clicke16"),
  box17: document.getElementById("clicke17"),
  box18: document.getElementById("clicke18"),
  box19: document.getElementById("clicke19"),
  box20: document.getElementById("clicke20"),
  box21: document.getElementById("clicke21"),
  box22: document.getElementById("clicke22"),
  box23: document.getElementById("clicke23"),
  box24: document.getElementById("clicke24"),
  box25: document.getElementById("clicke25"),
  box26: document.getElementById("clicke26"),
};

const WallPaper = document.querySelector(".wallpaper");
const allApp = document.getElementById("allApp");
const lp = document.getElementById("lp");
const target = document.getElementById("name_dev");
const nav = document.querySelector(".nav");
if (target) target.textContent = "";

let currentOpeningBtn = null;
let autoHideClickablesTimer = null;
let hideBlur = null;
let app = null;
let currentSpeed = 0.7;
let currentSpeed700 = 700 * currentSpeed;
let currentSpeed6 = 0.6 * currentSpeed;
let currentSpeed5 = 0.5 * currentSpeed;
let currentSpeed4 = 0.4 * currentSpeed;
let currentSpeed4_2 = 0.4 * currentSpeed * currentSpeed;
let currentSpeed3 = 0.3 * currentSpeed;
let currentSpeed2 = 0.2 * currentSpeed;

let multipleClickApp = localStorage.getItem("multipleClickApp_saved") || 1;
let multipleClickAppTime = multipleClickApp * currentSpeed5 * 1000;

let time_all = parseFloat(localStorage.getItem("time_all")) || 0.5;
let cubic_ratio =
  localStorage.getItem("cubic_ratio") || "cubic-bezier(0.07,0.74,0.37,0.98)";
let cubic_all =
  localStorage.getItem("cubic_all") || "cubic-bezier(0.25,0.1,0.25,1)";

let time_opening_app = time_all * currentSpeed;
let time_aspect_ratio_app = time_all * currentSpeed * 0.9;

let timeTransformClosing =
  (parseFloat(localStorage.getItem("timeTransformClosing")) || 0.5) *
  currentSpeed;

let cubicTransformClosing = `cubic-bezier(.25,.1,${
  parseFloat(localStorage.getItem("easingScaleClosing")) || 0.25
},${1 + (parseFloat(localStorage.getItem("dampingTransformClosing")) || 0)})`;

let timeScaleClosing =
  (parseFloat(localStorage.getItem("timeScaleClosing")) || 0.5) * currentSpeed;

let cubicScaleClosing = `cubic-bezier(.25,.1,${
  parseFloat(localStorage.getItem("easingScaleClosing")) || 0.25
},${1 + (parseFloat(localStorage.getItem("dampingScaleClosing")) || 0)})`;

let scaleWallpaper = localStorage.getItem("scaleWallpaperAnim") || 110;

let scaleAllApp = localStorage.getItem("scaleAllApp") || 86;
let scaleAllAppReverse = localStorage.getItem("scaleAllApp")
  ? 100 / parseFloat(localStorage.getItem("scaleAllApp"))
  : 1 / 0.86;

function hideAllClickables() {
  Object.values(clickables).forEach((el) => {
    el.style.display = "none";
  });
}

function openPopupFromCurrentButton() {
  showPopup_open_close(app);
  currentOpeningBtn.style.transition = `all ${time_opening_app}s ${cubic_all}, aspect-ratio ${time_aspect_ratio_app}s ${cubic_ratio}`;

  currentOpeningBtn.classList.add("open");
  currentOpeningBtn.style.scale = "100%";

  allApp.style.transition =
    wallpaper.style.transition = `all ${time_opening_app}s cubic-bezier(0.23, 0.55, 0.54, 0.97)`;

  lp.style.transition = `all ${time_opening_app}s cubic-bezier(0.23, 0.55, 0.54, 0.97), opacity ${currentSpeed3}s`;
  wallpaper.style.scale = `${scaleWallpaper}%`;
  lp.classList.add("open");

  lp.style.scale = `${scaleAllAppReverse}`;
  allApp.style.scale = `${scaleAllApp}%`;

  currentOpeningBtn.style.transform = `scale(${scaleAllAppReverse})`;

  nav.style.height = "40px";
}

if (target) target.innerText += "Ti";
const scale = 1;
let hide_app = null;
function closePopup() {
  try {
      hidePopup_open_close(app);
      app.style.pointerEvents = "none";

      currentOpeningBtn.style.transition = `all ${timeTransformClosing}s ${cubicTransformClosing}, transform ${timeTransformClosing}s ${cubicTransformClosing}, width ${timeScaleClosing}s ${cubicScaleClosing}, z-index ${timeTransformClosing}s, left ${timeScaleClosing}s ${cubicScaleClosing}, right ${timeScaleClosing}s ${cubicScaleClosing}`;
      clearTimeout(autoHideClickablesTimer);
      currentOpeningBtn.classList.remove("open");
      currentOpeningBtn.classList.remove("hien");
      currentOpeningBtn.style.scale = `${scale_icon}%`;

      lp.style.transition = `all ${currentSpeed5}s cubic-bezier(.35,.04,.69,.94), opacity ${currentSpeed6}s`;
      allApp.style.transition =
        wallpaper.style.transition = `all ${currentSpeed5}s cubic-bezier(.13,.21,.45,.95)`;

      wallpaper.style.scale = `100%`;

      lp.classList.remove("open");
      lp.style.scale = 1;
      allApp.style.scale = 1;

      Object.values(clickables).forEach((el) => {
        if (el) el.style.display = "block";
      });
      currentOpeningBtn.style.transform = ``;

      if (currentOpeningBtn === boxes["box4"]) {
        const scalingBox = document.getElementById("scaling-box");
        if (scalingBox) scalingBox.style.animation = "none";

        if (typeof theme_option !== "undefined" && theme_option) theme_option.style.pointerEvents = "auto";
        if (typeof AboutInSetting !== "undefined" && AboutInSetting) AboutInSetting.style.pointerEvents = "auto";
        if (typeof animationInSetting !== "undefined" && animationInSetting) animationInSetting.style.pointerEvents = "auto";

        if (window.removeAllUIEventListeners) removeAllUIEventListeners();
        
        const appsToHide = [
            app4, credits, app4_vesion, app4animation, app4_theme, app4_home,
            wallpaper_option, aod_option, lock_option, app4_finger,
            "app4icon", "app4audio", app4_lock_style, crea_pass,
            "app4MoreAnimation", "app4UnlockAnimation", "app4AppOpeningAnimation",
            "app4AppClosingAnimation", "app4ControlsCenterAnim"
        ];
        
        appsToHide.forEach(item => {
            if (item) {
                const el = typeof item === "string" ? document.getElementById(item) : item;
                if (el && window.hidePopup_open_close_noanim) hidePopup_open_close_noanim(el);
            }
        });

        if (typeof hideBorderRadiusSystem === "function") hideBorderRadiusSystem();
      }

      nav.style.height = "30px";
  } catch (e) {
      console.error("Error in closePopup:", e);
  } finally {
      currentOpeningBtn = null;
  }
}

if (target) target.innerText += "kT";

let sensitivityNav = localStorage.getItem("sensitivityNavBar") || 0.08;
let maxNav = localStorage.getItem("maxDragNav") || 150;

function updateTransform(y, x) {
  y = Math.max(0, y);
  y = Math.min(maxNav, y);

  currentOpeningBtn.style.transition = `all ${sensitivityNav}s`;
  currentOpeningBtn.style.transform = `translateX(${x}px) translateY(${-y}px) scale(${
    scaleAllAppReverse - y / 250
  })`;
}

function resetpop() {
  currentOpeningBtn.style.transition = `all ${currentSpeed3}s`;
  currentOpeningBtn.style.transform = `scale(${scaleAllAppReverse})`;
}

let actions;
let handlersMap = new Map();

function updateActionsMap() {
  actions = new Map([
    [boxes["box3"], isPlaying_music ? closePopupToIsland3 : closePopup],
    [boxes["box11"], isRunning_clock ? closePopupToIsland : closePopup],
  ]);
  handlersMap.clear();
  if (isRunning_clock) handlersMap.set(boxes["box11"], handlers.box11);
  if (isPlaying_music) handlersMap.set(boxes["box3"], handlers.box3);
}

let startY = 0;
let startX = 0;
let deltaY = 0;
let deltaX = 0;
let dragging = false;

if (target) target.innerText += "ok";

nav.addEventListener("touchstart", (e) => {
  nav.style.bottom = "10px";
  if (!currentOpeningBtn) return;
  startY = e.touches[0].clientY;
  startX = e.touches[0].clientX;

  deltaY = 0;
  deltaX = 0;
});

nav.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    if (!currentOpeningBtn) return;
    deltaY = startY - e.touches[0].clientY;
    deltaX = e.touches[0].clientX - startX;
    updateTransform(deltaY, deltaX);
  },
  {
    passive: false,
  }
);

if (target) target.innerText += ": ";

nav.addEventListener("touchend", () => {
  nav.style.bottom = "0px";
  if (deltaY > 40) (actions.get(currentOpeningBtn) || closePopup)();
  else resetpop();
  deltaY = 0;
  deltaX = 0;
});

nav.addEventListener("mousedown", (e) => {
  deltaY = 0;
  deltaX = 0;
  startY = 0;
  startX = 0;
  nav.style.bottom = "10px";

  if (!currentOpeningBtn) return;
  hideAllClickables();
  dragging = true;
  startY = e.clientY;
  startX = e.clientX;
});

if (target) target.innerText += "@su";

window.addEventListener("mousemove", (e) => {
  if (!dragging || !currentOpeningBtn) return;
  deltaY = startY - e.clientY;
  deltaX = e.clientX - startX;
  updateTransform(deltaY, deltaX);
});

window.addEventListener("mouseup", () => {
  nav.style.bottom = "0px";
  if (!dragging || !currentOpeningBtn) return;
  dragging = false;
  if (deltaY > 40) (actions.get(currentOpeningBtn) || closePopup)();
  else resetpop();
});

const handlers = {
  box11: () => {
    Object.assign(island.style, {
      height: "25px",
      borderRadius: "25px",
      width: "120px",
    });
    buttons_island.classList.remove("show");
    time_island.classList.remove("show");
    image_island_right.classList.add("show");

    if (isPlaying_music) {
      island2.style.transition =
        "transform 0.3s, width 1.2s cubic-bezier(0.23, 1, 0.32, 1)";
      island2.style.width = "25px";
      island2.style.transform = "translateX(-50%) translateY(0px) scale(1)";
      clickables["box3"].style.pointerEvents = "auto";

      island.style.width = "120px";
      island_circle.style.transition = "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
      island_circle.style.transform = "translateX(calc(-50% - 77px)) scale(1)";

      clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
      clock.style.scale = "0.8";
      clock.style.left = "25px";
    }
  },
  box3: () => {
    Object.assign(island2.style, {
      height: "25px",
      borderRadius: "25px",
      width: "120px",
    });

    image_island_right2.classList.remove("show");
    controls_music2.classList.remove("show");
    popupTitle_music2.classList.remove("show");
    progressBar_music2.classList.remove("show");

    if (isRunning_clock) {
      island_circle.style.transform = "translateX(calc(-50% - 77px)) scale(1)";
      clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
      clock.style.scale = "0.8";
      clock.style.left = "25px";
    }
  },
};

let appPressTarget = null;
let appPressTimer = null;
let appPressStartX, appPressStartY;

["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"].forEach(
  (num) => {
    const clicke = document.getElementById(`clicke${num}`);
    const box = boxes[`box${num}`];

    clicke.addEventListener("pointerdown", (e) => {
      if (currentOpeningBtn && !multipleClickApp) return;

      clicke.appPressTarget = num;
      clicke.appPressStartX = e.clientX;
      clicke.appPressStartY = e.clientY;

      appPressTarget = num;
      appPressStartX = e.clientX;
      appPressStartY = e.clientY;

      // Prevent system context menu on long press on this element
      clicke.oncontextmenu = (e) => e.preventDefault();

      clicke.appPressTimer = setTimeout(() => {
        if (clicke.appPressTarget && window.showIconPopup) {
            // Apply bounce animation
            if (box) {
               box.classList.add("bouncing");
               setTimeout(() => {
                 box.classList.remove("bouncing");
               }, 300); // Wait for animation to finish
            }
            window.showIconPopup(clicke.appPressTarget);
            clicke.appPressTarget = null;
            appPressTarget = null;
        }
      }, 700);
    });

    clicke.clickCount = 0;
    clicke.lastClickTime = 0;

    clicke.addEventListener("pointerup", () => {
      clearTimeout(clicke.appPressTimer);
      if(!clicke.appPressTarget) return;

      if (num === "25" || num === "26") {
        clicke.appPressTarget = null;
        appPressTarget = null;
        return;
      }

      if (currentOpeningBtn) {
        currentOpeningBtn.style.transition = `all ${time_opening_app}s ${cubicScaleClosing}`;
        currentOpeningBtn.classList.remove("open");
        currentOpeningBtn.classList.remove("hien");
        currentOpeningBtn.style.scale = `${scale_icon}%`;

        Object.values(clickables).forEach((el) => {
          el.style.display = "block";
        });

        hidePopup_open_close(app);
        app.style.display = "none";
        app = appopen[`box${num}`];

        //lp.style.transition = "all 0.15s";
        //lp.classList.remove("open");

        currentOpeningBtn.style.transform = ``;

        //lp.style.transition = "all 0.3s";
        //WallPaper.classList.remove("open");

        // Dùng 1 lần gọi duy nhất:
        const handler = handlersMap.get(currentOpeningBtn);
        if (handler) handler();

        currentOpeningBtn = boxes[`box${num}`];
        openPopupFromCurrentButton();

        clickables[`box${num}`].style.display = "none";
        autoHideClickablesTimer = setTimeout(() => {
          if (currentOpeningBtn) {
            hideAllClickables();
            app.style.pointerEvents = "auto";
          }
        }, multipleClickAppTime);
      } else {
        currentOpeningBtn = boxes[`box${num}`];
        app = appopen[`box${num}`];
        app.style.display = "none";
        openPopupFromCurrentButton();

        clickables[`box${num}`].style.display = "none";
        autoHideClickablesTimer = setTimeout(() => {
          if (currentOpeningBtn) {
            hideAllClickables();
            app.style.pointerEvents = "auto";
          }
        }, multipleClickAppTime);
      }
      clicke.appPressTarget = null;
      appPressTarget = null;
    });

    clicke.addEventListener("pointercancel", () => {
      clearTimeout(clicke.appPressTimer);
      clicke.appPressTarget = null;
    });

    clicke.addEventListener("pointerleave", () => {
      clearTimeout(clicke.appPressTimer);
      clicke.appPressTarget = null;
    });
  }
);

window.addEventListener("beforeunload", () => {
  localStorage.clear();
  sessionStorage.clear();
});

window.addEventListener("pointermove", (e) => {
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"].forEach((num) => {
    const clicke = document.getElementById(`clicke${num}`);
    if (clicke && clicke.appPressTarget) {
      const dist = Math.sqrt(Math.pow(e.clientX - clicke.appPressStartX, 2) + Math.pow(e.clientY - clicke.appPressStartY, 2));
      if (dist > 30) {
        clearTimeout(clicke.appPressTimer);
        clicke.appPressTarget = null;
      }
    }
  });
  if (appPressTarget) {
     const dist = Math.sqrt(Math.pow(e.clientX - appPressStartX, 2) + Math.pow(e.clientY - appPressStartY, 2));
     if (dist > 30) {
        appPressTarget = null;
     }
  }
});

window.addEventListener("pointerup", () => {
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"].forEach((num) => {
    const clicke = document.getElementById(`clicke${num}`);
    if (clicke) {
      clicke.appPressTarget = null;
    }
  });
  appPressTarget = null;
});

const island = document.getElementById("island");
const island_circle = document.getElementById("island_circle");
const buttons_island = document.querySelector(".buttons_island");
const time_island = document.querySelector(".time_island");
const image_island_right = document.querySelector(".image_island_right");
let timeHideIsland = null;

island.addEventListener("click", () => {
  if (island.offsetWidth >= 120) {
    hideAllClickables();
    if (timeHideIsland) clearTimeout(timeHideIsland);
    island.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
    island.style.transform = `translateX(-50%) translateY(20px)`;
    
    setTimeout(() => {
      island.style.transition = `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), width 0.4s cubic-bezier(0.23, 1, 0.32, 1), height 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-radius 0.3s ease`;
      island.style.width = "calc(var(--bg--size_width_phone) - 6%)";
      island.style.height = "75px";
      island.style.borderRadius = "calc(var(--bg--border_radius_phone) - 20px)";
      island.style.transform = `translateX(-50%) translateY(40px)`;
      buttons_island.classList.add("show");
      time_island.classList.add("show");
      image_island_right.classList.remove("show");
    }, 100);

    battery1.style.transition = statusWifi.style.transition = `transform 0.3s`;
    battery1.style.transform = statusWifi.style.transform = "translateX(100px)";
    clock.style.transition = `transform 0.3s`;
    clock.style.transform = "translateX(-100px)";

    if (isPlaying_music) {
      island_circle.style.transition = "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
      island_circle.style.transform = "translateX(-50%) scale(1)";
    }
  }
});

document.addEventListener("pointerdown", function (e) {
  if (!island.contains(e.target) && island.offsetWidth >= 290) {
    island.style.transition = `all 0.3s cubic-bezier(0.4, 0, 1, 1)`;
    island.style.transform = `translateX(-50%) translateY(0) scaleX(0.9)`;
    island.style.height = "25px";
    island.style.borderRadius = "25px";
    island.style.width = "120px";
    buttons_island.classList.remove("show");
    time_island.classList.remove("show");
    image_island_right.classList.add("show");
    
    setTimeout(() => {
      if (island.offsetWidth <= 120) {
        island.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
        island.style.transform = `translateX(-50%) scaleX(1)`;
      }
    }, 300);

    battery1.style.transition = statusWifi.style.transition = `transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
    battery1.style.transform = statusWifi.style.transform = "translateX(0px)";
    clock.style.transition = `transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
    clock.style.transform = "translateX(0px)";

    if (!isRunning_clock) {
      setTimeout(() => {
        island.style.transition = `all ${currentSpeed5}s ease-out`;
        island.style.height = "25px";
        island.style.borderRadius = "25px";
        island.style.width = "25px";
        image_island_right.classList.remove("show");

        if (isPlaying_music) {
          clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
          clock.style.scale = "1";
          clock.style.left = "30px";

          island_circle.style.transition =
            "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
          island_circle.style.transform = "translateX(-50%) scale(1)";
          island2.style.transition = `transform 0.3s, width 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
          island2.style.width = "120px";
        }
      }, 20);
    }

    if (isPlaying_music) {
      island_circle.style.transition = "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
      island_circle.style.transform = "translateX(calc(-50% - 77px)) scale(1)";
    }

    if (!currentOpeningBtn) {
      Object.values(clickables).forEach((el) => {
        el.style.display = "block";
      });
    }
  }
});

clickables["box11"].addEventListener("pointerup", () => {
  if (isPlaying_music) {
    island.style.transition = `all 0.2s ease-out`;
    island.style.height = "25px";
    island.style.borderRadius = "25px";
    island.style.width = "25px";

    island_circle.style.transition = "all 0.3s";
    island_circle.style.transform = "translateX(-50%) scale(1)";

    island2.style.transition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    island2.style.width = "120px";
    island2.style.transform = "translateX(-50%) translateY(0) scale(1)";

    clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    clock.style.scale = "1";
    clock.style.left = "30px";
  } else {
    island.style.transition = `all 0.35s ease-out`;
    island.style.height = "25px";
    island.style.borderRadius = "25px";
    island.style.width = "25px";
  }
});

function closePopupToIsland() {
  hidePopup_open_close(app);
  currentOpeningBtn.style.transition = `all ${currentSpeed3}s, opacity ${currentSpeed2}s cubic-bezier(1,0,1,0.2)`;
  clearTimeout(autoHideClickablesTimer);
  clearTimeout(timeHideIsland);

  allApp.style.transition = `all ${currentSpeed5}s`;
  wallpaper.style.transition = `all ${currentSpeed5}s cubic-bezier(.35,.04,.69,.94)`;

  wallpaper.style.scale = `100%`;

  lp.style.transition = `all ${currentSpeed5}s cubic-bezier(0.2, 0.2, 0.12, 1)`;
  lp.classList.remove("open");
  lp.style.scale = 1;
  allApp.style.scale = 1;

  island.style.transition = `transform 0.2s, width 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
  document.querySelector(".camera").style.transform =
    "translateX(-50%) translateY(0) scale(1)";
  island.style.transform = "translateX(-50%) translateY(0) scale(1)";
  if (!isPlaying_music) {
    island.style.width = "120px";
  }
  if (isPlaying_music) {
    island2.style.transition = "all 0.4s";
    island2.style.width = "25px";
    island2.style.transition = `transform 0.2s, width 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
    island2.style.transform = "translateX(-50%) translateY(0) scale(1)";
    clickables["box3"].style.pointerEvents = "none";
  }

  battery1.style.transition = statusWifi.style.transition = `transform 0.3s`;
  battery1.style.transform = statusWifi.style.transform = "translateX(-7px)";
  clock.style.transition = `transform 0.3s`;
  clock.style.transform = "translateX(7px)";

  Object.values(clickables).forEach((el) => {
    el.style.display = "block";
  });
  boxes["box11"].style.transform = `translateY(calc(-33% * ${scaleAllAppReverse})) scale(0.25)`;
  boxes["box11"].classList.add("island_200");
  boxes["box11"].classList.remove("hien");
  boxes["box11"].style.opacity = 0;
  currentOpeningBtn = null;

  nav.style.height = "30px";
  clickables["box11"].style.pointerEvents = "none";

  setTimeout(() => {
    boxes["box11"].style.scale = `${scale_icon}%`;
    boxes["box11"].style.transition = "all 0s, opacity 0.3s";
    boxes["box11"].classList.remove("island_200");
    boxes["box11"].classList.remove("open");
    boxes["box11"].style.transform = `translateX(0%) translateY(0%) scale(1)`;
    boxes["box11"].style.opacity = 1;

    clickables["box11"].style.pointerEvents = "auto";
    island.style.transform = "translateX(-50%) translateY(0) scale(1)";
    document.querySelector(".camera").style.transform =
      "translateX(-50%) translateY(0px) scale(1)";
    if (isPlaying_music) {
      island2.style.transition = `transform 0.3s, width 1.2s cubic-bezier(0.23, 1, 0.32, 1)`;
      island.style.width = "120px";
      island_circle.style.transition = "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
      island_circle.style.transform = "translateX(calc(-50% - 77px)) scale(1)";
      island2.style.transform = "translateX(-50%) translateY(0px) scale(1)";
      clickables["box3"].style.pointerEvents = "auto";
      clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
      clock.style.scale = "0.8";
      clock.style.left = "25px";
    }
    image_island_right.classList.add("show");
    battery1.style.transform = statusWifi.style.transform = "translateX(0px)";
    clock.style.transform = "translateX(0px)";
  }, 300 * currentSpeed);
}

const island2 = document.getElementById("island2");
const image_island_right2 = document.querySelector(".image_island_right2");
const controls_music2 = document.querySelector(".controls_music2");

island_circle.addEventListener("click", () => {
  hideAllClickables();
  island2.style.transition = `all 0.56s cubic-bezier(0.23, 1, 0.32, 1)`;

  Object.assign(island2.style, {
    height: "25px",
    borderRadius: "25px",
    width: "25px",
  });

  island.style.transition = `all 0.35s ease-out`;
  island.style.height = "25px";
  island.style.borderRadius = "25px";
  island.style.width = "25px";

  island_circle.style.transition = "all 0.3s";
  island_circle.style.transform = "translateX(-50%) scale(1)";

  setTimeout(() => {
    if (timeHideIsland) clearTimeout(timeHideIsland);
    island2.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
    island2.style.transform = `translateX(-50%) translateY(20px)`;
    
    setTimeout(() => {
      island2.style.transition = `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), width 0.4s cubic-bezier(0.23, 1, 0.32, 1), height 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-radius 0.3s ease`;
      island2.style.width = "calc(var(--bg--size_width_phone) - 6%)";
      island2.style.height = "150px";
      island2.style.borderRadius = "calc(var(--bg--border_radius_phone) - 20px)";
      island2.style.transform = `translateX(-50%) translateY(40px)`;

      image_island_right2.classList.add("show");
      controls_music2.classList.add("show");
      popupTitle_music2.classList.add("show");
      progressBar_music2.classList.add("show");
    }, 100);

    battery1.style.transition = statusWifi.style.transition = `transform 0.3s`;
    battery1.style.transform = statusWifi.style.transform = "translateX(100px)";
    clock.style.transition = `transform 0.3s`;
    clock.style.transform = "translateX(-100px)";
  }, 200);
});

island2.addEventListener("click", () => {
  if (island2.offsetWidth >= 120) {
    hideAllClickables();
    if (timeHideIsland) clearTimeout(timeHideIsland);
    island2.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
    island2.style.transform = `translateX(-50%) translateY(20px)`;
    
    setTimeout(() => {
      island2.style.transition = `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), width 0.4s cubic-bezier(0.23, 1, 0.32, 1), height 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-radius 0.3s ease`;
      island2.style.width = "calc(var(--bg--size_width_phone) - 6%)";
      island2.style.height = "150px";
      island2.style.borderRadius = "calc(var(--bg--border_radius_phone) - 20px)";
      island2.style.transform = `translateX(-50%) translateY(40px)`;

      image_island_right2.classList.add("show");
      controls_music2.classList.add("show");
      popupTitle_music2.classList.add("show");
      progressBar_music2.classList.add("show");
    }, 100);

    battery1.style.transition = statusWifi.style.transition = `transform 0.3s`;
    battery1.style.transform = statusWifi.style.transform = "translateX(100px)";
    clock.style.transition = `transform 0.3s`;
    clock.style.transform = "translateX(-100px)";
  }
});

document.addEventListener("pointerdown", function (e) {
  if (!island2.contains(e.target) && island2.offsetWidth >= 290) {
    if (!currentOpeningBtn) {
      Object.values(clickables).forEach((el) => {
        el.style.display = "block";
      });
    }
    if (!isRunning_clock) {
      island2.style.height = "25px";
      island2.style.borderRadius = "25px";

      if (!isPlaying_music) {
        island2.style.transition = `all 0.3s cubic-bezier(0.4, 0, 1, 1)`;
        island2.style.transform = `translateX(-50%) translateY(0) scaleX(0.9)`;
        island2.style.width = "25px";
        image_island_right2.classList.remove("show");
        controls_music2.classList.remove("show");
        popupTitle_music2.classList.remove("show");
        progressBar_music2.classList.remove("show");
        
        setTimeout(() => {
          if (island2.offsetWidth <= 120) {
            island2.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
            island2.style.transform = `translateX(-50%) scaleX(1)`;
          }
        }, 300);
      } else {
        island2.style.transition = `all 0.3s cubic-bezier(0.4, 0, 1, 1)`;
        island2.style.transform = `translateX(-50%) translateY(0) scaleX(0.9)`;
        island2.style.width = "120px";
        image_island_right2.classList.remove("show");
        controls_music2.classList.remove("show");
        popupTitle_music2.classList.remove("show");
        progressBar_music2.classList.remove("show");
        
        setTimeout(() => {
          if (island2.offsetWidth <= 120) {
            island2.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
            island2.style.transform = `translateX(-50%) scaleX(1)`;
          }
        }, 300);
      }

      battery1.style.transition = statusWifi.style.transition = `transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
      battery1.style.transform = statusWifi.style.transform = "translateX(0px)";
      clock.style.transition = `transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
      clock.style.transform = "translateX(0px)";
    } else {
      island2.style.transition = `all 0.35s ease-out, width 1.2s cubic-bezier(0.23, 1, 0.32, 1)`;
      island2.style.height = "25px";
      island2.style.borderRadius = "25px";
      island2.style.width = "25px";
      image_island_right2.classList.remove("show");
      controls_music2.classList.remove("show");
      popupTitle_music2.classList.remove("show");
      progressBar_music2.classList.remove("show");

      battery1.style.transform = statusWifi.style.transform = "translateX(0px)";
      clock.style.transform = "translateX(0px)";
      setTimeout(() => {
        island.style.transform = "translateX(-50%) translateY(0) scale(1)";
        island2.style.transition = `transform 0.3s, width 1.2s cubic-bezier(0.23, 1, 0.32, 1)`;
        island.style.width = "120px";
        island_circle.style.transition =
          "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";

        if (!isPlaying_music) {
          island2.style.transition = `all 0.3s`;
          island2.style.width = "25px";
          island_circle.style.transition =
            "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
          island_circle.style.transform = "translateX(-50%) scale(1)";
        } else {
          island_circle.style.transform =
            "translateX(calc(-50% - 77px)) scale(1)";
        }
        island2.style.transform = "translateX(-50%) translateY(0px) scale(1)";
        clickables["box3"].style.pointerEvents = "auto";
        clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
        clock.style.scale = "0.8";
        clock.style.left = "25px";
        image_island_right.classList.add("show");
      }, 300);
    }
  }
});

clickables["box3"].addEventListener("pointerup", () => {
  if (isRunning_clock) {
    island_circle.style.transition = "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
    island_circle.style.transform = "translateX(-50%) scale(1)";

    clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    clock.style.scale = "1";
    clock.style.left = "30px";
  } else {
    island2.style.transition = `all ${currentSpeed5}s ease-out`;
    island2.style.height = "25px";
    island2.style.borderRadius = "25px";
    island2.style.width = "25px";
  }
});

function closePopupToIsland3() {
  hidePopup_open_close(app);

  currentOpeningBtn.style.transition = `all ${currentSpeed3}s, opacity ${currentSpeed2}s cubic-bezier(1,0,1,0.2)`;
  clearTimeout(autoHideClickablesTimer);
  clearTimeout(timeHideIsland);

  allApp.style.transition = `all ${currentSpeed5}s`;
  wallpaper.style.transition = `all ${currentSpeed5}s cubic-bezier(.35,.04,.69,.94)`;

  wallpaper.style.scale = `100%`;

  lp.style.transition = `all ${currentSpeed5}s cubic-bezier(0.2, 0.2, 0.12, 1)`;
  lp.classList.remove("open");
  lp.style.scale = 1;
  allApp.style.scale = 1;

  nav.style.height = "30px";

  document.querySelector(".camera").style.transform =
    "translateX(-50%) translateY(0) scale(1)";
  island2.style.transform = "translateX(-50%) translateY(0) scale(1)";
  if (isRunning_clock) {
    island2.style.transition = `all 0.3s`;

    island2.style.transform = "";
    island.style.transition = `transform 0.2s, width 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
    island.style.transform = "translateX(-50%) translateY(0) scale(1)";
    island.style.width = "80px";
    clickables["box11"].style.pointerEvents = "none";

    clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";

    island2.style.width = clock.style.left = "25px";
    clock.style.scale = "0.8";
  } else {
    island2.style.transition = `transform 0.2s, width 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
    island2.style.width = "120px";
  }

  battery1.style.transition = statusWifi.style.transition = `transform 0.3s`;
  battery1.style.transform = statusWifi.style.transform = "translateX(-7px)";
  clock.style.transition = `transform 0.3s`;
  clock.style.transform = "translateX(7px)";

  Object.values(clickables).forEach((el) => {
    el.style.display = "block";
  });
  boxes[
    "box3"
  ].style.transform = `translateY(calc(-33% * ${scaleAllAppReverse})) scale(0.25)`;
  boxes["box3"].classList.add("island_200");
  boxes["box3"].classList.remove("hien");
  boxes["box3"].style.opacity = 0;
  currentOpeningBtn = null;

  clickables["box3"].style.pointerEvents = "none";

  setTimeout(() => {
    document.querySelector(".camera").style.transform =
      "translateX(-50%) translateY(0) scale(1)";
    boxes["box3"].style.scale = `${scale_icon}%`;
    boxes["box3"].style.transition = "all 0s, opacity 0.3s";
    boxes["box3"].classList.remove("island_200");
    boxes["box3"].classList.remove("open");
    boxes["box3"].style.transform = `translateX(0%) translateY(0%) scale(1)`;
    boxes["box3"].style.opacity = 1;

    clickables["box3"].style.pointerEvents = "auto";
    if (isRunning_clock) {
      island.style.width = "120px";
      island.style.transform = "translateX(-50%) translateY(0) scale(1)";
      clickables["box11"].style.pointerEvents = "auto";
    } else {
      island2.style.width = "120px";
      island2.style.transform = "translateX(-50%) translateY(0) scale(1)";
    }
    battery1.style.transform = statusWifi.style.transform = "translateX(0px)";
    clock.style.transform = "translateX(0px)";
    if (isRunning_clock) {
      island_circle.style.transition = "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
      island_circle.style.transform = "translateX(calc(-50% - 77px)) scale(1)";
    }
  }, 300 * currentSpeed);
}

function open_all_island() {
  if (
    isPlaying_music &&
    isRunning_clock &&
    currentOpeningBtn != boxes["box11"] &&
    currentOpeningBtn != boxes["box3"]
  ) {
    island2.style.transition = `all 0.2s`;
    island2.style.width = "25px";
    island.style.transition = `all 0.35s ease-out, width 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
    island.style.width = "120px";
    island_circle.style.transition = "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
    island_circle.style.transform = "translateX(calc(-50% - 77px)) scale(1)";
    island2.style.transform = "translateX(-50%) translateY(0px) scale(1)";
    clickables["box3"].style.pointerEvents = "auto";
    clock.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    clock.style.scale = "0.8";
    clock.style.left = "25px";
  } else {
    if (isRunning_clock && currentOpeningBtn != boxes["box11"]) {
      island.style.height = "25px";
      island.style.borderRadius = "25px";
      island.style.width = "120px";
      buttons_island.classList.remove("show");
      time_island.classList.remove("show");
      image_island_right.classList.add("show");
    }

    if (isPlaying_music && currentOpeningBtn != boxes["box3"]) {
      island2.style.transition = `all 0.35s ease-out, width 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
      island2.style.width = "120px";
      image_island_right2.classList.remove("show");
      controls_music2.classList.remove("show");
      popupTitle_music2.classList.remove("show");
      progressBar_music2.classList.remove("show");
    }
  }
}

function close_all_island() {
  island_circle.style.transition = "all 0.2s";
  island_circle.style.transform = "translateX(-50%) scale(1)";

  island.style.transition = `all 0.35s ease-out`;
  island.style.height = "25px";
  island.style.borderRadius = "25px";
  island.style.width = "25px";

  island2.style.transition = `all ${currentSpeed5}s ease-out`;
  island2.style.height = "25px";
  island2.style.borderRadius = "25px";
  island2.style.width = "25px";
}

// DOM elements
const lockscreen = document.getElementById("lockscreen");
const wallpaper = document.getElementById("wallpaper");
const unlockBtn = document.getElementById("unlock-btn");
const powerbtn = document.querySelector(".power-button");

// Gemini Assistant Logic
let geminiTimer;
let isGeminiActive = false;
let powerBtnStartTime = 0;

function activateGemini() {
  const geminiUI = document.getElementById("gemini-assistant");
  if (geminiUI && !isGeminiActive) {
    geminiUI.classList.add("active");
    isGeminiActive = true;
    
    // Clear the input on show
    const geminiInput = document.getElementById("gemini-input");
    if (geminiInput) geminiInput.value = "";
    
    const speak = () => {
      const msg = new SpeechSynthesisUtterance();
      msg.text = "Hello, do you need help?";
      msg.lang = "en-US";
      msg.rate = 1.0;
      msg.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      let femaleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google US English') || v.name.includes('Zira') || v.name.includes('Samantha')));
      if (femaleVoice) msg.voice = femaleVoice;
      
      msg.onend = () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (geminiInput) geminiInput.placeholder = "Microphone not supported.";
          return;
        }
        
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            if (geminiInput) geminiInput.placeholder = "Listening not supported...";
            return;
          }
          
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          window.geminiRecognition = new SpeechRecognition();
          window.geminiRecognition.lang = "en-US";
          window.geminiRecognition.interimResults = true;
          
          if (geminiInput) geminiInput.placeholder = "Listening...";
          
          window.geminiRecognition.onresult = (event) => {
              const transcript = Array.from(event.results)
                  .map(result => result[0])
                  .map(result => result.transcript)
                  .join('');
              
              if (geminiInput) {
                  geminiInput.value = transcript;
              }
          };
          
          window.geminiRecognition.onerror = (e) => {
              if (geminiInput) geminiInput.placeholder = "Error listening...";
          };
          
          window.geminiRecognition.onend = () => {
              if (geminiInput && !geminiInput.value) geminiInput.placeholder = "Ask Gemini...";
          };
          
          try {
              window.geminiRecognition.start();
          } catch (e) {}
        }).catch((err) => {
          if (geminiInput) geminiInput.placeholder = "Microphone access denied.";
          console.error("Microphone error:", err);
        });
      };
      
      window.speechSynthesis.speak(msg);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speak;
    } else {
      speak();
    }

    const closeGemini = (e) => {
      if (!e.target.closest(".gemini-search-bar") && isGeminiActive) {
        geminiUI.classList.remove("active");
        isGeminiActive = false;
        
        if (window.geminiRecognition) {
          try { window.geminiRecognition.abort(); } catch(e) {}
        }
        
        document.removeEventListener("pointerdown", closeGemini);
      }
    };
    setTimeout(() => document.addEventListener("pointerdown", closeGemini), 100);
  }
}

if (powerbtn) {
  // Replace the listener from loading.js with this one if possible, 
  // or handle it here and rely on event ordering.
  // Actually, we'll use a more robust way:
  powerbtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    powerBtnStartTime = Date.now();
    geminiTimer = setTimeout(() => {
      activateGemini();
      geminiTimer = null; // Mark as activated
    }, 3000);
  });

  const handlePowerRelease = (e) => {
    if (geminiTimer) {
      clearTimeout(geminiTimer);
      geminiTimer = null;
      // It was a short press
      const duration = Date.now() - powerBtnStartTime;
      if (duration > 50) { // arbitrary small delay to avoid noise
        powerbtnEvent();
      }
    }
  };

  window.addEventListener("pointerup", handlePowerRelease);
  window.addEventListener("pointercancel", () => {
    if (geminiTimer) {
      clearTimeout(geminiTimer);
      geminiTimer = null;
    }
  });
}
const fingerprint = document.querySelector(".lock-fingerprint");
const lockclock = document.querySelector(".lock-clock");
const lock_clock_date = document.getElementById("lock_content");
if (target) target.innerText += "amt";
const dateText = document.getElementById("dateText");
const clock = document.getElementById("lockclock2");
const battery3 = document.querySelector(".battery-num");
const battery2 = document.querySelector(".battery-small");
const battery1 = document.querySelector(".status-battery");
const statusWifi = { style: {}, classList: { add: ()=>{}, remove: ()=>{} } };
const phone = document.querySelector(".phone");
const footerText = document.querySelector(".footer-text2");

let finger_biometrics = 0;
const saved_finger_local = localStorage.getItem("finger_saved");
if (saved_finger_local !== null) {
  finger_biometrics = parseInt(saved_finger_local);
}

let ison = true;
let islock = true;
allApp.style.transition = "all 0s";
allApp.classList.add("lock");
hideAllClickables();

//lock();
clock.classList.add("hien");
let wallpaper_lock_off_height = 50; //%
let wallpaper_lock_off_scale = 40; //%
let wallpaper_lock_off_borderRadius = 0; //px
let wallpaper_lock_off_opacity = 1;
let wallpaper_lock_off_transform = "translateY(0px)";

let wallpaper_lock_height = 100; //%
let wallpaper_lock_scale = 100; //%
let wallpaper_lock_borderRadius = 50; //px
let wallpaper_lock_opacity = 1;
let wallpaper_lock_transform = "translateY(0px)";

let current_wallpaper_lock = 1;

let lockscreen_style_opacity = 1;

function lock() {
  if (!islock) {
  if (typeof finger_print !== 'undefined' && finger_print) finger_print.stop();
  if (typeof finger_print !== 'undefined' && finger_print) finger_print.play();
  }
  hideAllClickables();
  lockscreen.style.display = "flex";

  islock = true;

  lockscreen.style.transition = "all 0.3s";
  lockscreen.style.opacity = lockscreen_style_opacity;
  lockscreen.style.pointerEvents = "auto";
  wallpaper.classList.remove("unlock");

  //wallpaper.classList.add("open");

  allApp.style.transition = "all 0s";
  allApp.classList.add("lock");

  if (lock_wallpaper) {
    wallpaper.style.transition = `all ${currentSpeed3}s, height ${currentSpeed5}s, width ${currentSpeed5}s, scale ${currentSpeed5}s, border-radius ${currentSpeed5}s, transform ${currentSpeed5}s, opacity ${currentSpeed5}s`;
    wallpaper.style.backgroundImage = `url("${lock_wallpaper}")`;
  }

  clock.classList.remove("hien");
  document.querySelector(
    ".khayapp"
  ).style.transition = `all 0s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  document.querySelector(".khayapp").classList.add("lock");

  Object.entries(anim_unlock).forEach(([id, transform]) => {
    const box = boxes[id];
    clearSpringAnimationByID(box);
    box.style.transform = transform;
    box.style.opacity = "0";
    box.style.transition = "all 0s";
  });

  fingerprint.style.pointerEvents = "auto";

  if (!pass_password || !finger_biometrics) fingerprint.style.display = "none";
  if (pass_password && finger_biometrics) fingerprint.style.display = "flex";

  addCustomLockscreenTime(); // để tắt

  playmusic(
    "https://cropgif.net/audio/1776964946251-c868ee69-c7d5-4373-9aeb-5d07786adda3.ogg",
    volume_unlock_volume
  );
  nav.classList.remove("unlock");

  hideAllAlerts();
}

let timeUnlock =
  (parseFloat(localStorage.getItem("timeAnimationUnlock")) || 0.6) *
  currentSpeed;
let easingAnimationForUnlock =
  parseFloat(localStorage.getItem("easingAnimationUnlock")) || 0.25;
let speedUnlockHand = 1;
function unlock() {
  fingerprint.style.pointerEvents = "none";
  if (fingerAnim && typeof fingerAnim.stop === 'function') {
    fingerAnim.stop();
    fingerLottieEl.style.opacity = 0;
  }
  island.style.pointerEvents = "auto";
  island2.style.pointerEvents = "auto";
  island_circle.style.pointerEvents = "auto";

  thanhS1.style.pointerEvents = "auto";

  islock = false;
  ison = true;

  phone.style.background = phone_lock_background;
  lockscreen.style.opacity = 0;
  lockscreen.style.transition = "none";
  lockscreen.style.display = "none";
  lockscreen.style.pointerEvents = "none";

  document.getElementById("lockclock").style.filter = "brightness(1)";
  document.getElementById("dateText").style.filter = "brightness(1)";

  wallpaper.style.display = "flex";
  wallpaper.style.height = "100%";
  wallpaper.style.width = `100%`;
  wallpaper.style.scale = "100%";
  wallpaper.style.borderRadius = "var(--bg--border_radius_phone)";
  wallpaper.style.opacity = 1;
  wallpaper.style.transform = "translateY(0px)";
  wallpaper.classList.add("unlock");

  if (home_wallpaper) {
    wallpaper.style.transition = `all 0.2s, height ${currentSpeed5}s, width ${currentSpeed5}s, scale ${currentSpeed5}s, border-radius ${currentSpeed5}s, transform ${currentSpeed5}s, opacity ${currentSpeed5}s`;
    wallpaper.style.backgroundImage = `url("${home_wallpaper}")`;
  }

  lock_clock_date.style.transform = "none";
  lock_clock_date.style.filter = "brightness(1)";

  allApp.style.transition = `all ${currentSpeed6}s`;
  allApp.classList.remove("lock");

  battery1.classList.remove("close");
  battery3.classList.remove("close");
  if (statusWifi) statusWifi.classList.remove("close");
  battery3.style.opacity = battery2.style.opacity = battery1.style.opacity = 1;
  if (statusWifi) statusWifi.style.opacity = 1;

  clock.classList.add("hien");

  footerText.classList.remove("shake-animate");
  footerText.style.opacity = 0;

  powerbtn.classList.add("hidden");
  powerbtn.classList.remove("hidden");

  input_password = "";
  updateDots_password();
  removeKeys_password();
  nav.classList.add("unlock");

  Object.values(clickables).forEach((el) => {
    el.style.display = "flex";
  });

  groups_anim.forEach((group, groupIndex) => {
    const delay = groupIndex * 100 * currentSpeed;
    group.ids.forEach((id) => {
      const box = boxes[id];

      // ios 26 anim
      //box.style.transition = `opacity ${currentSpeed2}s ease ${delay}ms`;
      //box.style.opacity = "1";
      //springAnimationByID(
      //  box,
      //  "translateX(0px) translateY(0px) scale(1)",
      //  delay,
      //  7,
      //  40,
      //  12 - speedUnlockHand
      //);

      // normal anim
      const unlockEasingOpt = localStorage.getItem("disable_unlock_bounce") === "true" ? "cubic-bezier(0.25, 1, 0.5, 1)" : "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      box.style.transition = `all ${timeUnlock}s ${unlockEasingOpt}, opacity ${currentSpeed3}s`;
      box.style.transitionDelay = `${delay}ms`;
      box.style.transform = "translateX(0px) translateY(0px) scale(1)";
      box.style.opacity = "1";
    });
  });

  // Khay app xuất hiện sau nhóm cuối
  const khay = document.querySelector(".khayapp");
  const lastDelay = (groups_anim.length + 1) * 0.1 * currentSpeed; // delay của nhóm cuối
  const khayEasing = localStorage.getItem("disable_unlock_bounce") === "true" ? "cubic-bezier(0.25, 1, 0.5, 1)" : "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  khay.style.transition = `all ${timeUnlock}s ${khayEasing}`;
  khay.style.transitionDelay = `${lastDelay}s`;
  khay.classList.remove("lock");

  clearTimeout(id_holding_locksreen);
  clearTimeout(id_holding_locksreen2);
  id_holding_locksreen = null;
  id_holding_locksreen2 = null;
  is_holding_locksreen = false;

  removeCustomLockscreenTime();
  playmusic(
    "https://cropgif.net/audio/1776965211523-43063b4c-3e63-4adc-85e2-e22fd2799d41.ogg",
    volume_unlock_volume
  );

  fogot_pass_btn.style.display = "none";

  setTimeout(() => {
    if (!localStorage.getItem("xhyper_update_shown2")) {
      const t = translations[localStorage.getItem("language") || "en"];
      showPopup2_alert(
        t.update_message,
        t.apply,
        t.cancel,
        () => {
          localStorage.setItem("xhyper_update_shown2", "true");
          window.open("https://t.me/+KABuuONjRtBkMWY0", "_blank");
        },
        () => {
          localStorage.setItem("xhyper_update_shown2", "true");
        }
      );
    }
  }, 1000);
}

if (target) target.innerText += "ech";

let unlock_time = null;
unlockBtn.addEventListener("pointerdown", () => {
  // animation.stop();
  // animation.play();
  if (currentFingerAnimType === "lottie") {
      // if (fingerAnim && typeof fingerAnim.play === 'function') {
      //   fingerLottieEl.style.opacity = 1;
      //   fingerAnim.goToAndPlay(0, true);
      // }
  } else if (currentFingerAnimType === "frames") {
      // fingerLottieEl.style.opacity = 1;
      // playFingerFrames(currentFingerAnimData);
  }
  unlock_time = setTimeout(() => {
    if (show_pass_for_cuslock) {
      currentOpeningBtn = boxes["box4"];
      app = appopen[`box4`];
      app.style.display = "none";
      handleShowLockOption_noanim();
      showPopup_open_close_noanim("app4theme");
      hideAllClickables();
      id_holding_locksreen = null;
      lock_preview.style.transform = "translateX(-50%) scale(1)";
      unlock_noanim();
      openPopupFromCurrentButton_noanim();
      updateTime2();

      id_holding_locksreen2 = setTimeout(() => {
        lock_preview.style.transform = "translateX(-50%) scale(0.7)";

        AboutInSetting.style.pointerEvents = "none";
        animationInSetting.style.pointerEvents = "none";

        lockscreen.style.transform = "translateX(-50%) scale(1)";
        id_holding_locksreen2 = null;
        is_holding_locksreen = false;
        show_pass_for_cuslock = false;

        wallpaper_btn.addEventListener("click", handleOpenWallpaperPopup);
        wallpaper_btn2.addEventListener("click", handleOpenWallpaperPopup);
        back4.addEventListener("click", handleCloseWallpaperPopup);

        aod_btn.addEventListener("click", handleOpenAODOption);
        back5.addEventListener("click", handleCloseAODOption);

        lock_btn.addEventListener("click", handleShowLockOption);
        back6.addEventListener("click", handleHideLockOption);

        home_btn.addEventListener("click", showHomeApp);
        back8.addEventListener("click", hideHomeApp);

        finger.addEventListener("click", showFingerPopup);
        back9.addEventListener("click", hideFingerPopup);

        removeCustomLockscreenTime(); // để tắt
        addEventListeners_aod_preview();
      }, 100);
    } else {
      open_all_island();
      unlock();
    }
  }, time_unlock_finger);
});
unlockBtn.addEventListener("pointerup", () => {
  clearTimeout(unlock_time);
  if (currentFingerAnimType === "lottie") {
      // if (fingerAnim && typeof fingerAnim.stop === 'function') {
      //   fingerAnim.stop();
      //   fingerLottieEl.style.opacity = 0;
      // }
  } else if (currentFingerAnimType === "frames") {
      // stopFingerFrames();
      // fingerLottieEl.style.opacity = 0;
  }

  // Reset lại animation nếu đã từng chạy trước đó
  // footerText.classList.remove("shake-animate");
  // void footerText.offsetWidth; // trigger reflow
  // footerText.classList.add("shake-animate");

  document.getElementById("wallpaper_aod2").classList.remove("open");
  document.getElementById("lockclock").style.filter = "brightness(1)";
  document.getElementById("dateText").style.filter = "brightness(1)";
});

let phone_lock_off_background = "#000000";
let phone_lock_background = "#000000";
wallpaper.style.height = `${wallpaper_lock_height}%`;
wallpaper.style.scale = `${wallpaper_lock_scale}%`;
wallpaper.style.borderRadius = wallpaper_lock_borderRadius == 50 ? "var(--bg--border_radius_phone)" : `${wallpaper_lock_borderRadius}px`;
wallpaper.style.opacity = 1;

let lockclock_style_transform = "scale(0.75) translateY(250px)";
let dateText_style_transform = "translateY(160px) translateX(-50%) scale(0.95)";

wallpaper.style.transform = "translateY(250px)";
phone.style.background = phone_lock_background;
function powerbtnEvent() {
  let wasLockCalled = false;
  if (!islock) {
    lock();
    wasLockCalled = true;
  }
  lock_content.style.opacity = `1`;
  swipeHandle.style.opacity = "1";
  if (ison) {
    if (!wasLockCalled) {
      playmusic(
        "https://cropgif.net/audio/1776964946251-c868ee69-c7d5-4373-9aeb-5d07786adda3.ogg",
        volume_unlock_volume
      );
    }
    swipeHandle.style.opacity = `0`;
    swipeHandle.style.pointerEvents = `none`;

    battery3.style.transition =
      battery2.style.transition =
      battery1.style.transition =
      statusWifi.style.transition =
      lock_clock_date.style.transition =
      wallpaper.style.transition =
        `all calc(0.5s * ${currentSpeed}) cubic-bezier(0.23, 0.55, 0.54, 0.97)`;

    battery3.style.opacity =
      battery2.style.opacity =
      battery1.style.opacity =
      statusWifi.style.opacity =
      lockscreen.style.opacity =
        lockscreen_style_opacity;

    if (
      current_wallpaper_lock == "1" ||
      !always_on_displays ||
      hide_wallpaper
    ) {
      wallpaper.style.transition = `all ${currentSpeed5}s cubic-bezier(0.23, 0.55, 0.54, 0.97)`;
      wallpaper.style.height = `${wallpaper_lock_off_height}%`;
      wallpaper.style.width = `100%`;
      wallpaper.style.scale = `${wallpaper_lock_off_scale}%`;
      wallpaper.style.borderRadius = wallpaper_lock_off_borderRadius == 50 ? "var(--bg--border_radius_phone)" : `${wallpaper_lock_off_borderRadius}px`;
      wallpaper.style.opacity = `${wallpaper_lock_off_opacity}`;
      wallpaper.style.transform = wallpaper_lock_off_transform;
      phone.style.background = phone_lock_off_background;
      lock_clock_date.style.transform = lockclock_style_transform;
    } else {
      wallpaper.style.transition = `all ${currentSpeed5}s cubic-bezier(0.23, 0.55, 0.54, 0.97)`;
      wallpaper.style.height = `${wallpaper_lock_height}%`;
      wallpaper.style.scale = `calc(${wallpaper_lock_scale}% + 5%)`;
      wallpaper.style.borderRadius = wallpaper_lock_borderRadius == 50 ? "var(--bg--border_radius_phone)" : `${wallpaper_lock_borderRadius}px`;
      wallpaper.style.opacity = `calc(${wallpaper_lock_opacity} * 0.5)`;
      wallpaper.style.transform = wallpaper_lock_transform;

      phone.style.background = phone_lock_off_background;
      lock_clock_date.style.transform = "scale(0.93) translateY(30px)";
    }

    document.getElementById("wallpaper_aod2").classList.remove("hidden");
    wallpaper.style.display = display_wallpaper_for_show_aod_img;

    ison = false;
    removeSwipeEvents();
    document.getElementById("lockclock").style.filter = "brightness(3)";
    document.getElementById("dateText").style.filter = "brightness(3)";

    battery1.classList.add("close");
    battery3.classList.add("close");
    if (statusWifi) statusWifi.classList.add("close");
    thanhS1.style.pointerEvents = "none";
    closePopup_noanim();
    if (!always_on_displays) close_all_island();

    island.style.pointerEvents = "none";
    island2.style.pointerEvents = "none";
    island_circle.style.pointerEvents = "none";

    show_pass_for_cuslock = false;
    clearTimeout(container_password_timeout);
    removeKeys_password();
  } else {
    swipeHandle.style.opacity = `1`;
    swipeHandle.style.pointerEvents = `auto`;

    battery3.style.opacity =
      battery2.style.opacity =
      battery1.style.opacity =
      statusWifi.style.opacity =
      lockscreen.style.opacity =
        1;

    wallpaper.style.display = "flex";
    wallpaper.style.transition = `all ${currentSpeed5}s cubic-bezier(0.23, 0.55, 0.54, 0.97)`;
    wallpaper.style.height = `${wallpaper_lock_height}%`;
    wallpaper.style.width = `100%`;
    wallpaper.style.scale = `${wallpaper_lock_scale}%`;
    wallpaper.style.borderRadius = wallpaper_lock_borderRadius == 50 ? "var(--bg--border_radius_phone)" : `${wallpaper_lock_borderRadius}px`;
    wallpaper.style.opacity = 1;

    document.getElementById("wallpaper_aod2").classList.add("hidden");

    wallpaper.style.transform = wallpaper_lock_transform;
    phone.style.background = phone_lock_background;

    ison = true;
    addSwipeEvents();
    lock_clock_date.style.transform = "none";
    document.getElementById("lockclock").style.filter = "brightness(1)";
    document.getElementById("dateText").style.filter = "brightness(1)";

    battery1.classList.remove("close");
    battery3.classList.remove("close");
    if (statusWifi) statusWifi.classList.remove("close");
    thanhS1.style.pointerEvents = "auto";

    island.style.pointerEvents = "auto";
    island2.style.pointerEvents = "auto";
    island_circle.style.pointerEvents = "auto";

    if (!always_on_displays) open_all_island();
  }

  footerText.classList.remove("shake-animate");
  footerText.style.opacity = 0;

  dongnotification();
  closeControlsCenter();
}

if (target) target.innerText += " -";

lockscreen.addEventListener("click", () => {
  if (!ison) {
    battery3.style.opacity =
      battery2.style.opacity =
      battery1.style.opacity =
      statusWifi.style.opacity =
      lockscreen.style.opacity =
        1;
    battery1.classList.remove("close");
    battery3.classList.remove("close");
    if (statusWifi) statusWifi.classList.remove("close");

    wallpaper.style.display = "flex";
    wallpaper.style.height = `${wallpaper_lock_height}%`;
    wallpaper.style.scale = `${wallpaper_lock_scale}%`;
    wallpaper.style.borderRadius = wallpaper_lock_borderRadius == 50 ? "var(--bg--border_radius_phone)" : `${wallpaper_lock_borderRadius}px`;
    wallpaper.style.width = `100%`;
    wallpaper.style.opacity = 1;

    document.getElementById("wallpaper_aod2").classList.add("hidden");

    wallpaper.style.transform = wallpaper_lock_transform;
    phone.style.background = phone_lock_background;

    ison = true;
    lock_clock_date.style.transform = "none";
    lock_clock_date.style.filter = "brightness(1)";
    thanhS1.style.pointerEvents = "auto";

    swipeHandle.style.opacity = `1`;
    swipeHandle.style.pointerEvents = `auto`;

    island.style.pointerEvents = "auto";
    island2.style.pointerEvents = "auto";
    island_circle.style.pointerEvents = "auto";

    open_all_island();

    document.getElementById("wallpaper_aod2").classList.remove("open");
    document.getElementById("lockclock").style.filter = "brightness(1)";
    document.getElementById("dateText").style.filter = "brightness(1)";
  }

  addSwipeEvents();
});

function openPopupFromCurrentButton_noanim() {
  if (!currentOpeningBtn) return;

  if (app) showPopup_open_close_noanim(app);
  app.style.pointerEvents = "all";

  currentOpeningBtn.style.transition = "all 0s, height 0s, top 0s";

  allApp.style.transition = wallpaper.style.transition = "all 0s";

  wallpaper.style.scale = `${scaleWallpaper}%`;

  currentOpeningBtn.classList.add("open");
  currentOpeningBtn.style.scale = "100%";
  currentOpeningBtn.style.transform = `scale(${scaleAllAppReverse})`;

  lp.style.transition = "all 0s";
  lp.classList.add("open");
  lp.style.scale = `${scaleAllAppReverse}`;

  allApp.style.scale = `${scaleAllApp}%`;
  nav.style.height = "40px";
}

function unlock_noanim() {
  fingerprint.style.pointerEvents = "none";
  island.style.pointerEvents = "auto";
  island2.style.pointerEvents = "auto";
  island_circle.style.pointerEvents = "auto";

  thanhS1.style.pointerEvents = "auto";

  islock = false;
  ison = true;

  phone.style.background = phone_lock_background;
  lockscreen.style.opacity = 0;
  lockscreen.style.transition = "none";
  lockscreen.style.display = "none";
  lockscreen.style.pointerEvents = "none";

  document.getElementById("lockclock").style.filter = "brightness(1)";
  document.getElementById("dateText").style.filter = "brightness(1)";

  wallpaper.style.display = "flex";
  wallpaper.style.height = "100%";
  wallpaper.style.width = `100%`;
  wallpaper.style.scale = "100%";
  wallpaper.style.borderRadius = "var(--bg--border_radius_phone)";
  wallpaper.style.opacity = 1;
  wallpaper.style.transform = "translateY(0px)";
  wallpaper.classList.add("unlock");

  if (home_wallpaper) {
    wallpaper.style.transition = `all 0s`;
    wallpaper.style.backgroundImage = `url("${home_wallpaper}")`;
  }

  lock_clock_date.style.transform = "none";
  lock_clock_date.style.filter = "brightness(1)";

  allApp.style.transition = "all 0s";
  allApp.classList.remove("lock");

  battery1.classList.remove("close");
  battery3.classList.remove("close");
  if (statusWifi) statusWifi.classList.remove("close");
  battery1.style.opacity = battery2.style.opacity = battery3.style.opacity = 1;
  if (statusWifi) statusWifi.style.opacity = 1;

  clock.classList.add("hien");

  footerText.classList.remove("shake-animate");
  footerText.style.opacity = 0;

  powerbtn.classList.add("hidden");
  powerbtn.classList.remove("hidden");

  input_password = "";
  updateDots_password();
  removeSwipeEvents();
  nav.classList.add("unlock");

  const boxIds = [
    "box12",
    "box11",
    "box9",
    "box10",
    "box6",
    "box7",
    "box5",
    "box8",
    "box1",
    "box2",
    "box3",
    "box4",
  ];
  boxIds.forEach((id) => {
    boxes[id].style.transform = "translateX(0px) translateY(0px) scale(1)";
    boxes[id].style.opacity = "1";
    boxes[id].style.transition = "all 0s";
  });

  document.querySelector(".khayapp").style.transition = "all 0s";
  document.querySelector(".khayapp").classList.remove("lock");

  fogot_pass_btn.style.display = "none";

  setTimeout(() => {
    if (!localStorage.getItem("xhyper_update_shown2")) {
      const t = translations[localStorage.getItem("language") || "en"];
      showPopup2_alert(
        t.update_message,
        t.apply,
        t.cancel,
        () => {
          localStorage.setItem("xhyper_update_shown2", "true");
          window.open("https://t.me/+KABuuONjRtBkMWY0", "_blank");
        },
        () => {
          localStorage.setItem("xhyper_update_shown2", "true");
        }
      );
    }
  }, 1000);
}

function hidePopup_open_close_noanim(target) {
  const el =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  const id = el.id;

  el.classList.remove("open");

  hideTimeouts_open_close[id] = setTimeout(() => {
    el.style.display = "none";
    hideTimeouts_open_close[id] = null;
  }, 0);
}

function showPopup_open_close_noanim(target) {
  const target2 =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!target2) return;

  target2.style.transition = "none";

  target2.style.display = "flex";
  target2.classList.remove("close");
  target2.classList.add("open");

  requestAnimationFrame(() => {
    target2.style.transition = "all 0.4s ease";
  });
}

function handleShowLockOption_noanim() {
  showPopup_open_close_noanim(lock_option);

  colorCircles.forEach((circle) => {
    circle.addEventListener("click", handleColorCircleClick);
  });
  clock_preview.classList.remove("hidden");
  dateTextPreview.classList.remove("hidden");

  controls_main.classList.remove("open");
  controls_date.classList.remove("open");
  controls_locktext.classList.remove("open");

  lock_preview.style.transform = "translateX(-50%) scale(0.7)";

  customColorBtn.addEventListener("click", handleCustomColorClick);
  colorPicker.addEventListener("input", handleColorPickerInput);
  sizeSlider.addEventListener("input", handleSizeSliderInput);

  document.getElementById("btn1").addEventListener("click", handleBtn1Click);
  document.getElementById("btn2").addEventListener("click", handleBtn2Click);

  button_decor.addEventListener("click", handleDecorClick);
  close_controls_locktext.addEventListener(
    "click",
    handleclose_controls_locktextClick
  );

  addeventlistener_color_circle2();
}

let is_holding_locksreen = false;
let id_holding_locksreen = null;
let id_holding_locksreen2 = null;

function addCustomLockscreenTime() {
  lockscreen.addEventListener("pointerdown", onLockscreenPointerDown);
  lockscreen.addEventListener("pointerup", onLockscreenPointerUp);
}

function removeCustomLockscreenTime() {
  lockscreen.removeEventListener("pointerdown", onLockscreenPointerDown);
  lockscreen.removeEventListener("pointerup", onLockscreenPointerUp);
  clearTimeout(id_holding_locksreen);
  clearTimeout(id_holding_locksreen2);
  id_holding_locksreen = null;
  id_holding_locksreen2 = null;
  is_holding_locksreen = false;
  lockscreen.style.transform = "translateX(-50%)";
}

let show_pass_for_cuslock = false;
function onLockscreenPointerDown(e) {
  if (e.target !== lockscreen || !ison) return;
  clock_preview.classList.remove("hidden");
  dateTextPreview.classList.remove("hidden");

  controls_main.classList.remove("open");
  controls_date.classList.remove("open");
  controls_locktext.classList.remove("open");

  lock_preview.style.transform = "translateX(-50%) scale(0.7)";

  lockscreen.style.transform = "translateX(-50%) scale(0.98)";
  is_holding_locksreen = true;

  hidePopup_open_close(credits);
  hidePopup_open_close(app4_vesion);
  hidePopup_open_close(app4animation);
  hidePopup_open_close(app4_home);
  hidePopup_open_close(wallpaper_option);
  hidePopup_open_close(aod_option);
  hidePopup_open_close(app4_finger);
  hidePopup_open_close(app4icon);
  hidePopup_open_close(app4audio);
  hidePopup_open_close(app4_lock_style);
  hidePopup_open_close(crea_pass);

  id_holding_locksreen = setTimeout(() => {
    if (pass_password) {
      swipeHandle.style.opacity = "0";
      lock_content.style.opacity = `0`;
      clearTimeout(container_password_timeout);
      container_password.classList.add("show");
      container_password.style.display = "flex";
      container_password.style.pointerEvents = "auto";
      showKeys_password();
      input_password = "";
      updateDots_password();
      show_pass_for_cuslock = true;
      lockscreen.style.transform = "translateX(-50%)";
    } else {
      currentOpeningBtn = boxes["box4"];
      app = appopen[`box4`];
      app.style.display = "none";
      hideAllClickables();
      handleShowLockOption_noanim();
      showPopup_open_close_noanim("app4theme");
      id_holding_locksreen = null;
      lock_preview.style.transform = "translateX(-50%)";
      unlock_noanim();
      openPopupFromCurrentButton_noanim();
      updateTime2();

      id_holding_locksreen2 = setTimeout(() => {
        lock_preview.style.transform = "translateX(-50%) scale(0.7)";

        AboutInSetting.style.pointerEvents = "none";
        animationInSetting.style.pointerEvents = "none";

        lockscreen.style.transform = "translateX(-50%)";
        id_holding_locksreen2 = null;
        is_holding_locksreen = false;

        wallpaper_btn.addEventListener("click", handleOpenWallpaperPopup);
        wallpaper_btn2.addEventListener("click", handleOpenWallpaperPopup);
        back4.addEventListener("click", handleCloseWallpaperPopup);

        aod_btn.addEventListener("click", handleOpenAODOption);
        back5.addEventListener("click", handleCloseAODOption);

        lock_btn.addEventListener("click", handleShowLockOption);
        back6.addEventListener("click", handleHideLockOption);

        home_btn.addEventListener("click", showHomeApp);
        back8.addEventListener("click", hideHomeApp);

        finger.addEventListener("click", showFingerPopup);
        back9.addEventListener("click", hideFingerPopup);

        removeCustomLockscreenTime(); // để tắt
        addEventListeners_aod_preview();
      }, 100);
    }
  }, 600);
}

function onLockscreenPointerUp() {
  if (id_holding_locksreen) {
    clearTimeout(id_holding_locksreen);
    id_holding_locksreen = null;
    if (id_holding_locksreen2) {
      clearTimeout(id_holding_locksreen2);
      id_holding_locksreen2 = null;
    }
  }
  is_holding_locksreen = false;
  lockscreen.style.transform = "translateX(-50%)";
}

addCustomLockscreenTime();

//DDDDDDDDDDDD-------------DDDDDDDDDDDDD
//DDDDDDDDD--DDDDDDDDDDDDDDD--DDDDDDDDDD
//DDDDDD--DDDDDDDDDDDDDDDDDDDDD--DDDDDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDDDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDD---DDDDDD--DDDD
//DDD--DDDDDDDDDDDDDDDDDDDDDD--DDD--DDDD
//DDDDDD--DDDDDDDDDDDDDDDDDDDDD--DDDDDDD
//DDDDDDDDD--DDDDDDDDDDDDDDD--DDD--DDDDD
//DDDDDDDDDDDD-------------DDDDDDDD---DD

// -- nofication --
const thanhS1 = document.querySelector(".thanh-status");
const thanhS2 = document.querySelector(".thanh-status2");
const lp2 = document.querySelector(".lp2");
const notificationcenter = document.querySelector(".left-text-tb");

let draggingS = false;
let isMoS = false;
let startYS = 0;
let startXS = 0;
let deltaYS = 0;
let deltaXS = 0;

function updateTransformS(y) {
  let y2 = y;
  if (y2 < -80) y2 = -80;
  if (y2 > 0) y2 = 0;
  //if (y < -50) y = -50;
  if (y > 0) y = 0;

  const scale = 1 + -y2 / 60;

  clock.style.transition = "all 0.2s";
  clock.style.transform = `translateX(calc(${-y2}px / 3)) translateY(${-y2}px) scale(${scale})`;
  lp2.style.transition = "all 0.1s";
  lp2.style.opacity = `${scale - 1} `;
  lp2.style.zIndex = 10000;

  thanhS1.style.transition = "none";
  thanhS1.style.transform = `translateY(${-y2}px)`;
}

thanhS1.addEventListener("touchstart", (e) => {
  if (!ison) return;
  console.log(ison);

  isMoS = true;
  startYS = e.touches[0].clientY;
  startXS = e.touches[0].clientX;
  clock.classList.add("hien");
  notificationcenter.style.transform = "translateY(0px)";
});

thanhS1.addEventListener(
  "touchmove",
  (e) => {
    if (!ison) return;
    console.log(ison);
    e.preventDefault();
    if (!isMoS) return;
    deltaYS = startYS - e.touches[0].clientY;
    deltaXS = e.touches[0].clientX - startXS;
    updateTransformS(deltaYS);

    if (deltaYS < -70) {
      //close_all_island();
      closeControlsCenter();
      notificationcenter.classList.add("open");
    } else {
      //open_all_island();
      notificationcenter.style.transform = "translateY(0px)";
      notificationcenter.classList.remove("open");
    }
  },
  {
    passive: false,
  }
);

thanhS1.addEventListener("touchend", () => {
  if (deltaYS < -70) monotification();
  else dongnotification();
  deltaYS = 0;
  deltaXS = 0;
  thanhS1.style.transform = ``;
});

window.addEventListener("mousemove", (e) => {
  if (!draggingS || !isMoS) return;
  deltaYS = startYS - e.clientY;
  deltaXS = e.clientX - startXS;
  updateTransformS(deltaYS);
  if (deltaYS < -70) {
    //close_all_island();
    closeControlsCenter();
    notificationcenter.classList.add("open");
  } else {
    //open_all_island();
    notificationcenter.style.transform = "translateY(0px)";
    notificationcenter.classList.remove("open");
  }
});

window.addEventListener("mouseup", () => {
  if (!draggingS || !isMoS) return;
  draggingS = false;
  if (deltaYS < -70) monotification();
  else dongnotification();
  deltaYS = 0;
  deltaXS = 0;
  thanhS1.style.transform = ``;
});

lp2.addEventListener("pointerup", () => {
  dongnotification();
});

function monotification() {
  clock.style.transition = "all 0.5s cubic-bezier(0.23, 0.55, 0.54, 0.97)";
  clock.style.transform = `translateX(25px) translateY(50px) scale(calc(1 + 50 / 40))`;
  lp2.style.transition = "all 0s";
  notificationcenter.classList.add("open");
  lp2.style.opacity = `1`;
  lp2.style.zIndex = 10000;
  clock.classList.add("open");
  thanhS1.style.pointerEvents = "none";
  closeControlsCenter();
}
function dongnotification() {
  clock.style.transition = "all 0.4s cubic-bezier(0.23, 0.55, 0.54, 0.97)";
  clock.style.transform = `none`;
  lp2.style.transition = "all 0.3s";
  lp2.style.opacity = `0`;
  lp2.style.zIndex = 1;
  notificationcenter.style.transform = "translateY(0px)";
  notificationcenter.classList.remove("open");
  clock.classList.remove("open");
  if (islock) clock.classList.remove("hien");
  thanhS1.style.pointerEvents = "auto";
}
function closePopup_noanim() {
  if (!currentOpeningBtn) return;
  hidePopup_open_close(app);

  currentOpeningBtn.style.transition = `all 0s`;
  clearTimeout(autoHideClickablesTimer);
  currentOpeningBtn.classList.remove("open");
  currentOpeningBtn.style.scale = `${scale_icon}%`;
  lp.style.transition = allApp.style.transition = `all 0s`;

  lp.classList.remove("open");
  lp.style.scale = 1;
  allApp.style.scale = 1;

  nav.style.height = "30px";

  currentOpeningBtn.classList.remove("hien");
  currentOpeningBtn = null;

  open_all_island();
}

const speedBoxes = document.querySelectorAll(".speed-box");
let savedSpeed = parseFloat(localStorage.getItem("currentSpeed"));
if (!isNaN(savedSpeed)) {
  currentSpeed = savedSpeed;
  speedBoxes.forEach((b) => b.classList.remove("active"));
  speedBoxes.forEach((box) => {
    if (parseFloat(box.dataset.speed) === currentSpeed) {
      box.classList.add("active");
    }
  });

  updateSpeedVars(currentSpeed);
}
speedBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    speedBoxes.forEach((b) => b.classList.remove("active"));
    box.classList.add("active");
    currentSpeed = parseFloat(box.dataset.speed);
    localStorage.setItem("currentSpeed", currentSpeed);
    updateSpeedVars(currentSpeed);
  });
});
function updateSpeedVars(speed) {
  currentSpeed6 = 0.6 * speed;
  currentSpeed5 = 0.5 * speed;
  currentSpeed4 = 0.4 * speed;
  currentSpeed3 = 0.3 * speed;
  currentSpeed2 = 0.2 * speed;
  duration = 1.7 * speed;

  multipleClickAppTime = multipleClickApp * currentSpeed5 * 1000;

  time_opening_app = time_all * speed;
  time_aspect_ratio_app = time_all * speed * 0.9;

  timeTransformClosing =
    (parseFloat(localStorage.getItem("timeTransformClosing")) || 0.5) * speed;
  timeScaleClosing =
    (parseFloat(localStorage.getItem("timeScaleClosing")) || 0.5) * speed;

  document.getElementById(
    "scaling-box"
  ).style.animation = `scaleUpDown ${duration}s ease-out infinite`;

  let timeHidingIcon = parseFloat(localStorage.getItem("timeHidingIcon"));
  if (isNaN(timeHidingIcon)) {
    timeHidingIcon = 0.3;
  }
  document.documentElement.style.setProperty(
    "--bg--timeHidingIcon",
    `${timeHidingIcon * currentSpeed}s`
  );

  let delayHidingIcon = parseFloat(localStorage.getItem("delayHidingIcon"));
  if (isNaN(delayHidingIcon)) {
    delayHidingIcon = 0;
  }
  document.documentElement.style.setProperty(
    "--bg--delayHidingIcon",
    `${delayHidingIcon * currentSpeed}s`
  );

  timeUnlock =
    (parseFloat(localStorage.getItem("timeAnimationUnlock")) || 0.6) *
    currentSpeed;
}

let animation = lottie.loadAnimation({
  container: document.getElementById("lottie"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "originos_data/Artboard_1.json",
});
animation.setSpeed(0.7 * currentSpeed);
animation.goToAndStop(animation.totalFrames - 1, true);

const fingerLottieEl = document.getElementById("finger_lottie");
let fingerAnim = null;

const fingerFrameAnims = {
  "new_anim": [
    "https://yourimageshare.com/ib/EBwggtiEyA.png",
    "https://yourimageshare.com/ib/IHWRsiSTBs.png",
    "https://yourimageshare.com/ib/iKKr9683mQ.png",
    "https://yourimageshare.com/ib/YksMDLYUcV.png",
    "https://yourimageshare.com/ib/zScx8farkW.png",
    "https://yourimageshare.com/ib/PhOjDGhAwn.png",
    "https://yourimageshare.com/ib/YMOSu34dZl.png",
    "https://yourimageshare.com/ib/y3XePrRbfh.png",
    "https://yourimageshare.com/ib/FBc7qgvmPH.png",
    "https://yourimageshare.com/ib/W4XhpKlCYw.png",
    "https://yourimageshare.com/ib/h0lbifAvHb.png",
    "https://yourimageshare.com/ib/yoUxHlhvve.png",
    "https://yourimageshare.com/ib/GAnMixMJVt.png",
    "https://yourimageshare.com/ib/M491KajDjg.png",
    "https://yourimageshare.com/ib/YBETa5kVDv.png",
    "https://yourimageshare.com/ib/VVh8xFhjw3.png",
    "https://yourimageshare.com/ib/FyrMnfCrsN.png",
    "https://yourimageshare.com/ib/2dR8qLj2QP.png"
  ]
};

let currentFingerAnimType = localStorage.getItem("finger_anim_type") || "lottie";
let currentFingerAnimData = localStorage.getItem("finger_anim_data") || "originos_data/finger_animation.json";

let fingerFrameIdx = 0;
let fingerFrameInterval = null;
const fingerFramesEl = document.createElement("img");
fingerFramesEl.style.cssText = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; object-fit: contain; pointer-events: none; opacity: 0; display: none; z-index: 10;";

if (fingerLottieEl) {
  fingerLottieEl.appendChild(fingerFramesEl);
  if (currentFingerAnimType === "lottie") {
    fingerAnim = lottie.loadAnimation({
      container: fingerLottieEl,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: currentFingerAnimData,
    });
  }
}

function playFingerFrames(name) {
  const frames = fingerFrameAnims[name];
  if (!frames) return;
  fingerFrameIdx = 0;
  fingerFramesEl.src = frames[0];
  fingerFramesEl.style.display = "block";
  fingerFramesEl.style.opacity = 1;
  clearInterval(fingerFrameInterval);
  fingerFrameInterval = setInterval(() => {
    fingerFrameIdx = (fingerFrameIdx + 1) % frames.length;
    fingerFramesEl.src = frames[fingerFrameIdx];
  }, 50);
}

function stopFingerFrames() {
  clearInterval(fingerFrameInterval);
  fingerFramesEl.style.opacity = 0;
  setTimeout(() => {
    if (fingerFramesEl.style.opacity == "0") fingerFramesEl.style.display = "none";
  }, 200);
}

function changeFingerAnim(type, data) {
    if (fingerAnim) {
        fingerAnim.destroy();
        fingerAnim = null;
    }
    stopFingerFrames();
    currentFingerAnimType = type;
    currentFingerAnimData = data;
    localStorage.setItem("finger_anim_type", type);
    localStorage.setItem("finger_anim_data", data);

    if (type === "lottie") {
        fingerAnim = lottie.loadAnimation({
            container: fingerLottieEl,
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: data,
        });
    }
}
window.changeFingerAnim = changeFingerAnim; // Expose to settingsApp.js

const finger_print = {
    stop: () => {},
    play: () => {},
    setSpeed: () => {},
    goToAndStop: () => {}
};

// battery
let battery_level = 100;
let charging = false;
const battery4 = document.querySelector(".battery-small2");
const battery_num = document.querySelector(".battery-num");

function updateBatteryInfo(battery) {
  battery_level = Math.round(battery.level * 100);
  const isCurrentlyCharging = battery.charging;

  battery4.style.width = `calc(${battery_level}%)`;
  if (battery_level <= 20) {
    battery4.style.background = "#e53935";
    battery4.style.mixBlendMode = "normal";
  } else {
    battery4.style.background = "white";
    battery4.style.mixBlendMode = "difference";
  }
  if (battery_level == 20) playmusic("originos_data/ui/LowBattery.ogg");
  battery_num.textContent = `${battery_level}%`;

  if (isCurrentlyCharging) {
    battery4.style.background = "#26bd44";
    battery4.style.mixBlendMode = "normal";
    if (!charging) {
      playmusic(
        "https://cropgif.net/audio/1776965251083-5ccb7558-3b9e-4b87-aceb-e908015ffb8c.ogg",
        volume_charge_volume
      );
      // showChargingIsland();
    }
  }
  charging = isCurrentlyCharging;
}

function showChargingIsland() {
  const island_charging = document.getElementById("island_charging");
  const island_charging_percent = document.getElementById(
    "island_charging_percent"
  );
  const time_island = document.querySelector(".time_island");
  const image_island_right = document.querySelector(".image_island_right");

  if (!island || !island_charging) return;

  island_charging_percent.textContent = `${battery_level}%`;

  island.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
  island.style.width = "160px";
  island.style.height = "35px";
  island.style.borderRadius = "20px";

  island_charging.style.opacity = "1";
  island_charging.style.pointerEvents = "auto";

  if (time_island) time_island.style.opacity = "0";
  if (image_island_right) image_island_right.style.opacity = "0";

  setTimeout(() => {
    island_charging.style.opacity = "0";
    island_charging.style.pointerEvents = "none";
    setTimeout(() => {
      if (time_island) time_island.style.opacity = "1";
      if (image_island_right) image_island_right.style.opacity = "1";

      if (!isRunning_clock && !isPlaying_music) {
        island.style.width = "25px";
        island.style.height = "25px";
        island.style.borderRadius = "25px";
      } else {
        island.style.width = "120px";
        island.style.height = "25px";
        island.style.borderRadius = "25px";
      }
    }, 300);
  }, 4000);
}

if ("getBattery" in navigator) {
  navigator.getBattery().then((battery) => {
    updateBatteryInfo(battery);

    battery.addEventListener("levelchange", () => updateBatteryInfo(battery));
    battery.addEventListener("chargingchange", () =>
      updateBatteryInfo(battery)
    );
  });
}

const row = document.querySelector(".button-row");
const items = row.querySelectorAll(".img-button");

function updateRotation() {
  const rowRect = row.getBoundingClientRect();
  const centerX = rowRect.left + rowRect.width / 2;

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance = itemCenter - centerX;

    const maxAngle = 80; // càng lớn xoay càng mạnh
    const maxDistance = rowRect.width / 1.3;
    const ratio = Math.max(-1, Math.min(1, distance / maxDistance));
    const angle = ratio * maxAngle;

    const scale = 1 - Math.abs(ratio) * 0.5;
    const z = Math.round((1 - Math.abs(ratio)) * 100);

    item.style.transform = `
    rotateY(${-angle}deg)
    scale(${scale})
    translateX(${-ratio * 80}px)`;
    item.style.zIndex = z;
  });
  updatePhoneScale();
}
updateRotation();
row.addEventListener("scroll", updateRotation);
window.addEventListener("resize", updateRotation);

function removeWithFade(elementOrId, duration = 500) {
  // Nếu là chuỗi (id), chuyển thành element
  let element =
    typeof elementOrId === "string"
      ? document.getElementById(elementOrId)
      : elementOrId;

  if (!element) return;

  // Thêm transition nếu chưa có
  element.style.transition = `opacity ${duration}ms ease`;
  element.style.opacity = "0";

  // Xóa khỏi DOM sau khi hoàn tất animation
  setTimeout(() => {
    if (element && element.parentNode) {
      element.remove();
    }
  }, duration);
}

function parseTransforms(transformStr) {
  const regex = /([a-zA-Z]+)\((-?[0-9.]+)([a-z%]*)\)/g;
  let match;
  const result = [];
  while ((match = regex.exec(transformStr)) !== null) {
    result.push({
      type: match[1],
      value: parseFloat(match[2]),
      unit: match[3] || "",
    });
  }
  return result;
}

const springStates = new WeakMap();

function springAnimationByID(
  el,
  transform = "scale(2)",
  delay = 0,
  mass = 4,
  tension = 3,
  friction = 9
) {
  if (!el) return;

  clearSpringAnimationByID(el);

  const currentTransformStr =
    el.style.transform && el.style.transform !== "none"
      ? el.style.transform
      : getComputedStyle(el).transform === "none"
      ? ""
      : el.style.transform;

  const startTransforms = parseTransforms(currentTransformStr);
  const endTransforms = parseTransforms(transform);

  const animParts = endTransforms.map((end) => {
    const start = startTransforms.find((s) => s.type === end.type);
    return {
      type: end.type,
      start: start ? start.value : 0,
      end: end.value,
      unit: end.unit,
    };
  });

  const state = {};

  state.timeout = setTimeout(() => {
    let velocity = animParts.map(() => 0);
    let lastTime = performance.now();

    function animate(now) {
      const deltaTime = (now - lastTime) / 1000; // giây
      lastTime = now;

      let stillRunning = false;

      animParts.forEach((part, i) => {
        const force = (part.end - part.start) * tension;
        const acceleration = force / mass;
        velocity[i] += acceleration * deltaTime * 30; // scale theo 60fps
        velocity[i] *= 1 - friction / 100;
        part.start += (velocity[i] / 60) * (deltaTime * 60);

        if (
          Math.abs(part.end - part.start) > 0.001 ||
          Math.abs(velocity[i]) > 0.001
        ) {
          stillRunning = true;
        } else {
          part.start = part.end;
        }
      });

      el.style.transform = animParts
        .map((p) => `${p.type}(${p.start}${p.unit})`)
        .join(" ");

      if (stillRunning) {
        state.raf = requestAnimationFrame(animate);
      }
    }

    state.raf = requestAnimationFrame((time) => {
      lastTime = time;
      animate(time);
    });
  }, delay);

  springStates.set(el, state);
}

function clearSpringAnimationByID(el) {
  const state = springStates.get(el);
  if (state) {
    if (state.raf) cancelAnimationFrame(state.raf);
    if (state.timeout) clearTimeout(state.timeout);
    springStates.delete(el);
  }
}

let oldApps = [];

function closeAppToLeft() {
  const closingBox = currentOpeningBtn;
  const closingApp = app;
  app.style.pointerEvents = "none";

  closingBox.style.transition = `all ${currentSpeed6}s, scale ${currentSpeed3}s`;
  clearTimeout(autoHideClickablesTimer);

  // nếu app đã có trong oldApps → clear timeout cũ trước
  const existing = oldApps.find((item) => item.el === closingBox);
  if (existing) {
    clearTimeout(existing.timeoutId);
    oldApps = oldApps.filter((item) => item.el !== closingBox);
  }

  // tạo timeout mới
  const timeoutId = setTimeout(() => {
    closingBox.style.transition = "all 0s";
    closingBox.classList.remove("open");
    closingBox.classList.remove("hien");
    closingBox.style.scale = `${scale_icon}%`;
    closingBox.style.transform = "";
    hidePopup_open_close(closingApp);

    // xóa app này khỏi mảng khi xong
    oldApps = oldApps.filter((item) => item.el !== closingBox);
  }, currentSpeed6 * 1000);

  // push vào mảng (element + timeout id)
  oldApps.push({ el: closingBox, timeoutId });

  // hiệu ứng dịch sang trái
  closingBox.style.scale = 0.95;
  closingBox.style.transform = `translateX(-120%)`;

  lp.style.transition = `all ${currentSpeed5}s cubic-bezier(.35,.04,.69,.94), opacity ${currentSpeed6}s`;
  allApp.style.transition =
    wallpaper.style.transition = `all ${currentSpeed5}s cubic-bezier(.35,.04,.69,.94)`;

  wallpaper.style.scale = `100%`;
  closingBox.style.zIndex = "";

  lp.classList.remove("open");
  allApp.style.scale = 1;

  Object.values(clickables).forEach((el) => {
    el.style.display = "block";
  });

  if (closingBox === boxes["box4"]) {
    document.getElementById("scaling-box").style.animation = "none";

    theme_option.style.pointerEvents =
      AboutInSetting.style.pointerEvents =
      animationInSetting.style.pointerEvents =
        "auto";

    removeAllUIEventListeners();

    hidePopup_open_close_noanim(app4);
    hidePopup_open_close_noanim(credits);
    hidePopup_open_close_noanim(app4_vesion);
    hidePopup_open_close_noanim(app4animation);
    hidePopup_open_close_noanim(app4_theme);
    hidePopup_open_close_noanim(app4_home);
    hidePopup_open_close_noanim(wallpaper_option);
    hidePopup_open_close_noanim(aod_option);
    hidePopup_open_close_noanim(lock_option);
    hidePopup_open_close_noanim(app4_finger);
    hidePopup_open_close_noanim("app4icon");
    hidePopup_open_close_noanim("app4audio");
    hidePopup_open_close_noanim(app4_lock_style);
    hidePopup_open_close_noanim(crea_pass);
    hidePopup_open_close_noanim(app4_more_animation);
    hidePopup_open_close_noanim(app4_unlock_animation);
    hidePopup_open_close_noanim(app4AppOpeningAnimation);
    hidePopup_open_close_noanim(app4AppClosingAnimation);
    hidePopup_open_close_noanim(app4ControlsCenterAnim);
    hideBorderRadiusSystem();
  }

  nav.style.height = "30px";
  currentOpeningBtn = null;
}

let timeOutOpenAppFromRight = null;
function openAppFromRight() {
  showPopup_open_close(app);
  lp.style.transition =
    allApp.style.transition =
    wallpaper.style.transition =
    currentOpeningBtn.style.transition =
      `all 0s`;

  currentOpeningBtn.classList.add("open");
  currentOpeningBtn.style.scale = "90%";
  currentOpeningBtn.style.transform = `translateX(130%)`;

  wallpaper.style.scale = `${scaleWallpaper}%`;
  lp.classList.add("open");

  lp.style.scale = `${scaleAllAppReverse}`;
  allApp.style.scale = `${scaleAllApp}%`;

  nav.style.height = "40px";

  const existing = oldApps.find((item) => item.el === currentOpeningBtn);
  if (existing) {
    clearTimeout(existing.timeoutId);
    oldApps = oldApps.filter((item) => item.el !== currentOpeningBtn);
  }

  clearTimeout(timeOutOpenAppFromRight);
  timeOutOpenAppFromRight = setTimeout(() => {
    currentOpeningBtn.style.transition = `all ${
      currentSpeed * 0.7
    }s , scale ${currentSpeed}s cubic-bezier(0.23, 1, 0.32, 1)`;
    currentOpeningBtn.style.scale = "1";
    currentOpeningBtn.style.transform = `scale(${scaleAllAppReverse})`;
  }, currentSpeed * 10);
}

function openAppFromCenter() {
  showPopup_open_close(app);

  allApp.style.transition = currentOpeningBtn.style.transition = `all 0s`;
  lp.style.transition = `opacity ${time_opening_app}s`;
  wallpaper.style.transition = `all ${time_opening_app}s`;
  currentOpeningBtn.classList.add("open");
  currentOpeningBtn.classList.add("hien");
  currentOpeningBtn.style.scale = "80%";
  currentOpeningBtn.style.transform = `scale(${scaleAllAppReverse})`;

  wallpaper.style.scale = `${scaleWallpaper}%`;
  lp.classList.add("open");

  lp.style.scale = `${scaleAllAppReverse}`;
  allApp.style.scale = `${scaleAllApp}%`;

  const boxId = Object.keys(boxes).find(
    (key) => boxes[key] === currentOpeningBtn
  );
  if (boxId) clickables[boxId].style.display = "none";
  nav.style.height = "40px";

  clearTimeout(timeOutOpenAppFromRight);

  timeOutOpenAppFromRight = setTimeout(() => {
    currentOpeningBtn.style.transition = `scale ${currentSpeed4}s`;
    currentOpeningBtn.style.scale = "1";
  }, currentSpeed * 10);
}

function openApp(idApp) {
  // idApp (1 - 12)
  if (islock) {
    tb_system("Unlock your phone first!");
    return;
  }
  if (currentOpeningBtn && currentOpeningBtn != boxes[`box${idApp}`]) {
    closeAppToLeft();
    currentOpeningBtn = boxes[`box${idApp}`];
    app = appopen[`box${idApp}`];
    app.style.display = "none";
    openAppFromRight();
    hideAllClickables();
    app.style.pointerEvents = "auto";
  } else {
    if (currentOpeningBtn == boxes[`box${idApp}`]) return;
    currentOpeningBtn = boxes[`box${idApp}`];
    app = appopen[`box${idApp}`];
    app.style.display = "none";
    openAppFromCenter();
    clickables[`box${idApp}`].style.display = "none";
    hideAllClickables();
    app.style.pointerEvents = "auto";
  }
}

function updatePhoneScale() {
  updatePhoneScaleNonFullScreen();
}
function updatePhoneScaleNonFullScreen() {
  const defaultHeight = 700 + 150;
  const defaultWidth = 330 + 150;

  // Lấy kích thước viewport thực (không tính thanh địa chỉ)
  const vh = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  const vw = window.visualViewport
    ? window.visualViewport.width
    : window.innerWidth;

  const scaleH = vh / defaultHeight;
  const scaleW = vw / defaultWidth;

  const scale = Math.min(scaleH, scaleW);

  document.documentElement.style.setProperty(
    "--bg--scale_phone",
    scale.toFixed(3)
  );
}

function updatePhoneScaleFullScreen() {
  const BASE_H = 700;
  const BASE_W = 330;

  // Viewport thực (loại trừ thanh địa chỉ trên mobile)
  const vv = window.visualViewport;
  const vh = vv ? vv.height : window.innerHeight;
  const vw = vv ? vv.width : window.innerWidth;

  // Scale để chiều cao sau transform = chiều cao viewport
  const S = vh / BASE_H;

  // Base width để width sau transform = chiều rộng viewport
  const W = vw / S; // => scaledWidth = W * S = vw

  // Tỉ lệ phải là width / 700 (luôn cố định theo yêu cầu)
  const ratio = W / BASE_H; // cũng bằng vw / vh

  const root = document.documentElement;
  root.style.setProperty("--bg--ratio_phone", ratio);
  root.style.setProperty("--bg--size_width_phone", `${W}px`);
  root.style.setProperty("--bg--scale_phone", S.toFixed(3));
}

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", updatePhoneScale);
}

// Custom Icon Pack Logic
window.customApps = [
  { id: "box1", name: "الحاسبة", defaultIcon: "https://yourimageshare.com/ib/jhcdkbaDfC.png" },
  { id: "box2", name: "مدير الملفات", defaultIcon: "https://yourimageshare.com/ib/rNiozTmpqK.png" },
  { id: "box3", name: "الموسيقى", defaultIcon: "https://yourimageshare.com/ib/7l3Gk00BxW.png" },
  { id: "box4", name: "الإعدادات", defaultIcon: "https://yourimageshare.com/ib/lP6p1xwNKO.png" },
  { id: "box5", name: "الرسائل", defaultIcon: "https://yourimageshare.com/ib/ucZd6pq45a.png" },
  { id: "box6", name: "الصور", defaultIcon: "https://yourimageshare.com/ib/BQMUAQLi1i.png" },
  { id: "box7", name: "التقويم", defaultIcon: "https://yourimageshare.com/ib/lcOGD7bWbw.png" },
  { id: "box8", name: "الهاتف", defaultIcon: "https://yourimageshare.com/ib/1DNRlKIoeD.png" },
  { id: "box9", name: "المتصفح", defaultIcon: "https://yourimageshare.com/ib/bLfJRLuhMK.png" },
  { id: "box10", name: "الطقس", defaultIcon: "https://yourimageshare.com/ib/c123oPx7Nz.png" },
  { id: "box11", name: "المؤقت", defaultIcon: "https://yourimageshare.com/ib/7cGQdxnoO3.png" },
  { id: "box12", name: "الثيمات", defaultIcon: "https://yourimageshare.com/ib/MmRdzUMY0f.png" },
  { id: "box13", name: "تطبيق 13", defaultIcon: "https://www.hostpic.org/images/2605131954290084.png" },
  { id: "box14", name: "Terminal", defaultIcon: "https://img.icons8.com/color/256/console.png" },
  { id: "box15", name: "تطبيق 15", defaultIcon: "https://www.hostpic.org/images/2605131558540092.png" },
  { id: "box16", name: "YouTube", defaultIcon: "https://img.icons8.com/color/256/youtube-play--v1.png" },
  { id: "box22", name: "تطبيق 22", defaultIcon: "https://www.hostpic.org/images/2605132000110097.png" },
  { id: "box23", name: "البحث الصوتي", defaultIcon: "https://i.ibb.co/FL3jd8S0/com-android-voicedialer.png" },
  { id: "box24", name: "جهات الاتصال", defaultIcon: "https://yourimageshare.com/ib/1DNRlKIoeD.png" },
  { id: "box25", name: "الطقس", defaultIcon: "" },
  { id: "box26", name: "التقويم", defaultIcon: "" },
];

window.getAppKeywords = function() {
  return {
    "box1": "calculator",
    "box2": "files",
    "box3": "music",
    "box4": "settings",
    "box5": "messages",
    "box6": "gallery",
    "box7": "calendar",
    "box8": "phone",
    "box9": "browser",
    "box10": "weather",
    "box11": "clock",
    "box12": "store",
    "box13": "app13",
    "box14": "terminal",
    "box15": "browser",
    "box16": "youtube"
  };
};

// YouTube App Initialization and Search logic
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const searchInput = document.getElementById("yt-search-input");
  const searchBtn = document.getElementById("yt-search-btn");
  const ytIframe = document.getElementById("yt-main-iframe");

  if (searchBtn && searchInput && ytIframe) {
    const performSearch = () => {
      const query = searchInput.value.trim();
      if (query) {
        // We can't really "search" in the embed, but we can try to guess a video or just use a search list
        // YouTube doesn't support a true broad search in embed without API keys, 
        // but we can try redirecting to a search result list if they allow it (usually they don't in embed)
        // For simulation, we'll just show we are "searching" by using a generic search list
        ytIframe.src = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;
      }
    };

    searchBtn.onclick = performSearch;
    searchInput.onkeypress = (e) => {
      if (e.key === "Enter") performSearch();
    };
  }

  // Terminal App (App 14) logic
  const termInput = document.getElementById("term-input");
  const termOutput = document.getElementById("term-output");

  if (termInput && termOutput) {
    const commands = {
      help: () => `Available commands: 
- help: Show this message
- ls: List files
- clear: Clear the terminal
- pwd: Print working directory
- grep: Search for patterns in files
- cat [file]: View file content
- whoami: Current user
- date: Show current date
- echo [text]: Display text
- set-size [w] [h]: Change phone dimensions
- reset-size: Reset phone dimensions
- set-virus: Activate system virus simulation
- stop-virus: Stop all virus effects`,
      ls: () => "Documents\nDownloads\nMusic\nPictures\nVideos\nSystem32",
      clear: () => {
        termOutput.innerHTML = "";
        return "";
      },
      whoami: () => "guest",
      date: () => new Date().toLocaleString(),
      echo: (args) => args.join(" "),
      sysinfo: () => `OS: OriginOS Web
Version: 1.0.0
Environment: AISTUDIO-Cloud
Browser: ${navigator.userAgent.split(')')[0]})`,
    };

    const processCommand = async (input) => {
      const parts = input.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (!input.trim()) return;

      const outputLine = document.createElement("div");
      outputLine.className = "command-echo";
      outputLine.innerHTML = `> ${input}`;
      termOutput.appendChild(outputLine);

      if (cmd) {
        // Local commands
        if (cmd === "clear") {
          commands.clear();
        } else if (cmd === "help") {
          const respLine = document.createElement("div");
          respLine.innerText = commands.help();
          termOutput.appendChild(respLine);
        } else if (cmd === "set-size") {
          const width = args[0];
          const height = args[1];
          if (width && height) {
            document.documentElement.style.setProperty('--bg--size_width_phone', width.includes('px') ? width : width + 'px');
            document.documentElement.style.setProperty('--bg--size_height_phone', height.includes('px') ? height : height + 'px');
            const respLine = document.createElement("div");
            respLine.className = "success-text";
            respLine.innerText = `Phone size updated to ${width}x${height}`;
            termOutput.appendChild(respLine);
          } else {
            const respLine = document.createElement("div");
            respLine.className = "error-text";
            respLine.innerText = "Usage: set-size [width] [height] (e.g. set-size 400 800)";
            termOutput.appendChild(respLine);
          }
        } else if (cmd === "reset-size") {
          document.documentElement.style.removeProperty('--bg--size_width_phone');
          document.documentElement.style.removeProperty('--bg--size_height_phone');
          const respLine = document.createElement("div");
          respLine.className = "success-text";
          respLine.innerText = "Phone size reset to default";
          termOutput.appendChild(respLine);
        } else if (cmd === "set-virus") {
          // Trigger Virus Logic
          const popup = document.createElement("div");
          popup.className = "virus-popup";
          popup.innerHTML = `
            <h3>OK</h3>
            <button onclick="activateVirus(this)">OK</button>
          `;
          document.body.appendChild(popup);
          
          window.virusAudioContext = null;
          window.virusOscillators = [];

          window.activateVirus = (btn) => {
            btn.parentElement.remove();
            
            // 1. Shake screen
            document.body.classList.add("virus-shake");
            
            // 2. Add color overlay
            if (!document.querySelector(".virus-overlay")) {
              const overlay = document.createElement("div");
              overlay.className = "virus-overlay";
              document.body.appendChild(overlay);
            }
            
            // 3. Web Audio API for Scary Siren
            try {
              const AudioContext = window.AudioContext || window.webkitAudioContext;
              const ctx = new AudioContext();
              window.virusAudioContext = ctx;
              
              const playSiren = () => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);
                osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.0);
                
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.0);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 1.0);
                window.virusOscillators.push(osc);
              };

              const interval = setInterval(() => {
                if (window.virusAudioContext && window.virusAudioContext.state !== 'closed') {
                  playSiren();
                } else {
                  clearInterval(interval);
                }
              }, 1000);
              window.virusInterval = interval;

            } catch (e) {
              console.error("Audio API failed", e);
            }

            const virusMsg = document.createElement("div");
            virusMsg.className = "error-text";
            virusMsg.style.fontSize = "20px";
            virusMsg.style.fontWeight = "bold";
            virusMsg.innerText = "CRITICAL ERROR: SYSTEM INFECTED!!!";
            termOutput.appendChild(virusMsg);
          };

          const respLine = document.createElement("div");
          respLine.className = "info-text";
          respLine.innerText = "Virus simulation initialized...";
          termOutput.appendChild(respLine);
        } else if (cmd === "stop-virus") {
          document.body.classList.remove("virus-shake");
          const overlay = document.querySelector(".virus-overlay");
          if (overlay) overlay.remove();
          
          if (window.virusAudioContext) {
            window.virusAudioContext.close();
          }
          if (window.virusInterval) {
            clearInterval(window.virusInterval);
          }
          
          const respLine = document.createElement("div");
          respLine.className = "success-text";
          respLine.innerText = "Virus sanitized. System normalized.";
          termOutput.appendChild(respLine);
        } else {
          // Send to backend API
          try {
            const response = await fetch("/api/shell", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ command: input })
            });
            const data = await response.json();
            
            const respLine = document.createElement("div");
            if (data.error) {
              respLine.className = "error-text";
              respLine.innerText = data.error;
            } else {
              respLine.innerText = data.output;
            }
            termOutput.appendChild(respLine);
          } catch (err) {
            const errLine = document.createElement("div");
            errLine.className = "error-text";
            errLine.innerText = "Error: Could not connect to terminal server.";
            termOutput.appendChild(errLine);
          }
        }
      }
      termOutput.scrollTop = termOutput.scrollHeight;
    };

    const termSendBtn = document.getElementById("term-send-btn");

    const handleSend = () => {
      processCommand(termInput.value);
      termInput.value = "";
    };

    termInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    });

    if (termSendBtn) {
      termSendBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleSend();
      });
    }

    // Handle clicks to focus input
    document.querySelector(".simple-shell").addEventListener("click", () => {
      termInput.focus();
    });
  }
});


function setIconAndBackgroundGradient(boxId, imageUrl) {
  const savedIcons = JSON.parse(localStorage.getItem("custom_icons") || "{}");
  if (savedIcons[boxId]) {
      imageUrl = savedIcons[boxId];
  }

  const box = document.getElementById(boxId) || document.querySelector(boxId);
  if (!box) return;

  // Set icon background image first
  box.style.setProperty("--bg--originos", `url("${imageUrl}")`);

  // Special handling for widgets 25 & 26 to show background image
  if (boxId === "box25" || boxId === "box26") {
      if (imageUrl && imageUrl !== "") {
          box.style.backgroundImage = `url("${imageUrl}")`;
          box.style.backgroundSize = "cover";
          box.style.backgroundPosition = "center center";
          
          const widgetContent = box.querySelector(".widget-content");
          if (widgetContent) {
              widgetContent.style.background = "transparent";
              widgetContent.style.backdropFilter = "none";
              widgetContent.style.webkitBackdropFilter = "none";
          }
      } else {
          box.style.backgroundImage = "none";
          const widgetContent = box.querySelector(".widget-content");
          if (widgetContent) {
              widgetContent.style.background = boxId === "box25" ? "rgba(255, 255, 255, 0.7)" : "#222";
              widgetContent.style.backdropFilter = "";
              widgetContent.style.webkitBackdropFilter = "";
          }
      }
  }

  const img = new Image();
  // Ensure Base64 or local images don't trigger CORS issues where possible
  if (!imageUrl.startsWith('data:')) {
    img.crossOrigin = "anonymous";
  }
  img.src = imageUrl;

  img.onload = () => {
    // Basic verification that image actually has dimensions
    if (img.width === 0 || img.height === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    try {
      ctx.drawImage(img, 0, 0);

      const centerX = Math.floor(img.width / 2);
      const topY = Math.min(8, img.height - 1);
      const bottomY = Math.max(img.height - 9, 0);

      const top = ctx.getImageData(centerX, topY, 1, 1).data;
      const bottom = ctx.getImageData(centerX, bottomY, 1, 1).data;

      // Ensure we didn't get transparent/all-zero data which might look black
      if (top[3] === 0 && bottom[3] === 0) {
        box.style.background = "#eaeaea";
        return;
      }

      const topColor = `rgb(${top[0]}, ${top[1]}, ${top[2]})`;
      const bottomColor = `rgb(${bottom[0]}, ${bottom[1]}, ${bottom[2]})`;

      if (boxId !== "box25" && boxId !== "box26") {
          box.style.background = `linear-gradient(to bottom, ${topColor}, ${bottomColor})`;
      }
    } catch (e) {
      console.warn("Could not extract image data:", e);
      box.style.background = "#eaeaea";
    }
  };
  
  img.onerror = () => {
    console.warn("Failed to load icon image for gradient:", boxId);
    box.style.background = "#eaeaea"; // Fallback light gray
  };
}

function applyCustomIcons(forceAll = false) {
  const savedIcons = JSON.parse(localStorage.getItem("custom_icons") || "{}");
  
  // Apply saved custom icons
  Object.keys(savedIcons).forEach((appId) => {
      setIconAndBackgroundGradient(appId, savedIcons[appId]);
  });
}
window.applyCustomIcons = applyCustomIcons;

function updateIconBorder(activeId) {
  document.querySelectorAll(".box_icon").forEach((el) => {
    el.style.border = "4px solid transparent";
  });
  const active = document.getElementById(activeId);
  if (active) active.style.border = "4px solid #f65268";
}

// Apply custom icons on load
document.addEventListener("DOMContentLoaded", () => {
    let pack = localStorage.getItem("selected_icon_pack");
    if (!pack) {
        pack = "hyperos3";
        localStorage.setItem("selected_icon_pack", "hyperos3");
    }
    
    // Use a small timeout to ensure DOM and specific app boxes are fully rendered
    setTimeout(() => {
        if (typeof window.restoreIconPack === "function") {
            window.restoreIconPack();
        }
        applyCustomIcons(); // custom extracted icons go on top
        updateIconBorder(`${pack}_icon`);
    }, 150);
});

function showChangelog() {
    showPopup1_alert(
        `سجل التغييرات:\n
- إضافة ميزة استخراج مجلد أيقونات مخصص لتسهيل تخصيص الواجهة بضغطة واحدة.\n
- إضافة نافذة "سجل التغييرات" لتتبع التحديثات.\n
- تحسين ميزة حفظ الإعدادات لضمان بقائها بعد إعادة التشغيل.\n
- زيادة مرونة تخصيص حواف الأيقونات (من 0 إلى 40px).\n
- تحسين أداء زر التبديل (Toggle Switch).\n
- تحسينات عامة في استقرار النظام.`
    );
}


// Phone mold setup
document.addEventListener("DOMContentLoaded", () => {
  const moldBtn = document.getElementById("phone-mold-toggle-btn");
  const moldSwitch = document.getElementById("phone_mold_switch");
  const moldOverlay = document.getElementById("phone_mold_overlay");
  
  if (moldBtn && moldSwitch && moldOverlay) {
    const isMoldEnabled = localStorage.getItem("phone_mold_enabled") === "true";
    if (isMoldEnabled) {
      moldSwitch.classList.add("active");
      moldOverlay.style.display = "block";
    }

    moldBtn.addEventListener("click", () => {
      const isActive = moldSwitch.classList.toggle("active");
      if (isActive) {
        moldOverlay.style.display = "block";
        localStorage.setItem("phone_mold_enabled", "true");
      } else {
        moldOverlay.style.display = "none";
        localStorage.setItem("phone_mold_enabled", "false");
      }
    });
  }
});


// Refined Phone mold setup
document.addEventListener("DOMContentLoaded", () => {
  const moldBtn = document.getElementById("phone-mold-toggle-btn");
  const moldSwitch = document.getElementById("phone_mold_switch");
  const moldOverlay = document.getElementById("phone_mold_overlay");
  const islandCircle = document.getElementById("island_circle");
  const island2 = document.getElementById("island2");
  const island = document.getElementById("island");
  
  if (moldBtn && moldSwitch && moldOverlay) {
    const isMoldEnabled = localStorage.getItem("phone_mold_enabled") === "true";
    
    function toggleIslands(enabled) {
      if(enabled) {
         if(islandCircle) islandCircle.style.display = 'none';
         if(island2) island2.style.display = 'none';
         if(island) island.style.display = 'none';
      } else {
         if(islandCircle) islandCircle.style.display = '';
         if(island2) island2.style.display = '';
         if(island) island.style.display = '';
      }
    }

    if (isMoldEnabled) {
      moldSwitch.classList.add("active");
      moldOverlay.style.display = "block";
      toggleIslands(true);
    }

    moldBtn.addEventListener("click", () => {
      const isActive = moldSwitch.classList.toggle("active");
      if (isActive) {
        moldOverlay.style.display = "block";
        localStorage.setItem("phone_mold_enabled", "true");
        toggleIslands(true);
      } else {
        moldOverlay.style.display = "none";
        localStorage.setItem("phone_mold_enabled", "false");
        toggleIslands(false);
      }
    });
  }
});

// Device name management
document.addEventListener("DOMContentLoaded", () => {
    const deviceNameInput = document.getElementById("device_name_input");
    if (deviceNameInput) {
        deviceNameInput.value = localStorage.getItem("device_name") || "Phone";
        deviceNameInput.addEventListener("input", (e) => {
            localStorage.setItem("device_name", e.target.value);
        });
    }
});
