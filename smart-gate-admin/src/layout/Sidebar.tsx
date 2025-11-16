// src/components/layout/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Видеонаблюдение', icon: '📹' },
    { path: '/database', label: 'База данных', icon: '📋' },
    { path: '/history', label: 'История', icon: '📊' },
    { path: '/users', label: 'Пользователи', icon: '👥' },
    { path: '/settings', label: 'Настройки', icon: '⚙️' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar__logo">
        Умный КПП
      </div>
      <ul className="sidebar__menu">
        {menuItems.map(item => (
          <li key={item.path}>
            <Link 
              to={item.path}
              className={`sidebar__link ${
                location.pathname === item.path ? 'sidebar__link--active' : ''
              }`}
            >
              <span className="sidebar__icon">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};