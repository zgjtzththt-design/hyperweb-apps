const transformControlCenter1 = {
  0: "translateX(34px) translateY(-60px)",
  1: "translateX(34px) translateY(-23px) scale(0.4)",
  2: "translateX(130px) translateY(0px) scale(0.4)",
  3: "translateX(106px) translateY(-46px) scale(0.4)",
  4: "translateX(154px) translateY(-46px) scale(0.4)",
  5: "translateX(10px) translateY(-116px) scale(0.4)",
  6: "translateX(58px) translateY(-116px) scale(0.4)",
  7: "translateX(130px) translateY(-93px) scale(0.4)",
  8: "translateX(130px) translateY(-140px) scale(0.4)",
  9: "translateX(10px) translateY(-186px) scale(0.4)",
  10: "translateX(58px) translateY(-186px) scale(0.4)",
  11: "translateX(106px) translateY(-187px) scale(0.4)",
  12: "translateX(154px) translateY(-187px) scale(0.4)",
  13: "translateX(58px) translateY(-234px) scale(0.4)",
  14: "translateX(106px) translateY(-234px) scale(0.4)",
  15: "translateX(154px) translateY(-234px) scale(0.4)",
};

const transformControlCenter2 = {
  0: "translateY(90px)",
  1: "translateY(0px) scale(0.4)",
  2: "translateY(0px) scale(0.4)",
  3: "translateY(0px) scale(0.4)",
  4: "translateY(0px) scale(0.4)",
  5: "translateY(0px) scale(0.4)",
  6: "translateY(0px) scale(0.4)",
  7: "translateY(0px) scale(0.4)",
  8: "translateY(0px) scale(0.4)",
  9: "translateY(0px) scale(0.4)",
  10: "translateY(0px) scale(0.4)",
  11: "translateY(0px) scale(0.4)",
  12: "translateY(0px) scale(0.4)",
  13: "translateY(0px) scale(0.4)",
  14: "translateY(0px) scale(0.4)",
  15: "translateY(0px) scale(0.4)",
};

let transformControlCenterControlsCenter = transformControlCenter2;
let timeDelayControlsCenter = 0;
const btnControlsCenter = document.getElementById("btnControlsCenter");
const lpControlCenterControlsCenter = document.querySelector(
  ".lpControlCenterControlsCenter"
);

Object.keys(transformControlCenterControlsCenter).forEach(
  (idControlsCenter) => {
    const itemControlsCenter = document.getElementById(
      `controlCenterID${idControlsCenter}ControlsCenter`
    );
    itemControlsCenter.style.transition = `all 0.5s, opacity 0.2s`;
    itemControlsCenter.style.transform =
      transformControlCenterControlsCenter[idControlsCenter];
    itemControlsCenter.style.zIndex = 1;
    itemControlsCenter.style.opacity = 0;
  }
);
lpControlCenterControlsCenter.style.transition = "all 0.5s";
lpControlCenterControlsCenter.classList.remove("open");

// btn toggle
//let toggleControlsCenter = true;
//btnControlsCenter.addEventListener("click", () => {
//  if (toggleControlsCenter) {
//    openControlsCenter();
//  } else {
//    closeControlsCenter();
//  }
//  toggleControlsCenter = !toggleControlsCenter;
//});
// end toggle

function lpControlCenterControlsCenterEvent(eControlsCenter) {
  if (eControlsCenter.target !== lpControlCenterControlsCenter) return;
  closeControlsCenter();
}
const allItemControlsCenter = document.querySelectorAll(".itemControlsCenter");

function toggleItemControlsCenter(event) {
  const isWiFi = event.currentTarget.classList.contains("wifiControlsCenter");
  event.currentTarget.classList.toggle("activeControlsCenter");

  if (isWiFi && typeof statusWifi !== "undefined" && statusWifi) {
    if (event.currentTarget.classList.contains("activeControlsCenter")) {
      statusWifi.classList.remove("hidden");
    } else {
      statusWifi.classList.add("hidden");
    }
  }
}

