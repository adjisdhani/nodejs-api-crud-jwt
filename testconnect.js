require('dotenv').config(); // Load file .env
const db = require('./config/db'); // Import konfigurasi pool

// Fungsi untuk mengecek koneksi
async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1'); // Query sederhana
    console.log('Koneksi ke database berhasil:', rows);
  } catch (error) {
    console.error('Koneksi ke database gagal:', error.message);
  } finally {
    process.exit(); // Keluar dari proses
  }
}

testConnection();