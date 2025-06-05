class NotFoundPage {
  async render() {
    return `
      <div class="not-found-container">
        <div class="icon">🔍</div>
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
        <p>Alamat URL mungkin salah atau halaman tersebut telah dipindahkan.</p>
        <a href="#/" class="btn">Kembali ke Beranda</a>
      </div>
    `;
  }

  async afterRender() {
    // Tidak ada logika khusus yang diperlukan setelah render
  }
}

export default NotFoundPage;