// If Dasar
let nilai = 85;
if (nilai >= 80) {
    console.log("Selamat! Nilai Anda A");
}

// If-Else
let cuaca = "hujan";
if (cuaca === "cerah") {
    console.log("Hari ini cerah, cocok untuk jalan-jalan");
} else {
    console.log("Sebaiknya bawa payung");
}

// If-Else If-Else
//let
    nilai = 75;
if (nilai >= 85) {
    console.log("Grade: A");
} else if (nilai >= 70) {
    console.log("Grade: B");
} else if (nilai >= 60) {
    console.log("Grade: C");
} else if (nilai >= 50) {
    console.log("Grade: D");
} else {
    console.log("Grade: E");
}

// Switch Case
let hari = "senin";
switch (hari) {
    case "senin":
        console.log("Semangat memulai minggu!");
        break;
    case "jumat":
        console.log("Akhirnya Jumat!");
        break;
    case "sabtu":
    case "minggu":
        console.log("Weekend! Waktu istirahat");
        break;
    default:
        console.log("Hari biasa");
}

// Ternary Operator (Kondisi Singkat)
let umur = 18;
let status = umur >= 17 ? "Dewasa" : "Belum Dewasa";
console.log(status);