function openEditControlsCenterSettingEvent() {
  document.getElementById("scaling-box").style.animation = "none";

  theme_option.style.pointerEvents =
    AboutInSetting.style.pointerEvents =
    animationInSetting.style.pointerEvents =
      "auto";

  removeAllUIEventListeners();

  hidePopup_open_close_noanim(app4);
  hidePopup_open_close_noanim(credits);
  hidePopup_open_close_noanim(app4_vesion);
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
  hidePopup_open_close_noanim(app4_unlock_animation);
  hidePopup_open_close_noanim(app4AppOpeningAnimation);
  hidePopup_open_close_noanim(app4AppClosingAnimation);
  hideBorderRadiusSystem();

  document.getElementById(
    "scaling-box"
  ).style.animation = `scaleUpDown ${duration}s ease-out infinite`;
  AboutInSetting.style.pointerEvents = "none";
  theme_option.style.pointerEvents = "none";
  blurAppBtn.addEventListener("click", handleBlurAppToggle);
  animation_more_btn.addEventListener("click", show_app4MoreAnimation);
  back15.addEventListener("click", hide_app4MoreAnimation);
  anim_unlock_btn.addEventListener("click", show_app4UnlockAnimation);
  back16.addEventListener("click", hide_app4UnlockAnimation);
  anim_open_app_btn.addEventListener("click", show_app4AppOpeningAnimation);
  back17.addEventListener("click", hide_app4AppOpeningAnimation);
  anim_close_app_btn.addEventListener("click", show_app4AppClosingAnimation);
  back18.addEventListener("click", hide_app4AppClosingAnimation);
  ControlsCenterAnimBtn.addEventListener("click", show_app4ControlsCenterAnim);
  back19.addEventListener("click", hide_app4ControlsCenterAnim);
  document
    .getElementById("item_anim_controlsCenter_Anim2")
    .addEventListener("click", preivewAnimationControlsCenter);
  document
    .getElementById("item_anim_controlsCenter_Anim1")
    .addEventListener("click", preivewAnimationControlsCenter);

  if (currentOpeningBtn != boxes["box4"]) {
    showPopup_open_close_noanim(app4animation);
  } else {
    showPopup_open_close(app4animation);
  }
  showPopup_open_close_noanim(app4_more_animation);
  showPopup_open_close_noanim(app4ControlsCenterAnim);
  openApp(4);
  closeControlsCenter();
}
function openSettingsApp() {
  document.getElementById("scaling-box").style.animation = "none";

  theme_option.style.pointerEvents =
    AboutInSetting.style.pointerEvents =
    animationInSetting.style.pointerEvents =
      "auto";

  removeAllUIEventListeners();

  if (currentOpeningBtn != boxes["box4"]) {
    hidePopup_open_close_noanim(app4animation);
    hidePopup_open_close_noanim(app4);
    hidePopup_open_close_noanim(app4_lock_style);
    hidePopup_open_close_noanim(app4_theme);
    hidePopup_open_close_noanim("app4audio");
  } else {
    hidePopup_open_close(app4animation);
    hidePopup_open_close(app4);
    hidePopup_open_close(app4_lock_style);
    hidePopup_open_close(app4_theme);
    hidePopup_open_close("app4audio");
  }

  hidePopup_open_close_noanim(lock_option);
  hidePopup_open_close_noanim(credits);
  hidePopup_open_close_noanim(app4_vesion);
  hidePopup_open_close_noanim(app4_home);
  hidePopup_open_close_noanim(wallpaper_option);
  hidePopup_open_close_noanim(aod_option);
  hidePopup_open_close_noanim(app4_finger);
  hidePopup_open_close_noanim("app4icon");
  hidePopup_open_close_noanim(crea_pass);
  hidePopup_open_close_noanim(app4_more_animation);
  hidePopup_open_close_noanim(app4_unlock_animation);
  hidePopup_open_close_noanim(app4AppOpeningAnimation);
  hidePopup_open_close_noanim(app4AppClosingAnimation);
  hidePopup_open_close_noanim(app4ControlsCenterAnim);
  hideBorderRadiusSystem();

  openApp(4);
  closeControlsCenter();
}

