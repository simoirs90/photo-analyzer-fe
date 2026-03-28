import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../model/Model';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Carica utente dal localStorage all'avvio
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);


  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Sending ' + username + ' - ' + password);
    try {
      const res = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    console.log('Sending ' + username + ' - ' + password);
    try {
      const res = await fetch('http://localhost:8080/users/signup', {
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
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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