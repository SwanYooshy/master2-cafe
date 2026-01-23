import { Head } from '@inertiajs/react';
import { ClipboardList, DollarSign, Users, Clock, TrendingUp, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { AppLayout } from '@/components/layout/AppLayout';
import { LoadingState } from '@/components/shared/LoadingState';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardApi } from '@/services/api';
import { ordersApi } from '@/services/api/ordersApi';
import { productsApi } from '@/services/api/productsApi';
import { tablesApi } from '@/services/api/tablesApi';
import { DashboardStats, Order, ChartData } from '@/types';


const CHART_COLORS = ['hsl(35, 85%, 55%)', 'hsl(30, 45%, 35%)', 'hsl(142, 71%, 45%)', 'hsl(217, 91%, 60%)', 'hsl(0, 72%, 51%)'];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [hourlyData, setHourlyData] = useState<ChartData[]>([]);
  const [categoryData, setCategoryData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const countActiveTables = (tablesData: Array<{ id: string; status: string }>) => {
    const activeTables = tablesData.filter(table => table.status === 'occuper').length;
    const totalTables = tablesData.length;
    setStats(prev => prev ? { ...prev, activeTables, totalTables } : null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, ordersData, tablesData] = await Promise.all([
          dashboardApi.getStats(),
          ordersApi.getOrders(),
          tablesApi.getTables(),
        ]);

        setStats(statsData);

        const hourlyOrders: Record<number, number> = {};
        ordersData.forEach(order => {
          const hour = new Date(order.createdAt).getHours();
          hourlyOrders[hour] = (hourlyOrders[hour] || 0) + 1;
        });
        const hourlyDataArray: ChartData[] = Object.entries(hourlyOrders).map(([hour, count]) => ({
          label: `${hour}:00`,
          value: count
        }));
        setHourlyData(hourlyDataArray);

        const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
        setStats(prev => prev ? { ...prev, pendingOrders } : null);

        const ordersToday = ordersData.filter(order => {
          const orderDate = new Date(order.createdAt);
          const today = new Date();
          return orderDate.toDateString() === today.toDateString() && order.status === 'served';
        }).length;
        setStats(prev => prev ? { ...prev, ordersToday } : null);

        const revenueToday = ordersData.reduce((total, order) => {
          const orderDate = new Date(order.createdAt);
          const today = new Date();
          if (orderDate.toDateString() === today.toDateString() && order.status === 'served') {
            return total + order.total;
          }
          return total;
        }, 0);
        setStats(prev => prev ? { ...prev, revenueToday } : null);

        const allProducts = await productsApi.getProducts({});
        const productMap = new Map(allProducts.map(p => [p.id, p]));
        const ordersCompleted = ordersData.filter(order => order.status === 'served');
        const categoryRevenueMap: Record<string, number> = {};
        for (const order of ordersCompleted) {
            for (const item of order.items) {
                const product = productMap.get(item.id);
                const category = product?.category ?? 'Inconnu';
                const itemRevenue = item.unitPrice * item.quantity;
                categoryRevenueMap[category] = parseFloat(((categoryRevenueMap[category] ?? 0) + itemRevenue).toFixed(2));
            }
        }
        const categoryDataArray: ChartData[] = Object.entries(categoryRevenueMap).map(
            ([label, value]) => ({ label, value })
        );
        setCategoryData(categoryDataArray);

        const sortedOrders = ordersData.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        setRecentOrders(sortedOrders.slice(0, 5));

        countActiveTables(tablesData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <AppLayout title="Tableau de bord">
        <Head title="Tableau de bord" />
        <LoadingState message="Chargement du tableau de bord..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Tableau de bord">
      <Head title="Tableau de bord" />

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Commandes du jour"
            value={stats?.ordersToday || 0}
            icon={ClipboardList}
            // trend={{ value: 12, isPositive: true }}
            subtitle="Commandes servies et payées aujourd'hui"
          />
          <StatCard
            title="Revenu du jour"
            value={`${stats?.revenueToday.toFixed(2) || '0.00'}€`}
            icon={DollarSign}
            subtitle="Uniquement les commandes terminées"
          />
          <StatCard
            title="Tables actives"
            value={`${stats?.activeTables || 0} / ${stats?.totalTables || 0}`}
            subtitle="Tables occupées"
            icon={Users}
          />
          <StatCard
            title="Commandes en attente"
            value={stats?.pendingOrders || 0}
            subtitle="En attente de préparation"
            icon={Clock}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Hourly Orders Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                <TrendingUp className="inline-block mr-2 h-4 w-4" />
                Commandes par heure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Category Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                <Utensils className="inline-block mr-2 h-4 w-4" />
                Revenus par catégorie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="label"
                      label={({ label, percent }) => `${label} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [`${value} €`, 'Revenu']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="font-medium text-sm">{order.id}</div>
                    <div className="text-sm text-muted-foreground">Table : <b>{order.tableName}</b></div>
                    <div className="text-sm text-muted-foreground">
                      <b>{order.items.length}</b> article{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-muted-foreground">{new Date(order.updatedAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
