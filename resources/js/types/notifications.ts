import { OrderStatus } from './index';

export interface OrderNotification {
  id: string;
  type: 'new_order' | 'status_change';
  orderId: string;
  tableName: string;
  message: string;
  timestamp: Date;
  read: boolean;
  previousStatus?: OrderStatus;
  newStatus?: OrderStatus;
}
