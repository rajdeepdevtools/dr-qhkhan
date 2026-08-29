'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApiClient } from './api-client';
import { UserRole } from '@hospital/shared-types';

interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isLoading: boolean;
  loginAdmin: (data: any) => void;
  logoutAdmin: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  adminUser: null,
  isLoading: true,
  loginAdmin: () => {},
  logoutAdmin: async () => {},
  refreshAdmin: async () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAdmin = async () => {
    try {
      const res = await adminApiClient('/auth/me');
      if (res.success && res.data && ['admin', 'super_admin', 'receptionist'].includes(res.data.user.role)) {
        setAdminUser(res.data.user);
      } else {
        setAdminUser(null);
      }
    } catch {
      setAdminUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAdmin();
  }, []);

  const loginAdmin = (data: any) => {
    setAdminUser(data.user);
  };

  const logoutAdmin = async () => {
    try {
      await adminApiClient('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout request failed:', err);
    }
    setAdminUser(null);
    window.location.href = '/login';
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, isLoading, loginAdmin, logoutAdmin, refreshAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
