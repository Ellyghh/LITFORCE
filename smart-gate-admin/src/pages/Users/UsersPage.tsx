import React, { useState } from 'react';
import './UsersPage.css';

// --- ТИПЫ ---
type UserRole = 'Администратор' | 'Охранник' | 'Консьерж';
type UserStatus = 'Активен' | 'Заблокирован';

interface User {
  id: number;
  login: string;
  // Поле password убрали из интерфейса отображения
  role: UserRole;
  status: UserStatus;
}

const ROLES: UserRole[] = ['Администратор', 'Охранник', 'Консьерж'];
const STATUSES: UserStatus[] = ['Активен', 'Заблокирован'];

const UserPage: React.FC = () => {
  // --- СОСТОЯНИЕ ---
  
  // 1. Данные таблицы (Без паролей)
  const [users, setUsers] = useState<User[]>([
    { id: 1, login: 'admin', role: 'Администратор', status: 'Активен' },
    { id: 2, login: 'guard_kpp1', role: 'Охранник', status: 'Активен' },
    { id: 3, login: 'concierge_main', role: 'Консьерж', status: 'Заблокирован' },
  ]);

  // 2. Форма создания (Здесь пароли нужны, чтобы их задать)
  const [newUser, setNewUser] = useState({
    login: '',
    password: '',
    repeatPassword: '',
    role: ROLES[1],
  });

  // 3. Фильтры
  const [filters, setFilters] = useState({
    login: '',
    role: '',
    status: ''
  });

  const [error, setError] = useState<string>('');

  // --- ЛОГИКА ---

  const handleAddUser = () => {
    setError('');

    // Валидация
    if (!newUser.login || !newUser.password) {
      setError('Заполните все поля');
      return;
    }
    if (newUser.password !== newUser.repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // Создание объекта для таблицы (Пароль не сохраняем в стейт списка)
    const user: User = {
      id: Date.now(),
      login: newUser.login,
      role: newUser.role as UserRole,
      status: 'Активен'
    };

    // В реальности здесь был бы POST запрос на сервер с паролем
    console.log('Отправка на сервер:', { ...user, password: newUser.password });

    setUsers([...users, user]);
    setNewUser({ login: '', password: '', repeatPassword: '', role: ROLES[1] });
    alert('Пользователь успешно добавлен');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить пользователя?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleClearFilters = () => {
    setFilters({ login: '', role: '', status: '' });
  };

  // Фильтрация
  const filteredUsers = users.filter(user => {
    const matchLogin = user.login.toLowerCase().includes(filters.login.toLowerCase());
    const matchRole = filters.role ? user.role === filters.role : true;
    const matchStatus = filters.status ? user.status === filters.status : true;
    return matchLogin && matchRole && matchStatus;
  });

  return (
    <div className="user-page theme-light">
      
      <div className="page-header">
        <h2>Управление пользователями</h2>
      </div>

      <div className="user-grid">
        
        {/* === ЛЕВАЯ КОЛОНКА: ДОБАВЛЕНИЕ === */}
        <div className="left-column">
          <div className="card form-card">
            <h3>Добавление пользователя</h3>
            
            <div className="form-stack">
              <div className="form-group">
                <label>Логин</label>
                <input 
                  type="text" 
                  placeholder="Придумайте логин"
                  value={newUser.login}
                  onChange={e => setNewUser({...newUser, login: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Пароль</label>
                <input 
                  type="password" 
                  placeholder="••••••"
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Повторите пароль</label>
                <input 
                  type="password" 
                  placeholder="••••••"
                  value={newUser.repeatPassword}
                  onChange={e => setNewUser({...newUser, repeatPassword: e.target.value})}
                  className={error === 'Пароли не совпадают' ? 'input-error' : ''}
                />
              </div>

              <div className="form-group">
                <label>Роль</label>
                <select 
                  value={newUser.role} 
                  onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
                >
                  {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>

              {error && <div className="error-msg">{error}</div>}

              <button className="btn-add" onClick={handleAddUser}>
                Создать пользователя
              </button>
            </div>
          </div>
        </div>

        {/* === ПРАВАЯ КОЛОНКА: СПИСОК === */}
        <div className="right-column">
          <div className="card table-card">
            <h3>Список сотрудников</h3>

            {/* ФИЛЬТРЫ */}
            <div className="filters-row">
              <div className="filter-item">
                <input 
                  type="text" 
                  placeholder="Поиск по логину..." 
                  value={filters.login}
                  onChange={e => setFilters({...filters, login: e.target.value})}
                />
              </div>
              
              <div className="filter-item">
                <select value={filters.role} onChange={e => setFilters({...filters, role: e.target.value})}>
                  <option value="">Все роли</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="filter-item">
                <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                  <option value="">Любой статус</option>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <button className="btn-reset" onClick={handleClearFilters}>Сброс</button>
            </div>

            {/* ТАБЛИЦА */}
            <div className="table-scroll">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Логин</th>
                    {/* Колонка пароль удалена */}
                    <th>Роль</th>
                    <th>Статус</th>
                    <th style={{width: '80px'}}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="login-cell">{user.login}</td>
                      {/* Ячейка пароль удалена */}
                      <td>
                        <span className={`role-badge ${getCodeByRole(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-dot ${user.status === 'Активен' ? 'active' : 'blocked'}`}></span>
                        {user.status}
                      </td>
                      <td className="actions-cell">
                        <button className="icon-btn edit" title="Сменить пароль / Редактировать">✎</button>
                        <button className="icon-btn delete" title="Удалить" onClick={() => handleDelete(user.id)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

function getCodeByRole(role: UserRole) {
  switch(role) {
    case 'Администратор': return 'admin';
    case 'Охранник': return 'guard';
    case 'Консьерж': return 'concierge';
    default: return '';
  }
}

export default UserPage;