let words = ["apple", "hi", "javascript", "code", "learning"];
let longWords = [];

for (let i = 0; i < words.length; i++) {
    if (words[i].length > 5) {
        longWords.push(words[i]);
    }
}
console.log("長單字有:", longWords);
