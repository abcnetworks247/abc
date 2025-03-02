"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Mail } from "lucide-react";
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
import { EMAIL_REGEX } from "@/utils/regex";
import HocsessionAuthenticated from "@/utils/HocsessionAuthenticated";

function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (value) => {
    if (!EMAIL_REGEX.test(value)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Sending recovery email...");

    try {
      const { data, status } = await Api.post("client/auth/recovery", {
        email,
      });

      if (status === 200) {
        toast.success(data.message, { id: toastId });
      } else {
        throw new Error(data.error || "Failed to send recovery email");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to send recovery email",
        {
          id: toastId,
        }
      );
      console.error("Recovery error:", error);
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
              Account Recovery
            </h2>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <p className="text-sm text-gray-600">
                Enter your email address to recover your account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`mt-1 ${errorMessage ? "border-red-500" : ""}`}
                    value={email}
                    onChange={handleInputChange}
                  />
                  {errorMessage && (
                    <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
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
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Recovery Email
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
            backgroundImage: `url("/signup.svg")`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default HocsessionAuthenticated(RecoveryPage);
