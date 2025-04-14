import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ArtistLayout from '@/components/layouts/ArtistLayout';
import ProfilePhoto from '@/components/artist/ProfilePhoto';
import MediaUploader from '@/components/artist/MediaUploader';
import { Facebook, Instagram, Globe, Twitter, Youtube } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  artistCategory: z.string().min(1, {
    message: "Please select a category.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().optional(),
  rate: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  website: z.string().optional(),
  youtube: z.string().optional(),
});

const ArtistProfile: React.FC = () => {
  const { toast } = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [user, setUser] = useState<{
    name: string;
    email?: string;
  }>({
    name: "Loading...",
  });
  const [portfolioImages, setPortfolioImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
  ]);
  const [youtubeVideos, setYoutubeVideos] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('harmoniqa_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          name: userData.name || "Guest User",
          email: userData.email,
        });
        
        const savedProfile = localStorage.getItem('harmoniqa_artist_profile');
        if (savedProfile) {
          const profileData = JSON.parse(savedProfile);
          form.reset(profileData);
        }
        
        const savedSocial = localStorage.getItem('harmoniqa_artist_social');
        if (savedSocial) {
          const socialData = JSON.parse(savedSocial);
          socialForm.reset(socialData);
        }
        
        const savedPhoto = localStorage.getItem('harmoniqa_artist_photo');
        if (savedPhoto) {
          setProfilePhoto(savedPhoto);
        }
        
        const savedVideos = localStorage.getItem('harmoniqa_artist_videos');
        if (savedVideos) {
          setYoutubeVideos(JSON.parse(savedVideos));
        }
        
        const savedImages = localStorage.getItem('harmoniqa_artist_images');
        if (savedImages) {
          setPortfolioImages(JSON.parse(savedImages));
        }
      } catch (e) {
        console.error("Error parsing user data", e);
        setUser({
          name: "Guest User",
        });
      }
    } else {
      setUser({
        name: "Guest User",
      });
    }
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      artistCategory: "Musician - Guitarist",
      location: "San Francisco, CA",
      bio: "Experienced guitarist with 8+ years performing at weddings, corporate events, and private parties. Specializing in acoustic covers and original compositions across multiple genres including pop, rock, and jazz.",
      contactEmail: "",
      contactPhone: "",
      rate: "$250/hour",
      instagram: "",
      twitter: "",
      facebook: "",
      website: "",
      youtube: "",
    },
  });
  
  useEffect(() => {
    if (user && user.name !== "Loading...") {
      form.setValue('fullName', user.name);
      if (user.email) {
        form.setValue('contactEmail', user.email);
      }
    }
  }, [user, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    localStorage.setItem('harmoniqa_artist_profile', JSON.stringify(values));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  }

  const handleProfilePhotoChange = (photoUrl: string | null) => {
    setProfilePhoto(photoUrl);
    if (photoUrl) {
      localStorage.setItem('harmoniqa_artist_photo', photoUrl);
    } else {
      localStorage.removeItem('harmoniqa_artist_photo');
    }
  };

  const categories = [
    "Musician - Guitarist",
    "Musician - Pianist",
    "Musician - Vocalist",
    "Musician - DJ",
    "Musician - Band",
    "Dancer",
    "Magician",
    "Comedian",
    "Painter",
    "Photographer",
    "Other"
  ];

  const socialForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagram: "",
      twitter: "",
      facebook: "",
      website: "",
      youtube: "",
    },
  });

  const onSocialSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    localStorage.setItem('harmoniqa_artist_social', JSON.stringify(values));
    
    toast({
      title: "Social links updated",
      description: "Your social media links have been updated successfully",
    });
  };
  
  const handleAddYoutubeVideo = () => {
    if (!youtubeUrl) return;
    
    if (youtubeUrl.includes('youtube.com') || youtubeUrl.includes('youtu.be')) {
      const newVideos = [...youtubeVideos, youtubeUrl];
      setYoutubeVideos(newVideos);
      setYoutubeUrl('');
      
      localStorage.setItem('harmoniqa_artist_videos', JSON.stringify(newVideos));
      
      toast({
        title: "Video added",
        description: "Your YouTube video has been added to your portfolio",
      });
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
    }
  };
  
  const handleRemoveYoutubeVideo = (index: number) => {
    const newVideos = [...youtubeVideos];
    newVideos.splice(index, 1);
    setYoutubeVideos(newVideos);
    
    localStorage.setItem('harmoniqa_artist_videos', JSON.stringify(newVideos));
  };

  return (
    <ArtistLayout title="My Profile & Portfolio">
      <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <ProfilePhoto 
                    initialPhoto={profilePhoto || ""} 
                    onPhotoChange={handleProfilePhotoChange}
                    name={user.name}
                  />
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="artistCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artist Category</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormDescription>Your primary performance location.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio / Introduction</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell organizers about yourself, your experience, style, and what makes you unique..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>Maximum 500 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact & Booking Information</CardTitle>
                <CardDescription>
                  How event organizers can reach you and book your services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate / Pricing</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $200/hour or $500/event" {...field} />
                      </FormControl>
                      <FormDescription>
                        This helps organizers understand your pricing expectations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple">Save Profile</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
        
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Gallery</CardTitle>
            <CardDescription>
              Upload photos and videos of your performances to showcase your talent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <MediaUploader 
              portfolioImages={portfolioImages}
              setPortfolioImages={(images) => {
                setPortfolioImages(images);
                localStorage.setItem('harmoniqa_artist_images', JSON.stringify(images));
              }}
            />
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">YouTube Videos</h3>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input 
                  placeholder="Paste YouTube video URL" 
                  value={youtubeUrl} 
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddYoutubeVideo}
                  className="bg-harmoniqa-teal hover:bg-harmoniqa-darkTeal"
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Add YouTube Video
                </Button>
              </div>
              
              {youtubeVideos.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  {youtubeVideos.map((url, index) => {
                    let videoId = '';
                    if (url.includes('youtube.com/watch?v=')) {
                      videoId = url.split('v=')[1].split('&')[0];
                    } else if (url.includes('youtu.be/')) {
                      videoId = url.split('youtu.be/')[1].split('?')[0];
                    }
                    
                    return (
                      <div key={index} className="relative">
                        <iframe
                          width="100%"
                          height="215"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`YouTube video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-md"
                        ></iframe>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveYoutubeVideo(index)}
                          className="absolute top-2 right-2"
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Social Media & Online Presence</CardTitle>
            <CardDescription>
              Connect your social profiles to help organizers learn more about you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...socialForm}>
              <form onSubmit={socialForm.handleSubmit(onSocialSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={socialForm.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                              <Instagram className="h-4 w-4" />
                            </span>
                            <Input 
                              className="rounded-l-none" 
                              placeholder="username" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={socialForm.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                              <Twitter className="h-4 w-4" />
                            </span>
                            <Input 
                              className="rounded-l-none" 
                              placeholder="username" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={socialForm.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                              <Facebook className="h-4 w-4" />
                            </span>
                            <Input 
                              className="rounded-l-none" 
                              placeholder="username or page name" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={socialForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                              <Globe className="h-4 w-4" />
                            </span>
                            <Input 
                              className="rounded-l-none"
                              placeholder="https://yourwebsite.com" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={socialForm.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Channel</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                            <Youtube className="h-4 w-4" />
                          </span>
                          <Input 
                            className="rounded-l-none"
                            placeholder="https://youtube.com/c/yourchannel" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple">Save Social Links</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ArtistLayout>
  );
};

export default ArtistProfile;
