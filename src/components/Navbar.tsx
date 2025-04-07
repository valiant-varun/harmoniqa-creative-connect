
import React from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10">
      <Logo />
      <div className="flex gap-4">
        <Button variant="link" className="text-white hover:text-harmoniqa-lightPurple">Login</Button>
        <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
