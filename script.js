// Example area codes, you can expand this with real NANPA data
const areaCodes = [
    { code: "806", city: "Amarillo/Lubbock, TX" },
    { code: "214", city: "Dallas, TX" },
    { code: "305", city: "Miami, FL" },
    // ... add more or use area_codes.json
];

function randomPrefix() {
    // NXX: first digit 2-9, next two digits 0-9
    return (
        String(Math.floor(Math.random() * 8 + 2)) +
        String(Math.floor(Math.random() * 10)) +
        String(Math.floor(Math.random() * 10))
    );
}

function randomLine() {
    // 0001–9999, avoid 0000
    return String(Math.floor(Math.random() * 9999 + 1)).padStart(4, "0");
}

function generateNumbers(areaCode, prefix, limit) {
    const numbers = new Set();
    while (numbers.size < limit) {
        let thisPrefix = prefix || randomPrefix();
        let line = randomLine();
        numbers.add(`+1${areaCode}${thisPrefix}${line}`);
    }
    return Array.from(numbers);
}

// Random name generator (male/female)
const firstNames = ["John", "Michael", "David", "Ashley", "Jessica", "Emily", "Sarah", "Olivia", "Emma", "Sophia", "Ava", "Mia", "Abigail", "Charlotte", "Madison", "Ella", "Grace", "Chloe", "Lily"];
const lastNames = ["Smith", "Johnson", "Brown", "Lee", "Davis", "Martinez", "Taylor", "Thomas", "White", "Harris", "Lewis", "Young", "Hall", "Allen", "Wright", "Hill", "Green", "Adams", "Baker"];

function randomName() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
}

// CSV Export
function downloadCSV(numbers) {
    let csv = "Name,Phone\n";
    numbers.forEach(num => {
        csv += `${randomName()},${num}\n`;
    });
    const blob = new Blob([csv], {type: "text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
}

// vCard Export
function downloadVCard(numbers) {
    let vcard = "";
    numbers.forEach((num, idx) => {
        vcard += `BEGIN:VCARD
VERSION:3.0
FN:${randomName()}
TEL;TYPE=CELL:${num}
END:VCARD
`;
    });
    const blob = new Blob([vcard], {type: "text/vcard"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.vcf";
    a.click();
}
