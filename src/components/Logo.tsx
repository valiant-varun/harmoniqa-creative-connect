
import React from 'react';
import { Music } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Music className="h-6 w-6 text-harmoniqa-purple" />
      <span className="font-bold text-xl gradient-text">Harmoniqa</span>
    </div>
  );
};

export default Logo;
