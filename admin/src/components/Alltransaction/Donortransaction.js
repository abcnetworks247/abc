"use client";

import * as React from "react";
import axios from "axios";
import {
  Eye,
  Download,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Toaster, toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustompaymentFetch from "../Custom/CustompaymentFetch";

export default function DonorTransaction() {
  const [donorData, setDonorData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedDonor, setSelectedDonor] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showTransactionId, setShowTransactionId] = React.useState({});
  const itemsPerPage = 10;

  React.useEffect(() => {
    setLoading(true);
    CustompaymentFetch(`donate`)
      .then((data) => {
        setDonorData(data.data.data);
        setLoading(false);
        console.log(data.data.data, "donate data");
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Transaction ID copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const toggleTransactionId = (id) => {
    setShowTransactionId((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString, timeString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        date
      );
      return `${day} ${formatTime(timeString)}`;
    } catch {
      return "Invalid date";
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";

    try {
      const [hours, minutes] = timeString.split(":");
      const hour = Number.parseInt(hours);
      const amPm = hour >= 12 ? "pm" : "am";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes}${amPm}`;
    } catch {
      return "";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-500/20",
          text: "text-emerald-700 dark:text-emerald-400",
          icon: "🟢",
          hover: "hover:bg-emerald-100 dark:hover:bg-emerald-500/30",
        };
      case "failed":
        return {
          bg: "bg-red-50 dark:bg-red-500/20",
          text: "text-red-700 dark:text-red-400",
          icon: "🔴",
          hover: "hover:bg-red-100 dark:hover:bg-red-500/30",
        };
      case "pending":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-500/20",
          text: "text-yellow-700 dark:text-yellow-400",
          icon: "🟡",
          hover: "hover:bg-yellow-100 dark:hover:bg-yellow-500/30",
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-500/20",
          text: "text-gray-700 dark:text-gray-400",
          icon: "⚪",
          hover: "hover:bg-gray-100 dark:hover:bg-gray-500/30",
        };
    }
  };

  const getCurrencySymbol = (currency) => {
    switch (currency?.toLowerCase()) {
      case "usd":
        return "$";
      case "naira":
        return "₦";
      default:
        return "";
    }
  };

  const filteredData = React.useMemo(() => {
    return (
      donorData?.filter(
        (donor) =>
          donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.transaction_Id
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          donor.email?.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [donorData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <TooltipProvider>
      <div className="container mx-auto py-6 space-y-6">
        <Card className="border-0 shadow-sm">
         

          <CardContent>
            {error ? (
              <div className="rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-400">
                <p>{error}</p>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : donorData?.length ? (
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Transaction ID
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((donor) => {
                      const status = getStatusStyle(donor.payment_status);
                      return (
                        <React.Fragment key={donor._id || donor.transaction_Id}>
                          <TableRow className="group">
                            <TableCell className="font-medium">
                              {donor.name}
                            </TableCell>
                            <TableCell className="font-medium">
                              {getCurrencySymbol(donor.currency)}
                              {donor.amount}
                            </TableCell>
                            <TableCell>
                              {formatDate(
                                donor.donation_Date,
                                donor.donation_Time
                              )}
                            </TableCell>
                            <TableCell>
                              <div
                                className={cn(
                                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                                  status.bg,
                                  status.text,
                                  status.hover
                                )}
                              >
                                <span className="mr-1">{status.icon}</span>
                                {donor.payment_status}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell font-mono text-sm max-w-[150px]">
                              <div className="flex items-center gap-2">
                                <span className="truncate">
                                  {donor.transaction_Id}
                                </span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={() =>
                                        handleCopyToClipboard(
                                          donor.transaction_Id
                                        )
                                      }
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Copy ID</TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="md:hidden h-8 w-8"
                                  onClick={() =>
                                    toggleTransactionId(
                                      donor._id || donor.transaction_Id
                                    )
                                  }
                                >
                                  {showTransactionId[
                                    donor._id || donor.transaction_Id
                                  ] ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => {
                                        setSelectedDonor(donor);
                                        setDialogOpen(true);
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View details</TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                          </TableRow>
                          {/* Mobile Transaction ID row */}
                          {showTransactionId[
                            donor._id || donor.transaction_Id
                          ] && (
                            <TableRow className="md:hidden bg-muted/50">
                              <TableCell colSpan={6} className="py-2">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="font-mono text-sm truncate">
                                    <span className="text-muted-foreground">
                                      ID:{" "}
                                    </span>
                                    {donor.transaction_Id}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 shrink-0"
                                    onClick={() =>
                                      handleCopyToClipboard(
                                        donor.transaction_Id
                                      )
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  No donor transactions found.
                </p>
              </div>
            )}
          </CardContent>

          {donorData?.length > 0 && (
            <CardFooter className="border-t px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                  {filteredData.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex -space-x-px">
                    {Array.from({ length: Math.min(totalPages, 3) }).map(
                      (_, i) => (
                        <Button
                          key={i}
                          variant={
                            currentPage === i + 1 ? "default" : "outline"
                          }
                          size="sm"
                          className={cn(
                            "h-8 w-8",
                            currentPage === i + 1 && "z-10"
                          )}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      )
                    )}
                    {totalPages > 3 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8"
                          disabled
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={
                            currentPage === totalPages ? "default" : "outline"
                          }
                          size="sm"
                          className="h-8 w-8"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Complete information about this donation
              </DialogDescription>
            </DialogHeader>
            {selectedDonor && (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Donor Name
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {selectedDonor.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Email
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {selectedDonor.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Amount
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {getCurrencySymbol(selectedDonor.currency)}
                      {selectedDonor.amount}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Status
                    </h3>
                    <div
                      className={cn(
                        "mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                        getStatusStyle(selectedDonor.payment_status).bg,
                        getStatusStyle(selectedDonor.payment_status).text
                      )}
                    >
                      <span className="mr-1">
                        {getStatusStyle(selectedDonor.payment_status).icon}
                      </span>
                      {selectedDonor.payment_status}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Date & Time
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(
                        selectedDonor.donation_Date,
                        selectedDonor.donation_Time
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Payment Method
                    </h3>
                    <p className="mt-1 text-sm font-medium capitalize">
                      {selectedDonor.payment_method_types || "N/A"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Transaction ID
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-sm font-mono break-all">
                        {selectedDonor.transaction_Id}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() =>
                          handleCopyToClipboard(selectedDonor.transaction_Id)
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {selectedDonor.donationhistory && (
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Donation History
                      </h3>
                      <p className="mt-1 text-sm">
                        {selectedDonor.donationhistory}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
