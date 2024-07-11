'use client';

import React from 'react';
import { UseUserContext } from '../../../contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const layout = ({ children }) => {
  const { loading, UserData, Authtoken } = UseUserContext();

  const router = useRouter();

  



  // useEffect(() => {
  //   if (userpackage === 'basic' || userpackage === null || undefined) {
  //     router.push('/pricing');
  //   }
  // }, ['userpackage']);

  return <div>{children}</div>;
};

export default layout;
