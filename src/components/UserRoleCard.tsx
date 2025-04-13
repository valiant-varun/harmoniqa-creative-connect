
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, User } from 'lucide-react';

interface UserRoleCardProps {
  title: string;
  description: string;
  iconName: string;
}

const UserRoleCard: React.FC<UserRoleCardProps> = ({ title, description, iconName }) => {
  // Render the appropriate icon based on iconName
  const renderIcon = () => {
    switch (iconName) {
      case 'Music':
        return <Music className="h-6 w-6 mb-2" />;
      case 'User':
        return <User className="h-6 w-6 mb-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="role-card bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
      {renderIcon()}
      <h3 className="text-2xl font-semibold text-harmoniqa-darkPurple">{title}</h3>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <Button 
        className="bg-gradient-to-r from-harmoniqa-purple to-harmoniqa-teal hover:from-harmoniqa-darkPurple hover:to-harmoniqa-darkTeal text-white"
      >
        Select
      </Button>
    </div>
  );
};

export default UserRoleCard;
