
import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <AuthLayout title="Create Your Organizer Account">
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
