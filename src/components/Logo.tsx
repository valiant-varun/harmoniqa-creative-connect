
import React from 'react';
import { Music, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute -top-1 -left-1 text-harmoniqa-teal animate-pulse-slow">
          <Sparkles className="h-3 w-3" />
        </div>
        <div className="bg-gradient-to-br from-harmoniqa-purple to-harmoniqa-teal p-2 rounded-lg rotate-6 hover:rotate-0 transition-transform duration-300">
          <Music className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 text-harmoniqa-purple animate-pulse-slow" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-3 w-3" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl gradient-text tracking-tight">Harmoniqa</span>
        <span className="text-xs text-gray-200 -mt-1 tracking-widest">MUSIC CONNECTS</span>
      </div>
    </div>
  );
};

export default Logo;
