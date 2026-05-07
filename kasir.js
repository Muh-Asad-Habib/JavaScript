const readlineSync = require('readline-sync');
const chalk = require('chalk');
const Table = require('cli-table3');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');
const { id } = require('date-fns/locale');

class Kasir {
    constructor() {
        // Daftar produk yang tersedia
        this.products = [
            { id: 1, nama: 'Kopi Susu', harga: 18000 },
            { id: 2, nama: 'Teh Melati', harga: 15000 },
            { id: 3, nama: 'Roti Coklat', harga: 10000 },
            { id: 4, nama: 'Donat Gula', harga: 8000 },
            { id: 5, nama: 'Air Mineral', harga: 5000 },
        ];
        this.keranjang = []; // Menyimpan item yang dibeli
    }

    // Menampilkan daftar produk dalam bentuk tabel
    tampilkanProduk() {
        const table = new Table({
            head: [chalk.blue('ID'), chalk.blue('Nama Produk'), chalk.blue('Harga')],
            colWidths: [5, 20, 15]
        });

        this.products.forEach(p => {
            table.push([p.id, p.nama, `Rp ${p.harga.toLocaleString('id-ID')}`]);
        });

        console.log('\n--- DAFTAR PRODUK TERSEDIA ---');
        console.log(table.toString());
    }

    // Menambahkan produk ke keranjang
    tambahKeKeranjang(idProduk, qty) {
        const produk = this.products.find(p => p.id === idProduk);
        if (!produk) {
            console.log(chalk.red('X ID Produk tidak ditemukan.'));
            return;
        }
        if (qty <= 0) {
            console.log(chalk.red('X Kuantitas harus lebih dari 0.'));
            return;
        }

        this.keranjang.push({
            id: produk.id,
            nama: produk.nama,
            harga: produk.harga,
            qty: qty,
            subtotal: produk.harga * qty
        });

        console.log(chalk.green(`✓ Berhasil menambahkan ${qty}x ${produk.nama} ke keranjang.`));
    }

    // Menghitung total belanja
    hitungTotal() {
        return this.keranjang.reduce((total, item) => total + item.subtotal, 0);
    }
    
    // Mencetak struk belanja
    cetakStruk(uangBayar) {
        if (this.keranjang.length === 0) {
            console.log(chalk.yellow('Keranjang masih kosong.'));
            return;
        }
        
        const totalBelanja = this.hitungTotal();
        if(uangBayar < totalBelanja) {
            console.log(chalk.red(`X Uang pembayaran kurang (Rp ${(totalBelanja - uangBayar).toLocaleString('id-ID')})`));
            return;
        }

        const table = new Table({
            head: [chalk.cyan('Qty'), chalk.cyan('Item'), chalk.cyan('Harga'), chalk.cyan('Subtotal')],
            colWidths: [5, 18, 14, 15]
        });
        
        this.keranjang.forEach(item => {
            table.push([
                `${item.qty}x`,
                item.nama,
                `@${item.harga.toLocaleString('id-ID')}`,
                `Rp ${item.subtotal.toLocaleString('id-ID')}`
            ]);
        });
        
        const PPN = totalBelanja * 0.11;
        const totalAkhir = totalBelanja + PPN;
        const kembalian = uangBayar - totalAkhir;

        console.log(chalk.green('\n=================================================='));
        console.log(chalk.green.bold('              STRUK PEMBAYARAN              '));
        console.log(chalk.green('=================================================='));
        console.log(`ID Transaksi : ${uuidv4()}`);
        console.log(`Tanggal      : ${format(new Date(), 'dd MMMM yyyy, HH:mm:ss', { locale: id })}`);
        console.log('--------------------------------------------------');
        console.log(table.toString());
        console.log('--------------------------------------------------');
        console.log(`Subtotal       : Rp ${totalBelanja.toLocaleString('id-ID')}`);
        console.log(`PPN (11%)      : Rp ${PPN.toLocaleString('id-ID')}`);
        console.log(chalk.bold(`TOTAL          : Rp ${totalAkhir.toLocaleString('id-ID')}`));
        console.log('--------------------------------------------------');
        console.log(`Bayar          : Rp ${uangBayar.toLocaleString('id-ID')}`);
        console.log(`Kembali        : Rp ${kembalian.toLocaleString('id-ID')}`);
        console.log(chalk.green('\n          Terima Kasih Telah Berbelanja!          '));
        console.log(chalk.green('=================================================='));
        
        // Reset keranjang setelah transaksi selesai
        this.keranjang = [];
        return true;
    }
}

function main() {
    const kasir = new Kasir();
    let selesai = false;

    console.log(chalk.yellow.bold('\nSelamat Datang di Aplikasi Kasir Sederhana!'));

    while (!selesai) {
        kasir.tampilkanProduk();
        let tambahLagi = true;
        while(tambahLagi){
            const idProduk = parseInt(readlineSync.question('Masukkan ID produk yang ingin dibeli: '));
            const qty = parseInt(readlineSync.question(`Jumlah ${idProduk ? kasir.products.find(p => p.id === idProduk)?.nama || '' : ''} yang dibeli: `));
            
            kasir.tambahKeKeranjang(idProduk, qty);

            tambahLagi = readlineSync.keyInYN(chalk.yellow('Tambah item lain?'));
        }

        if (kasir.keranjang.length > 0) {
            console.log(chalk.cyan.bold(`\nTotal Belanja Anda: Rp ${kasir.hitungTotal().toLocaleString('id-ID')}`));
            const uangBayar = parseInt(readlineSync.question('Masukkan jumlah uang pembayaran: ') || '0');
            
            const isSuccess = kasir.cetakStruk(uangBayar);
            if (isSuccess) {
                selesai = !readlineSync.keyInYN(chalk.yellow('\nMulai transaksi baru?'));
            }
        } else {
            selesai = !readlineSync.keyInYN(chalk.yellow('\nMulai transaksi baru?'));
        }
    }
    console.log(chalk.magenta('\nTerima kasih, sampai jumpa!'));
}

main();