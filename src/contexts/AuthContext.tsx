import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types/user';

// Service fictif d'authentification - à remplacer par votre vraie implémentation
const authService = {
  getCurrentUser: (): Promise<User | null> => {
    const userJson = localStorage.getItem('studimove_user');
    if (userJson) {
      return Promise.resolve(JSON.parse(userJson));
    }
    return Promise.resolve(null);
  },
  login: (email: string, password: string): Promise<User> => {
    // Simulation d'une authentification réussie
    const user: User = {
      id: '1',
      username: 'admin',
      email: email,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    };
    localStorage.setItem('studimove_user', JSON.stringify(user));
    return Promise.resolve(user);
  },
  logout: (): Promise<void> => {
    localStorage.removeItem('studimove_user');
    return Promise.resolve();
  }
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setCurrentUser(userData);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setCurrentUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};