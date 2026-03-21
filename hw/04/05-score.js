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
