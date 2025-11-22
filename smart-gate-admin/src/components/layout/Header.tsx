// src/components/layout/Header.tsx
import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">Система видеонаблюдения</h1>
        <div className="header__status">
          <span className="status-indicator status--online"></span>
          <span>Система активна</span>
        </div>
      </div>
      
      <div className="header__right">
        <div className="header__time">
          <div className="time">{currentTime}</div>
          <div className="date">{currentDate}</div>
        </div>
        
        <div className="header__actions">
          <button className="header__button" title="Уведомления">
            🔔
          </button>
          <button className="header__button" title="Настройки">
            ⚙️
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;