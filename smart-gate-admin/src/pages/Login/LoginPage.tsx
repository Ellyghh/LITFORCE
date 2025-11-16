import React from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Система Умного КПП</h1>
        <p className="login-subtitle">Войдите в свой аккаунт</p>
        
        <form className="login-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Логин" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Пароль" 
              className="form-input"
            />
          </div>
          
          <button type="submit" className="login-button">
            Войти в систему
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;