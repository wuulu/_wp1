function fetchData(id, callback) {
  const result = { id: id, status: "success" };
  // 遵循 Error-First 慣例，第一個參數傳 null 代表無錯誤
  callback(null, result);
}

// 測試呼叫
fetchData(101, (err, data) => {
  if (err) return console.error(err);
  console.log("取得資料：", data);
});