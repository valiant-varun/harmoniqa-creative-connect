
import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <AuthLayout title="Welcome Back to Harmoniqa!">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
