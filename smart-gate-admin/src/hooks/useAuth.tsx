// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      // Проверяем, есть ли токен в localStorage
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        // Если есть токен и данные пользователя, считаем его авторизованным
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      logout(); // Очищаем невалидные данные
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверка credentials (в реальном приложении здесь будет запрос к API)
      if (credentials.email && credentials.password) {
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          firstName: 'Иван',
          lastName: 'Иванов',
          role: 'admin',
        };
        
        // Сохраняем в localStorage
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        setUser(mockUser);
        return true;
      } else {
        throw new Error('Неверный email или пароль');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Очищаем localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Очищаем состояние
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };
};