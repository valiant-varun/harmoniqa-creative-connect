
import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import ArtistLoginForm from '@/components/auth/ArtistLoginForm';

const ArtistLogin: React.FC = () => {
  return (
    <AuthLayout title="Welcome Back, Artist!">
      <ArtistLoginForm />
    </AuthLayout>
  );
};

export default ArtistLogin;
