import { Metadata } from 'next';
import React, { cache } from 'react';

import SignupForm from '../../(auth)/_components/register-form';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Signup - zeel Fashion`,
  };
}

const SignupPage = () => {
  return <SignupForm />;
};

export default SignupPage;
