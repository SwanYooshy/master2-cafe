/**
 * API Service Layer
 *
 * This file contains placeholder functions for API calls.
 * Replace the mock implementations with actual API calls when connecting to a backend.
 */

import { Order, Product, Table, DashboardStats, OrderStatus, User } from '@/types';

import {
  mockOrders,
  mockProducts,
  mockTables,
  mockDashboardStats,
  currentUser,
  mockHourlyOrders,
  mockRevenueByCategory
} from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============== AUTH API ==============

export const authApi = {
  /**
   * Login with email and password
   * TODO: Connect to actual authentication endpoint
   */
  login: async (email: string, password: string): Promise<User> => {
    await delay(800); // Simulate network delay

    // Mock validation - replace with actual API call
    if (email === 'demo@smartcafe.com' && password === 'demo123') {
      return currentUser;
    }

    throw new Error('Invalid email or password');
  },

  /**
   * Logout current user
   * TODO: Connect to actual logout endpoint
   */
  logout: async (): Promise<void> => {
    await delay(300);
    // Clear session/tokens here
  },

  /**
   * Get current authenticated user
   * TODO: Connect to actual user endpoint
   */
  getCurrentUser: async (): Promise<User | null> => {
    await delay(200);
    return currentUser;
  },
};

// ============== ORDERS API ==============

export const ordersApi = {
  /**
   * Get all orders with optional status filter
   * TODO: Connect to actual orders endpoint
   */
  getOrders: async (status?: OrderStatus): Promise<Order[]> => {
    await delay(400);

    if (status && status !== 'all' as any) {
      return mockOrders.filter(order => order.status === status);
    }
    return mockOrders;
  },

  /**
   * Get single order by ID
   * TODO: Connect to actual order detail endpoint
   */
  getOrder: async (id: string): Promise<Order | null> => {
    await delay(200);
    return mockOrders.find(order => order.id === id) || null;
  },

  /**
   * Update order status
   * TODO: Connect to actual order update endpoint
   */
  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
    await delay(300);

    const order = mockOrders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');

    // In real implementation, this would update the backend
    order.status = status;
    order.updatedAt = new Date().toISOString();

    return order;
  },

  /**
   * Cancel an order
   * TODO: Connect to actual cancel endpoint
   */
  cancelOrder: async (orderId: string): Promise<Order> => {
    return ordersApi.updateOrderStatus(orderId, 'cancelled');
  },
};

// ============== PRODUCTS API ==============

export const productsApi = {
  /**
   * Get all products
   * TODO: Connect to actual products endpoint
   */
  getProducts: async (): Promise<Product[]> => {
    await delay(400);
    return mockProducts;
  },

  /**
   * Get single product by ID
   * TODO: Connect to actual product detail endpoint
   */
  getProduct: async (id: string): Promise<Product | null> => {
    await delay(200);
    return mockProducts.find(product => product.id === id) || null;
  },

  /**
   * Update product
   * TODO: Connect to actual product update endpoint
   */
  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    await delay(300);

    const productIndex = mockProducts.findIndex(p => p.id === id);
    if (productIndex === -1) throw new Error('Product not found');

    // In real implementation, this would update the backend
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...updates };

    return mockProducts[productIndex];
  },

  /**
   * Toggle product enabled status
   * TODO: Connect to actual toggle endpoint
   */
  toggleProductEnabled: async (id: string): Promise<Product> => {
    await delay(200);

    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');

    product.enabled = !product.enabled;
    return product;
  },
};

// ============== TABLES API ==============

export const tablesApi = {
  /**
   * Get all tables
   * TODO: Connect to actual tables endpoint
   */
  getTables: async (): Promise<Table[]> => {
    await delay(400);
    return mockTables;
  },

  /**
   * Get single table by ID
   * TODO: Connect to actual table detail endpoint
   */
  getTable: async (id: string): Promise<Table | null> => {
    await delay(200);
    return mockTables.find(table => table.id === id) || null;
  },

  /**
   * Update table status
   * TODO: Connect to actual table update endpoint
   */
  updateTableStatus: async (id: string, status: 'free' | 'occupied'): Promise<Table> => {
    await delay(300);

    const table = mockTables.find(t => t.id === id);
    if (!table) throw new Error('Table not found');

    table.status = status;
    if (status === 'free') {
      table.activeOrders = 0;
    }

    return table;
  },
};

// ============== DASHBOARD API ==============

export const dashboardApi = {
  /**
   * Get dashboard statistics
   * TODO: Connect to actual dashboard stats endpoint
   */
  getStats: async (): Promise<DashboardStats> => {
    await delay(300);
    return mockDashboardStats;
  },

  /**
   * Get hourly orders data for chart
   * TODO: Connect to actual analytics endpoint
   */
  getHourlyOrders: async () => {
    await delay(200);
    return mockHourlyOrders;
  },

  /**
   * Get revenue by category data for chart
   * TODO: Connect to actual analytics endpoint
   */
  getRevenueByCategory: async () => {
    await delay(200);
    return mockRevenueByCategory;
  },
};
