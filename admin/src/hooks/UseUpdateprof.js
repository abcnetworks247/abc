"use client"
import { useQuery } from "@tanstack/react-query";
import Api from "@/utils/Api";
import Cookies from "js-cookie";
export default function UseUpdateprof(params) {
  const {
    isError,
    isLoading,
    isSuccess,} = useQuery({
    queryKey:["update profile"],
     queryFn:  async function() {
        const Token = await Cookies.get('adminToken')
        const res = await Api.patch('admin/auth/account', params , {
             headers:{
                Authorization: `Bearer ${String(Token)}`
             }
        })

        return res
     }
  })
}
