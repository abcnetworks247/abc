"use client";
import Api from "@/utils/Api";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import Cookies from "js-cookie";

export default function UseUserlist() {
  // getting user token from cookies
  const AuthToken = Cookies.get("adminToken");
  /**
   *@returns {object} user - user data
   *@returns {boolean} isLoading - loading state
   *@returns {boolean} isError - error state
   */
  const {
    data: user,
    isLoading,
    isError,
    isSuccess
  } = useQuery({ 
    queryKey:['userlist'],
    queryFn: async () => {
    const res = await Api.get("admin/auth/account/client", {
      headers: {
        Authorization: `Bearer ${String(AuthToken)}`,
      },
    });
    return res.data;

  }});
  return { user, isLoading, isError, isSuccess};
}
