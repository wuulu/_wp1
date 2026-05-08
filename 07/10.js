function checkAdmin(role, callback) {
  if (role !== "admin") {
    return callback("Access Denied"); // 傳入錯誤訊息
  }
  callback(null, "Welcome"); // 第一個參數為 null，代表成功
}

// 測試情況一：非管理員
checkAdmin("user", (err, msg) => {
  if (err) {
    console.log("錯誤：", err);
  } else {
    console.log(msg);
  }
});

// 測試情況二：管理員
checkAdmin("admin", (err, msg) => {
  if (err) {
    console.log("錯誤：", err);
  } else {
    console.log(msg);
  }
});