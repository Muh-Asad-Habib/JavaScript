const readlineSync = require('readline-sync');
const chalk = require('chalk');
const gradient = require('gradient-string');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

// Definisikan konstanta untuk biaya dan limit
const BIAYA_ADMIN_TRANSFER = 2500;
const LIMIT_PENARIKAN_HARIAN = 10000000;


class Bank {
    constructor() {
        this.accounts = [];
        this.currentUser = null;
    }

    // Method untuk membuat akun baru
    createAccount(nama, pinAwal, saldoAwal) {
        const accountNumber = this.generateAccountNumber();
        const newAccount = {
            accountNumber: accountNumber,
            nama: nama,
            pin: pinAwal,
            saldo: saldoAwal,
            riwayat: [{
                tanggal: new Date().toLocaleDateString('id-ID'),
                jenis: 'Pembukaan Rekening',
                jumlah: saldoAwal,
                saldo: saldoAwal
            }],
            // [FITUR BARU] Tambahkan properti untuk limit penarikan
            totalPenarikanHarian: 0,
            tanggalTerakhirTarik: new Date().toLocaleDateString('id-ID')
        };
        this.accounts.push(newAccount);
        console.log(chalk.green('\n✓ Akun berhasil dibuat!'));
        console.log(chalk.blue(`  Nomor Rekening: ${accountNumber}`));
        console.log(chalk.blue(`  Nama: ${nama}`));
        console.log(chalk.blue(`  Saldo Awal: Rp ${saldoAwal.toLocaleString('id-ID')}`));
        return newAccount;
    }

    // Generate nomor rekening random
    generateAccountNumber() {
        return Math.floor(Math.random() * 9000000000) + 1000000000;
    }

    // Method untuk login
    login(accountNumber, pin) {
        const account = this.accounts.find(acc =>
            acc.accountNumber === parseInt(accountNumber) && acc.pin === pin
        );
        if (account) {
            this.currentUser = account;
            return true;
        }
        return false;
    }

    // Method untuk deposit (setor uang)
    deposit(jumlah) {
        if (!this.currentUser) {
            console.log(chalk.red('Silakan login terlebih dahulu'));
            return false;
        }
        if (jumlah <= 0) {
            console.log(chalk.red('X Jumlah deposit harus lebih besar dari 0'));
            return false;
        }
        this.currentUser.saldo += jumlah;
        this.currentUser.riwayat.push({
            tanggal: new Date().toLocaleDateString('id-ID'),
            jenis: 'Deposit',
            jumlah: jumlah,
            saldo: this.currentUser.saldo
        });
        console.log(chalk.green('\n✓ Deposit berhasil!'));
        console.log(chalk.blue(`  Jumlah Deposit: Rp ${jumlah.toLocaleString('id-ID')}`));
        console.log(chalk.blue(`  Saldo Sekarang: Rp ${this.currentUser.saldo.toLocaleString('id-ID')}`));
        return true;
    }

    // Method untuk withdraw (tarik uang)
    withdraw(jumlah) {
        if (!this.currentUser) {
            console.log(chalk.red(' Silakan login terlebih dahulu'));
            return false;
        }
        if (jumlah <= 0) {
            console.log(chalk.red('X Jumlah penarikan harus lebih besar dari 0'));
            return false;
        }

        // [FITUR BARU] Logika untuk Limit Penarikan Harian
        const hariIni = new Date().toLocaleDateString('id-ID');
        if (this.currentUser.tanggalTerakhirTarik !== hariIni) {
            this.currentUser.totalPenarikanHarian = 0; // Reset jika hari baru
            this.currentUser.tanggalTerakhirTarik = hariIni;
        }
        if (this.currentUser.totalPenarikanHarian + jumlah > LIMIT_PENARIKAN_HARIAN) {
            console.log(chalk.red(`X Gagal! Anda akan melebihi limit penarikan harian (Rp ${LIMIT_PENARIKAN_HARIAN.toLocaleString('id-ID')})`));
            console.log(chalk.yellow(`  Sisa limit hari ini: Rp ${(LIMIT_PENARIKAN_HARIAN - this.currentUser.totalPenarikanHarian).toLocaleString('id-ID')}`));
            return false;
        }


        if (jumlah > this.currentUser.saldo) {
            console.log(chalk.red('X Saldo tidak mencukupi'));
            console.log(chalk.yellow(`  Saldo Anda: Rp ${this.currentUser.saldo.toLocaleString('id-ID')}`));
            return false;
        }

        this.currentUser.saldo -= jumlah;
        this.currentUser.totalPenarikanHarian += jumlah; // Tambahkan ke total penarikan harian

        this.currentUser.riwayat.push({
            tanggal: new Date().toLocaleDateString('id-ID'),
            jenis: 'Penarikan',
            jumlah: jumlah,
            saldo: this.currentUser.saldo
        });

        console.log(chalk.green('\n✓ Penarikan berhasil!'));
        console.log(chalk.blue(`  Jumlah Penarikan: Rp ${jumlah.toLocaleString('id-ID')}`));
        console.log(chalk.blue(`  Saldo Sekarang: Rp ${this.currentUser.saldo.toLocaleString('id-ID')}`));
        return true;
    }

