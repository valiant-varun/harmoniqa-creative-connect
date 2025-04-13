import React from 'react';
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
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { Image, Plus, Upload, X } from 'lucide-react';

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
  website: z.string().optional(),
});

const ArtistProfile: React.FC = () => {
  const [portfolioImages, setPortfolioImages] = React.useState<string[]>([
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
  ]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "Alex Morgan",
      artistCategory: "Musician - Guitarist",
      location: "San Francisco, CA",
      bio: "Experienced guitarist with 8+ years performing at weddings, corporate events, and private parties. Specializing in acoustic covers and original compositions across multiple genres including pop, rock, and jazz.",
      contactEmail: "alex.morgan@example.com",
      contactPhone: "+1 (555) 123-4567",
      rate: "$250/hour",
      instagram: "alexmorganmusic",
      twitter: "alexmorganplays",
      website: "alexmorgan.music",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: Handle form submission
  }

  const removeImage = (index: number) => {
    setPortfolioImages(portfolioImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = () => {
    // This would normally open a file picker, but for demo purposes, we'll add a mock image
    const mockNewImage = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4";
    setPortfolioImages([...portfolioImages, mockNewImage]);
  };

  // Artist categories for dropdown
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
      instagram: form.getValues('instagram'),
      twitter: form.getValues('twitter'),
      website: form.getValues('website'),
    },
  });

  const onSocialSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO: Handle social form submission
  };

  return (
    <ArtistLayout title="My Profile & Portfolio">
      <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
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
                <Button type="submit">Save Profile</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
        
        {/* Portfolio Section */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Gallery</CardTitle>
            <CardDescription>
              Upload photos and videos of your performances to showcase your talent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={`${image}?w=400&h=300&fit=crop`} 
                    alt={`Portfolio item ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <button 
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-background/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-48 border-dashed" 
                onClick={handleImageUpload}
              >
                <Upload className="h-8 w-8 mb-2" />
                <span>Upload Media</span>
              </Button>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Add YouTube/Video Link</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Social Media Links */}
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
                              @
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
                              @
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
                
                <FormField
                  control={socialForm.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourwebsite.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit">Save Social Links</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ArtistLayout>
  );
};

export default ArtistProfile;
