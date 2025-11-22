import React from 'react';
import { Link } from 'react-router-dom';

const PageTwo: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#e0e0e0' }}>
      <h1>Вторая страница</h1>
      <p>Вы успешно использовали навигацию.</p>
      
      {/* Link также типизирован внутри библиотеки, он знает, что to принимает строку */}
      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default PageTwo;