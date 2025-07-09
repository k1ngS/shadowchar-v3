import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { authService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      console.log('🔍 Iniciando autenticação...');
      const token = authService.getToken();
      console.log('🔑 Token encontrado:', token ? 'SIM' : 'NÃO');

      if (token) {
        try {
          console.log('📡 Buscando usuário atual...');
          const currentUser = await authService.getCurrentUser();
          console.log('✅ Usuário obtido:', currentUser);
          setUser(currentUser);
        } catch (error) {
          console.error('❌ Erro ao buscar usuário:', error);
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (token: string) => {
    console.log('🔐 Fazendo login com token:', token.substring(0, 20) + '...');
    localStorage.setItem('token', token);
    try {
      const currentUser = await authService.getCurrentUser();
      console.log('✅ Login bem-sucedido:', currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('🚪 Fazendo logout...');
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  console.log('🔍 AuthContext state:', {
    user: user?.username,
    isAuthenticated: !!user,
    isLoading
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
