let apiResponse = '[{"name": "Alice", "age": 25}, {"name": "Bob", "age": 16}, {"name": "Charlie", "age": 30}]';
let users = JSON.parse(apiResponse);

console.log("成年用戶名單：");
for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 18) {
        console.log("- " + users[i].name);
    }
}
