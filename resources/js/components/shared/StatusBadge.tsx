import { OrderStatus, TableStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: OrderStatus | TableStatus;
  className?: string;
}

const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  preparing: 'En préparation',
  ready: 'Prête',
  served: 'Servie',
  cancelled: 'Annulée',
};

const tableStatusLabels: Record<TableStatus, string> = {
  free: 'Libre',
  occupied: 'Occupée',
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
