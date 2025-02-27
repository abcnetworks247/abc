"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  Search,
  UserPlus,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Trash2,
  Loader2,
  Filter,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { AddMember } from "@/components/User/AddUser";
import UseUserlist from "@/hooks/UseUserlist";
import Api from "@/utils/Api";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Basic",
    value: "basic",
  },
  {
    label: "Copper",
    value: "copper",
  },
  {
    label: "Silver",
    value: "silver",
  },
  {
    label: "Gold",
    value: "gold",
  },
  {
    label: "Diamond",
    value: "diamond",
  },
  {
    label: "Titanium",
    value: "titanium",
  },
];

const TABLE_HEAD = ["Member", "Package", "Creation Date", "Actions"];

export default function MembersPage() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { users, isLoading, isError, isSuccess, refetch } = UseUserlist();

  const handleOpen = () => setOpen(!open);

  const ITEMS_PER_PAGE = 10;

  // Filter users based on search query and active tab
  const filteredUsers = users
    ? users.data.filter((user) => {
        const matchesSearch =
          user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab =
          activeTab === "all" || user.userpackage === activeTab;

        return matchesSearch && matchesTab;
      })
    : [];

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  const token = Cookies.get("adminToken");

  function handleDeleteUser(user) {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  }

  async function confirmDeleteUser() {
    try {
      const response = await Api.delete("admin/auth/account/client", {
        data: { id: selectedUser._id },
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
        withCredentials: true,
      });

      if (response && response.status === 200) {
        toast.success("User deleted successfully", {
          description:
            response?.data?.message ||
            "The user has been removed from the system",
        });
        refetch();
      } else {
        toast.error("Failed to delete user", {
          description: "An error occurred while deleting the user",
        });
      }
    } catch (error) {
      toast.error("Failed to delete user", {
        description:
          error.message || "An error occurred while deleting the user",
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  }

  // Get badge color based on package type
  const getPackageBadgeVariant = (packageType) => {
    switch (packageType) {
      case "basic":
        return "secondary";
      case "copper":
        return "warning";
      case "silver":
        return "default";
      case "gold":
        return "warning";
      case "diamond":
        return "secondary";
      case "titanium":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <>
      <div className="container mx-auto py-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">Members</CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Manage your members and their subscription packages
                </CardDescription>
              </div>
              <Button
                onClick={handleOpen}
                className="md:w-auto w-full"
                size="sm"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
          </CardHeader>

          <div className="px-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="h-9"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Package</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {TABS.map((tab) => (
                      <DropdownMenuItem
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={activeTab === tab.value ? "bg-accent" : ""}
                      >
                        {tab.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full md:w-fit grid grid-cols-3 md:grid-cols-7 h-auto">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs md:text-sm py-2"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <CardContent className="p-0 mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {TABLE_HEAD.map((head, index) => (
                        <TableHead
                          key={head}
                          className={index === 0 ? "w-[40%]" : ""}
                        >
                          <div className="flex items-center gap-1">
                            {head}
                            {index !== TABLE_HEAD.length - 1 && (
                              <div className="flex flex-col">
                                <ChevronUp className="h-3 w-3" />
                                <ChevronDown className="h-3 w-3 -mt-1" />
                              </div>
                            )}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={TABLE_HEAD.length}
                          className="text-center h-32 text-muted-foreground"
                        >
                          No members found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map((user) => (
                        <TableRow key={user._id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage
                                  src={user.userdp}
                                  alt={user.fullname}
                                />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.fullname.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {user.fullname}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getPackageBadgeVariant(user.userpackage)}
                              className="capitalize"
                            >
                              {user.userpackage || "basic"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(user)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">
                {Math.min(startIndex + 1, totalItems)}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(endIndex, totalItems)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> members
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <AddMember open={open} handleOpen={handleOpen} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this member? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
