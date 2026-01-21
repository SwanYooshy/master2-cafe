import { Order, Product, Table, DashboardStats, User, ChartData } from '@/types';

// Current logged-in user mock
export const currentUser: User = {
  id: '1',
  name: 'Maria Santos',
  email: 'maria@smartcafe.com',
  role: 'manager',
};

// Products mock data
export const mockProducts: Product[] = [
  { id: '1', name: 'Espresso', category: 'Coffee', price: 2.50, stock: 100, enabled: true, description: 'Strong Italian espresso' },
  { id: '2', name: 'Cappuccino', category: 'Coffee', price: 4.00, stock: 80, enabled: true, description: 'Espresso with steamed milk foam' },
  { id: '3', name: 'Latte', category: 'Coffee', price: 4.50, stock: 75, enabled: true, description: 'Espresso with steamed milk' },
  { id: '4', name: 'Americano', category: 'Coffee', price: 3.00, stock: 90, enabled: true, description: 'Espresso with hot water' },
  { id: '5', name: 'Croissant', category: 'Pastry', price: 3.50, stock: 25, enabled: true, description: 'Buttery French pastry' },
  { id: '6', name: 'Chocolate Muffin', category: 'Pastry', price: 3.00, stock: 30, enabled: true, description: 'Rich chocolate muffin' },
  { id: '7', name: 'Avocado Toast', category: 'Food', price: 8.50, stock: 15, enabled: true, description: 'Sourdough with fresh avocado' },
  { id: '8', name: 'Caesar Salad', category: 'Food', price: 10.00, stock: 20, enabled: false, description: 'Classic Caesar with grilled chicken' },
  { id: '9', name: 'Orange Juice', category: 'Drinks', price: 4.00, stock: 40, enabled: true, description: 'Freshly squeezed' },
  { id: '10', name: 'Green Tea', category: 'Tea', price: 3.00, stock: 60, enabled: true, description: 'Japanese sencha' },
  { id: '11', name: 'Chai Latte', category: 'Tea', price: 4.50, stock: 45, enabled: true, description: 'Spiced tea with steamed milk' },
  { id: '12', name: 'Bagel with Cream Cheese', category: 'Food', price: 5.00, stock: 18, enabled: true, description: 'Toasted bagel with cream cheese' },
];

// Tables mock data
export const mockTables: Table[] = [
  { id: '1', name: 'Table 1', capacity: 2, status: 'occupied', activeOrders: 1 },
  { id: '2', name: 'Table 2', capacity: 4, status: 'free', activeOrders: 0 },
  { id: '3', name: 'Table 3', capacity: 4, status: 'occupied', activeOrders: 2 },
  { id: '4', name: 'Table 4', capacity: 6, status: 'free', activeOrders: 0 },
  { id: '5', name: 'Table 5', capacity: 2, status: 'occupied', activeOrders: 1 },
  { id: '6', name: 'Table 6', capacity: 4, status: 'free', activeOrders: 0 },
  { id: '7', name: 'Table 7', capacity: 8, status: 'occupied', activeOrders: 1 },
  { id: '8', name: 'Table 8', capacity: 2, status: 'free', activeOrders: 0 },
  { id: '9', name: 'Bar 1', capacity: 1, status: 'occupied', activeOrders: 1 },
  { id: '10', name: 'Bar 2', capacity: 1, status: 'free', activeOrders: 0 },
  { id: '11', name: 'Terrace 1', capacity: 4, status: 'occupied', activeOrders: 1 },
  { id: '12', name: 'Terrace 2', capacity: 4, status: 'free', activeOrders: 0 },
];

