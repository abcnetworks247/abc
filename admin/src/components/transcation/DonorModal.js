"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Clock, Calendar, CreditCard, User } from "lucide-react";

export default function DonorModal({ isOpen, donorData, handleClose }) {
  const formatTime = (timeString) => {
    if (!timeString) return "Invalid time";
    const [hours, minutes] = timeString.split(":").map(Number);
    return format(new Date().setHours(hours, minutes), "h:mm a");
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="">
        <ScrollArea className="max-h-[80vh] px-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Donation Details</span>
                <Badge
                  variant={
                    donorData?.payment_status === "paid" ? "success" : "warning"
                  }
                >
                  {donorData?.payment_status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Date:</span>
                </div>
                <span className="text-sm">
                  {/* {formatDate(donorData?.donation_Date)} */}
                  {donorData?.donation_Date}
                </span>

                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Time:</span>
                </div>
                <span className="text-sm">
                  {/* {formatTime(donorData?.donation_Time)} */}
                  {donorData?.donation_Time}
                </span>

                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Transaction ID:</span>
                </div>
                <span className="text-sm truncate">
                  {donorData?.transaction_Id}
                </span>

                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Amount:</span>
                </div>
                <span className="text-sm font-semibold">
                  ${donorData?.amount}
                </span>
              </div>

              <Separator />

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Email:</span>
                </div>
                <Link
                  href={`mailto:${donorData?.email}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {donorData?.email}
                </Link>
              </div>

              <Separator />

              <div className="grid gap-2">
                <span className="text-sm font-medium">Payment Method:</span>
                <span className="text-sm">
                  {donorData?.payment_method_types}
                </span>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
