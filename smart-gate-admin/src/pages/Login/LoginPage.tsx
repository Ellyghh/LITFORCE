// src/pages/Login/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './../../hooks/useAuth';
import './LoginPage.css'; // Стили для страницы логина
import emblemImg from './../../assets/images/emblem.png'; 

const LoginPage: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Очищаем ошибку при изменении полей
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [credentials.email, credentials.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      return;
    }

    const success = await login(credentials);
    if (success) {
      // После успешного логина пользователь будет автоматически 
      // перенаправлен на главную страницу через Router
      console.log('Login successful!');
    }
  };

  return (
    <div className="login-page">

    <div className="emblem"> 
          <div id='background'></div>
          {/* Используем импортированную переменную для src */}
          <img src={emblemImg} alt="Эмблема" />
        </div>

      <div className="login-container">
        <h1>Добро пожаловать в УМНЫЕВРАТА</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ 
                ...prev, 
                email: e.target.value 
              }))}
              placeholder="Введите ваш email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ 
                ...prev, 
                password: e.target.value 
              }))}
              placeholder="Введите ваш пароль"
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading || !credentials.email || !credentials.password}
            className="login-button"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;