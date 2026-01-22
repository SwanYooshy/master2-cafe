import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 ml-64">
        <AppHeader title={title} />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
