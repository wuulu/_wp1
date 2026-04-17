function calculateTotal(cart, discountFunc) {
  const sum = cart.reduce((acc, curr) => acc + curr, 0);
  return discountFunc(sum);
}

const myCart = [100, 200, 300];
// 測試：總和後減 50 元
const finalPrice = calculateTotal(myCart, total => total - 50);

console.log(finalPrice); // 550 (600 - 50)