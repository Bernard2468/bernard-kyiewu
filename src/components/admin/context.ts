import { createContext, useContext } from 'react';
import type { SiteData } from '@/hooks/data';

export interface AdminContextValue {
  data: SiteData;
  reload: () => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
  showSaved: () => void;
}

export const AdminContext = createContext<AdminContextValue | null>(null);

export const useAdmin = (): AdminContextValue => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within the admin dashboard');
  return ctx;
};
