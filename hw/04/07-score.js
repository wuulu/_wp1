let jsonString = '{"brand": "Toyota", "model": "RAV4", "year": 2024}';
let carObj = JSON.parse(jsonString);

console.log("車子品牌:", carObj.brand);
console.log("年份:", carObj.year);
