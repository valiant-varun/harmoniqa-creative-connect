
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfilePhotoProps {
  initialPhoto?: string;
  onPhotoChange: (photoUrl: string | null) => void;
  name: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ initialPhoto, onPhotoChange, name }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialPhoto || null);
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server/storage
      // For this demo, we'll use local URL
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        onPhotoChange(result);
        toast({
          title: "Photo updated",
          description: "Your profile photo has been updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removePhoto = () => {
    setPhotoUrl(null);
    onPhotoChange(null);
    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed",
    });
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Avatar className="h-24 w-24 border-2 border-gray-200 dark:border-gray-700">
        {photoUrl ? (
          <AvatarImage src={photoUrl} alt={name} />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-harmoniqa-purple to-harmoniqa-teal text-white text-xl">
            {getInitials(name)}
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
          <label htmlFor="photo-upload" className="cursor-pointer">
            <Camera className="h-6 w-6 text-white" />
          </label>
          <input 
            id="photo-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handlePhotoUpload} 
          />
        </div>
        
        {photoUrl && (
          <button 
            onClick={removePhoto} 
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1" 
            aria-label="Remove photo"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhoto;
