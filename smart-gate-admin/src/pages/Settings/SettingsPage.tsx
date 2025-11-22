import React, { useState } from 'react';
import './SettingsPage.css';

// --- ТИПЫ ДАННЫХ ---
interface CameraConfig {
  id: number;
  name: string;
  ip: string;
  protocol: string;
  status: 'online' | 'offline';
  lastSignal: string;
}

interface AccessRule {
  id: number;
  plate: string;
  days: string; // "Пн-Пт"
  entryTime: string;
  exitTime: string;
  type: 'Постоянный' | 'Временный' | 'Разовый';
  limits: string; // "Без ограничений" или дата
}

const SettingsPage: React.FC = () => {
  // --- СОСТОЯНИЕ (STATE) ---

  // Глобальные настройки
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  // Сетевые настройки
  const [network, setNetwork] = useState({
    serverIp: '192.168.1.100',
    port: '8080',
    protocol: 'RTSP',
    isLocal: true,
    status: 'Соединение установлено'
  });

  // Камеры
  const [cameras, setCameras] = useState<CameraConfig[]>([
    { id: 1, name: 'Въезд Главный', ip: '192.168.1.50', protocol: 'RTSP', status: 'online', lastSignal: '10:00:05' },
    { id: 2, name: 'Выезд Запасной', ip: '192.168.1.51', protocol: 'Onvif', status: 'offline', lastSignal: '09:45:00' },
  ]);

  // Форма "Создание расписания" (Слева внизу)
  const [newRule, setNewRule] = useState({
    fio: '',
    plate: '',
    type: 'Постоянный',
    days: 'Пн-Вс',
    timeLimit: '',
    entryTime: '00:00',
    exitTime: '23:59'
  });

  // Фильтры базы данных (Справа внизу)
  const [filters, setFilters] = useState({
    plate: '',
    days: '',
    entryTime: '',
    exitTime: '',
    type: '',
    limits: ''
  });

  // База данных правил (Справа внизу)
  const [accessRules, setAccessRules] = useState<AccessRule[]>([
    { id: 1, plate: 'А 123 АА 777', days: 'Пн-Пт', entryTime: '08:00', exitTime: '19:00', type: 'Постоянный', limits: 'Нет' },
    { id: 2, plate: 'В 555 ОР 77', days: 'Вт, Чт', entryTime: '10:00', exitTime: '18:00', type: 'Временный', limits: 'до 31.12.2025' },
  ]);

  // --- ЛОГИКА ---
  
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'ru' ? 'en' : 'ru');

  const checkConnection = () => {
    alert('Пинг сервера... OK');
  };

  const handleAddRule = () => {
    console.log('Добавление правила:', newRule);
    alert('Правило добавлено');
  };

  const handleApplyFilters = () => {
    console.log('Фильтрация по:', filters);
  };

  return (
    <div className={`settings-page theme-${theme}`}>
      
      {/* ШАПКА НАСТРОЕК (Язык и Тема) */}
      <div className="settings-header">
        <h2>Настройки системы</h2>
        <div className="global-toggles">
          <div className="toggle-group">
            <label>Язык:</label>
            <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>RUS</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>ENG</button>
          </div>
          <div className="toggle-group">
            <label>Тема:</label>
            <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>☀</button>
            <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>☾</button>
          </div>
        </div>
      </div>

      <div className="settings-grid">
        
        {/* === ЛЕВАЯ КОЛОНКА === */}
        <div className="left-column">
          
          {/* 1. СЕТЕВЫЕ НАСТРОЙКИ */}
          <div className="settings-card network-card">
            <h3>Сетевые настройки</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>IP-адрес сервера</label>
                <input type="text" value={network.serverIp} onChange={(e) => setNetwork({...network, serverIp: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Порт камеры</label>
                <input type="text" value={network.port} onChange={(e) => setNetwork({...network, port: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Протокол</label>
                <select value={network.protocol} onChange={(e) => setNetwork({...network, protocol: e.target.value})}>
                  <option>RTSP</option>
                  <option>HTTP</option>
                  <option>Onvif</option>
                </select>
              </div>
              
              <div className="connection-status">
                <span>Статус: </span>
                <span className="status-text ok">{network.status}</span>
              </div>

              <div className="checkbox-group">
                <input type="checkbox" checked={network.isLocal} onChange={() => {}} />
                <label>Локальное подключение</label>
              </div>

              <button className="btn-check" onClick={checkConnection}>Проверить соединение</button>
            </div>
          </div>

          {/* 2. СОЗДАНИЕ РАСПИСАНИЯ (ФОРМА) */}
          <div className="settings-card schedule-form-card">
            <h3>Создание расписания</h3>
            <div className="form-stack">
              <input type="text" placeholder="ФИО водителя" value={newRule.fio} onChange={e => setNewRule({...newRule, fio: e.target.value})} />
              <input type="text" placeholder="Номер машины (А 000 АА 00)" value={newRule.plate} onChange={e => setNewRule({...newRule, plate: e.target.value})} />
              
              <div className="row">
                <select value={newRule.type} onChange={e => setNewRule({...newRule, type: e.target.value})}>
                    <option>Постоянный</option>
                    <option>Временный</option>
                    <option>Разовый</option>
                </select>
                <input type="text" placeholder="Дни (Пн-Пт)" value={newRule.days} onChange={e => setNewRule({...newRule, days: e.target.value})} />
              </div>

              <div className="row">
                 <div className="col">
                    <label>Въезд с:</label>
                    <input type="time" value={newRule.entryTime} onChange={e => setNewRule({...newRule, entryTime: e.target.value})} />
                 </div>
                 <div className="col">
                    <label>Выезд до:</label>
                    <input type="time" value={newRule.exitTime} onChange={e => setNewRule({...newRule, exitTime: e.target.value})} />
                 </div>
              </div>

              <input type="text" placeholder="Ограничение (дата)" value={newRule.timeLimit} onChange={e => setNewRule({...newRule, timeLimit: e.target.value})} />

              <button className="btn-add-rule" onClick={handleAddRule}>+ Добавить пропуск</button>
            </div>
          </div>

        </div>

        {/* === ПРАВАЯ КОЛОНКА === */}
        <div className="right-column">
          
          {/* 3. УПРАВЛЕНИЕ КАМЕРАМИ */}
          <div className="settings-card cameras-card">
            <div className="card-header">
                <h3>Список камер</h3>
                <div className="header-actions">
                    <button className="btn-small">Добавить камеру</button>
                </div>
            </div>
            
            <table className="settings-table">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>IP</th>
                        <th>Протокол</th>
                        <th>Статус</th>
                        <th>Посл. сигнал</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {cameras.map(cam => (
                        <tr key={cam.id}>
                            <td>{cam.name}</td>
                            <td>{cam.ip}</td>
                            <td>{cam.protocol}</td>
                            <td>
                                <span className={`badge ${cam.status}`}>{cam.status === 'online' ? 'В сети' : 'Откл.'}</span>
                            </td>
                            <td>{cam.lastSignal}</td>
                            <td className="actions-cell">
                                <button title="Изменить">✎</button>
                                <button title="Удалить" className="danger">🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          {/* 4. БАЗА ДАННЫХ ПРАВИЛ ДОСТУПА */}
          <div className="settings-card rules-db-card">
            <h3>Правила доступа (База данных)</h3>
            
            {/* Строка фильтров (как просили) */}
            <div className="filters-row">
                <input type="text" placeholder="Номер ТС" value={filters.plate} onChange={e => setFilters({...filters, plate: e.target.value})} />
                <input type="text" placeholder="Дни" style={{width: '80px'}} />
                <input type="time" />
                <input type="time" />
                <select><option>Тип доступа</option></select>
                <input type="text" placeholder="Ограничения" />
                
                <button className="btn-filter apply" onClick={handleApplyFilters}>Применить</button>
                <button className="btn-filter clear">Очистить</button>
            </div>

            {/* Дополнительные кнопки управления таблицей */}
            <div className="table-controls">
                <button className="btn-edit">Изменить выбранное</button>
                <button className="btn-delete">Удалить выбранное</button>
            </div>

            <div className="table-scroll">
                <table className="settings-table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Номер ТС</th>
                            <th>Дни</th>
                            <th>Въезд</th>
                            <th>Выезд</th>
                            <th>Тип</th>
                            <th>Ограничения</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accessRules.map((rule, idx) => (
                            <tr key={rule.id}>
                                <td>{idx + 1}</td>
                                <td><b>{rule.plate}</b></td>
                                <td>{rule.days}</td>
                                <td>{rule.entryTime}</td>
                                <td>{rule.exitTime}</td>
                                <td>{rule.type}</td>
                                <td>{rule.limits}</td>
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

export default SettingsPage;