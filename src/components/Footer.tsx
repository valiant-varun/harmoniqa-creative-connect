
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background/95 border-t backdrop-blur-sm py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Tagline Column */}
        <div className="space-y-4">
          <Logo className="h-10" />
          <p className="text-muted-foreground">
            Where creativity meets opportunity. Find . Book . Perform
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <Link to="/" className="block text-muted-foreground hover:text-foreground">Home</Link>
            <Link to="/artist/signup" className="block text-muted-foreground hover:text-foreground">Artist Signup</Link>
            <Link to="/signup" className="block text-muted-foreground hover:text-foreground">Organizer Signup</Link>
            <Link to="/artist/login" className="block text-muted-foreground hover:text-foreground">Artist Login</Link>
            <Link to="/login" className="block text-muted-foreground hover:text-foreground">Organizer Login</Link>
          </nav>
        </div>

        {/* Contact and Social Column */}
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="space-y-2">
            <p className="text-muted-foreground">Email: support@harmoniqa.com</p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 mt-8 text-center border-t pt-4">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Harmoniqa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
