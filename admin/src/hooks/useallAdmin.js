"use client";
import { useQuery } from "@tanstack/react-query";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

export default function useallAdmin() {
  // getting user token from cookies
  const AuthToken = Cookies.get("adminToken");

  /**
   *@returns {object} user - user data
   *@returns {boolean} isLoading - loading state
   *@returns {boolean} isError - error state
   */
  const {
    data: user,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["userAdminlist"],
    queryFn: async () => {
      const res = await Api.get("admin/auth/account/admin", {
        headers: {
            Authorization: `Bearer ${String(AuthToken)}`,
        },
      });
      return res
    },

  });
  
  return { user, isError, isLoading, isSuccess };
}
