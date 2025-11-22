import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './MainLayout.css'; // Подключим стили ниже

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      {/* БОКОВОЕ МЕНЮ */}
      <aside className="sidebar">
        <div className="sidebar-header">МЕНЮ</div>
        <nav>
          <ul>
            <li><Link to="/camers">Видеонаблюдение</Link></li>
            <li><Link to="/database">База данных</Link></li>
            <li><Link to="/settings">Настройки</Link></li>
            <li><Link to="/history">История</Link></li>
            <li><Link to="/users">Пользователи</Link></li>
            <li><Link to="/exit">Выйти из системы</Link></li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/">Выход</Link>
        </div>
      </aside>

      {/* ОБЛАСТЬ КОНТЕНТА */}
      <main className="content">
        {/* Outlet - это "окно", куда подставляются страницы (2, 3 или 4) */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;