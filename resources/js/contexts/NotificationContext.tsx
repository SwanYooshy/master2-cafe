import { createContext, useContext, ReactNode } from 'react';
import { useOrderNotifications } from '@/hooks/useOrderNotifications';
import { OrderNotification } from '@/types/notifications';

interface NotificationContextType {
  notifications: OrderNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notificationState = useOrderNotifications();

  return (
    <NotificationContext.Provider value={notificationState}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
