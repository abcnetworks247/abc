"use client"
import { useContext, createContext, useState } from "react";
import useCurrentAdmin from "@/hooks/useCurrentAdmin";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const {
    CurrentUser,
    CurrentUsererror,
    CurrentUserloading,
    CurrentUserisSuccess,
  } = useCurrentAdmin();
  const Users = CurrentUser?.data;
  const UserInfo = Users?.olduser;
  console.log('userinfo',UserInfo )
  return (
    <AdminContext.Provider
      value={{
        UserInfo,
        CurrentUsererror,
        CurrentUserloading,
        CurrentUserisSuccess,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const UseAdminContext = () => {
  const admin = AdminContext;
  if (!admin) {
    throw new Error("user can not use admin provider");
  }
  return useContext(AdminContext);
};
