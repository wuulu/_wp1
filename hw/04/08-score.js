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
