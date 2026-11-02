import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authMode: 'login' | 'register';
  isPricingModalOpen: boolean;
  openPricingModal: () => void;
  closePricingModal: () => void;
  isPro: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('marathi_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('marathi_token'));
  const [loading, setLoading] = useState<boolean>(() => !localStorage.getItem('marathi_token'));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState<boolean>(false);

  const refreshUser = async () => {
    const currentToken = localStorage.getItem('marathi_token');
    if (!currentToken) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const u = await api.getMe();
      setUser(u);
    } catch {
      const savedUser = localStorage.getItem('marathi_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('marathi_token');
          setUser(null);
          setToken(null);
        }
      } else {
        localStorage.removeItem('marathi_token');
        setUser(null);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('marathi_token', newToken);
    localStorage.setItem('marathi_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('marathi_token');
    localStorage.removeItem('marathi_user');
    setToken(null);
    setUser(null);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openPricingModal = () => setIsPricingModalOpen(true);
  const closePricingModal = () => setIsPricingModalOpen(false);

  // 100% Free Website Application: all users have full, unrestricted access to all features
  const isPro = true;

  const authValue = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      refreshUser,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      authMode,
      isPricingModalOpen,
      openPricingModal,
      closePricingModal,
      isPro
    }),
    [user, token, loading, isAuthModalOpen, authMode, isPricingModalOpen]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
