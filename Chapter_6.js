// For Loop
// Mencetak angka 1-5
for (let i = 1; i <= 5; i++) {
    console.log("Angka:", i);
}
// Mencetak angka genap 2-10
for (let i = 2; i <= 10; i += 2) {
    console.log("Genap:", i);
}

// While Loop
let counter = 1;
while (counter <= 5) {
    console.log("Counter:", counter);
    counter++;
}
// Contoh praktis: menghitung mundur
let detik = 5;
console.log("Menghitung mundur:");
while (detik > 0) {
    console.log(detik);
    detik--;
}
console.log("Waktu habis!");

// Do-While Loop
let pilihan;
do {
    console.log("Menu:");
    console.log("1. Deposit");
    console.log("2. Withdraw");
    console.log("3. Exit");
  // Simulasi input (dalam praktik bisa pakai readline)
  pilihan = 3; // akan keluar setelah 1 kali
} while (pilihan !== 3);

// For-In dan For-Of
// For-in untuk object
let mahasiswa = {
    nama: "Budi",
    umur: 22,
    jurusan: "Informatika"
};
for (let key in mahasiswa) {
    console.log(key + ":", mahasiswa[key]);
}
// For-of untuk array
let hobi = ["membaca", "coding", "olahraga"];
for (let item of hobi) {
    console.log("Hobi:", item);
}