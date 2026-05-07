let angka = [1, 2, 3, 4, 5];

console.log(angka[0]); // Output: 1
console.log(angka[1]); // Output: 2
console.log(angka[2]); // Output: 3
console.log(angka[3]); // Output: 4
console.log(angka[4]); // Output: 5

angka.push(6); // Menambahkan angka 6 ke array
console.log(angka[5]); // Output: 6
console.log(angka); // Output: [1, 2, 3, 4, 5, 6]

angka.push(7, 8)   // Menambahkan angka 7 dan 8 ke array
console.log(angka[6]); // Output: 7
console.log(angka[7]); // Output: 8
console.log(angka); // Output: [1, 2, 3, 4, 5, 6, 7, 8]

let angkaYangDihapus = angka.pop(); // Menghapus angka terakhir (8)
console.log(angkaYangDihapus); // Output: 8
console.log(angka); // Output: [1, 2, 3, 4, 5, 6, 7]

console.log(angka); // Output: [1, 2, 3, 4, 5, 6, 7]
console.log(angka.length); // Output: 7 (jumlah elemen dalam array)

if (angka.length > 0) {
    console.log("Array tidak kosong");
}   else {
    console.log("Array kosong");
}   

let nama = ["Budi", "Siti", "Joko"];
console.log(nama); // Output: ["Budi", "Siti", "Joko
for (let i = 0; i < nama.length; i++) {
    console.log((i + 1 )+ "." + nama[i]);    
}

let total = 0;
for (let i = 0; i < angka.length; i++) {
    total += angka[i]; // Menjumlahkan semua elemen dalam array angka
}   
console.log("Total angka: " + total); // Output: Total angka: 28   

let rataRata = total / angka.length; // Menghitung rata-rata
console.log("Rata-rata angka: " + rataRata); // Output: Rata-rata angka: 4