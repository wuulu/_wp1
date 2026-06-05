function fakeGet(sql, params, callback) {
  // 模擬資料庫延遲或查詢過程，直接回傳預設物件
  callback(null, { title: "Fake Title" });
}

// 測試呼叫
fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
  console.log("查詢結果標題：", row.title);
});