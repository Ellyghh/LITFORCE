import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../../hooks/useAuth';
import './LoginPage.css';
import emblemImg from './../../assets/images/emblem.png';

const LoginPage: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) clearError();
  }, [credentials.email, credentials.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;

    const success = await login(credentials);
    if (success) {
      navigate('/cameras');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="split-screen-container">
      
      {/* ЛЕВАЯ ЧАСТЬ: Логотип и Фон */}
      <div className="left-pane">
        <div className="logo-card">
          <img src={emblemImg} alt="Эмблема Умные Врата" />
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Форма входа */}
      <div className="right-pane">
        <div className="login-wrapper">
          <h1>Добро пожаловать в<br /><span>УМНЫЕВРАТА</span></h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <label htmlFor="email">Логин (Email)</label>
              <input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                placeholder="example@mail.ru"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="actions">
              <button 
                type="submit" 
                className="btn-login"
                disabled={isLoading}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;