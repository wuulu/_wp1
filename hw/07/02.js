const req = { body: { title: "JS教學", content: "內容在此", author: "Gemini" } };

// 使用解構賦值，一行從 req.body 提取屬性
const { title, content } = req.body;

console.log(title, content);