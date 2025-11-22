import React, { useState } from 'react';
import './DatabasePage.css';

// --- ТИПЫ ДАННЫХ ---
interface DatabaseEntry {
  id: number;
  imageUrl: string; // Ссылка на фото номера
  dateTime: string;
  plate: string;
  driver: string;
  event: string;
  channel: string;
}

const DatabasePage: React.FC = () => {
  // --- СОСТОЯНИЕ (STATE) ---

  // 1. Состояние фильтров
  const [filters, setFilters] = useState({
    dateTime: '',
    plate: '',
    driver: '',
    event: '',
    channel: ''
  });

  // 2. Состояние генератора кодов (ЖК)
  const [universalCode, setUniversalCode] = useState<string>('');
  const [universalPass, setUniversalPass] = useState<string>('');

  // 3. Данные таблицы (Заглушка)
  const [data] = useState<DatabaseEntry[]>([
    { 
      id: 1, 
      imageUrl: 'https://placehold.co/100x50?text=A123AA', 
      dateTime: '23.11.2025 10:45', 
      plate: 'А 123 АА 777', 
      driver: 'Иванов И.И.', 
      event: 'Въезд разрешен', 
      channel: 'Camera 1' 
    },
    { 
      id: 2, 
      imageUrl: 'https://placehold.co/100x50?text=B555OP', 
      dateTime: '23.11.2025 10:42', 
      plate: 'В 555 ОР 77', 
      driver: 'Петров С.С.', 
      event: 'Выезд', 
      channel: 'Camera 2' 
    },
    { 
      id: 3, 
      imageUrl: 'https://placehold.co/100x50?text=K001KK', 
      dateTime: '23.11.2025 09:15', 
      plate: 'К 001 КК 99', 
      driver: 'Сидоров А.А.', 
      event: 'Отказ доступа', 
      channel: 'Camera 1' 
    },
    { 
        id: 4, 
        imageUrl: 'https://placehold.co/100x50?text=M999MM', 
        dateTime: '23.11.2025 08:30', 
        plate: 'М 999 ММ 777', 
        driver: 'Неизвестен', 
        event: 'Въезд разрешен', 
        channel: 'Camera 1' 
      },
  ]);

  // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ dateTime: '', plate: '', driver: '', event: '', channel: '' });
  };

  const handleApplyFilters = () => {
    console.log('Запрос к Backend с фильтрами:', filters);
    alert('Фильтры применены (см. консоль)');
  };

  // Эмуляция генерации кода (Backend request)
  const generateCode = () => {
    // Здесь должен быть fetch запрос к API
    const randomCode = 'LCD-' + Math.floor(1000 + Math.random() * 9000);
    setUniversalCode(randomCode);
  };

  // Эмуляция генерации пароля (Backend request)
  const generatePass = () => {
    const randomPass = Math.random().toString(36).slice(-8).toUpperCase();
    setUniversalPass(randomPass);
  };

  return (
    <div className="database-page">
      
      {/* ВЕРХНЯЯ СЕКЦИЯ: Фильтры (Слева) и Генераторы (Справа) */}
      <div className="top-controls">
        
        {/* 1. ПАНЕЛЬ ФИЛЬТРАЦИИ */}
        <div className="filters-card">
          <h3>Поиск по базе данных</h3>
          <div className="filters-grid">
            
            <div className="form-group">
              <label>Дата и время</label>
              <input 
                type="datetime-local" 
                name="dateTime" 
                value={filters.dateTime} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="form-group">
              <label>Номер машины</label>
              <input 
                type="text" 
                name="plate" 
                placeholder="А 000 АА 00" 
                value={filters.plate} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="form-group">
              <label>ФИО Водителя</label>
              <input 
                type="text" 
                name="driver" 
                placeholder="Иванов И.И." 
                value={filters.driver} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="form-group">
              <label>Событие</label>
              <select name="event" value={filters.event} onChange={handleInputChange}>
                <option value="">Все события</option>
                <option value="entry">Въезд</option>
                <option value="exit">Выезд</option>
                <option value="deny">Отказ</option>
              </select>
            </div>

            <div className="form-group">
              <label>Канал</label>
              <select name="channel" value={filters.channel} onChange={handleInputChange}>
                <option value="">Все каналы</option>
                <option value="cam1">Camera 1</option>
                <option value="cam2">Camera 2</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn-primary" onClick={handleApplyFilters}>Применить</button>
            <button className="btn-secondary" onClick={handleClearFilters}>Очистить</button>
          </div>
        </div>

        {/* 2. ПАНЕЛЬ ГЕНЕРАЦИИ (ЖК) */}
        <div className="generators-card">
          <h3>Доступ ЖК</h3>
          
          <div className="generator-row">
            <div className="gen-display">
                <label>Универсальный код:</label>
                <input type="text" value={universalCode} readOnly placeholder="Код не создан" />
            </div>
            <button className="btn-generate" onClick={generateCode}>
                Сгенерировать код
            </button>
          </div>

          <div className="generator-row">
             <div className="gen-display">
                <label>Пароль администратора:</label>
                <input type="text" value={universalPass} readOnly placeholder="Пароль не создан" />
            </div>
            <button className="btn-generate" onClick={generatePass}>
                Сгенерировать пароль
            </button>
          </div>
        </div>

      </div>

      {/* НИЖНЯЯ СЕКЦИЯ: Таблица */}
      <div className="table-wrapper">
        <table className="db-table">
            <thead>
                <tr>
                    <th>Фото номера</th>
                    <th>Дата и время</th>
                    <th>Российский номер</th>
                    <th>Водитель</th>
                    <th>Событие</th>
                    <th>Видеоканал</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td className="photo-cell">
                            <img src={row.imageUrl} alt={row.plate} />
                        </td>
                        <td>{row.dateTime}</td>
                        <td style={{fontWeight: 'bold'}}>{row.plate}</td>
                        <td>{row.driver}</td>
                        <td className={row.event.includes('Отказ') ? 'status-error' : 'status-ok'}>
                            {row.event}
                        </td>
                        <td className="channel-badge">{row.channel}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </div>
  );
};

export default DatabasePage;