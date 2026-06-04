function mathTool(num1, num2, action) {
  return action(num1, num2);
}

// 實作相加
console.log(mathTool(10, 5, (a, b) => a + b)); // 15
// 實作相減
console.log(mathTool(10, 5, (a, b) => a - b)); // 5