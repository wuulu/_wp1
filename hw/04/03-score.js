function multiplier(n) {
    console.log(`--- ${n} 的乘法表 ---`);
    for (let i = 1; i <= 9; i++) {
        console.log(`${n} x ${i} = ${n * i}`);
    }
}
multiplier(7);
