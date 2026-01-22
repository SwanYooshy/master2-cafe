import { Link, router, usePage } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  UtensilsCrossed, 
  Grid3X3,
  LogOut,
  Coffee
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { title: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Commandes', href: '/orders', icon: ClipboardList },
  { title: 'Produits', href: '/products', icon: UtensilsCrossed },
  { title: 'Tables', href: '/tables', icon: Grid3X3 },
];

export function AppSidebar() {
  const { url } = usePage();

  const handleLogout = () => {
    router.post('/logout');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Coffee className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">Smart Café</h1>
          <p className="text-xs text-sidebar-foreground/60">Système de gestion</p>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = url === item.href || url.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex w-full items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-md',
                'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-accent text-sidebar-primary font-semibold'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'text-sidebar-primary')} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <Separator className="mb-3 bg-sidebar-border" />
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
