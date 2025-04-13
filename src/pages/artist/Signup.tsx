
import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import ArtistSignupForm from '@/components/auth/ArtistSignupForm';

const ArtistSignup: React.FC = () => {
  return (
    <AuthLayout title="Create Your Artist Account">
      <ArtistSignupForm />
    </AuthLayout>
  );
};

export default ArtistSignup;
