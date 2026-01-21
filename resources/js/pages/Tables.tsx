import { useEffect, useState } from 'react';
import { Users, ClipboardList, Grid3X3 } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { tablesApi } from '@/services/api';
import { Table as TableType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Tables() {
  const { toast } = useToast();
  const [tables, setTables] = useState<TableType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    tableId: string;
    tableName: string;
    action: 'free' | 'occupied';
  }>({ open: false, tableId: '', tableName: '', action: 'free' });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setIsLoading(true);
    try {
      const data = await tablesApi.getTables();
      setTables(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load tables',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (table: TableType) => {
    const newStatus = table.status === 'free' ? 'occupied' : 'free';
    
    if (newStatus === 'free' && table.activeOrders > 0) {
      setConfirmDialog({
        open: true,
        tableId: table.id,
        tableName: table.name,
        action: 'free',
      });
      return;
    }

    updateTableStatus(table.id, newStatus);
  };

  const updateTableStatus = async (tableId: string, status: 'free' | 'occupied') => {
    try {
      const updated = await tablesApi.updateTableStatus(tableId, status);
      setTables((prev) =>
        prev.map((t) => (t.id === tableId ? updated : t))
      );
      toast({
        title: 'Table updated',
        description: `Table is now ${status}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update table status',
        variant: 'destructive',
      });
    }
  };

  const occupiedCount = tables.filter((t) => t.status === 'occupied').length;
  const freeCount = tables.filter((t) => t.status === 'free').length;

  return (
    <div className="min-h-screen">
      <AppHeader title="Tables" />

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tables</p>
                  <p className="text-2xl font-bold">{tables.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Grid3X3 className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Occupied</p>
                  <p className="text-2xl font-bold text-status-occupied">{occupiedCount}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-occupied/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-status-occupied" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-status-free">{freeCount}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-free/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-status-free" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Grid */}
        {isLoading ? (
          <LoadingState message="Loading tables..." />
        ) : tables.length === 0 ? (
          <EmptyState
            icon={Grid3X3}
            title="No tables configured"
            description="Tables will appear here once added to the system"
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tables.map((table) => (
              <Card
                key={table.id}
                className={cn(
                  'transition-all hover:shadow-md cursor-pointer animate-fade-in',
                  table.status === 'free' ? 'table-free' : 'table-occupied'
                )}
                onClick={() => handleStatusChange(table)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{table.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Capacity: {table.capacity}
                      </p>
                    </div>
                    <Badge
                      variant={table.status === 'free' ? 'outline' : 'destructive'}
                      className={cn(
                        table.status === 'free' 
                          ? 'border-status-free text-status-free' 
                          : 'bg-status-occupied'
                      )}
                    >
                      {table.status === 'free' ? 'Free' : 'Occupied'}
                    </Badge>
                  </div>

                  {table.status === 'occupied' && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClipboardList className="h-4 w-4" />
                      {table.activeOrders} active order{table.activeOrders !== 1 ? 's' : ''}
                    </div>
                  )}

                  <Button
                    variant={table.status === 'free' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(table);
                    }}
                  >
                    {table.status === 'free' ? 'Mark as Occupied' : 'Mark as Free'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-status-free" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-status-occupied" />
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* Confirm Free Table Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title="Mark Table as Free"
        description={`${confirmDialog.tableName} has active orders. Are you sure you want to mark it as free? This may affect order tracking.`}
        confirmLabel="Mark as Free"
        cancelLabel="Keep Occupied"
        onConfirm={() => updateTableStatus(confirmDialog.tableId, 'free')}
      />
    </div>
  );
}
