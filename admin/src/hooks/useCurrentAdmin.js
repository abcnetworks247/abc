"use client";
import { useQuery } from "@tanstack/react-query";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

export default function useCurrentAdmin() {
  // getting user token from cookies
  const AuthToken = Cookies.get("adminToken");

  /**
   *@returns {object} user - user data
   *@returns {boolean} isLoading - loading state
   *@returns {boolean} isError - error state
   */
  const {
    data: CurrentUser,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["userAdminlist"],
    queryFn: async () => {
      const res = await Api.get("admin/auth/account", {
        headers: {
          Authorization: `Bearer ${String(AuthToken)}`,
        },
      });
      return res;
    },
  });

  return {
    CurrentUser,
    CurrentUsererror: isError,
    CurrentUserloading: isLoading,
    CurrentUserisSuccess: isSuccess,
  };
}
