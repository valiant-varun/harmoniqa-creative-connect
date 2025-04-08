
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  // User details state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notification preferences state
  const [emailNotifications, setEmailNotifications] = useState({
    bookings: true,
    messages: true,
    updates: false
  });
  
  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    showContactDetails: true,
    publicProfile: true
  });
  
  // Handle profile update
  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile details have been updated successfully."
    });
    setIsEditingProfile(false);
  };
  
  // Handle password change
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully."
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto animate-fade-in-up">
        {/* Profile Overview */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-harmoniqa-purple to-harmoniqa-teal h-32"></div>
          <div className="px-6 pt-0 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-harmoniqa-purple to-harmoniqa-teal flex items-center justify-center text-white text-4xl font-bold">
                      {fullName.charAt(0)}
                    </div>
                  )}
                </div>
                {isEditingProfile && (
                  <label className="absolute bottom-0 right-0 bg-harmoniqa-purple text-white rounded-full p-2 cursor-pointer">
                    <Upload className="h-5 w-5" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleProfileImageChange}
                    />
                  </label>
                )}
              </div>
              
              <div className="flex-1 md:mb-2">
                {isEditingProfile ? (
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="text-2xl font-bold mb-1 h-auto py-1"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{fullName}</h2>
                )}
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                    Event Organizer
                  </span>
                  <span>{email}</span>
                </p>
              </div>
              
              <Button
                variant={isEditingProfile ? "default" : "outline"}
                onClick={() => {
                  if (isEditingProfile) {
                    handleProfileUpdate();
                  } else {
                    setIsEditingProfile(true);
                  }
                }}
                className={isEditingProfile ? "bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple" : ""}
              >
                {isEditingProfile ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-harmoniqa-purple" />
              Account Settings
            </h2>
          </div>
          
          {/* Account Settings */}
          <Card className="md:col-span-3 border-none shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="grid gap-4 max-w-md">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="block text-sm font-medium">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="new-password" className="block text-sm font-medium">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={handlePasswordChange}
                    className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h4>
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Notification Preferences */}
          <div className="md:col-span-3 mt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-harmoniqa-purple" />
              Notification Preferences
            </h2>
          </div>
          
          <Card className="md:col-span-3 border-none shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Confirmations</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails when an artist confirms your booking</p>
                  </div>
                  <Switch
                    checked={emailNotifications.bookings}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, bookings: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chat Messages</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for new messages</p>
                  </div>
                  <Switch
                    checked={emailNotifications.messages}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, messages: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Platform Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about new features and improvements</p>
                  </div>
                  <Switch
                    checked={emailNotifications.updates}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, updates: checked})}
                  />
                </div>
              </div>
            </div>
          </Card>
          
          {/* Privacy Settings */}
          <div className="md:col-span-3 mt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-harmoniqa-purple" />
              Privacy Settings
            </h2>
          </div>
          
          <Card className="md:col-span-3 border-none shadow">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Contact Details to Artists</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Allow artists to see your contact information after booking is confirmed</p>
                  </div>
                  <Switch
                    checked={privacySettings.showContactDetails}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showContactDetails: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Make your profile visible to artists browsing the platform</p>
                  </div>
                  <Switch
                    checked={privacySettings.publicProfile}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, publicProfile: checked})}
                  />
                </div>
              </div>
            </div>
          </Card>
          
          {/* Payment Settings */}
          <div className="md:col-span-3 mt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-harmoniqa-purple" />
              Payment Settings
            </h2>
          </div>
          
          <Card className="md:col-span-3 border-none shadow">
            <div className="p-6">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-harmoniqa-purple" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Payment Methods Added Yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Add a payment method to easily pay artists for your events</p>
                <Button className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple">
                  Add Payment Method
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
