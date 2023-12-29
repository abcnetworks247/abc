"use client"
import { useQuery } from "@tanstack/react-query";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

export default function useUpdateProf() {
  const updateProf = async (formData) => {
    try {
      const token =  Cookies.get('adminToken');
      console.log(' all formdata', formData);
      const response = await Api.patch('admin/auth/account', formData, {
        headers: {
          Authorization: `Bearer ${String(token)}`,
          "Content-Type": "multipart/form-data",
        }
      });

      console.log('Response from update', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile', error);
      throw error;
    }
  };

  const {
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["update profile"],
    queryFn: updateProf,
  });

  return { isError, isLoading, isSuccess, updateProf };
}
