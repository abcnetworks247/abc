'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useCurrentAdmin from '@/hooks/useCurrentAdmin';
import { UseAdminContext } from '@/context/AdminContext';


const Layout = ({ children }) => {
  const router = useRouter();
  const [openNavItem, setOpenNavItem] = useState(false);
  const userRole = ['owner', 'superadmin', ];
  const { CurrentUser, isLoading } = useCurrentAdmin();

  console.log("Curr", CurrentUser);


  const UserValue = CurrentUser && CurrentUser;

  console.log("uservalue", UserValue);

  useEffect(() => {
    const routeValidator = (role) => {
      if (!role.includes("superadmin")) {
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
