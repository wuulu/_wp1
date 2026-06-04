const user = "Guest";

// 使用三元運算子進行判斷
const html = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;

console.log(html); // 輸出: <h1>Welcome, Guest</h1>