
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Music } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  artistCategory: z.string()
    .min(1, { message: "Please select an artist category" }),
  terms: z.boolean()
    .refine(value => value === true, { message: "You must accept the terms and conditions" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const ArtistSignupForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      artistCategory: "",
      terms: false
    }
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, this would call an auth API
    console.log('Signup submitted:', values);
    
    toast({
      title: "Account created!",
      description: "Your artist account has been created successfully.",
    });
    
    // Simulate a successful signup
    setTimeout(() => {
      navigate('/artist/dashboard');
    }, 1500);
  };
  
  // Artist categories
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
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-harmoniqa-purple to-harmoniqa-teal p-3 rounded-lg">
            <Music className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Create your artist account</CardTitle>
        <CardDescription className="text-center">
          Join Harmoniqa as an artist and showcase your talent
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      type="email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
                      <option value="">Select your category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    This helps event organizers find artists in your category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full mt-6">
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link 
            to="/artist/login" 
            className="text-primary font-medium hover:text-primary/90"
          >
            Sign in
          </Link>
        </div>
        <div className="text-center text-sm mt-2">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArtistSignupForm;
