
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';

const SignupForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'organizer';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and privacy policy to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating registration - in a real app this would call an API
    setTimeout(() => {
      setIsLoading(false);
      // Store user session (simulated)
      localStorage.setItem('harmoniqa_user', JSON.stringify({ 
        email, 
        fullName,
        role
      }));
      toast({
        title: "Account created successfully!",
        description: "Welcome to Harmoniqa.",
      });
      navigate('/organizer/dashboard');
    }, 1500);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-white">
            Full Name
          </label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-harmoniqa-purple"
          />
        </div>
        
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
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-harmoniqa-purple"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-harmoniqa-purple pr-10"
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
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-harmoniqa-purple"
          />
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox 
            id="terms" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
            className="text-harmoniqa-purple border-white/50"
          />
          <label
            htmlFor="terms"
            className="text-sm text-white/80 leading-tight"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-harmoniqa-lightPurple hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-harmoniqa-lightPurple hover:text-white">
              Privacy Policy
            </Link>
          </label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 bg-gradient-to-r from-harmoniqa-purple to-harmoniqa-teal hover:from-harmoniqa-darkPurple hover:to-harmoniqa-darkTeal"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>

      <div className="text-center mt-6">
        <p className="text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-harmoniqa-lightPurple hover:text-white font-medium">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
