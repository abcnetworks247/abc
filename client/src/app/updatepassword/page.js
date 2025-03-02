"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";
import Logo from "@/resources/assets/image/AbcstudioNo.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Api from "@/utils/Api";
import { PASSWORD_REGEX } from "@/utils/regex";
import HocUpdatePassword from "@/utils/HocUpdatePassword";

function UpdatePasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const reset = params.get("reset");

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const validateField = (name, value) => {
    if (name === "password") {
      if (!PASSWORD_REGEX.test(value)) {
        setErrorMessages((prev) => ({
          ...prev,
          password:
            "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)",
        }));
        return false;
      }
    } else if (name === "confirmPassword") {
      if (value !== passwordData.password) {
        setErrorMessages((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
        return false;
      }
    }
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = validateField("password", passwordData.password);
    const isConfirmPasswordValid = validateField(
      "confirmPassword",
      passwordData.confirmPassword
    );

    if (!isPasswordValid || !isConfirmPasswordValid) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Updating password...");

    try {
      const { data, status } = await Api.post(
        "client/auth/account/updatepassword",
        {
          reset,
          password: passwordData.password,
          confirmPassword: passwordData.confirmPassword,
        }
      );

      if (status === 200) {
        toast.success(data.message, { id: toastId });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(data.error || "Failed to update password");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update password", {
        id: toastId,
      });
      console.error("Password update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <Image
              src={Logo || "/placeholder.svg"}
              height={40}
              width={40}
              alt="Your Company"
              className="h-14 w-auto"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Update Password
            </h2>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <p className="text-sm text-gray-600">
                Enter your new password to update your account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`pr-10 ${
                        errorMessages.password ? "border-red-500" : ""
                      }`}
                      value={passwordData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errorMessages.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errorMessages.password}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={passwordVisible ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`pr-10 ${
                        errorMessages.confirmPassword ? "border-red-500" : ""
                      }`}
                      value={passwordData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errorMessages.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errorMessages.confirmPassword}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Lock className="mr-2 h-5 w-5" />
                      Update Password
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block bg-blue-900">
        <div
          className="w-full h-screen bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("/Login.svg")`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default HocUpdatePassword(UpdatePasswordPage);
