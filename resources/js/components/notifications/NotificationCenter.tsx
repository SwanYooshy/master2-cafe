import { Bell, Volume2, VolumeX, Check, Trash2, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { OrderNotification } from '@/types/notifications';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCenterProps {
  notifications: OrderNotification[];
  unreadCount: number;
  soundEnabled: boolean;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: () => void;
  onToggleSound: () => void;
}

export function NotificationCenter({
  notifications,
  unreadCount,
  soundEnabled,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onToggleSound,
}: NotificationCenterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-pulse-subtle">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-primary" />
              ) : (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            {notifications.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onMarkAllAsRead}
                  title="Mark all as read"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onClear}
                  title="Clear all"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-10 w-10 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
            <p className="text-xs text-muted-foreground/70">
              You'll see order alerts here
            </p>
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'flex gap-3 p-3 transition-colors hover:bg-muted/50 cursor-pointer',
                    !notification.read && 'bg-accent/5'
                  )}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                      notification.type === 'new_order'
                        ? 'bg-status-pending/15 text-status-pending'
                        : 'bg-status-preparing/15 text-status-preparing'
                    )}
                  >
                    {notification.type === 'new_order' ? (
                      <ShoppingBag className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          'text-sm leading-tight',
                          !notification.read && 'font-medium'
                        )}
                      >
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-accent mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer */}
        {unreadCount > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={onMarkAllAsRead}
              >
                Mark all as read
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
