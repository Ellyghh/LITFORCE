import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage'; // Ваша страница входа (1 страница)
import MainLayout from './layouts/MainLayout';   // Наш новый макет
import CamerasPage from './pages/Cameras/CamerasPage';
import SettingsPage from './pages/Settings/SettingsPage';
import HistorePage from './pages/Histore/HistorePage';
import DatabasePage from './pages/Database/DatabasePage';
import UsersPage from './pages/Users/UsersPage';


function App() {
  return (
    <Routes>
      {/* 1. СТРАНИЦА ЛОГИНА (Без меню) */}
      {/*<Route path="/" element={<LoginPage />} />*/}

      {/* 2. ГРУППА СТРАНИЦ С МЕНЮ */}
      {/* Все маршруты внутри этого Route будут обернуты в MainLayout */}
      <Route path='/' element={<MainLayout />}>
        
        <Route path="/camers" element={<CamerasPage />} />
        <Route path="/database" element={<DatabasePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/history" element={<HistorePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
      
      {/* Ловушка 404 */}
      <Route path="*" element={<div>Страница не найдена</div>} />
    </Routes>
  );
}

export default App;