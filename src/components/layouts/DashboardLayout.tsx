
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Search, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Moon, 
  Sun,
  Menu,
  X
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('harmoniqa_user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }

    // Check for dark mode preference
    const isDark = localStorage.getItem('harmoniqa_dark_mode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('harmoniqa_user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('harmoniqa_dark_mode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const navLinks = [
    { icon: Home, label: 'Dashboard', path: '/organizer/dashboard' },
    { icon: Calendar, label: 'My Bookings', path: '/organizer/bookings' },
    { icon: Search, label: 'Find Artists', path: '/organizer/artists' },
    { icon: MessageSquare, label: 'Messages', path: '/organizer/messages' },
    { icon: Settings, label: 'Profile Settings', path: '/organizer/settings' },
    { icon: HelpCircle, label: 'Help & FAQs', path: '/organizer/help' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-harmoniqa-purple text-white p-2 rounded-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/organizer/dashboard">
              <Logo className="mx-auto" />
            </Link>
          </div>
          
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-harmoniqa-purple/10 to-harmoniqa-teal/10 text-harmoniqa-purple dark:text-harmoniqa-lightPurple'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <link.icon className="w-5 h-5 mr-3" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="flex items-center p-3 w-full text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5 mr-3" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 mr-3" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center p-3 w-full text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-red-500 mt-2"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{navLinks.find(link => isActive(link.path))?.label || 'Dashboard'}</h1>
          {user && (
            <div className="flex items-center">
              <span className="mr-2 hidden sm:inline-block">{user.name || user.fullName}</span>
              <div className="w-9 h-9 bg-gradient-to-br from-harmoniqa-purple to-harmoniqa-teal rounded-full flex items-center justify-center text-white font-medium">
                {(user.name || user.fullName || 'U').charAt(0)}
              </div>
            </div>
          )}
        </header>
        
        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
