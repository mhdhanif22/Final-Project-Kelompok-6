# 🌟 Aplikasi API Node.js Multifungsi 🚀

<img src="https://talenthub.kemnaker.go.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.c19b844f.png&w=128&q=75" alt="TalentHub Logo" width="100" />

Aplikasi ini menyediakan berbagai **fitur kalkulator finansial**, **layanan informasi**, dan **sistem pemesanan tiket bioskop**. Dibangun menggunakan **Node.js** dan **Express.js**, aplikasi ini dilengkapi dengan beberapa endpoint API yang dirancang untuk berbagai fungsi interaktif.

## 🎯 Fitur Utama

1. 💰 **Kalkulator Investasi**: Proyeksi keuntungan investasi.
2. 🛡️ **Kalkulator Dana Darurat**: Menghitung kebutuhan dana darurat.
3. 📈 **Kalkulator Untung/Rugi Saham**: Analisis keuntungan atau kerugian transaksi saham.
4. ⚡ **Informasi Tagihan Listrik Prabayar**: Dapatkan informasi tagihan listrik dengan cepat.
5. 🎟️ **Sistem Pemesanan Tiket Bioskop**: Pesan tiket bioskop dengan mudah melalui API.

## 📑 Endpoint API

### 1. 🏠 **Halaman Utama**
- **GET /** : Menampilkan halaman utama dengan informasi kelompok.

### 2. 📊 **Kalkulator**
- **GET /calculate** : Mendapatkan daftar kalkulator yang tersedia.
- **POST /calculate/investment** : Menghitung proyeksi investasi.
- **POST /calculate/emergencyfund** : Menghitung dana darurat.
- **POST /profit-loss** : Menghitung untung/rugi transaksi saham.

### 3. ⚡ **Tagihan Listrik Prabayar**
- **GET /tagihan-listrik-prabayar** : Menampilkan informasi tagihan listrik prabayar.

### 4. 🎬 **Bioskop**
- **GET /bioskop** : Selamat datang di CGV Plaza Shibuya.
- **GET /bioskop/films** : Mendapatkan daftar film yang tersedia.
- **GET /bioskop/auditorium** : Mendapatkan daftar auditorium.
- **GET /bioskop/days** : Mendapatkan daftar hari tayang.
- **GET /bioskop/times** : Mendapatkan jadwal waktu tayang.
- **GET /bioskop/seat-type** : Mendapatkan daftar tipe kursi.
- **POST /bioskop/book** : Memesan tiket bioskop.

## 💻 Cara Menjalankan

1. Pastikan **Node.js** telah terinstal di sistem Anda.
2. Clone repositori ini:
    ```bash
    git clone https://github.com/mhdhanif22/Final-Project-Kelompok-6.git
    ```
3. Buka terminal dan navigasikan ke direktori proyek:
    ```bash
    cd 
    ```
4. Instal dependensi proyek dengan perintah:
    ```bash
    npm install
    ```
5. Jalankan aplikasi dalam mode development:
    ```bash
    npm run dev
    ```
6. Akses aplikasi melalui `http://localhost:3000` (atau port yang ditentukan dalam konfigurasi).

## 🔧 Pengembangan

Aplikasi ini berjalan dalam mode development menggunakan `npm run dev`, yang mendukung **hot-reloading** untuk mempercepat proses pengembangan.

## 👥 Tim Pengembang: Kelompok 6 Wellington

Proyek ini dikembangkan oleh tim kami sebagai bagian dari program TalentHub:

| No. | Nama Anggota                |
|-----|---------------------------|
| 1.  | Alia Jennifer Kim Ritzky  |
| 2.  | Erfia Nadia Safari        |
| 3.  | Movida Tantra Putra Mala  |
| 4.  | Ni Nyoman Bella Nindia    |
| 5.  | Muhammad Hanif            |
| 6.  | Abd. Rahman B. Tasrid     |
| 7.  | Nuloh                     |
| 8.  | Mila Widya Wardhani       |

Proyek ini merupakan hasil kolaborasi tim **Kelompok 6 Wellington** dalam rangka menyelesaikan pelatihan di **TalentHub**. 💼✨

---

