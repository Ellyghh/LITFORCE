import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageOne: React.FC = () => {
  const navigate = useNavigate();

  // Типизация события клика (React.MouseEvent) не обязательна, если функция простая,
  // но полезна для обучения. В данном случае можно оставить просто () => void.
  const handleClick = () => {
    navigate('/second');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Первая страница</h1>
      <p>Это пример на TypeScript.</p>
      
      {/* Кнопка с обычным HTML атрибутом onClick */}
      <button onClick={handleClick} style={{ padding: '10px 20px' }}>
        Перейти на вторую страницу
      </button>
    </div>
  );
};

export default PageOne;