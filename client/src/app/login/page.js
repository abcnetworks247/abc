"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import Api from "@/utils/Api";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/utils/regex";
import HocsessionAuthenticated from "@/utils/HocsessionAuthenticated";

function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [logInFormData, setlogInFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
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
    setlogInFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      validateField(
        "email",
        EMAIL_REGEX,
        value,
        "Please enter a valid email address."
      );
    } else if (name === "password") {
      validateField(
        "password",
        PASSWORD_REGEX,
        value,
        "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateField(
      "email",
      EMAIL_REGEX,
      logInFormData.email,
      "Please enter a valid email address."
    );
    const isPasswordValid = validateField(
      "password",
      PASSWORD_REGEX,
      logInFormData.password,
      "Invalid password format."
    );

    if (!isEmailValid || !isPasswordValid) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Signing in...");

    try {
      const { data, status } = await Api.post(
        "client/auth/signin",
        logInFormData,
        {
          withCredentials: true,
        }
      );

      if (status === 200) {
        Cookies.set("authToken", data.authToken, {
          expires: rememberMe ? 30 : 1,
        });
        toast.success("Signed in successfully", { id: toastId });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed", {
        id: toastId,
      });
      console.error("Login error:", error);
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
              src={Logo}
              height={40}
              width={40}
              alt="Your Company"
              className="h-14 w-auto"
            />
            <h2 className="mt-6 text-xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <p className="text-sm text-gray-600">
                Enter your credentials to access your account
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
                    className={`mt-1 ${
                      errorMessages.email ? "border-red-500" : ""
                    }`}
                    value={logInFormData.email}
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
                      autoComplete="current-password"
                      required
                      className={`pr-10 ${
                        errorMessages.password ? "border-red-500" : ""
                      }`}
                      value={logInFormData.password}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked)}
                    />
                    <Label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </Label>
                  </div>
                  <div className="text-sm">
                    <Link
                      href="/recovery"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
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
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign in
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-600">
                Not a member?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Create account
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

export default HocsessionAuthenticated(LoginPage);
