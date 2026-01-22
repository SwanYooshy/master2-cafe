// Core types for Smart Café application

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type TableStatus = 'libre' | 'occuper';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  enabled: boolean;
  description?: string;
  imageUrl?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableId: string;
  tableName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: TableStatus;
  activeOrders: number;
  currentOrderId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'manager' | 'admin';
  avatarUrl?: string;
}

export interface DashboardStats {
  ordersToday: number;
  revenueToday: number;
  activeTables: number;
  totalTables: number;
  pendingOrders: number;
  avgOrderValue: number;
}

export interface ChartData {
  label: string;
  value: number;
}
