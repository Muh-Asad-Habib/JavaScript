// Import package
const readlineSync = require('readline-sync');
const chalk = require('chalk');
// Menggunakan readline-sync untuk input
let nama = readlineSync.question('Masukkan nama Anda: ');
// Menggunakan chalk untuk warna
console.log(chalk.green('Selamat datang, ' + nama + '!'));
console.log(chalk.red('Pesan error'));
console.log(chalk.blue.bold('Pesan penting'));