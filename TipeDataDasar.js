// 1. String (teks)
let namaDepan = 'Muh.';
let namaBelakang = "As'ad Habib";
let namaLengkap = `${namaDepan} ${namaBelakang}`; // template literal
// 2. Number (angka)
let umur = 22;
let tinggi = 170.5;
let negatif = -10;
// 3. Boolean (true/false)
let sudahMenikah = false;
let mahasiswaAktif = true;
// 4. Undefined (belum didefinisikan)
let alamat;
console.log(alamat); // undefined
// 5. Null (kosong dengan sengaja)
let nomorTelepon = null;
// 6. Array (daftar)
let hobi = ["membaca", "olahraga", "coding"];
// 7. Object (objek)
let mahasiswa = {
    nama: "Sari",
    umur: 21,
    jurusan: "Informatika"
};
// Cek tipe data
console.log(typeof namaDepan); // string
console.log(typeof umur); // number
console.log(typeof sudahMenikah); // boolean