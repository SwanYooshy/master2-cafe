import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Filter, Search, X, Eye } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ordersApi } from '@/services/api';
import { Order, OrderStatus } from '@/types';
import { orderStatuses } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function Orders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    orderId: string;
    action: OrderStatus;
  }>({ open: false, orderId: '', action: 'pending' });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await ordersApi.getOrders();
      setOrders(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Échec du chargement des commandes',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.tableName.toLowerCase().includes(query)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    if (newStatus === 'cancelled') {
      setConfirmDialog({ open: true, orderId, action: newStatus });
      return;
    }

    await updateStatus(orderId, newStatus);
  };

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await ordersApi.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      const statusText = newStatus === 'pending' ? 'en attente' : newStatus === 'preparing' ? 'en préparation' : newStatus === 'ready' ? 'prête' : newStatus === 'served' ? 'servie' : 'annulée';
      toast({
        title: 'Statut mis à jour',
        description: `La commande ${orderId} est maintenant ${statusText}`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Échec de la mise à jour du statut',
        variant: 'destructive',
      });
    }
  };

  const viewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const flow: Record<OrderStatus, OrderStatus | null> = {
      pending: 'preparing',
      preparing: 'ready',
      ready: 'served',
      served: null,
      cancelled: null,
    };
    return flow[currentStatus];
  };

  return (
    <AppLayout title="Commandes">
      <Head title="Commandes" />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par ID de commande ou table..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'pending' ? 'En attente' : status === 'preparing' ? 'En préparation' : status === 'ready' ? 'Prête' : status === 'served' ? 'Servie' : status === 'cancelled' ? 'Annulée' : status === 'all' ? 'Tous' : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Chargement des commandes..." />
            ) : filteredOrders.length === 0 ? (
              <EmptyState
                icon={Filter}
                title="Aucune commande trouvée"
                description={
                  searchQuery || statusFilter !== 'all'
                    ? 'Essayez d\'ajuster vos filtres'
                    : 'Les commandes apparaîtront ici une fois créées'
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Commande</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const nextStatus = getNextStatus(order.status);
                    return (
                      <TableRow key={order.id} className="animate-fade-in">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.tableName}</TableCell>
                        <TableCell>
                          {order.items.length} article{order.items.length > 1 ? 's' : ''}
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.total.toFixed(2)}€
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {format(new Date(order.createdAt), 'h:mm a')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewOrderDetail(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {nextStatus && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(order.id, nextStatus)}
                              >
                                {nextStatus === 'preparing' ? 'En préparation' : nextStatus === 'ready' ? 'Prête' : nextStatus === 'served' ? 'Servie' : 'Marquer'}
                              </Button>
                            )}
                            {order.status !== 'cancelled' && order.status !== 'served' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleStatusChange(order.id, 'cancelled')}
                              >
                                Annuler
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Commande {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{selectedOrder.tableName}</span>
                <StatusBadge status={selectedOrder.status} />
              </div>

              <div className="border rounded-lg divide-y">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="p-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Qté : {item.quantity} × {item.unitPrice.toFixed(2)}€
                      </p>
                    </div>
                    <p className="font-medium">
                      {(item.quantity * item.unitPrice).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </div>

              {selectedOrder.notes && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">{selectedOrder.total.toFixed(2)}€</span>
              </div>

              <div className="text-xs text-muted-foreground">
                Créée : {format(new Date(selectedOrder.createdAt), 'dd MMM yyyy HH:mm')}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Cancel Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title="Annuler la commande"
        description="Êtes-vous sûr de vouloir annuler cette commande ? Cette action ne peut pas être annulée."
        confirmLabel="Annuler la commande"
        cancelLabel="Conserver la commande"
        variant="destructive"
        onConfirm={() => updateStatus(confirmDialog.orderId, 'cancelled')}
      />
    </AppLayout>
  );
}
