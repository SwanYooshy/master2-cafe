import { OrderStatus, TableStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: OrderStatus | TableStatus;
  className?: string;
}

const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready',
  served: 'Served',
  cancelled: 'Cancelled',
};

const tableStatusLabels: Record<TableStatus, string> = {
  free: 'Free',
  occupied: 'Occupied',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const label = status in orderStatusLabels 
    ? orderStatusLabels[status as OrderStatus]
    : tableStatusLabels[status as TableStatus];

  return (
    <span className={cn('status-badge', `status-${status}`, className)}>
      {label}
    </span>
  );
}
