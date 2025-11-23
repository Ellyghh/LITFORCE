import React, { useState, useEffect } from 'react';
import './CamerasPage.css';

// --- ТИПЫ ---
interface RecognitionEvent {
  plate: string;
  status: 'success' | 'warning' | 'error';
  statusText: string;
  direction: string;
  company: string;
  videoChannel: string;
  driver?: string;
}

interface LogEntry {
  id: number;
  dateTime: string;
  plate: string;
  driver: string;
  event: string;
  channel: string;
}

// --- КОМПОНЕНТЫ ---
const CameraFeed: React.FC<{ title: string; src: string; isOnline: boolean }> = ({ title, src, isOnline }) => (
  <div className="camera-card">
    <div className="camera-header">
      <span>{title}</span>
      <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? 'LIVE' : 'OFFLINE'}
      </span>
    </div>
    <div className="video-viewport">
      {isOnline ? (
        <img 
            src={src} 
            className="video-feed" 
            onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Нет+Сигнала'}
        />
      ) : <div className="offline-placeholder">Нет сигнала</div>}
    </div>
  </div>
);

const InfoCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="info-card">
    <div className="info-value">{value}</div>
    <div className="info-label">{label}</div>
  </div>
);

const RecognitionCard: React.FC<{ data: RecognitionEvent; onClose: () => void }> = ({ data, onClose }) => (
  <div className={`recognition-panel status-${data.status}`}>
    <div className="recognition-header">
      <h3>Автоматический доступ</h3>
      <button onClick={onClose} className="close-btn">✕</button>
    </div>
    
    <div className="plate-display">
      <div className="rus-flag">
        <div className="flag-w"></div>
        <div className="flag-b"></div>
        <div className="flag-r"></div>
        <span>RUS</span>
      </div>
      <span className="plate-number">{data.plate}</span>
    </div>

    <div className="recognition-details">
      <div className="detail-row">
        <span>Статус:</span>
        <strong>{data.statusText}</strong>
      </div>
      <div className="detail-row">
        <span>Событие:</span>
        <strong>{data.direction}</strong>
      </div>
      <div className="detail-row">
        <span>Компания:</span>
        {data.company}
      </div>
      <div className="detail-row">
        <span>Водитель:</span>
        {data.driver || "Неизвестен"}
      </div>
    </div>
  </div>
);

// --- ГЛАВНАЯ СТРАНИЦА ---
const DashboardPage: React.FC = () => {
  const [lastEvent, setLastEvent] = useState<RecognitionEvent | null>(null);

  // 1. ЭМУЛЯЦИЯ (Для теста: машина приезжает через 2 сек)
  useEffect(() => {
    const timer = setTimeout(() => {
        setLastEvent({
            plate: 'X 903 BT 16',
            status: 'success',
            statusText: 'Доступ разрешен',
            direction: 'Въезд',
            company: 'ООО "Вектор"',
            videoChannel: 'Camera 1',
            driver: 'Иванов И.И.'
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 2. ЛОГИКА АВТО-ЗАКРЫТИЯ ОКНА (Таймер 15 секунд)
  useEffect(() => {
    if (lastEvent) {
      const timer = setTimeout(() => {
        setLastEvent(null); // Закрываем окно через 15 сек
      }, 15000); // 15000 мс = 15 сек

      // Очистка таймера, если пользователь закрыл окно вручную раньше времени
      return () => clearTimeout(timer);
    }
  }, [lastEvent]);


  const statsData = [
    { label: "Въездов", value: 124 },
    { label: "Выездов", value: 118 },
    { label: "На территории", value: 6 },
    { label: "Гостей", value: 12 },
    { label: "Отказов", value: 3 },
    { label: "Ошибок", value: 0 },
    { label: "Температура", value: "45°C" },
    { label: "Система", value: "OK" },
  ];

  const dbRows: LogEntry[] = [
    { id: 1, dateTime: '10:45:12', plate: 'А 123 АА 777', driver: 'Иванов И.И.', event: 'Въезд', channel: 'Cam 1' },
    { id: 2, dateTime: '10:42:05', plate: 'В 555 ОР 77', driver: 'Петров С.С.', event: 'Выезд', channel: 'Cam 2' },
    { id: 3, dateTime: '10:30:00', plate: 'К 001 КК 99', driver: '-', event: 'Отказ', channel: 'Cam 1' },
  ];

  return (
    <div className="layout-split">
      <div className="left-panel">
        <CameraFeed title="Камера 1 (Въезд)" src="http://213.226.254.135:91/mjpg/video.mjpg" isOnline={true} />
        <CameraFeed title="Камера 2 (Выезд)" src="broken" isOnline={true} />
      </div>

      <div className="right-panel">
        
        <div className="top-right-section">
            {lastEvent ? (
                <RecognitionCard data={lastEvent} onClose={() => setLastEvent(null)} />
            ) : (
                <div className="stats-container">
                    <h3>Оперативная сводка</h3>
                    <div className="stats-grid">
                        {statsData.map((item, index) => (
                            <InfoCard key={index} label={item.label} value={item.value} />
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="database-section">
            <h3>Журнал событий</h3>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Время</th>
                            <th>Номер</th>
                            <th>Водитель</th>
                            <th>Событие</th>
                            <th>Канал</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dbRows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.dateTime}</td>
                                <td style={{fontWeight: 'bold'}}>{row.plate}</td>
                                <td>{row.driver}</td>
                                <td>{row.event}</td>
                                <td className="channel-cell">{row.channel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* 3. ПАНЕЛЬ С ОДНОЙ КНОПКОЙ */}
        <div className="manual-control-bar">
            <button className="btn-manual-open">
                ОТКРЫТЬ ВОРОТА
            </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;