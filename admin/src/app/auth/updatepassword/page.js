"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/resources/assets/images/AbcstudioNo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import Api from "@/utils/Api";
import { PASSWORD_REGEX } from "@/utils/regex";

import HocUpadate from "@/utils/HocUpadate";

function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const reset = params.get("reset");

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    reset,
  });

  const [errorMessages, setErrorMessages] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = "";
    if (fieldName === "password") {
      if (!PASSWORD_REGEX.test(value)) {
        error =
          "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)";
      }
    } else if (fieldName === "confirmPassword") {
      if (value !== formData.password) {
        error = "Passwords do not match";
      }
    }
    setErrorMessages((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessages.password || errorMessages.confirmPassword) {
      toast.error("Please correct the errors before submitting");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const data = await Api.post(
        "admin/auth/account/updatepassword",
        formData
      );

      if (data.status === 200) {
        toast.success(data.data.message || "Password updated successfully");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        toast.error("Error updating password");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "An error occurred while updating the password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />

      <div className="flex flex-col justify-center items-center w-full lg:w-3/5 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Image
              src={Logo}
              alt="Company Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
          </div>

          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Update Password
              </CardTitle>
              <CardDescription>
                Congratulations, you are one step away. 😇
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={
                        errorMessages.password
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {passwordVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errorMessages.password && (
                    <p className="text-sm text-red-500">
                      {errorMessages.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={
                        errorMessages.confirmPassword
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {passwordVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errorMessages.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errorMessages.confirmPassword}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">
                  By making this change, you agree with our{" "}
                  <Link
                    href="/terms"
                    className="text-primary font-medium hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link
                    href="/policy"
                    className="text-primary font-medium hover:underline"
                  >
                    Policy
                  </Link>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden lg:block lg:w-2/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10" />
        <Image
          src="https://img.freepik.com/free-vector/realistic-news-studio-background_23-2149985600.jpg?w=900&t=st=1704041393~exp=1704041993~hmac=ef8c67168940ab32d52441d724c3e9071e9c512d39bb0c93b385396487e5aab3"
          alt="Update password background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

const UpdatePassword = HocUpadate(Page);

export default UpdatePassword;