let idTimeOutLpControlsCenterEvent = null;

let isOpenControlsCenterTmp = false;
function closeControlsCenter() {
  const keys = Object.keys(transformControlCenterControlsCenter);
  const totalItems = keys.length;
  const delayIncrement = timeDelayControlsCenter * currentSpeed;

  // Bắt đầu vòng lặp từ phần tử cuối cùng
  for (let i = totalItems - 1; i >= 0; i--) {
    const idControlsCenter = keys[i];
    const itemControlsCenter = document.getElementById(
      `controlCenterID${idControlsCenter}ControlsCenter`
    );

    // Tính delay cho từng phần tử khi duyệt ngược
    const delayControlsCenter = (totalItems - 1 - i) * delayIncrement;

    itemControlsCenter.style.transition = `all ${currentSpeed6}s, opacity ${currentSpeed2}s ease-in ${currentSpeed4}s`;
    itemControlsCenter.style.transitionDelay = `${delayControlsCenter}s`;
    itemControlsCenter.style.transform =
      transformControlCenterControlsCenter[idControlsCenter];
    itemControlsCenter.style.zIndex = 1;
    itemControlsCenter.style.opacity = 0;
  }

  controlsCenterAll.style.transition =
    lpControlCenterControlsCenter.style.transition = `all ${currentSpeed6}s`;
  lpControlCenterControlsCenter.classList.remove("open");
  lpControlCenterControlsCenter.style.zIndex = 1;

  allItemControlsCenter.forEach((item) => {
    if (item.dataset.nonclick === "1") return;
    item.removeEventListener("click", toggleItemControlsCenter);
  });

  lpControlCenterControlsCenter.removeEventListener(
    "pointerup",
    lpControlCenterControlsCenterEvent
  );
  document
    .getElementById("openEditSettingBtnInControlsCenter")
    .removeEventListener("click", openEditControlsCenterSettingEvent);
  document
    .getElementById("openSettingBtnInControlsCenter")
    .removeEventListener("click", openSettingsApp);

  isOpenControlsCenterTmp = false;

  lpControlCenterControlsCenter.style.backdropFilter = ``;
  lpControlCenterControlsCenter.style.webkitBackdropFilter = ``;
  battery1.style.transition = statusWifi.style.transition = `all ${currentSpeed4}s`;
  battery1.style.transform = statusWifi.style.transform = ``;

  hidePopup_open_close("editControlsCenterBtn");
  clearTimeout(hideTimeouts_open_close["editControlsCenterBtn"]);

  open_all_island();
  isOpenControlsCenterTmp = false;
  removeDragVolumeAndBrightnessEvents();
  
  // Disable sortable if active
  if (isReorderingCC) {
    toggleReorderCC();
  }

  if (typeof islock !== "undefined" && islock) {
    const lock_content_el = document.getElementById("lock_content");
    const unlockBtn_el = document.getElementById("unlock-btn");
    const longer_finger_el = document.getElementById("longer_finger");
    if (lock_content_el) {
      lock_content_el.style.transition = `opacity ${currentSpeed5}s`;
      lock_content_el.style.opacity = 1;
    }
    if (unlockBtn_el) {
      unlockBtn_el.style.transition = `opacity ${currentSpeed5}s`;
      unlockBtn_el.style.opacity = 1;
    }
    if (longer_finger_el) {
      longer_finger_el.style.transition = `opacity ${currentSpeed5}s`;
      longer_finger_el.style.opacity = 1;
    }
  }
}

let isReorderingCC = false;
let sortableCC = null;

