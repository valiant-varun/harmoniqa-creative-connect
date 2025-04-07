
import React from 'react';
import { Button } from '@/components/ui/button';

interface UserRoleCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const UserRoleCard: React.FC<UserRoleCardProps> = ({ title, description, onClick }) => {
  return (
    <div className="role-card bg-white/90 backdrop-blur-sm">
      <h3 className="text-2xl font-semibold text-harmoniqa-darkPurple">{title}</h3>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <Button 
        onClick={onClick} 
        className="bg-gradient-to-r from-harmoniqa-purple to-harmoniqa-teal hover:from-harmoniqa-darkPurple hover:to-harmoniqa-darkTeal text-white"
      >
        Select
      </Button>
    </div>
  );
};

export default UserRoleCard;
