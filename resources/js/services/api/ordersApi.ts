export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  tableName: string;
  tableId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const ordersApi = {
  /**
   * Get all orders
   */
  getOrders: async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const result = await response.json();
    return result.data || result;
  },

  /**
   * Get single order by ID
   */
  getOrder: async (id: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    const result = await response.json();
    return result.data;
  },

  /**
   * Update order status
   * Utilise la route PUT /orders/{id} existante
   */
  updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    const result = await response.json();
    return result.data;
  },

  /**
   * Create a new order
   */
  createOrder: async (orderData: {
    table_id: string;
    notes?: string;
    products: Array<{ product_id: string; quantity: number }>;
  }): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const result = await response.json();
    return result.data;
  },

  /**
   * Delete an order
   */
  deleteOrder: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
  },
};
