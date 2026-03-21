## 習題4

ai 問答 --https://gemini.google.com/share/a301ac01cad7

## 我的測試結果
```
PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 01-score.js
找到偶數: 4
找到偶數: 12
找到偶數: 20

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 02-score.js
10...
9...
8...
7...
6...
5...
4...
3...
2...
1...
發射！

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 03-score.js
--- 7 的乘法表 ---
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 04-score.js
購物車總金額為: $200

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 05-score.js
小明 的成績是 不及格

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 06-score.js
長單字有: [ 'javascript', 'learning' ]

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 07-score.js
車子品牌: Toyota
年份: 2024

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 08-score.js
李華的電話: 0988-777-666
張三的電話: 查無此人

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 09-score.js
1
22
333
4444

PS C:\Users\yulu9\OneDrive\Desktop\vscode\_wp1\hw\04> node 10-score.js
成年用戶名單：
- Alice
- Charlie


```

## 摘要
###好的，這是一份完整的清單。我將每一題的**程式碼**與執行後在控制台（Console）看到的**測試結果**整理在一起，方便你對照。

---

### 1. 偶數探測器
```javascript
const numbers = [1, 4, 7, 12, 19, 20];

function printEvens(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            console.log("找到偶數: " + arr[i]);
        }
    }
}
printEvens(numbers);
```
**測試結果：**
> 找到偶數: 4
> 找到偶數: 12
> 找到偶數: 20

---

### 2. 倒數計時器
```javascript
let count = 10;
while (count > 0) {
    console.log(count + "...");
    count--;
}
console.log("發射！");
```
**測試結果：**
> 10...
> 9...
> 8...
> 7...
> 6...
> 5...
> 4...
> 3...
> 2...
> 1...
> 發射！

---

### 3. 乘法表生成器
```javascript
function multiplier(n) {
    console.log(`--- ${n} 的乘法表 ---`);
    for (let i = 1; i <= 9; i++) {
        console.log(`${n} x ${i} = ${n * i}`);
    }
}
multiplier(7);
```
**測試結果：**
> --- 7 的乘法表 ---
> 7 x 1 = 7
> 7 x 2 = 14
> 7 x 3 = 21
> 7 x 4 = 28
> 7 x 5 = 35
> 7 x 6 = 42
> 7 x 7 = 49
> 7 x 8 = 56
> 7 x 9 = 63

---

### 4. 購物清單總計
```javascript
let cart = [
    { name: "蘋果", price: 30 },
    { name: "香蕉", price: 20 },
    { name: "大西瓜", price: 150 }
];

let total = 0;
for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
}
console.log("購物車總金額為: $" + total);
```
**測試結果：**
> 購物車總金額為: $200

---

### 5. 學生資料庫
```javascript
let student = {
    name: "小明",
    score: 55,
    checkPass: function() {
        if (this.score >= 60) {
            return "及格";
        } else {
            return "不及格";
        }
    }
};
console.log(`${student.name} 的成績是 ${student.checkPass()}`);
```
**測試結果：**
> 小明 的成績是 不及格

---

### 6. 陣列過濾器
```javascript
let words = ["apple", "hi", "javascript", "code", "learning"];
let longWords = [];

for (let i = 0; i < words.length; i++) {
    if (words[i].length > 5) {
        longWords.push(words[i]);
    }
}
console.log("長單字有:", longWords);
```
**測試結果：**
> 長單字有: [ 'javascript', 'learning' ]

---

### 7. JSON 格式轉換練習
```javascript
let jsonString = '{"brand": "Toyota", "model": "RAV4", "year": 2024}';
let carObj = JSON.parse(jsonString);

console.log("車子品牌:", carObj.brand);
console.log("年份:", carObj.year);
```
**測試結果：**
> 車子品牌: Toyota
> 年份: 2024

---

### 8. 簡易聯絡簿
```javascript
let contacts = [
    { name: "王小明", phone: "0912-345-678" },
    { name: "李華", phone: "0988-777-666" }
];

function findContact(targetName) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name === targetName) {
            return contacts[i].phone;
        }
    }
    return "查無此人";
}

console.log("李華的電話: " + findContact("李華"));
console.log("張三的電話: " + findContact("張三"));
```
**測試結果：**
> 李華的電話: 0988-777-666
> 張三的電話: 查無此人

---

### 9. 數字塔
```javascript
for (let i = 1; i <= 4; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += i;
    }
    console.log(row);
}
```
**測試結果：**
> 1
> 22
> 333
> 4444

---

### 10. 模擬 API 資料處理器
```javascript
let apiResponse = '[{"name": "Alice", "age": 25}, {"name": "Bob", "age": 16}, {"name": "Charlie", "age": 30}]';
let users = JSON.parse(apiResponse);

console.log("成年用戶名單：");
for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 18) {
        console.log("- " + users[i].name);
    }
}
```
**測試結果：**
> 成年用戶名單：
> - Alice
> - Charlie

---



**這些練習涵蓋了開發中 80% 的常用語法。你想試試看把這些程式碼貼到瀏覽器的「開發者工具 (F12)」執行看看嗎？**