
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Music } from 'lucide-react';

const formSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(1, { message: "Password is required" })
});

const ArtistLoginForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, this would call an auth API
    console.log('Login submitted:', values);
    
    toast({
      title: "Login successful!",
      description: "Redirecting to your dashboard...",
    });
    
    // Simulate a successful login
    setTimeout(() => {
      navigate('/artist/dashboard');
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-harmoniqa-purple to-harmoniqa-teal p-3 rounded-lg">
            <Music className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
        <CardDescription className="text-center">
          Enter your artist credentials below to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link 
                      to="/artist/forgot-password" 
                      className="text-sm font-medium text-primary hover:text-primary/90"
                    >
                      Forgot Password?
                    </Link>
                  </div>
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
            
            <Button type="submit" className="w-full mt-6">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link 
            to="/artist/signup" 
            className="text-primary font-medium hover:text-primary/90"
          >
            Sign up
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

export default ArtistLoginForm;
