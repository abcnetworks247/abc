"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";
import { toast } from "sonner";
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
import { EMAIL_REGEX } from "@/utils/regex";
import HocsessionAuthenticated from "@/utils/HocSessionAuthenticated";

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage("");
  };

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await Api.post("admin/auth/recovery", formData);
      if (data.status === 200) {
        toast.success(data.data.message || "Recovery email sent successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "An error occurred during the recovery process"
      );
    } finally {
      setIsLoading(false);
    }
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
                Account Recovery
              </CardTitle>
              <CardDescription>
                Forgotten your password? Don't worry.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errorMessage ? "border-red-500" : ""}
                  />
                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Continue"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Remember your password?</span>{" "}
                <Link
                  href="/auth/signin"
                  className="text-primary font-medium hover:underline"
                >
                  Sign In
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
          alt="Recovery page background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

const Recover = HocsessionAuthenticated(Page);

export default Recover;
