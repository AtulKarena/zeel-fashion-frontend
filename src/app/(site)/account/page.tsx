import { Metadata } from 'next';
import React, { cache } from 'react';

import Account from './_component/account';
export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Account - Zeel Fashion`,
  };
}

const LoginPage = () => {
  return <Account />;
};

export default LoginPage;
