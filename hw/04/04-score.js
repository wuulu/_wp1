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
