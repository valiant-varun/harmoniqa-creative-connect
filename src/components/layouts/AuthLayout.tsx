
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Music, Calendar, Star } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center text-white flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="mb-10">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">{title}</h1>
          {children}
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-harmoniqa-darkPurple/80 to-harmoniqa-darkTeal/80 backdrop-blur-sm justify-center items-center">
        <div className="max-w-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Organize Stunning Events with Harmoniqa</h2>
          <p className="text-xl mb-8">Connect with talented artists and create unforgettable experiences for your audience.</p>
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-4 mb-3">
                <Music className="h-8 w-8" />
              </div>
              <span className="text-sm">Diverse Talent</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-4 mb-3">
                <Calendar className="h-8 w-8" />
              </div>
              <span className="text-sm">Simple Booking</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-4 mb-3">
                <Star className="h-8 w-8" />
              </div>
              <span className="text-sm">Quality Performances</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
