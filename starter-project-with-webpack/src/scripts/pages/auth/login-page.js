import { login } from '../../data/api';

class LoginPage {
  constructor() {
    this._initialUI();
  }

  _initialUI() {
    this.loginContainer = document.createElement('div');
    this.loginContainer.classList.add('login-container');
    this.loginContainer.innerHTML = `
      <div class="login-card">
        <div class="login-header">
          <h2>Masuk ke Dicoding Story</h2>
          <p>Bagikan cerita menarikmu bersama komunitas Dicoding</p>
        </div>
        <form id="loginForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Masukkan email Anda" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Masukkan password Anda" required>
            <div class="password-toggle">
              <input type="checkbox" id="showPassword">
              <label for="showPassword">Tampilkan password</label>
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn-login">Masuk</button>
          </div>
          <div class="form-footer">
            <p>Belum punya akun? <a href="#/register">Daftar sekarang</a></p>
          </div>
        </form>
        <div id="loginMessage" class="message-container"></div>
      </div>
    `;

    this._initializeEventListeners();
  }

  _initializeEventListeners() {
    const loginForm = this.loginContainer.querySelector('#loginForm');
    const showPasswordCheckbox = this.loginContainer.querySelector('#showPassword');
    const passwordInput = this.loginContainer.querySelector('#password');
    const messageContainer = this.loginContainer.querySelector('#loginMessage');

    showPasswordCheckbox.addEventListener('change', () => {
      passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    });

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      
      try {
        messageContainer.innerHTML = 'Sedang memproses...';
        messageContainer.className = 'message-container';
        
        const response = await login({ email, password });
        
        if (response.error) {
          messageContainer.innerHTML = response.message || 'Terjadi kesalahan saat login';
          messageContainer.className = 'message-container error-message';
          return;
        }
        
        // Simpan token dan data user ke localStorage
        localStorage.setItem('token', response.loginResult.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.loginResult.userId,
          name: response.loginResult.name,
        }));
        
        messageContainer.innerHTML = 'Login berhasil! Mengalihkan...';
        messageContainer.className = 'message-container success-message';
        
        // Redirect ke halaman utama setelah login berhasil
        setTimeout(() => {
          window.location.hash = '#/';
        }, 1500);
        
      } catch (error) {
        messageContainer.innerHTML = 'Terjadi kesalahan pada server';
        messageContainer.className = 'message-container error-message';
        console.error(error);
      }
    });
  }

  render() {
    return this.loginContainer;
  }
}

export default LoginPage;