    // Method untuk cek saldo
    checkBalance() {
        if (!this.currentUser) {
            console.log(chalk.red(' Silakan login terlebih dahulu'));
            return;
        }
        console.log(chalk.green('\n--- INFORMASI SALDO ---'));
        console.log(chalk.blue(`  Nama: ${this.currentUser.nama}`));
        console.log(chalk.blue(`  No. Rekening: ${this.currentUser.accountNumber}`));
        console.log(chalk.blue(`  Saldo: Rp ${this.currentUser.saldo.toLocaleString('id-ID')}`));
    }

    // Method untuk lihat riwayat transaksi
    showHistory() {
        if (!this.currentUser) {
            console.log(chalk.red('Silakan login terlebih dahulu'));
            return;
        }
        console.log(chalk.green('\n--- RIWAYAT TRANSAKSI ---'));
        console.log(chalk.gray('='.repeat(60)));
        if (this.currentUser.riwayat.length === 0) {
            console.log(chalk.yellow('Belum ada transaksi'));
            return;
        }
        this.currentUser.riwayat.forEach((transaksi, index) => {
            let warna = transaksi.jenis === 'Deposit' || transaksi.jenis.includes('Masuk') ? chalk.green :
                transaksi.jenis === 'Penarikan' || transaksi.jenis.includes('Keluar') ? chalk.red : chalk.blue;
            console.log(`${index + 1}. ${transaksi.tanggal}`);
            console.log(warna(`  ${transaksi.jenis}: Rp ${transaksi.jumlah.toLocaleString('id-ID')}`));
            if (transaksi.jenis.includes('Biaya Admin')) {
                console.log(chalk.red(`  Biaya Admin: Rp ${transaksi.biayaAdmin.toLocaleString('id-ID')}`));
            }
            console.log(`  Saldo: Rp ${transaksi.saldo.toLocaleString('id-ID')}`);
            console.log("");
        });
    }

