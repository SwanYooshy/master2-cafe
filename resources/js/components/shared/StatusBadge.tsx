import { cn } from '@/lib/utils';
import { OrderStatus, TableStatus } from '@/types';

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
  libre: 'Libre',
  occuper: 'Occuper',
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
