// --- Array (Daftar) ---
// Membuat array
let buah = ["apel", "jeruk", "mangga"];
let angka = [1, 2, 3, 4, 5];
let campuran = ["teks", 123, true, null];
// Mengakses elemen
console.log(buah[0]); // apel
console.log(buah[2]); // mangga
// Properti dan method array
console.log(buah.length); // 3
// Menambah elemen
buah.push("pisang"); // tambah di akhir
buah.unshift("anggur"); // tambah di awal
// Menghapus elemen
buah.pop(); // hapus elemen terakhir
buah.shift(); // hapus elemen pertama
// Method array lainnya
console.log(buah.indexOf("jeruk")); // cari posisi
console.log(buah.includes("apel")); // cek keberadaan
// Loop array
buah.forEach((item, index) => {
    console.log(`${index}: ${item}`);
});

// --- Object (Objek) ---
// Membuat object
let mahasiswa = {
    nama: "Sari",
    umur: 21,
    jurusan: "Informatika",
    hobi: ["membaca", "coding"],
    alamat: {
        jalan: "Jl. Merdeka No. 123",
        kota: "Jakarta"
    }
};
// Mengakses properti
console.log(mahasiswa.nama); // Sari
console.log(mahasiswa["umur"]); // 21
console.log(mahasiswa.alamat.kota); // Jakarta
// Menambah/mengubah properti
mahasiswa.semester = 5;
mahasiswa.umur = 22;
// Menghapus properti
delete mahasiswa.semester;
// Method dalam object
let kalkulator = {
    tambah: function(a, b) {
        return a + b;
    },
    kali: (a, b) => a * b // arrow function
};
console.log(kalkulator.tambah(3, 4)); // 7
console.log(kalkulator.kali(3, 4)); // 12