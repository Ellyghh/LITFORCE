// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Layout.css';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1>Моя система видеонаблюдения</h1>
          <div className="user-info">
            <span>Добро пожаловать, {user?.firstName}</span>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </div>
        </div>
      </header>
      
      <div className="main-content">
        <nav className="sidebar">
          <ul className="nav-menu">
            <li><a href="/">Камеры</a></li>
            <li><a href="/database">База данных</a></li>
            <li><a href="/history">История</a></li>
            <li><a href="/users">Пользователи</a></li>
            <li><a href="/settings">Настройки</a></li>
            <li><a href="/requests">Заявки</a></li>
          </ul>
        </nav>
        
        <main className="content">
          <Outlet /> {/* Здесь будут отображаться страницы */}
        </main>
      </div>
    </div>
  );
};

export default Layout;