'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useCurrentAdmin from '@/hooks/useCurrentAdmin';


const Layout = ({ children }) => {
  const router = useRouter();
  const [openNavItem, setOpenNavItem] = useState(false);
  const userRole = ['owner', 'superadmin', 'admin'];
  const { CurrentUser, isLoading } = useCurrentAdmin();


  const UserValue = CurrentUser && CurrentUser.data.olduser;

  useEffect(() => {
    const routeValidator = (role) => {
      if (!role.includes(UserValue.role)) {
        toast.error('Role Access Denied!');
        router.push('/dashboard');
        setOpenNavItem(true);
      } else {
        setOpenNavItem(false);
      }
    };

    routeValidator(userRole);
  }, [router]);

  return (
    <div>
      {openNavItem === false && children}
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
};

export default Layout;
