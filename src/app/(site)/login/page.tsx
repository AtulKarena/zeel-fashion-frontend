import { Metadata } from 'next';
import React, { cache } from 'react';

import LoginForm from '../../(auth)/_components/login-form';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Login - Zeel Fashion`,
  };
}

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
