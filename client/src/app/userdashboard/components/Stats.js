"use client";
import { useRouter } from "next/navigation";
import { UseUserContext } from "../../../../contexts/UserContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  CreditCard,
  Video,
  Newspaper,
  ExternalLink,
} from "lucide-react";

const Stats = () => {
  const { UserData } = UseUserContext();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="w-full flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Donation History Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-rose-50 border-rose-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Donation History
            </CardTitle>
            <Heart className="h-5 w-5 text-rose-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View your past donations and contribution history
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleNavigation("/userdashboard/transactions")}
            >
              View History
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Subscription Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-violet-50 border-violet-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Subscription</CardTitle>
            <CreditCard className="h-5 w-5 text-violet-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your subscription plans and payment methods
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleNavigation("/userdashboard/transactions")}
            >
              Manage Subscription
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Live Video Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-emerald-50 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Live Video</CardTitle>
            <Video className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Watch live streams and recorded video content
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleNavigation("/live")}
            >
              Watch Now
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* News Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">News</CardTitle>
            <Newspaper className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest news and announcements
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleNavigation("/")}
            >
              Read News
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-md mx-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50 opacity-50"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full opacity-70 blur-xl"></div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 rounded-full opacity-70 blur-xl"></div>

        <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome, {UserData?.fullname || "Friend"}!
            </h2>
            <p className="text-slate-600 max-w-md">
              Track your activity, manage your subscriptions, and stay updated
              with the latest content all in one place.
            </p>
            <div className="flex gap-3">
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Complete Profile
              </Button>
              <Button variant="outline" size="sm">
                Explore Features
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center p-4 bg-white bg-opacity-80 rounded-lg shadow-sm border border-slate-100 w-full lg:w-auto">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="flex flex-col items-center p-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-slate-600">
                  Donations
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {UserData?.donationhistory?.length || 0}
                </span>
              </div>
              <div className="flex flex-col items-center p-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-slate-600">
                  Subscriptions
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {UserData?.subscriptions?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