function toggleReorderCC() {
  const container = document.querySelector(".control-centerControlsCenter");
  const reorderBtn = document.getElementById("reorderCCBtn");
  
  isReorderingCC = !isReorderingCC;
  
  if (isReorderingCC) {
    reorderBtn.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    reorderBtn.style.borderRadius = "10px";
    
    // Enable Sortable
    sortableCC = new Sortable(container, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: function() {
        saveCCOrder();
      }
    });

    // Add Share/Import labels or tooltips if needed
    tb_system("Reorder Mode Active. Drag buttons to move them.");
    
    // Create Share and Import buttons if they don't exist
    if (!document.getElementById("shareCCBtn")) {
        const editBox = document.getElementById("editControlsCenterBtn");
        
        const shareBtn = document.createElement("div");
        shareBtn.id = "shareCCBtn";
        shareBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`;
        shareBtn.style.cssText = "width: 20px; height: 20px; padding: 5px; cursor: pointer;";
        shareBtn.onclick = exportCCOrder;
        editBox.appendChild(shareBtn);
        
        const importBtn = document.createElement("div");
        importBtn.id = "importCCBtn";
        importBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><polyline points="16 16 12 12 8 16"/></svg>`;
        importBtn.style.cssText = "width: 20px; height: 20px; padding: 5px; cursor: pointer;";
        importBtn.onclick = importCCOrder;
        editBox.appendChild(importBtn);
    }
  } else {
    reorderBtn.style.backgroundColor = "";
    if (sortableCC) {
      sortableCC.destroy();
      sortableCC = null;
    }
    const shareBtn = document.getElementById("shareCCBtn");
    const importBtn = document.getElementById("importCCBtn");
    if (shareBtn) shareBtn.remove();
    if (importBtn) importBtn.remove();
    
    tb_system("Reorder Mode Disabled");
  }
}

function saveCCOrder() {
  const container = document.querySelector(".control-centerControlsCenter");
  const items = container.querySelectorAll(".itemControlsCenter");
  const order = Array.from(items).map(item => item.id.replace("controlCenterID", "").replace("ControlsCenter", ""));
  localStorage.setItem("cc_order", order.join("-"));
}

function loadCCOrder() {
  let orderStr = localStorage.getItem("cc_order");
  if (!orderStr) {
    orderStr = "2-7-6-5-1-8-12-3-11-10-4-9-15-14-13";
  }
  
  const order = orderStr.split("-");
  const container = document.querySelector(".control-centerControlsCenter");
  
  order.forEach(id => {
    const item = document.getElementById(`controlCenterID${id}ControlsCenter`);
    if (item) {
      container.appendChild(item);
    }
  });
}

function exportCCOrder() {
  const orderStr = localStorage.getItem("cc_order");
  if (!orderStr) {
      // If not saved yet, get current order
      saveCCOrder();
  }
  const code = localStorage.getItem("cc_order");
  
  // Copy to clipboard
  navigator.clipboard.writeText(code).then(() => {
    tb_system("Arrangement code copied: " + code);
  }).catch(err => {
    console.error('Could not copy text: ', err);
    tb_system("Code: " + code);
  });
}

function importCCOrder() {
  if (typeof showPopupInput === "function") {
    showPopupInput({
      message: "كود تعديل مركز التحكم\nقم بلصق الكود هنا لتغيير ترتيب الأزرار",
      placeholder: "مثال: 2-1-4-3-...",
      buttonText: "تطبيق",
      cancelText: "إلغاء",
      onSubmit: (code) => {
        if (code) applyCCOrder(code.trim());
      }
    });
  } else {
    const code = prompt("Enter the Arrangement Code:");
    if (code) {
      applyCCOrder(code.trim());
    }
  }
}

function applyCCOrder(code) {
  const order = code.split("-");
  const container = document.querySelector(".control-centerControlsCenter");
  
  let valid = true;
  order.forEach(id => {
    if (!document.getElementById(`controlCenterID${id}ControlsCenter`)) {
        valid = false;
    }
  });
  
  if (valid) {
    order.forEach(id => {
      const item = document.getElementById(`controlCenterID${id}ControlsCenter`);
      container.appendChild(item);
    });
    localStorage.setItem("cc_order", code);
    tb_system("Custom arrangement applied!");
  } else {
    tb_system("Invalid arrangement code.");
  }
}

// Add event listener for the reorder button
document.getElementById("reorderCCBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleReorderCC();
});

