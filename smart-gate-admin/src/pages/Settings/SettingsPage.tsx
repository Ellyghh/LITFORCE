import React, { useState, useEffect, useRef } from 'react';
import './SettingsPage.css';

// --- ТИПЫ ---
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
  days: number[]; // Храним дни как массив чисел (0=Пн, 6=Вс)
  entryTime: string;
  exitTime: string;
  type: string;
  limits: string;
}

// Вспомогательный список дней
const DAYS_OF_WEEK = [
  { id: 0, label: 'Пн' },
  { id: 1, label: 'Вт' },
  { id: 2, label: 'Ср' },
  { id: 3, label: 'Чт' },
  { id: 4, label: 'Пт' },
  { id: 5, label: 'Сб' },
  { id: 6, label: 'Вс' },
];

// --- КОМПОНЕНТ ВЫБОРА ДНЕЙ (ВЫПАДАЮЩИЙ СПИСОК) ---
const DaysSelector: React.FC<{ 
  selectedDays: number[], 
  onChange: (days: number[]) => void 
}> = ({ selectedDays, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне элемента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const toggleDay = (id: number) => {
    if (selectedDays.includes(id)) {
      onChange(selectedDays.filter(d => d !== id).sort());
    } else {
      onChange([...selectedDays, id].sort());
    }
  };

  // Логика красивого отображения (Пн-Ср)
  const getDisplayText = () => {
    if (selectedDays.length === 0) return "Выберите дни...";
    if (selectedDays.length === 7) return "Ежедневно";

    // Простая логика: если дней много, пишем "Выбрано: N", если мало - перечисляем
    // Для полной реализации алгоритма "Пн-Ср, Пт" нужен сложный парсер,
    // здесь сделаем упрощенный вариант для примера.
    
    // Попытка найти сплошной промежуток
    const isSequential = selectedDays.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
    if (isSequential && selectedDays.length > 2) {
      return `${DAYS_OF_WEEK[selectedDays[0]].label} - ${DAYS_OF_WEEK[selectedDays[selectedDays.length - 1]].label}`;
    }

    return selectedDays.map(d => DAYS_OF_WEEK[d].label).join(', ');
  };

  return (
    <div className="days-select-wrapper" ref={wrapperRef}>
      <div className="days-input" onClick={() => setIsOpen(!isOpen)}>
        {getDisplayText()}
        <span className="arrow">▼</span>
      </div>
      {isOpen && (
        <div className="days-dropdown">
          {DAYS_OF_WEEK.map(day => (
            <div 
              key={day.id} 
              className={`day-option ${selectedDays.includes(day.id) ? 'selected' : ''}`}
              onClick={() => toggleDay(day.id)}
            >
              <input type="checkbox" checked={selectedDays.includes(day.id)} readOnly />
              <span>{day.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const SettingsPage: React.FC = () => {
  // Вкладки: 'system' (Настройки сети/камер) или 'access' (Контроль доступа)
  const [activeTab, setActiveTab] = useState<'system' | 'access'>('system');

  // --- SYSTEM TAB STATE ---
  const [network, setNetwork] = useState({
    serverIp: '192.168.1.100',
    port: '8080',
    protocol: 'HTTP',
    isLocal: false,
    statusText: '' // Изначально пусто
  });

  const [checking, setChecking] = useState(false);

  const [cameras, setCameras] = useState<CameraConfig[]>([
    { id: 1, name: 'Въезд Главный', ip: '192.168.1.50', protocol: 'RTSP', status: 'online', lastSignal: '10:00:05' },
    { id: 2, name: 'Выезд Запасной', ip: '192.168.1.51', protocol: 'Onvif', status: 'offline', lastSignal: '09:45:00' },
  ]);

  // --- ACCESS TAB STATE ---
  const [newRule, setNewRule] = useState({
    fio: '',
    plate: '',
    type: 'Постоянный',
    days: [] as number[], // Массив ID дней
    entryTime: '00:00',
    exitTime: '23:59',
    limits: ''
  });

  const [filters, setFilters] = useState({
    plate: '',
    type: '',
  });

  const [accessRules, setAccessRules] = useState<AccessRule[]>([
    { id: 1, plate: 'А 123 АА 777', days: [0,1,2,3,4], entryTime: '08:00', exitTime: '19:00', type: 'Постоянный', limits: 'Нет' },
    { id: 2, plate: 'В 555 ОР 77', days: [1,3], entryTime: '10:00', exitTime: '18:00', type: 'Гостевой', limits: 'до 31.12' },
  ]);

  // --- ЛОГИКА ---

  const handleCheckConnection = () => {
    setChecking(true);
    setNetwork(prev => ({ ...prev, statusText: 'Проверка...' }));
    
    // Эмуляция запроса (1.5 сек)
    setTimeout(() => {
      setChecking(false);
      // 50/50 успех или ошибка для примера
      const isSuccess = Math.random() > 0.5; 
      setNetwork(prev => ({ 
        ...prev, 
        statusText: isSuccess ? 'Успешно подключено' : 'Ошибка соединения' 
      }));
    }, 1500);
  };

  const formatDays = (days: number[]) => {
    // Тот же код форматирования для таблицы
    if (days.length === 7) return "Ежедневно";
    const isSequential = days.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
    if (isSequential && days.length > 2) {
      return `${DAYS_OF_WEEK[days[0]].label}-${DAYS_OF_WEEK[days[days.length - 1]].label}`;
    }
    return days.map(d => DAYS_OF_WEEK[d].label).join(', ');
  };

  return (
    <div className="settings-page theme-light">
      
      <div className="settings-header">
        <h2>Настройки системы</h2>
        {/* ПЕРЕКЛЮЧАТЕЛЬ ВКЛАДОК */}
        <div className="tabs-switch">
            <button 
                className={activeTab === 'system' ? 'active' : ''} 
                onClick={() => setActiveTab('system')}
            >
                Сетевые настройки и Камеры
            </button>
            <button 
                className={activeTab === 'access' ? 'active' : ''} 
                onClick={() => setActiveTab('access')}
            >
                Контроль доступа и Расписание
            </button>
        </div>
      </div>

      {/* === Вклдака 1: СИСТЕМА === */}
      {activeTab === 'system' && (
        <div className="settings-grid">
            <div className="left-column">
                 <div className="settings-card">
                    <h3>Сетевое подключение</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>IP-адрес сервера</label>
                            <input type="text" value={network.serverIp} onChange={e => setNetwork({...network, serverIp: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Порт</label>
                            <input type="text" value={network.port} onChange={e => setNetwork({...network, port: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Протокол</label>
                            <select value={network.protocol} onChange={e => setNetwork({...network, protocol: e.target.value})}>
                                <option>HTTP</option>
                                <option>HTTPS</option>
                            </select>
                        </div>

                        {/* Исправленный чекбокс */}
                        <div className="checkbox-group" onClick={() => setNetwork(prev => ({...prev, isLocal: !prev.isLocal}))}>
                            <input 
                                type="checkbox" 
                                checked={network.isLocal} 
                                onChange={() => {}} // Обработка в родителе div
                                style={{pointerEvents: 'none'}} // Чтобы клик проходил сквозь инпут
                            />
                            <label>Локальное подключение</label>
                        </div>

                        <button className="btn-check" onClick={handleCheckConnection} disabled={checking}>
                            {checking ? 'Проверка...' : 'Проверить соединение'}
                        </button>
                        
                        {/* Статус (появляется только после проверки) */}
                        {network.statusText && (
                            <div className={`connection-status-box ${network.statusText.includes('Ошибка') ? 'error' : 'success'}`}>
                                Статус: <b>{network.statusText}</b>
                            </div>
                        )}
                    </div>
                 </div>
            </div>

            <div className="right-column">
                <div className="settings-card">
                    <div className="card-header">
                        <h3>Список камер</h3>
                        <button className="btn-small">Добавить камеру</button>
                    </div>
                    <table className="settings-table">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>IP</th>
                                <th>Протокол</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cameras.map(cam => (
                                <tr key={cam.id}>
                                    <td>{cam.name}</td>
                                    <td>{cam.ip}</td>
                                    <td>{cam.protocol}</td>
                                    <td><span className={`badge ${cam.status}`}>{cam.status}</span></td>
                                    <td className="actions-cell">
                                        <button title="Изменить" className="icon-btn edit">✎</button>
                                        <button title="Удалить" className="icon-btn delete">🗑</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {/* === Вклдака 2: ДОСТУП === */}
      {activeTab === 'access' && (
        <div className="settings-grid">
            {/* ЛЕВАЯ КОЛОНКА: ФОРМА СОЗДАНИЯ */}
            <div className="left-column">
                <div className="settings-card">
                    <h3>Создание расписания</h3>
                    <div className="form-stack">
                        <div className="form-group">
                            <label>ФИО водителя</label>
                            <input 
                                type="text" 
                                value={newRule.fio} 
                                onChange={e => setNewRule({...newRule, fio: e.target.value})} 
                                placeholder="Иванов И.И."
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Номер машины</label>
                            <input 
                                type="text" 
                                value={newRule.plate} 
                                onChange={e => setNewRule({...newRule, plate: e.target.value})} 
                                placeholder="А 000 АА 00"
                            />
                        </div>

                        <div className="form-group">
                            <label>Тип доступа</label>
                            <select value={newRule.type} onChange={e => setNewRule({...newRule, type: e.target.value})}>
                                <option>Разовый</option>
                                <option>Постоянный</option>
                                <option>Гостевой</option>
                                <option>Спецтранспорт</option>
                                <option>Рабочий персонал</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Дни доступа</label>
                            {/* ИНТЕРАКТИВНЫЙ ВЫБОР ДНЕЙ */}
                            <DaysSelector 
                                selectedDays={newRule.days} 
                                onChange={(days) => setNewRule({...newRule, days})} 
                            />
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

                        <div className="form-group">
                            <label>Ограничения (дата/примечание)</label>
                            <input type="text" value={newRule.limits} onChange={e => setNewRule({...newRule, limits: e.target.value})} />
                        </div>

                        <button className="btn-add-rule">+ Добавить</button>
                    </div>
                </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: БАЗА И ФИЛЬТРЫ */}
            <div className="right-column">
                <div className="settings-card">
                    <h3>Правила доступа</h3>
                    
                    {/* ФИЛЬТРЫ */}
                    <div className="filters-row">
                        <input type="text" placeholder="Поиск по номеру..." value={filters.plate} onChange={e => setFilters({...filters, plate: e.target.value})} />
                        <select>
                            <option value="">Все типы</option>
                            <option>Постоянный</option>
                            <option>Гостевой</option>
                        </select>
                        <button className="btn-filter apply">Применить</button>
                        <button className="btn-filter clear">Очистить</button>
                    </div>

                    {/* ТАБЛИЦА */}
                    <div className="table-scroll">
                        <table className="settings-table">
                            <thead>
                                <tr>
                                    <th>Номер ТС</th>
                                    <th>Дни</th>
                                    <th>Время</th>
                                    <th>Тип</th>
                                    <th>Ограничения</th>
                                    <th style={{width: '80px'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {accessRules.map(rule => (
                                    <tr key={rule.id}>
                                        <td style={{fontWeight: 'bold'}}>{rule.plate}</td>
                                        <td>{formatDays(rule.days)}</td>
                                        <td>{rule.entryTime} - {rule.exitTime}</td>
                                        <td>{rule.type}</td>
                                        <td>{rule.limits}</td>
                                        <td className="actions-cell">
                                            <button className="icon-btn edit">✎</button>
                                            <button className="icon-btn delete">🗑</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;