
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Music, User } from 'lucide-react';
import Logo from '@/components/Logo';
import UserRoleCard from '@/components/UserRoleCard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/95 bg-[url('/bg-pattern.svg')] bg-fixed bg-cover">
      {/* Navbar */}
      <header className="border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <Logo />
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="gradient-text">Harmoniqa!</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12">
            Where creativity meets opportunity. Find . Book . Perform
          </p>
          
          <div className="my-12">
            <h2 className="text-2xl sm:text-3xl font-medium mb-8">What are you?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Link to="/artist/signup">
                <UserRoleCard 
                  iconName="Music" 
                  title="Artist" 
                  description="Showcase your talent and get booked for events"
                />
              </Link>
              <Link to="/signup">
                <UserRoleCard 
                  iconName="User" 
                  title="Event Organizer" 
                  description="Find and book talented artists for your events"
                />
              </Link>
            </div>
          </div>
          
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-medium">Already registered?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/artist/login">
                <Button variant="outline" size="lg" className="gap-2">
                  <Music className="h-4 w-4" />
                  Artist Login
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="gap-2">
                  <User className="h-4 w-4" />
                  Organizer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto py-6 px-6 text-center text-muted-foreground">
          <p>© 2025 Harmoniqa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
