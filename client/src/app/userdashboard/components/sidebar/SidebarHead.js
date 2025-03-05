"use client";
import { UseUserContext } from "../../../../../contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Mail } from "lucide-react";

const SidebarHead = () => {
  const { UserData, HandleGetUser } = UseUserContext();

  // Loading state
  if (!UserData) {
    return (
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center gap-2 pt-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get first letter of first and last name for avatar fallback
  const getInitials = () => {
    if (!UserData.fullname) return "U";
    const names = UserData.fullname.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return UserData.fullname[0].toUpperCase();
  };

  // Determine package color
  const getPackageBadgeStyle = () => {
    const packageName = UserData.userpackage?.toLowerCase() || "";

    if (packageName.includes("premium") || packageName.includes("gold")) {
      return "bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-medium";
    } else if (
      packageName.includes("pro") ||
      packageName.includes("platinum")
    ) {
      return "bg-gradient-to-r from-slate-500 to-slate-700";
    } else if (
      packageName.includes("elite") ||
      packageName.includes("diamond")
    ) {
      return "bg-gradient-to-r from-blue-400 to-indigo-500";
    }

    return "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-800";
  };

  return (
    <Card className="border-none shadow-none bg-transparent overflow-visible">
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-white shadow-md">
              <AvatarImage
                src={UserData.userdp}
                alt={UserData.fullname || "User"}
              />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {UserData.userpackage && (
              <div className="absolute -bottom-2 -right-2">
                <div className="bg-white rounded-full p-1 shadow-md">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-base text-slate-800 line-clamp-1">
              {UserData.fullname || "User"}
            </h3>

            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Mail className="h-3.5 w-3.5" />
              <span className="line-clamp-1 text-xs">{UserData.email}</span>
            </div>

            {UserData.userpackage && (
              <Badge
                variant="secondary"
                className={`mt-1 ${getPackageBadgeStyle()}`}
              >
                {UserData.userpackage}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SidebarHead;