    // Method untuk transfer
    transfer(nomorTujuan, jumlah) {
        if (!this.currentUser) {
            console.log(chalk.red(' Silakan login terlebih dahulu'));
            return false;
        }
        if (jumlah <= 0) {
            console.log(chalk.red('X Jumlah transfer harus lebih besar dari 0'));
            return false;
        }

        // [FITUR BARU] Logika untuk Biaya Admin
        const totalDebit = jumlah + BIAYA_ADMIN_TRANSFER;
        if (totalDebit > this.currentUser.saldo) {
            console.log(chalk.red('X Saldo tidak mencukupi untuk transfer dan biaya admin.'));
            console.log(chalk.yellow(`  Dibutuhkan: Rp ${totalDebit.toLocaleString('id-ID')} (Transfer + Biaya Admin)`));
            return false;
        }

        const targetAccount = this.accounts.find(acc =>
            acc.accountNumber === parseInt(nomorTujuan)
        );
        if (!targetAccount) {
            console.log(chalk.red('X Nomor rekening tujuan tidak ditemukan'));
            return false;
        }
        if (targetAccount.accountNumber === this.currentUser.accountNumber) {
            console.log(chalk.red('X Tidak bisa transfer ke rekening sendiri'));
            return false;
        }

        // Kurangi saldo pengirim (transfer + biaya admin)
        this.currentUser.saldo -= totalDebit;
        this.currentUser.riwayat.push({
            tanggal: new Date().toLocaleDateString('id-ID'),
            jenis: 'Transfer Keluar (Biaya Admin)',
            jumlah: jumlah,
            biayaAdmin: BIAYA_ADMIN_TRANSFER,
            saldo: this.currentUser.saldo,
            tujuan: targetAccount.nama
        });
        // Tambah saldo penerima
        targetAccount.saldo += jumlah;
        targetAccount.riwayat.push({
            tanggal: new Date().toLocaleDateString('id-ID'),
            jenis: 'Transfer Masuk',
            jumlah: jumlah,
            saldo: targetAccount.saldo,
            pengirim: this.currentUser.nama
        });

        console.log(chalk.green('\n✓ Transfer berhasil!'));
        console.log(chalk.blue(`  Ke: ${targetAccount.nama}`));
        console.log(chalk.blue(`  Jumlah: Rp ${jumlah.toLocaleString('id-ID')}`));
        console.log(chalk.red(`  Biaya Admin: Rp ${BIAYA_ADMIN_TRANSFER.toLocaleString('id-ID')}`));
        console.log(chalk.blue(`  Saldo Anda: Rp ${this.currentUser.saldo.toLocaleString('id-ID')}`));
        return true;
    }

    // [FITUR BARU] Method untuk memberikan bunga (simulasi)
    berikanBunga(persen) {
        console.log(chalk.magenta(`\nProses pemberian bunga sebesar ${persen}%...`));
        this.accounts.forEach(acc => {
            const bunga = Math.floor(acc.saldo * (persen / 100));
            if (bunga > 0) {
                acc.saldo += bunga;
                acc.riwayat.push({
                    tanggal: new Date().toLocaleDateString('id-ID'),
                    jenis: 'Bunga Deposit',
                    jumlah: bunga,
                    saldo: acc.saldo,
                });
            }
        });
        console.log(chalk.green('✓ Proses selesai.'));
    }

    // [FITUR BARU & TUGAS 3] Method untuk export riwayat ke CSV
    async exportHistoryToCSV() {
    if (!this.currentUser) {
        console.log(chalk.red(' Silakan login terlebih dahulu'));
        return;
    }
    if (this.currentUser.riwayat.length === 0) {
        console.log(chalk.yellow('Tidak ada riwayat untuk diekspor.'));
        return;
    }

    const path = `./riwayat_${this.currentUser.accountNumber}.csv`;
    const csvWriter = createCsvWriter({
        path: path,
        // [TAMBAHAN] Menambahkan kolom-kolom lain agar lebih lengkap
        header: [
            { id: 'tanggal', title: 'TANGGAL' },
            { id: 'jenis', title: 'JENIS TRANSAKSI' },
            { id: 'jumlah', title: 'JUMLAH' },
            { id: 'biayaAdmin', title: 'BIAYA ADMIN' },
            { id: 'pengirim', title: 'PENGIRIM' },
            { id: 'tujuan', title: 'TUJUAN' },
            { id: 'saldo', title: 'SALDO AKHIR' },
        ]
    });

    // [PERBAIKAN] Gunakan try-catch dan await untuk memastikan file selesai ditulis
    // sebelum program melanjutkan eksekusi.
    try {
        await csvWriter.writeRecords(this.currentUser.riwayat);
        console.log(chalk.green(`\n✓ Riwayat transaksi berhasil diekspor ke: ${path}`));
    } catch (err) {
        console.error(chalk.red('X Terjadi error saat menulis file CSV:', err));
    }
}


    // Method untuk logout
    logout() {
        if (this.currentUser) {
            console.log(chalk.yellow(`\n👋 Sampai jumpa, ${this.currentUser.nama}!`));
            this.currentUser = null;
        }
    }
}

// Function untuk menampilkan menu utama
function showMainMenu() {
    console.log(chalk.cyan("\n==========================="));
    console.log("========= BANK ABC =========");
    console.log('1. Buat Akun Baru');
    console.log('2. Login');
    console.log('3. Keluar');
    console.log(chalk.cyan('==========================='));
}