// Load order on script load
loadCCOrder();

function openControlsCenter() {
  clearTimeout(idTimeOutLpControlsCenterEvent);
  Object.keys(transformControlCenterControlsCenter).forEach(
    (idControlsCenter, indexControlsCenter) => {
      const itemControlsCenter = document.getElementById(
        `controlCenterID${idControlsCenter}ControlsCenter`
      );
      const delayControlsCenter =
        indexControlsCenter * timeDelayControlsCenter * currentSpeed;
      itemControlsCenter.style.transition = `all ${currentSpeed5}s, opacity ${currentSpeed3}s`;
      itemControlsCenter.style.transitionDelay = `${delayControlsCenter}s`;
      itemControlsCenter.style.transform = "";
      itemControlsCenter.style.zIndex = 10;
      itemControlsCenter.style.opacity = 1;
    }
  );

  controlsCenterAll.style.transition =
    lpControlCenterControlsCenter.style.transition = `all ${currentSpeed5}s, row-gap ${
      1.2 * currentSpeed
    }s`;
  lpControlCenterControlsCenter.classList.add("open");
  lpControlCenterControlsCenter.style.zIndex = 10000;

  allItemControlsCenter.forEach((item) => {
    // Kiểm tra nếu phần tử có thuộc tính data-nonclick="1"
    if (item.dataset.nonclick === "1") return; // Dừng hàm, không thực hiện bất kỳ hành động nào nữa.

    item.addEventListener("click", toggleItemControlsCenter);
  });

  lpControlCenterControlsCenter.addEventListener(
    "pointerup",
    lpControlCenterControlsCenterEvent
  );
  document
    .getElementById("openEditSettingBtnInControlsCenter")
    .addEventListener("click", openEditControlsCenterSettingEvent);
  document
    .getElementById("openSettingBtnInControlsCenter")
    .addEventListener("click", openSettingsApp);

  const isGlassy = lpControlCenterControlsCenter.classList.contains("glassy-mode");
  if (isGlassy) {
    lpControlCenterControlsCenter.style.backdropFilter = `blur(20px) saturate(1.67)`;
    lpControlCenterControlsCenter.style.webkitBackdropFilter = `blur(20px) saturate(1.67)`;
  } else {
    lpControlCenterControlsCenter.style.backdropFilter = `blur(40px) saturate(1.8)`;
    lpControlCenterControlsCenter.style.webkitBackdropFilter = `blur(40px) saturate(1.8)`;
  }
  battery1.style.transition = statusWifi.style.transition = `all ${currentSpeed6}s`;
  battery1.style.transform = statusWifi.style.transform = `translateX(-16px) translateY(40px)`;

  document.getElementById(
    "editControlsCenterBtn"
  ).style.transition = `all ${currentSpeed4}s`;
  showPopup_open_close("editControlsCenterBtn");

  dongnotification();
  close_all_island();
  addDragVolumeAndBrightnessEvents();

  if (typeof islock !== "undefined" && islock) {
    const lock_content_el = document.getElementById("lock_content");
    const unlockBtn_el = document.getElementById("unlock-btn");
    const longer_finger_el = document.getElementById("longer_finger");
    if (lock_content_el) {
      lock_content_el.style.transition = `opacity ${currentSpeed5}s`;
      lock_content_el.style.opacity = 0;
    }
    if (unlockBtn_el) {
      unlockBtn_el.style.transition = `opacity ${currentSpeed5}s`;
      unlockBtn_el.style.opacity = 0;
    }
    if (longer_finger_el) {
      longer_finger_el.style.transition = `opacity ${currentSpeed5}s`;
      longer_finger_el.style.opacity = 0;
    }
  }
}

// controls center s2 even listener
const controlsCenterAll = document.querySelector(
  ".control-centerControlsCenter"
);

let draggingS2 = false;
let isMoS2 = false;
let startYS2 = 0;
let startXS2 = 0;
let deltaYS2 = 0;
let deltaXS2 = 0;

