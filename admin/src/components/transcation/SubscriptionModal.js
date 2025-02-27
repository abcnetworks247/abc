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
import {
  Calendar,
  CreditCard,
  User,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function SubscribeModal({ isOpen, premiumData, handleClose }) {
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
                <span>Subscription Details</span>
                <Badge
                  variant={
                    premiumData?.subscription_status === "paid"
                      ? "success"
                      : "warning"
                  }
                >
                  {premiumData?.subscription_status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Plan Type:</span>
                </div>
                <span className="text-sm">{premiumData?.plan_type}</span>

                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Order ID:</span>
                </div>
                <span className="text-sm truncate">
                  {premiumData?.subscription_id}
                </span>

                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Amount:</span>
                </div>
                <span className="text-sm font-semibold">
                  ${premiumData?.amount}
                </span>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Start Date:</span>
                </div>
                <span className="text-sm">
                  {formatDate(premiumData?.subscription_period_start)}
                </span>

                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">End Date:</span>
                </div>
                <span className="text-sm">
                  {formatDate(premiumData?.subscription_period_end)}
                </span>
              </div>

              <Separator />

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Plan Description:</span>
                </div>
                <span className="text-sm">
                  {premiumData?.subscription_name}
                </span>
              </div>

              <Separator />

              <div className="grid gap-2">
                <div className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">Invoice:</span>
                </div>
                <Link
                  href={premiumData?.hosted_invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Invoice
                </Link>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
        {/* <DialogFooter>
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