// Orders mock data
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    tableId: '1',
    tableName: 'Table 1',
    items: [
      { id: 'i1', productId: '1', productName: 'Espresso', quantity: 2, unitPrice: 2.50 },
      { id: 'i2', productId: '5', productName: 'Croissant', quantity: 1, unitPrice: 3.50 },
    ],
    status: 'preparing',
    total: 8.50,
    createdAt: '2024-01-15T09:30:00',
    updatedAt: '2024-01-15T09:35:00',
  },
  {
    id: 'ORD-002',
    tableId: '3',
    tableName: 'Table 3',
    items: [
      { id: 'i3', productId: '2', productName: 'Cappuccino', quantity: 2, unitPrice: 4.00 },
      { id: 'i4', productId: '7', productName: 'Avocado Toast', quantity: 2, unitPrice: 8.50 },
    ],
    status: 'pending',
    total: 25.00,
    createdAt: '2024-01-15T09:45:00',
    updatedAt: '2024-01-15T09:45:00',
    notes: 'One toast without tomato',
  },
  {
    id: 'ORD-003',
    tableId: '5',
    tableName: 'Table 5',
    items: [
      { id: 'i5', productId: '3', productName: 'Latte', quantity: 1, unitPrice: 4.50 },
    ],
    status: 'ready',
    total: 4.50,
    createdAt: '2024-01-15T09:50:00',
    updatedAt: '2024-01-15T10:00:00',
  },
  {
    id: 'ORD-004',
    tableId: '7',
    tableName: 'Table 7',
    items: [
      { id: 'i6', productId: '4', productName: 'Americano', quantity: 3, unitPrice: 3.00 },
      { id: 'i7', productId: '6', productName: 'Chocolate Muffin', quantity: 2, unitPrice: 3.00 },
      { id: 'i8', productId: '9', productName: 'Orange Juice', quantity: 2, unitPrice: 4.00 },
    ],
    status: 'served',
    total: 23.00,
    createdAt: '2024-01-15T08:30:00',
    updatedAt: '2024-01-15T09:00:00',
  },
  {
    id: 'ORD-005',
    tableId: '9',
    tableName: 'Bar 1',
    items: [
      { id: 'i9', productId: '1', productName: 'Espresso', quantity: 1, unitPrice: 2.50 },
    ],
    status: 'pending',
    total: 2.50,
    createdAt: '2024-01-15T10:00:00',
    updatedAt: '2024-01-15T10:00:00',
  },
  {
    id: 'ORD-006',
    tableId: '11',
    tableName: 'Terrace 1',
    items: [
      { id: 'i10', productId: '11', productName: 'Chai Latte', quantity: 2, unitPrice: 4.50 },
      { id: 'i11', productId: '12', productName: 'Bagel with Cream Cheese', quantity: 2, unitPrice: 5.00 },
    ],
    status: 'preparing',
    total: 19.00,
    createdAt: '2024-01-15T09:55:00',
    updatedAt: '2024-01-15T10:05:00',
  },
  {
    id: 'ORD-007',
    tableId: '2',
    tableName: 'Table 2',
    items: [
      { id: 'i12', productId: '2', productName: 'Cappuccino', quantity: 1, unitPrice: 4.00 },
    ],
    status: 'cancelled',
    total: 4.00,
    createdAt: '2024-01-15T08:00:00',
    updatedAt: '2024-01-15T08:10:00',
    notes: 'Customer left',
  },
  {
    id: 'ORD-008',
    tableId: '3',
    tableName: 'Table 3',
    items: [
      { id: 'i13', productId: '10', productName: 'Green Tea', quantity: 2, unitPrice: 3.00 },
    ],
    status: 'ready',
    total: 6.00,
    createdAt: '2024-01-15T09:40:00',
    updatedAt: '2024-01-15T09:55:00',
  },
];

// Dashboard stats mock
export const mockDashboardStats: DashboardStats = {
  ordersToday: 47,
  revenueToday: 523.50,
  activeTables: 7,
  totalTables: 12,
  pendingOrders: 5,
  avgOrderValue: 11.14,
};

// Chart data for hourly orders
export const mockHourlyOrders: ChartData[] = [
  { label: '8am', value: 5 },
  { label: '9am', value: 12 },
  { label: '10am', value: 15 },
  { label: '11am', value: 8 },
  { label: '12pm', value: 18 },
  { label: '1pm', value: 22 },
  { label: '2pm', value: 14 },
  { label: '3pm', value: 10 },
];

// Chart data for revenue by category
export const mockRevenueByCategory: ChartData[] = [
  { label: 'Coffee', value: 245 },
  { label: 'Food', value: 156 },
  { label: 'Pastry', value: 78 },
  { label: 'Tea', value: 32 },
  { label: 'Drinks', value: 12 },
];

// Product categories
export const productCategories = ['All', 'Coffee', 'Tea', 'Pastry', 'Food', 'Drinks'];

// Order status options
export const orderStatuses = ['all', 'pending', 'preparing', 'ready', 'served', 'cancelled'] as const;
