class LoginPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  async login({ email, password }) {
    this._view.showLoading();
    
    try {
      const response = await this._model.login({ email, password });
      
      if (response.error) {
        this._view.showError(response.message || 'Terjadi kesalahan saat login');
        return;
      }
      
      // Simpan data login ke localStorage
      localStorage.setItem('token', response.loginResult.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: response.loginResult.userId,
          name: response.loginResult.name,
        })
      );
      
      this._view.showSuccess('Login berhasil! Mengalihkan...');
      
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    } catch (error) {
      this._view.showError('Terjadi kesalahan pada server');
      console.error(error);
    }
  }
}

export default LoginPresenter;