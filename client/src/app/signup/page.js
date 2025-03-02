"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff, UserPlus } from "lucide-react";
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
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "@/utils/regex";
import HocsessionAuthenticated from "@/utils/HocsessionAuthenticated";

function SignUpPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const validateField = (fieldName, regex, value, errorMessage) => {
    if (!regex.test(value)) {
      setErrorMessages((prev) => ({ ...prev, [fieldName]: errorMessage }));
      return false;
    } else {
      setErrorMessages((prev) => ({ ...prev, [fieldName]: "" }));
      return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "fullname":
        validateField(
          "fullname",
          USERNAME_REGEX,
          value,
          "Username must start with a letter and may include numbers or underscore"
        );
        break;
      case "email":
        validateField(
          "email",
          EMAIL_REGEX,
          value,
          "Please enter a valid email address"
        );
        break;
      case "password":
        validateField(
          "password",
          PASSWORD_REGEX,
          value,
          "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character"
        );
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFullnameValid = validateField(
      "fullname",
      USERNAME_REGEX,
      signUpFormData.fullname,
      "Invalid username format"
    );
    const isEmailValid = validateField(
      "email",
      EMAIL_REGEX,
      signUpFormData.email,
      "Invalid email format"
    );
    const isPasswordValid = validateField(
      "password",
      PASSWORD_REGEX,
      signUpFormData.password,
      "Invalid password format"
    );

    if (!isFullnameValid || !isEmailValid || !isPasswordValid) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      const { data, status } = await Api.post(
        "client/auth/signup",
        signUpFormData
      );

      if (status === 201) {
        toast.success(data.message, { id: toastId });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(data.error || "Error creating account");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error creating account", {
        id: toastId,
      });
      console.error("Signup error:", error);
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
            <h2 className="mt-6 text-xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <p className="text-sm text-gray-600">
                Enter your details to create your account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="name"
                    required
                    className={`mt-1 ${
                      errorMessages.fullname ? "border-red-500" : ""
                    }`}
                    value={signUpFormData.fullname}
                    onChange={handleInputChange}
                  />
                  {errorMessages.fullname && (
                    <p className="mt-2 text-sm text-red-600">
                      {errorMessages.fullname}
                    </p>
                  )}
                </div>

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
                    className={`mt-1 ${
                      errorMessages.email ? "border-red-500" : ""
                    }`}
                    value={signUpFormData.email}
                    onChange={handleInputChange}
                  />
                  {errorMessages.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errorMessages.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
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
                      value={signUpFormData.password}
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
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Sign up
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
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

export default HocsessionAuthenticated(SignUpPage);
