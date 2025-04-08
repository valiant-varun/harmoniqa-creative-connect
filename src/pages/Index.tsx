
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import UserRoleCard from '@/components/UserRoleCard';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    if (role === 'Artist') {
      toast({
        title: "Artist Features Coming Soon",
        description: "The artist features are still under development. Stay tuned!",
      });
    } else if (role === 'Event Organizer') {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse-slow">
            Welcome to <span className="gradient-text">Harmoniqa!</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Where creativity meets opportunity. Book, perform, and shine with Harmoniqa.
          </p>
          
          <div className="w-full max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-medium mb-12">What are you?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <UserRoleCard 
                title="Artist" 
                description="Showcase your talent, get discovered, and book your next performance." 
                onClick={() => handleRoleSelect('Artist')}
              />
              
              <UserRoleCard 
                title="Event Organizer" 
                description="Find the perfect talent for your events, venues, or special occasions." 
                onClick={() => handleRoleSelect('Event Organizer')}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-black/40 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Harmoniqa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
