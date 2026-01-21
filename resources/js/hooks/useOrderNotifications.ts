import { useState, useEffect, useCallback, useRef } from 'react';
import { OrderNotification } from '@/types/notifications';
import { Order, OrderStatus } from '@/types';
import { playSound, initAudio } from '@/lib/sounds';
import { mockProducts, mockTables } from '@/services/mockData';

interface UseOrderNotificationsReturn {
  notifications: OrderNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

// Simulated order generator for demo purposes
const generateRandomOrder = (): Partial<Order> => {
  const table = mockTables[Math.floor(Math.random() * mockTables.length)];
  const numItems = Math.floor(Math.random() * 3) + 1;
  const items = [];
  
  for (let i = 0; i < numItems; i++) {
    const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    items.push({
      id: `item-${Date.now()}-${i}`,
      productId: product.id,
      productName: product.name,
      quantity: Math.floor(Math.random() * 2) + 1,
      unitPrice: product.price,
    });
  }
  
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  
  return {
    id: `ORD-${String(Date.now()).slice(-6)}`,
    tableId: table.id,
    tableName: table.name,
    items,
    status: 'pending' as OrderStatus,
    total,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export function useOrderNotifications(): UseOrderNotificationsReturn {
  const [notifications, setNotifications] = useState<OrderNotification[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioInitialized = useRef(false);

  // Initialize audio on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!audioInitialized.current) {
        initAudio();
        audioInitialized.current = true;
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const addNotification = useCallback((notification: Omit<OrderNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: OrderNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep last 50

    // Play sound if enabled
    if (soundEnabled) {
      if (notification.type === 'new_order') {
        playSound('newOrder');
      } else {
        playSound('statusChange');
      }
    }
  }, [soundEnabled]);

  // Simulate incoming orders (for demo - replace with real WebSocket/polling in production)
  useEffect(() => {
    const simulateNewOrder = () => {
      const order = generateRandomOrder();
      addNotification({
        type: 'new_order',
        orderId: order.id!,
        tableName: order.tableName!,
        message: `New order from ${order.tableName}: ${order.items?.length} item${order.items?.length !== 1 ? 's' : ''} - $${order.total?.toFixed(2)}`,
      });
    };

    const simulateStatusChange = () => {
      const statuses: OrderStatus[] = ['preparing', 'ready', 'served'];
      const prevStatuses: OrderStatus[] = ['pending', 'preparing', 'ready'];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      const table = mockTables[Math.floor(Math.random() * mockTables.length)];
      
      addNotification({
        type: 'status_change',
        orderId: `ORD-${String(Date.now()).slice(-6)}`,
        tableName: table.name,
        message: `Order for ${table.name} is now ${statuses[randomIndex]}`,
        previousStatus: prevStatuses[randomIndex],
        newStatus: statuses[randomIndex],
      });
    };

    // Random new order every 15-30 seconds
    const newOrderInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        simulateNewOrder();
      }
    }, 15000 + Math.random() * 15000);

    // Random status change every 10-20 seconds
    const statusInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        simulateStatusChange();
      }
    }, 10000 + Math.random() * 10000);

    // Initial demo notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      simulateNewOrder();
    }, 3000);

    return () => {
      clearInterval(newOrderInterval);
      clearInterval(statusInterval);
      clearTimeout(initialTimeout);
    };
  }, [addNotification]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    soundEnabled,
    toggleSound,
  };
}
