const numbers = [1, 4, 7, 12, 19, 20];

function printEvens(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            console.log("找到偶數: " + arr[i]);
        }
    }
}
printEvens(numbers);
