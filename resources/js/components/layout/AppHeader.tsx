import { ChevronDown, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { currentUser } from '@/services/mockData';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { useNotifications } from '@/contexts/NotificationContext';

interface AppHeaderProps {
  title: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    soundEnabled,
    toggleSound,
  } = useNotifications();

  const initials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-64 pl-9"
          />
        </div>

        {/* Notifications */}
        <NotificationCenter
          notifications={notifications}
          unreadCount={unreadCount}
          soundEnabled={soundEnabled}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClear={clearNotifications}
          onToggleSound={toggleSound}
        />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Paramètres du profil</DropdownMenuItem>
            <DropdownMenuItem>Préférences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Déconnexion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
