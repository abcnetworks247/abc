


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/resources/assets/images/AbcstudioNo.png";
import { Toaster } from "sonner";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

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
import HocsessionAuthenticated from "@/utils/HocSessionAuthenticated";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/utils/regex";

function Page() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate fields as user types
    if (name === "email" && value) {
      validateField(
        "email",
        EMAIL_REGEX,
        value,
        "Please enter a valid email address."
      );
    }

    if (name === "password" && value) {
      validateField(
        "password",
        PASSWORD_REGEX,
        value,
        "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)"
      );
    }
  };

  const validateField = (fieldName, regex, value, errorMessage) => {
    if (!regex.test(value)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  };

  const allFieldsValid = Object.keys(errorMessages).every(
    (field) => !errorMessages[field]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allFieldsValid) {
      toast.error("Please fill in all the fields correctly");
      return;
    }

    setIsLoading(true);

    try {
      const data = await Api.post("admin/auth/signin", formData);

      if (data.status === 200) {
        // Store the user token after successful login
        Cookies.set("adminToken", data.data.authToken);

        toast.success(data.data.message);

        // Navigate to dashboard
        setTimeout(() => {
          router.push("/");
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }, 1000);
      } else {
        toast.error(data.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred during login"
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
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Welcome back, sign in to continue. 👏
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errorMessages.email ? "border-red-500" : ""}
                    />
                  </div>
                  {errorMessages.email && (
                    <p className="text-sm text-red-500">
                      {errorMessages.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Forgot Password?</span>{" "}
                <Link
                  href="/auth/recover"
                  className="text-primary font-medium hover:underline"
                >
                  Click Here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden lg:block lg:w-2/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10" />
        <Image
          src="https://img.freepik.com/free-vector/realistic-news-studio-background_23-2149985600.jpg?w=900&t=st=1704041393~exp=1704041993~hmac=ef8c67168940ab32d52441d724c3e9071e9c512d39bb0c93b385396487e5aab3"
          alt="Sign in background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

const SignIn = HocsessionAuthenticated(Page);

export default SignIn;
