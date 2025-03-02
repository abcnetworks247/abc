"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MembersTable } from "@/components/Dashboard/MembersTable";
import { FileText, Users, CreditCard, Bell } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

export default function Page() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    clients: 0,
    donations: 0,
    subscriptions: 0,
  });

  const token = Cookies.get("adminToken");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await Api.get("/admin/auth/account/dashboarddata", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error(
          "Error fetching dashboard data:",
          error.response?.data || error.message
        );
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]); // Include `token` in dependencies if it's dynamic
  
  return (
    <>
      <main className="flex flex-col gap-5 px-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Blogs Card */}
          <Card className="bg-blue-100 border-blue-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-blue-800">
                Total Blogs
              </CardTitle>
              <CardDescription className="text-blue-600">
                All published articles
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-3xl font-bold text-blue-800">
                {dashboardData.blogs}
              </p>
              <div className="p-2 bg-blue-200 rounded-full">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Users Card */}
          <Card className="bg-purple-100 border-purple-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-purple-800">
                Total Users
              </CardTitle>
              <CardDescription className="text-purple-600">
                Registered accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-3xl font-bold text-purple-800">
                {dashboardData.clients}
              </p>
              <div className="p-2 bg-purple-200 rounded-full">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Donations Card */}
          <Card className="bg-green-100 border-green-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-green-800">
                Total Donations
              </CardTitle>
              <CardDescription className="text-green-600">
                All contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-3xl font-bold text-green-800">
                {dashboardData.donations}
              </p>
              <div className="p-2 bg-green-200 rounded-full">
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Subscriptions Card */}
          <Card className="bg-orange-100 border-orange-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-orange-800">
                Total Subscriptions
              </CardTitle>
              <CardDescription className="text-orange-600">
                Active subscribers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-3xl font-bold text-orange-800">
                {dashboardData.subscriptions}
              </p>
              <div className="p-2 bg-orange-200 rounded-full">
                <Bell className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {typeof window !== "undefined" ? (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
            {/* Chart components would go here */}
          </div>
        ) : (
          []
        )}

        <div className="">
          <MembersTable />
        </div>
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
