const contents = [
  "Very long content here", 
  "Another Very long content here", 
  "3rd Very long content here"
];

// 以處理第一個字串為例
const rawText = contents[0];
const truncated = rawText.substring(0, 10) + "...";

console.log(truncated); // 輸出: Very long c...