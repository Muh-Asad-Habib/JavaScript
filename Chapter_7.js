// Function Declaration
function sapa(nama) {
    return "Halo, " + nama + "!";
}
let pesan = sapa("As'ad");
console.log(pesan); // Halo, As'ad!

// Function Expression
const tambah = function(a, b) {
    return a + b;
};
console.log(tambah(5, 3)); // 8

// Arrow Function (ES6)
// Arrow function sederhana
const kali = (a, b) => a * b;
console.log(kali(4, 5)); // 20
// Arrow function dengan body
const cekGenap = (angka) => {
    if (angka % 2 === 0) {
        return `${angka} adalah genap`;
    } else {
        return `${angka} adalah ganjil`;
    }
};
console.log(cekGenap(7)); // 7 adalah ganjil

// Function dengan Parameter Default
function buatProfil(nama, umur = 20, jurusan = "Belum ditentukan") {
    return {
        nama: nama,
        umur: umur,
        jurusan: jurusan
    };
}
console.log(buatProfil("Ana"));
console.log(buatProfil("Budi", 22, "Informatika"));