function updateTransformS2(y) {
  let y2 = y;
  if (y2 < -130) y2 = -130;
  if (y2 > 0) y2 = 0;
  //if (y < -50) y = -50;
  if (y > 0) y = 0;

  controlsCenterAll.style.transition =
    battery1.style.transition = statusWifi.style.transition = `all ${currentSpeed3}s`;
  battery1.style.transform = statusWifi.style.transform = `translateX(${y2 / 5}px) translateY(${
    -y2 / 1.2
  }px)`;

  if (!isOpenControlsCenterTmp) {
    lpControlCenterControlsCenter.style.transition = `all ${currentSpeed3}s`;
    const progress = Math.min(Math.max(-y2 / 130, 0), 1);
    const isGlassy = lpControlCenterControlsCenter.classList.contains("glassy-mode");
    if (isGlassy) {
      const b = progress * 20;
      const s = 1.0 + progress * 0.67;
      lpControlCenterControlsCenter.style.backdropFilter = `blur(${b}px) saturate(${s})`;
      lpControlCenterControlsCenter.style.webkitBackdropFilter = `blur(${b}px) saturate(${s})`;
    } else {
      const b = progress * 40;
      const s = 1.0 + progress * 0.8;
      lpControlCenterControlsCenter.style.backdropFilter = `blur(${b}px) saturate(${s})`;
      lpControlCenterControlsCenter.style.webkitBackdropFilter = `blur(${b}px) saturate(${s})`;
    }
    lpControlCenterControlsCenter.style.zIndex = 10000;
  }

  controlsCenterAll.style.marginTop = `${-y2 / 2.5}px`;
  controlsCenterAll.style.rowGap = `${23 + -y2 / 10}px`;

  if (typeof islock !== "undefined" && islock) {
    const progress = Math.min(Math.max(-y2 / 130, 0), 1);
    const targetOpacity = 1 - progress;
    const lock_content_el = document.getElementById("lock_content");
    const unlockBtn_el = document.getElementById("unlock-btn");
    const longer_finger_el = document.getElementById("longer_finger");
    
    if (lock_content_el) {
      lock_content_el.style.transition = `opacity ${currentSpeed3}s`;
      lock_content_el.style.opacity = targetOpacity;
    }
    if (unlockBtn_el) {
      unlockBtn_el.style.transition = `opacity ${currentSpeed3}s`;
      unlockBtn_el.style.opacity = targetOpacity;
    }
    if (longer_finger_el) {
      longer_finger_el.style.transition = `opacity ${currentSpeed3}s`;
      longer_finger_el.style.opacity = targetOpacity;
    }
  }
}

thanhS2.addEventListener("touchstart", (e) => {
  if (!ison) return;

  isMoS2 = true;
  startYS2 = e.touches[0].clientY;
  startXS2 = e.touches[0].clientX;
});

let hasOpenedDuringSwipe = null;
thanhS2.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    if (!ison) return;

    const touch = e.touches[0];
    deltaYS2 = startYS2 - touch.clientY;
    deltaXS2 = touch.clientX - startXS2;

    updateTransformS2(deltaYS2);

    if (deltaYS2 < -50 || isOpenControlsCenterTmp) {
      if (hasOpenedDuringSwipe !== true) {
        openControlsCenter();
        hasOpenedDuringSwipe = true;
      }
    } else {
      if (hasOpenedDuringSwipe !== false) {
        closeControlsCenter();
        hasOpenedDuringSwipe = false;
      }
    }
  },
  {
    passive: false,
  }
);

thanhS2.addEventListener("touchend", () => {
  if (deltaYS2 < -50) {
    openControlsCenter();
    lpControlCenterControlsCenter.style.transition = "all 0.1s";

    controlsCenterAll.style.marginTop = ``;
    controlsCenterAll.style.rowGap = `23px`;
    isOpenControlsCenterTmp = true;
  } else {
    closeControlsCenter();
    battery1.style.transform = statusWifi.style.transform = ``;
  }

  deltaYS2 = 0;
  deltaXS2 = 0;
  thanhS2.style.transform = ``;
});

