
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,
  User,
  Calendar,
  Inbox,
  BookCheck,
  Settings,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Music
} from 'lucide-react';
import { useDarkMode } from '@/components/ui/dark-mode/DarkModeContext';
import Logo from '@/components/Logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ArtistLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ArtistLayout: React.FC<ArtistLayoutProps> = ({ children, title }) => {
  const { theme, toggleTheme } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { name: 'Dashboard', path: '/artist/dashboard', icon: Home },
    { name: 'My Profile', path: '/artist/profile', icon: User },
    { name: 'Availability', path: '/artist/availability', icon: Calendar },
    { name: 'Booking Requests', path: '/artist/booking-requests', icon: Inbox },
    { name: 'Confirmed Events', path: '/artist/events', icon: BookCheck },
    { name: 'Messages', path: '/artist/messages', icon: Inbox },
    { name: 'Settings', path: '/artist/settings', icon: Settings },
    { name: 'Help & Support', path: '/artist/help', icon: HelpCircle },
  ];

  const renderNavigation = () => (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <Link to="/" className="inline-block transition-transform hover:scale-105">
          <Logo className="mb-6" />
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navigationItems.map((item) => {
          const NavIcon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                active 
                  ? 'bg-harmoniqa-purple/20 text-harmoniqa-purple dark:text-harmoniqa-lightPurple' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <NavIcon className={`mr-3 h-5 w-5 ${active ? 'text-harmoniqa-purple dark:text-harmoniqa-lightPurple' : ''}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Appearance</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <Link 
          to="/" 
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {!isMobile && (
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-r-harmoniqa-purple/10">
          {renderNavigation()}
        </aside>
      )}
      
      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur border-b-harmoniqa-purple/10">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                {renderNavigation()}
              </SheetContent>
            </Sheet>
          )}
          
          <div className="flex-1 md:ml-4 flex items-center">
            {isMobile && (
              <Link to="/" className="mr-4 transition-transform hover:scale-105">
                <div className="flex items-center">
                  <Music className="h-6 w-6 text-harmoniqa-purple" />
                  <span className="ml-2 font-semibold text-harmoniqa-purple">Artist Portal</span>
                </div>
              </Link>
            )}
            <h1 className="text-xl font-semibold text-foreground">
              {title || "Artist Portal"}
            </h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ArtistLayout;
