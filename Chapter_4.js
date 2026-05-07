// Operator Aritmatika
let a = 10;
let b = 3;
console.log("Penjumlahan:", a + b);       // 13
console.log("Pengurangan:", a - b);       // 7
console.log("Perkalian:", a * b);         // 30
console.log("Pembagian:", a / b);         // 3.333...
console.log("Sisa bagi:", a % b);         // 1
console.log("Pangkat:", a ** b);          // 1000
// Increment dan Decrement
let counter = 5;
counter++; // sama dengan counter = counter + 1
console.log(counter); // 6
counter--; // sama dengan counter = counter - 1
console.log(counter); // 5

// Operator Perbandingan
let x = 5;
let y = "5";
console.log(x == y); // true (hanya nilai)
console.log(x === y); // false (nilai dan tipe data)
console.log(x != y); // false
console.log(x !== y); // true
console.log(x > 3); // true
console.log(x < 10); // true
console.log(x >= 5); // true
console.log(x <= 4); // false

// Operator Logika
let benar = true;
let salah = false;
console.log(benar && salah); // false (AND)
console.log(benar || salah); // true (OR)
console.log(!benar); // false (NOT)
// Contoh praktis
let umur = 20;
let punyaKTP = true;
let bisaDaftar = umur >= 17 && punyaKTP;
console.log("Bisa daftar:", bisaDaftar);