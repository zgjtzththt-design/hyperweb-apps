// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  projectId: "gen-lang-client-0714112513",
  appId: "1:483424450360:web:9f9fa71ed1b3a5ad8933cd",
  apiKey: "AIzaSyCwAA00mMt1fkybUf56BI7zZ-8MyDQuHFg",
  authDomain: "gen-lang-client-0714112513.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-5ed1a886-2bf0-4ec6-baf4-3394a78ae8f0",
  storageBucket: "gen-lang-client-0714112513.firebasestorage.app",
  messagingSenderId: "483424450360"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Expose to window for global access
window.firebaseAuth = auth;
window.firebaseDb = db;
window.googleAuthProvider = provider;

window.signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

window.logoutFirebase = () => signOut(auth);

window.syncSettingsToCloud = async (settings) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "user_settings", auth.currentUser.uid);
    try {
        await setDoc(userRef, {
            ...settings,
            userId: auth.currentUser.uid,
            updatedAt: serverTimestamp()
        }, { merge: true });
        console.log("Settings synced to cloud");
    } catch (error) {
        console.error("Sync failed:", error);
    }
};

window.loadSettingsFromCloud = async () => {
    if (!auth.currentUser) return null;
    const userRef = doc(db, "user_settings", auth.currentUser.uid);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (error) {
        console.error("Load failed:", error);
    }
    return null;
};

window.syncEverything = async () => {
    if (!auth.currentUser) return;
    
    console.log("☁️ Syncing everything to cloud...");
    const settings = {
        userId: auth.currentUser.uid,
        updatedAt: serverTimestamp()
    };
    
    // 1. Get Icons from LocalStorage
    const customIcons = localStorage.getItem("custom_icons");
    if (customIcons) settings.custom_icons = JSON.parse(customIcons);
    
    // 2. Get Wallpapers from IndexedDB (OriginDB)
    if (typeof window.getData === "function") {
        await new Promise((resolve) => {
            window.getData("home_wallpaper", (home) => {
                if (home) settings.home_wallpaper = home;
                window.getData("lock_wallpaper", (lock) => {
                    if (lock) settings.lock_wallpaper = lock;
                    resolve();
                });
            });
        });
    }

    const userRef = doc(db, "user_settings", auth.currentUser.uid);
    try {
        await setDoc(userRef, settings, { merge: true });
        console.log("✅ Sync complete");
    } catch (error) {
        console.error("❌ Sync failed:", error);
    }
};

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("👤 User logged in:", user.email);
        const cloudSettings = await window.loadSettingsFromCloud();
        if (cloudSettings) {
            window.applyCloudSettings(cloudSettings);
        }
    } else {
        console.log("👤 User logged out");
    }
});

window.applyCloudSettings = (settings) => {
    window.isSyncingFromCloud = true;
    console.log("📦 Applying cloud settings...");
    
    // Merge custom icons instead of simple overwrite
    if (settings.custom_icons) {
        const localIcons = JSON.parse(localStorage.getItem("custom_icons") || "{}");
        const mergedIcons = { ...localIcons, ...settings.custom_icons };
        localStorage.setItem("custom_icons", JSON.stringify(mergedIcons));
    }
    
    const promises = [];
    
    if (settings.home_wallpaper && typeof setData === "function") {
        promises.push(new Promise(resolve => setData("home_wallpaper", settings.home_wallpaper, resolve)));
    }
    if (settings.lock_wallpaper && typeof setData === "function") {
        promises.push(new Promise(resolve => setData("lock_wallpaper", settings.lock_wallpaper, resolve)));
    }
    if (settings.wallpaper_aod2_image && typeof setData === "function") {
        promises.push(new Promise(resolve => setData("wallpaper_aod2_image", settings.wallpaper_aod2_image, resolve)));
    }
    
    Promise.all(promises).then(() => {
        // Refresh UI
        if (typeof applyCustomIcons === "function") applyCustomIcons(true);
        if (typeof window.applyWallpapers === "function") window.applyWallpapers();
        
        setTimeout(() => {
            window.isSyncingFromCloud = false;
            if (typeof tb_system === "function") tb_system("تمت مزامنة الإعدادات من السحابة");
        }, 1500);
    });
};
