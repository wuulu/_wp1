const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';

// 將 JSON 字串轉為物件
const obj = JSON.parse(jsonStr);

// 列印 tags 陣列中的第二個元素 (索引為 1)
console.log(obj.tags[1]); // 輸出: node