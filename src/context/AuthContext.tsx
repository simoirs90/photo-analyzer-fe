import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { User, AuthContextType } from '../model/Model';

// Inizializziamo il context con undefined, gestendo poi l'errore se usato fuori dal Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "password") { // Mock logic
      setUser({ id: '123', name: username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook con controllo di sicurezza TS
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
};