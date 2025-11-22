import React, { useState } from 'react';
import './HistoryPage.css';

// --- ТИПЫ ДАННЫХ ---
interface HistoryEntry {
  id: number;
  imageUrl: string;
  plate: string;
  dateTime: string; // В реальности лучше Date object, но для макета строка ок
  camera: string;
  direction: 'Въезд' | 'Выезд';
  status: 'success' | 'warning' | 'error'; // success=ОК, error=Отказ
  statusText: string;
}

const HistoryPage: React.FC = () => {
  // --- СОСТОЯНИЕ ---
  const [filters, setFilters] = useState({
    plate: '',
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    camera: '',
    direction: '',
    status: ''
  });

  // Мок-данные (Заглушка)
  const [historyData] = useState<HistoryEntry[]>([
    { 
      id: 1, 
      imageUrl: 'https://placehold.co/100x50/333/fff?text=X903BT', 
      plate: 'X 903 BT 16', 
      dateTime: '23.11.2025 14:30:05', 
      camera: 'КПП-1 (Главный)', 
      direction: 'Въезд', 
      status: 'success',
      statusText: 'Доступ разрешен'
    },
    { 
      id: 2, 
      imageUrl: 'https://placehold.co/100x50/333/fff?text=A123AA', 
      plate: 'А 123 АА 777', 
      dateTime: '23.11.2025 14:15:12', 
      camera: 'КПП-2 (Запасной)', 
      direction: 'Выезд', 
      status: 'success',
      statusText: 'Выезд разрешен'
    },
    { 
      id: 3, 
      imageUrl: 'https://placehold.co/100x50/500/fff?text=UNK', 
      plate: 'Не распознан', 
      dateTime: '23.11.2025 13:50:00', 
      camera: 'КПП-1 (Главный)', 
      direction: 'Въезд', 
      status: 'error',
      statusText: 'Ошибка чтения'
    },
    { 
      id: 4, 
      imageUrl: 'https://placehold.co/100x50/700/fff?text=B555OP', 
      plate: 'В 555 ОР 77', 
      dateTime: '23.11.2025 12:00:00', 
      camera: 'КПП-1 (Главный)', 
      direction: 'Въезд', 
      status: 'warning',
      statusText: 'Внимание: Нет пропуска' // Например, ручное открытие
    },
  ]);

  // Обработчики
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
        plate: '',
        dateFrom: '', dateTo: '',
        timeFrom: '', timeTo: '',
        camera: '', direction: '', status: ''
    });
  };

  const handleSearch = () => {
    console.log('Поиск по фильтрам:', filters);
    // Здесь будет запрос к API
  };

  return (
    <div className="history-page theme-light">
      
      <div className="page-header">
        <h2>Журнал событий (Архив)</h2>
        {/* Индикатор для охранника */}
        <div className="user-badge">Режим просмотра: Охрана</div>
      </div>

      {/* --- ПАНЕЛЬ ФИЛЬТРОВ --- */}
      <div className="filters-panel">
        <div className="filters-grid">
            
            {/* 1. Поиск по номеру */}
            <div className="filter-item">
                <label>Номер ТС</label>
                <input 
                    type="text" 
                    name="plate" 
                    placeholder="А 000 АА 00" 
                    value={filters.plate} 
                    onChange={handleInputChange} 
                />
            </div>

            {/* 2. Камера */}
            <div className="filter-item">
                <label>Камера</label>
                <select name="camera" value={filters.camera} onChange={handleInputChange}>
                    <option value="">Все камеры</option>
                    <option>КПП-1 (Главный)</option>
                    <option>КПП-2 (Запасной)</option>
                </select>
            </div>

             {/* 3. Направление */}
             <div className="filter-item">
                <label>Направление</label>
                <select name="direction" value={filters.direction} onChange={handleInputChange}>
                    <option value="">Любое</option>
                    <option>Въезд</option>
                    <option>Выезд</option>
                </select>
            </div>

             {/* 4. Статус */}
             <div className="filter-item">
                <label>Статус</label>
                <select name="status" value={filters.status} onChange={handleInputChange}>
                    <option value="">Все статусы</option>
                    <option value="success">Успешно</option>
                    <option value="error">Отказ / Ошибка</option>
                </select>
            </div>

            {/* 5. Группа ДАТА (С..По) */}
            <div className="filter-group-double">
                <label>Дата (период)</label>
                <div className="double-inputs">
                    <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleInputChange} />
                    <span>—</span>
                    <input type="date" name="dateTo" value={filters.dateTo} onChange={handleInputChange} />
                </div>
            </div>

            {/* 6. Группа ВРЕМЯ (С..По) */}
            <div className="filter-group-double">
                <label>Время (интервал)</label>
                <div className="double-inputs">
                    <input type="time" name="timeFrom" value={filters.timeFrom} onChange={handleInputChange} />
                    <span>—</span>
                    <input type="time" name="timeTo" value={filters.timeTo} onChange={handleInputChange} />
                </div>
            </div>

        </div>

        {/* Кнопки управления */}
        <div className="filter-actions">
            <button className="btn-search" onClick={handleSearch}>Найти</button>
            <button className="btn-reset" onClick={handleClearFilters}>Сбросить</button>
        </div>
      </div>

      {/* --- ТАБЛИЦА ДАННЫХ --- */}
      <div className="table-container">
        <table className="history-table">
            <thead>
                <tr>
                    <th>Фото</th>
                    <th>Номер ТС</th>
                    <th>Дата и Время</th>
                    <th>Камера</th>
                    <th>Направление</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                {historyData.map((row) => (
                    <tr key={row.id}>
                        <td className="photo-cell">
                            <div className="img-wrapper">
                                <img src={row.imageUrl} alt={row.plate} />
                            </div>
                        </td>
                        <td className="plate-cell">{row.plate}</td>
                        <td>{row.dateTime}</td>
                        <td className="camera-cell">{row.camera}</td>
                        <td>
                            <span className={`badge-direction ${row.direction === 'Въезд' ? 'in' : 'out'}`}>
                                {row.direction}
                            </span>
                        </td>
                        <td>
                            <span className={`badge-status ${row.status}`}>
                                {row.statusText}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </div>
  );
};

export default HistoryPage;