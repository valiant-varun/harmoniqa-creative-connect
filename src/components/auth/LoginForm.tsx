
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating authentication - in a real app this would call an API
    setTimeout(() => {
      setIsLoading(false);
      // Store user session (simulated)
      localStorage.setItem('harmoniqa_user', JSON.stringify({ 
        email, 
        role: 'organizer',
        name: 'Event Organizer'
      }));
      toast({
        title: "Login successful!",
        description: "Welcome back to Harmoniqa.",
      });
      navigate('/organizer/dashboard');
    }, 1500);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-harmoniqa-purple w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm text-harmoniqa-lightPurple hover:text-white">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-harmoniqa-purple w-full pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-harmoniqa-purple to-harmoniqa-teal hover:from-harmoniqa-darkPurple hover:to-harmoniqa-darkTeal"
      >
        {isLoading ? "Logging in..." : "Log in"}
      </Button>

      <div className="text-center mt-6">
        <p className="text-sm text-white/80">
          Don't have an account?{" "}
          <Link to="/signup?role=organizer" className="text-harmoniqa-lightPurple hover:text-white font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
