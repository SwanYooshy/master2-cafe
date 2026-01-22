export interface Product {
  id: string;
  name: string;
  description: string;
  image?: string | null;
  price: number;
  stock: number;
  category: string;
  categoryId: string;
  enabled: boolean;
  variants?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const productsApi = {
  /**
   * Get all products
   */
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const result = await response.json();
    return result.data || result;
  },

  /**
   * Toggle product enabled status
   * Utilise la route PATCH /products/{id} existante
   */
  toggleProductEnabled: async (id: string): Promise<Product> => {
    const getResponse = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!getResponse.ok) {
      throw new Error('Failed to fetch product');
    }

    const currentProduct = await getResponse.json();
    const product = currentProduct.data;

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        enabled: !product.enabled,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle product status');
    }

    const result = await response.json();
    return result.data;
  },

  /**
   * Update product (price and stock)
   * Utilise la route PUT /products/{id} existante
   */
  updateProduct: async (
    id: string,
    data: { price?: number; stock?: number }
  ): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const result = await response.json();
    return result.data;
  },
};