thanhS2.addEventListener("mousedown", (e) => {
  if (!ison) return;
  3;
  deltaYS2 = 0;
  deltaXS2 = 0;
  startYS2 = 0;
  startXS2 = 0;

  isMoS2 = true;
  draggingS2 = true;

  startYS2 = e.clientY;
  startXS2 = e.clientX;
});

window.addEventListener("mousemove", (e) => {
  if (!draggingS2 || !isMoS2) return;
  deltaYS2 = startYS2 - e.clientY;
  deltaXS2 = e.clientX - startXS2;
  updateTransformS2(deltaYS2);
  if (deltaYS2 < -50 || isOpenControlsCenterTmp) {
    if (hasOpenedDuringSwipe !== true) {
      openControlsCenter();
      hasOpenedDuringSwipe = true;
    }
  } else {
    if (hasOpenedDuringSwipe !== false) {
      closeControlsCenter();
      hasOpenedDuringSwipe = false;
    }
  }
});

window.addEventListener("mouseup", () => {
  if (!draggingS2 || !isMoS2) return;

  if (deltaYS2 < -50) {
    openControlsCenter();
    lpControlCenterControlsCenter.style.transition = "all 0.1s";

    controlsCenterAll.style.marginTop = ``;
    controlsCenterAll.style.rowGap = `23px`;
    isOpenControlsCenterTmp = true;
  } else {
    closeControlsCenter();
    battery1.style.transform = statusWifi.style.transform = ``;
  }

  draggingS2 = false;
  deltaYS2 = 0;
  deltaXS2 = 0;
  thanhS2.style.transform = ``;
});

let value_volume = 100; // (0-100)
let value_brightness = 100; // (20-100)

const volumeContainer = document.getElementById(
  "controlCenterID6ControlsCenter"
);
const volumeSlider = document.querySelector(
  "#controlCenterID6ControlsCenter .slider-innerControlsCenter"
);

const brightnessContainer = document.getElementById(
  "controlCenterID5ControlsCenter"
);
const brightnessSlider = document.querySelector(
  "#controlCenterID5ControlsCenter .slider-innerControlsCenter"
);

// Tạo object state riêng cho mỗi slider
const sliders = {
  volume: {
    container: volumeContainer,
    inner: volumeSlider,
    min: 0,
    max: 100,
    dragging: false,
    startY: 0,
    startHeight: 0,
    height: 0,
  },
  brightness: {
    container: brightnessContainer,
    inner: brightnessSlider,
    min: 0,
    max: 100,
    dragging: false,
    startY: 0,
    startHeight: 0,
    height: 0,
  },
};

function startDrag(slider, clientY) {
  slider.dragging = true;
  slider.startY = clientY;
  slider.startHeight = slider.inner.offsetHeight;
  slider.height = slider.container.offsetHeight;

  lpControlCenterControlsCenter.removeEventListener(
    "pointerup",
    lpControlCenterControlsCenterEvent
  );
}

function moveDrag(slider, clientY, varName) {
  if (!slider.dragging) return;

  let diffY = slider.startY - clientY;
  let newHeight = slider.startHeight + diffY;

  if (newHeight < 0) {
    let overflow = Math.abs(newHeight);
    slider.container.style.transformOrigin = "top";
    slider.container.style.transform = `scale(${
      1 - Math.min(overflow / 200, 0.05)
    }, ${1 + Math.min(overflow / 200, 0.1)})`;
    newHeight = 0;
  } else if (newHeight > slider.height) {
    let overflow = newHeight - slider.height;
    slider.container.style.transformOrigin = "bottom";
    slider.container.style.transform = `scale(${
      1 - Math.min(overflow / 200, 0.05)
    }, ${1 + Math.min(overflow / 200, 0.1)})`;
    newHeight = slider.height;
  } else {
    slider.container.style.transform = "scale(1, 1)";
  }

  // Chuyển pixel sang %
  let percentHeight = (newHeight / slider.height) * 100;
  slider.inner.style.height = `${percentHeight}%`;

  // Cập nhật giá trị %
  let percentage =
    (percentHeight / 100) * (slider.max - slider.min) + slider.min;
  percentage = Math.round(percentage);

  if (varName === "_volume") value_volume = percentage;
  else value_brightness = percentage;
}

