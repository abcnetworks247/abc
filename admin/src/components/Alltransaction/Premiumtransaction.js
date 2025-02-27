"use client";

import * as React from "react";
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
  ExternalLink,
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

export default function SubscriptionTransaction() {
  const [subscriptionData, setSubscriptionData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedSubscription, setSelectedSubscription] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showTransactionId, setShowTransactionId] = React.useState({});
  const itemsPerPage = 10;

  React.useEffect(() => {
    setLoading(true);
    CustompaymentFetch(`subscribe`)
      .then((data) => {
        console.log(data.data.data, "subscribe data");
        setSubscriptionData(data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(
          error.response?.data?.error || "Failed to fetch subscription data"
        );
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Subscription ID copied to clipboard");
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
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
      case "canceled":
        return {
          bg: "bg-amber-50 dark:bg-amber-500/20",
          text: "text-amber-700 dark:text-amber-400",
          icon: "🟡",
          hover: "hover:bg-amber-100 dark:hover:bg-amber-500/30",
        };
      case "failed":
        return {
          bg: "bg-red-50 dark:bg-red-500/20",
          text: "text-red-700 dark:text-red-400",
          icon: "🔴",
          hover: "hover:bg-red-100 dark:hover:bg-red-500/30",
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
      subscriptionData?.filter(
        (sub) =>
          sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.subscription_id
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          sub.subscription_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [subscriptionData, searchTerm]);

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
            ) : subscriptionData?.length ? (
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Subscription ID
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Subscription Name
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((subscription) => {
                      const status = getStatusStyle(
                        subscription.subscription_status
                      );
                      return (
                        <React.Fragment key={subscription._id}>
                          <TableRow className="group">
                            <TableCell className="font-medium">
                              {subscription.name}
                            </TableCell>
                            <TableCell>
                              {getCurrencySymbol(subscription.currency)}
                              {subscription.amount}
                            </TableCell>
                            <TableCell className="capitalize">
                              {subscription.plan_type}
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
                                {subscription.subscription_status}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell font-mono text-sm max-w-[150px]">
                              <div className="flex items-center gap-2">
                                <span className="truncate">
                                  {subscription.subscription_id}
                                </span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={() =>
                                        handleCopyToClipboard(
                                          subscription.subscription_id
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
                            <TableCell className="hidden md:table-cell max-w-[200px]">
                              <span className="truncate">
                                {subscription.subscription_name?.slice(14) ||
                                  "N/A"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="md:hidden h-8 w-8"
                                  onClick={() =>
                                    toggleTransactionId(subscription._id)
                                  }
                                >
                                  {showTransactionId[subscription._id] ? (
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
                                        setSelectedSubscription(subscription);
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
                          {/* Mobile Subscription Details row */}
                          {showTransactionId[subscription._id] && (
                            <TableRow className="md:hidden bg-muted/50">
                              <TableCell colSpan={7} className="p-4">
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                      Subscription ID:
                                    </span>
                                    <div className="flex items-center justify-between gap-2 mt-1">
                                      <span className="font-mono text-sm truncate">
                                        {subscription.subscription_id}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0"
                                        onClick={() =>
                                          handleCopyToClipboard(
                                            subscription.subscription_id
                                          )
                                        }
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                      Subscription Name:
                                    </span>
                                    <p className="mt-1 text-sm">
                                      {subscription.subscription_name?.slice(
                                        14
                                      ) || "N/A"}
                                    </p>
                                  </div>
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
                  No subscription transactions found.
                </p>
              </div>
            )}
          </CardContent>

          {subscriptionData?.length > 0 && (
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
              <DialogTitle>Subscription Details</DialogTitle>
              <DialogDescription>
                Complete information about this subscription
              </DialogDescription>
            </DialogHeader>
            {selectedSubscription && (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Subscriber Name
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {selectedSubscription.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Amount
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {getCurrencySymbol(selectedSubscription.currency)}
                      {selectedSubscription.amount}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Plan Type
                    </h3>
                    <p className="mt-1 text-sm font-medium capitalize">
                      {selectedSubscription.plan_type}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Status
                    </h3>
                    <div
                      className={cn(
                        "mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                        getStatusStyle(selectedSubscription.subscription_status)
                          .bg,
                        getStatusStyle(selectedSubscription.subscription_status)
                          .text
                      )}
                    >
                      <span className="mr-1">
                        {
                          getStatusStyle(
                            selectedSubscription.subscription_status
                          ).icon
                        }
                      </span>
                      {selectedSubscription.subscription_status}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Subscription Name
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {selectedSubscription.subscription_name?.slice(14) ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Period Start
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(
                        selectedSubscription.subscription_period_start
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Period End
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(selectedSubscription.subscription_period_end)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Subscription ID
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-sm font-mono break-all">
                        {selectedSubscription.subscription_id}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() =>
                          handleCopyToClipboard(
                            selectedSubscription.subscription_id
                          )
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {selectedSubscription.hosted_invoice_url && (
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Invoice
                      </h3>
                      <div className="mt-1">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            window.open(
                              selectedSubscription.hosted_invoice_url,
                              "_blank"
                            )
                          }
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Invoice
                        </Button>
                      </div>
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
