import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check cứng user/pass để test nhanh (Bỏ qua gọi API)
    if (username === 'staff' && password === '123456') {
      localStorage.setItem('token', 'fake-token-for-testing'); // Lưu token giả để qua mặt ProtectedRoute
      navigate('/admin');
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu! (Thử: staff / 123456)');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Staff Login</h2>
        
        {error && <p className="error-msg">{error}</p>}

        <div className="login-input-group">
          <label>Tài khoản</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            placeholder="Nhập username..."
          />
        </div>

        <div className="login-input-group">
          <label>Mật khẩu</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Nhập password..."
          />
        </div>

        <button type="submit" className="btn-login">ĐĂNG NHẬP</button>
      </form>
    </div>
  );
}

export default Login;
