
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const accountFormSchema = z.object({
  email: z.string().email(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
  confirmPassword: z.string().optional(),
}).refine(data => !data.newPassword || data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine(data => !data.newPassword || data.currentPassword, {
  message: "Current password is required to set a new password",
  path: ["currentPassword"],
});

const notificationFormSchema = z.object({
  emailBookingRequests: z.boolean(),
  emailMessages: z.boolean(),
  emailBookingConfirmations: z.boolean(),
  emailMarketingUpdates: z.boolean(),
  smsBookingRequests: z.boolean(),
  smsBookingConfirmations: z.boolean(),
});

const privacyFormSchema = z.object({
  showContactInfo: z.boolean(),
  showLocation: z.boolean(),
  showPricing: z.boolean(),
  profileVisibility: z.string(),
});

const ArtistSettings: React.FC = () => {
  const { toast } = useToast();
  
  // Account form
  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: "artist@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  // Notification form
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailBookingRequests: true,
      emailMessages: true,
      emailBookingConfirmations: true,
      emailMarketingUpdates: false,
      smsBookingRequests: false,
      smsBookingConfirmations: true,
    },
  });
  
  // Privacy form
  const privacyForm = useForm<z.infer<typeof privacyFormSchema>>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      showContactInfo: true,
      showLocation: true,
      showPricing: true,
      profileVisibility: "public",
    },
  });
  
  // Load saved settings on mount
  useEffect(() => {
    // Load account settings
    const savedAccount = localStorage.getItem('harmoniqa_artist_account');
    if (savedAccount) {
      try {
        const accountData = JSON.parse(savedAccount);
        accountForm.reset(accountData);
      } catch (e) {
        console.error("Error parsing account data", e);
      }
    }
    
    // Load notification settings
    const savedNotifications = localStorage.getItem('harmoniqa_artist_notifications');
    if (savedNotifications) {
      try {
        const notificationData = JSON.parse(savedNotifications);
        notificationForm.reset(notificationData);
      } catch (e) {
        console.error("Error parsing notification data", e);
      }
    }
    
    // Load privacy settings
    const savedPrivacy = localStorage.getItem('harmoniqa_artist_privacy');
    if (savedPrivacy) {
      try {
        const privacyData = JSON.parse(savedPrivacy);
        privacyForm.reset(privacyData);
      } catch (e) {
        console.error("Error parsing privacy data", e);
      }
    }
    
    // Get user email from localStorage if available
    const storedUser = localStorage.getItem('harmoniqa_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData && userData.email) {
          accountForm.setValue('email', userData.email);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, [accountForm, notificationForm, privacyForm]);
  
  // Form submit handlers
  const onAccountSubmit = (data: z.infer<typeof accountFormSchema>) => {
    console.log('Account settings saved:', data);
    
    // Save to localStorage
    localStorage.setItem('harmoniqa_artist_account', JSON.stringify({
      email: data.email,
      // Don't store passwords in localStorage in a real app
    }));
    
    // Also update the user's email in the main user object
    const storedUser = localStorage.getItem('harmoniqa_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        userData.email = data.email;
        localStorage.setItem('harmoniqa_user', JSON.stringify(userData));
      } catch (e) {
        console.error("Error updating user data", e);
      }
    }
    
    toast({
      title: "Account settings saved",
      description: "Your account settings have been updated successfully.",
    });
  };
  
  const onNotificationSubmit = (data: z.infer<typeof notificationFormSchema>) => {
    console.log('Notification settings saved:', data);
    
    // Save to localStorage
    localStorage.setItem('harmoniqa_artist_notifications', JSON.stringify(data));
    
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const onPrivacySubmit = (data: z.infer<typeof privacyFormSchema>) => {
    console.log('Privacy settings saved:', data);
    
    // Save to localStorage
    localStorage.setItem('harmoniqa_artist_privacy', JSON.stringify(data));
    
    toast({
      title: "Privacy settings saved",
      description: "Your privacy settings have been updated.",
    });
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
      // In a real app, you would make an API call to delete the account
      
      // Clear all localStorage items
      localStorage.removeItem('harmoniqa_user');
      localStorage.removeItem('harmoniqa_artist_profile');
      localStorage.removeItem('harmoniqa_artist_social');
      localStorage.removeItem('harmoniqa_artist_photo');
      localStorage.removeItem('harmoniqa_artist_videos');
      localStorage.removeItem('harmoniqa_artist_images');
      localStorage.removeItem('harmoniqa_artist_account');
      localStorage.removeItem('harmoniqa_artist_notifications');
      localStorage.removeItem('harmoniqa_artist_privacy');
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted. Redirecting to home page...",
      });
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };
  
  return (
    <ArtistLayout title="Settings">
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        {/* Account Settings */}
        <TabsContent value="account">
          <Card className="border-harmoniqa-purple/10">
            <CardHeader className="bg-gradient-to-r from-harmoniqa-purple/5 to-transparent">
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your account information and password
              </CardDescription>
            </CardHeader>
            <Form {...accountForm}>
              <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={accountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormDescription>
                          This email will be used for account notifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    
                    <FormField
                      control={accountForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={accountForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={accountForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormDescription>
                      Leave the password fields empty if you don't want to change your password.
                    </FormDescription>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Danger Zone</h3>
                    <div className="p-4 border border-destructive rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-destructive">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">
                            This will permanently delete your account and all associated data.
                          </p>
                        </div>
                        <Button 
                          variant="destructive"
                          type="button"
                          onClick={handleDeleteAccount}
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple"
                  >
                    Save Account Settings
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="border-harmoniqa-purple/10">
            <CardHeader className="bg-gradient-to-r from-harmoniqa-purple/5 to-transparent">
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Customize how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <Form {...notificationForm}>
              <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    
                    <FormField
                      control={notificationForm.control}
                      name="emailBookingRequests"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Booking Requests</FormLabel>
                            <FormDescription>
                              Receive emails when you get a new booking request
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="emailMessages"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Messages</FormLabel>
                            <FormDescription>
                              Receive emails when you get a new message
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="emailBookingConfirmations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Booking Confirmations</FormLabel>
                            <FormDescription>
                              Receive emails when a booking is confirmed
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="emailMarketingUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Marketing Updates</FormLabel>
                            <FormDescription>
                              Receive emails about new features and promotions
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">SMS Notifications</h3>
                    
                    <FormField
                      control={notificationForm.control}
                      name="smsBookingRequests"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Booking Requests</FormLabel>
                            <FormDescription>
                              Receive text messages for new booking requests
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="smsBookingConfirmations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Booking Confirmations</FormLabel>
                            <FormDescription>
                              Receive text messages when a booking is confirmed
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit"
                    className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple"
                  >
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        
        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card className="border-harmoniqa-purple/10">
            <CardHeader className="bg-gradient-to-r from-harmoniqa-purple/5 to-transparent">
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control who can see your information and how it's displayed
              </CardDescription>
            </CardHeader>
            <Form {...privacyForm}>
              <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={privacyForm.control}
                    name="profileVisibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Visibility</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="public">Public - Visible to everyone</option>
                            <option value="registered">Registered Users Only</option>
                            <option value="private">Private - Only visible when you apply</option>
                          </select>
                        </FormControl>
                        <FormDescription>
                          Controls who can view your artist profile
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Information Visibility</h3>
                    
                    <FormField
                      control={privacyForm.control}
                      name="showContactInfo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Show Contact Information</FormLabel>
                            <FormDescription>
                              Allow organizers to see your contact details
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={privacyForm.control}
                      name="showLocation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Show Location</FormLabel>
                            <FormDescription>
                              Display your location on your profile
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={privacyForm.control}
                      name="showPricing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Show Pricing</FormLabel>
                            <FormDescription>
                              Display your rates publicly on your profile
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit"
                    className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple"
                  >
                    Save Privacy Settings
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
      </Tabs>
    </ArtistLayout>
  );
};

export default ArtistSettings;