// Function untuk menampilkan menu setelah login
function showUserMenu() {
    console.log(chalk.green("\n======== MENU BANKING ========"));
    console.log('1. Cek Saldo');
    console.log('2. Deposit (Setor)');
    console.log('3. Withdraw (Tarik)');
    console.log('4. Transfer');
    console.log('5. Riwayat Transaksi');
    console.log('6. Export Riwayat (CSV)'); // Opsi baru
    console.log('7. Logout'); // No urut disesuaikan
    console.log(chalk.green('============================'));
}

// Function utama aplikasi
function main() {
    const bank = new Bank();
    let running = true;
    console.log(gradient.rainbow('\n🎉 Selamat datang di Bank ABC!'));

    while (running) {
        if (!bank.currentUser) {
            showMainMenu();
            const pilihan = readlineSync.question('\nPilih menu (1-3, atau 99 untuk Bunga): ');
            switch (pilihan) {
                // case 1-3 tidak berubah
                case '1':
                    console.log(chalk.blue("\n=== BUAT AKUN BARU ==="));
                    const nama = readlineSync.question('Masukkan nama lengkap: ');
                    const pin = readlineSync.question('Buat PIN (4 digit): ', {
                        hideEchoBack: true, mask: '*'
                    });
                    if (pin.length !== 4 || isNaN(pin)) {
                        console.log(chalk.red('X PIN harus 4 digit angka'));
                        break;
                    }
                    const saldoAwal = parseInt(readlineSync.question('Deposit awal (min 50000): ') || '0');
                    if (saldoAwal < 50000) {
                        console.log(chalk.red('X Deposit awal minimal Rp 50.000'));
                        break;
                    }
                    bank.createAccount(nama, pin, saldoAwal);
                    break;
                case '2':
                    console.log(chalk.blue('\n=== LOGIN ==='));
                    const accountNumber = readlineSync.question('Nomor Rekening: ');
                    const loginPin = readlineSync.question('PIN: ', {
                        hideEchoBack: true, mask: '*'
                    });
                    if (bank.login(accountNumber, loginPin)) {
                        console.log(chalk.green(`\n✓ Login berhasil! Selamat datang, ${bank.currentUser.nama}`));
                    } else {
                        console.log(chalk.red('X Nomor rekening atau PIN salah'));
                    }
                    break;
                case '3':
                    console.log(chalk.yellow('\nTerima kasih telah menggunakan Bank ABC!'));
                    running = false;
                    break;
                // Opsi tersembunyi untuk simulasi bunga
                case '99':
                    const persen = parseFloat(readlineSync.question('Masukkan persentase bunga (misal: 0.5): ') || '0');
                    bank.berikanBunga(persen);
                    break;
                default:
                    console.log(chalk.red('X Pilihan tidak valid'));
            }
        } else {
            showUserMenu();
            const pilihan = readlineSync.question('\nPilih menu (1-7): '); // Disesuaikan
            switch (pilihan) {
                case '1':
                    bank.checkBalance();
                    break;
                case '2':
                    const jumlahDeposit = parseInt(readlineSync.question('Jumlah deposit: ') || '0');
                    bank.deposit(jumlahDeposit);
                    break;
                case '3':
                    const jumlahWithdraw = parseInt(readlineSync.question('Jumlah penarikan: ') || '0');
                    bank.withdraw(jumlahWithdraw);
                    break;
                case '4':
                    const nomorTujuan = readlineSync.question('Nomor rekening tujuan: ');
                    const jumlahTransfer = parseInt(readlineSync.question('Jumlah transfer: ') || '0');
                    bank.transfer(nomorTujuan, jumlahTransfer);
                    break;
                case '5':
                    bank.showHistory();
                    break;
                case '6': // Opsi baru
                    bank.exportHistoryToCSV();
                    break;
                case '7': // Opsi lama di nomor baru
                    bank.logout();
                    break;
                default:
                    console.log(chalk.red('X Pilihan tidak valid'));
            }
        }
        if (running) {
            readlineSync.question(chalk.gray('\nTekan Enter untuk melanjutkan...'));
            console.clear();
        }
    }
}

if (require.main === module) {
    main();
}

module.exports = Bank;