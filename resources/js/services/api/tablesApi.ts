export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: 'libre' | 'occuper';
  activeOrders: number;
}

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const tablesApi = {
  /**
   * Get all tables
   */
  getTables: async (): Promise<Table[]> => {
    const response = await fetch(`${API_BASE_URL}/tables`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tables');
    }

    const data = await response.json();
    return data.data; // Laravel Resource retourne les données dans "data"
  },

  /**
   * Get single table by ID
   */
  getTable: async (id: string): Promise<Table | null> => {
    const response = await fetch(`${API_BASE_URL}/tables/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch table');
    }

    const data = await response.json();
    return data.data;
  },

  /**
   * Update table status
   */
  updateTableStatus: async (id: string, status: 'libre' | 'occuper'): Promise<Table> => {
    const response = await fetch(`${API_BASE_URL}/tables/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update table status');
    }

    const data = await response.json();
    return data.data;
  },

  /**
   * Create a new table
   */
  createTable: async (tableData: Omit<Table, 'id'>): Promise<Table> => {
    const response = await fetch(`${API_BASE_URL}/tables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: tableData.name,
        capacity: tableData.capacity,
        status: tableData.status,
        active_orders: tableData.activeOrders,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create table');
    }

    const data = await response.json();
    return data.data;
  },

  /**
   * Update a table
   */
  updateTable: async (id: string, tableData: Partial<Table>): Promise<Table> => {
    const response = await fetch(`${API_BASE_URL}/tables/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: tableData.name,
        capacity: tableData.capacity,
        status: tableData.status,
        active_orders: tableData.activeOrders,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update table');
    }

    const data = await response.json();
    return data.data;
  },

  /**
   * Delete a table
   */
  deleteTable: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tables/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete table');
    }
  },
};
