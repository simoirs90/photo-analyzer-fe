import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../model/Model';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

  // Carica utente dal sessionStorage all'avvio
  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem('user');
      }
    }
    setIsAuthLoading(false);
  }, []);


  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Sending ' + username + ' - ' + password);
    try {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      setUser(data);
      sessionStorage.setItem('user', JSON.stringify(data));
      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    console.log('Sending ' + username + ' - ' + password);
    try {
      const res = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook con controllo TS
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
};