function endDrag(slider) {
  if (slider.dragging) {
    slider.dragging = false;
    slider.container.style.transform = "scale(1, 1)";
    slider.container.style.transformOrigin = "";
    slider.container.style.transition = `all ${currentSpeed5}s, opacity ${currentSpeed2}s ${currentSpeed3}s`;

    lpControlCenterControlsCenter.addEventListener(
      "pointerup",
      lpControlCenterControlsCenterEvent
    );
  }
}

/* -------------------
   ADD EVENT LISTENERS
------------------- */
// Volume
function volTouchStart(e) {
  startDrag(sliders.volume, e.touches[0].clientY);
  e.preventDefault();
}
function volTouchMove(e) {
  moveDrag(sliders.volume, e.touches[0].clientY, "_volume");
  e.preventDefault();
  audioPlayer_music.volume = value_volume / 100;
}
function volTouchEnd() {
  endDrag(sliders.volume);
  updateIndividualVolumes();
}

function volMouseDown(e) {
  startDrag(sliders.volume, e.clientY);
  e.preventDefault();
}
function volMouseMove(e) {
  moveDrag(sliders.volume, e.clientY, "_volume");
  audioPlayer_music.volume = value_volume / 100;
}
function volMouseUp() {
  endDrag(sliders.volume);
  updateIndividualVolumes();
}

// Brightness
function briTouchStart(e) {
  startDrag(sliders.brightness, e.touches[0].clientY);
  e.preventDefault();
}
function briTouchMove(e) {
  moveDrag(sliders.brightness, e.touches[0].clientY, "_brightness");
  e.preventDefault();
}
function briTouchEnd() {
  endDrag(sliders.brightness);
}

function briMouseDown(e) {
  startDrag(sliders.brightness, e.clientY);
  e.preventDefault();
}
function briMouseMove(e) {
  moveDrag(sliders.brightness, e.clientY, "_brightness");
}
function briMouseUp() {
  endDrag(sliders.brightness);
}
function addDragVolumeAndBrightnessEvents() {
  volumeContainer.addEventListener("touchstart", volTouchStart);
  volumeContainer.addEventListener("touchmove", volTouchMove);
  volumeContainer.addEventListener("touchend", volTouchEnd);

  volumeContainer.addEventListener("mousedown", volMouseDown);
  window.addEventListener("mousemove", volMouseMove);
  window.addEventListener("mouseup", volMouseUp);

  brightnessContainer.addEventListener("touchstart", briTouchStart);
  brightnessContainer.addEventListener("touchmove", briTouchMove);
  brightnessContainer.addEventListener("touchend", briTouchEnd);

  brightnessContainer.addEventListener("mousedown", briMouseDown);
  window.addEventListener("mousemove", briMouseMove);
  window.addEventListener("mouseup", briMouseUp);
}
/* -------------------
   REMOVE EVENT LISTENERS
------------------- */
function removeDragVolumeAndBrightnessEvents() {
  // Volume
  volumeContainer.removeEventListener("touchstart", volTouchStart);
  volumeContainer.removeEventListener("touchmove", volTouchMove);
  volumeContainer.removeEventListener("touchend", volTouchEnd);
  volumeContainer.removeEventListener("mousedown", volMouseDown);
  window.removeEventListener("mousemove", volMouseMove);
  window.removeEventListener("mouseup", volMouseUp);

  // Brightness
  brightnessContainer.removeEventListener("touchstart", briTouchStart);
  brightnessContainer.removeEventListener("touchmove", briTouchMove);
  brightnessContainer.removeEventListener("touchend", briTouchEnd);
  brightnessContainer.removeEventListener("mousedown", briMouseDown);
  window.removeEventListener("mousemove", briMouseMove);
  window.removeEventListener("mouseup", briMouseUp);
}
