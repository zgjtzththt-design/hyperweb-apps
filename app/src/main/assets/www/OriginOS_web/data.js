let db = null;

// ✅ Ghi dữ liệu
function setData(id, content, callback) {
  const tx = db.transaction("user_data", "readwrite");
  const store = tx.objectStore("user_data");
  const req = store.put({ id, content });
  
  req.onsuccess = () => {
    if (callback) callback();
    
    // Auto-sync to Firebase if logged in AND not currently syncing from cloud
    if (window.syncEverything && !window.isSyncingFromCloud) {
        window.syncEverything();
    }
  };
  
  req.onerror = () => {
    console.error("Error saving data to IndexedDB:", req.error);
    if (callback) callback(req.error);
  };
}

function removeData(id) {
  const tx = db.transaction("user_data", "readwrite");
  const store = tx.objectStore("user_data");
  store.delete(id);
  tx.oncomplete = () => console.log("🗑️ Đã xóa:", id);
}

// ✅ Xóa toàn bộ
function removeAllData() {
  const tx = db.transaction("user_data", "readwrite");
  const store = tx.objectStore("user_data");
  const clearReq = store.clear();

  clearReq.onsuccess = () => console.log("🧹 Đã xóa toàn bộ dữ liệu");
  clearReq.onerror = () => console.error("❌ Lỗi khi xóa toàn bộ");
}

// Hàm khởi tạo và mở DB

// Lưu dữ liệu: setData(key, value)
// Đọc dữ liệu: getData(key, callback)
// Xóa một mục: removeData(key)
// Xóa tất cả:  removeAllData()

function initOriginDB(callbackWhenReady) {
  const request = indexedDB.open("OriginDB", 1);

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("user_data")) {
      db.createObjectStore("user_data", { keyPath: "id" });
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    if (typeof callbackWhenReady === "function") callbackWhenReady();
  };

  request.onerror = function (event) {
    console.error("❌ Lỗi IndexedDB:", event.target.error);
  };
}

function getData(id, callback) {
  if (!db) {
    console.warn("⚠️ DB chưa sẵn sàng.");
    callback(null);
    return;
  }

  const tx = db.transaction("user_data", "readonly");
  const store = tx.objectStore("user_data");
  const req = store.get(id);

  req.onsuccess = () => callback(req.result ? req.result.content : null);
  req.onerror = () => {
    console.error("❌ Lỗi khi đọc:", id);
    callback(null);
  };
}
