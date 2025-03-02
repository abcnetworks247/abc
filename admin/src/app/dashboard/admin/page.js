"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  Search,
  ChevronsUpDownIcon,
  Pencil,
  UserPlus,
  Trash2,
  Loader2,
} from "lucide-react";
import Api from "@/utils/Api";

import { toast, Toaster } from "sonner";
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "@/utils/regex";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useCurrentAdmin from "@/hooks/useCurrentAdmin";
import useallAdmin from "@/hooks/useallAdmin";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "SuperAdmin",
    value: "superadmin",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Editor",
    value: "editor",
  },
];

const TABLE_HEAD = ["Member", "Roles", "Date", "Employed", ""];

export default function Page() {
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [updateAdminOpen, setUpdateAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { user, isError, isLoading, isSuccess } = useallAdmin();
  const { CurrentUser } = useCurrentAdmin();
  const Admins = user?.data;

  const [newAdmin, setNewAdmin] = useState(null);
  const [addFormData, setAddFormData] = useState({
    role: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [updateFormData, setUpdateFormData] = useState({
    role: "",
  });

  const [addErrorMessages, setAddErrorMessages] = useState({
    email: "",
    fullname: "",
    password: "",
    role: "",
  });

  const [updateErrorMessages, setUpdateErrorMessages] = useState({
    role: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalItems = Admins ? Admins.data.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Filter users based on search query and active tab
  const filteredUsers = user
    ? Admins.data.filter((user) => {
        const matchesSearch =
          user.fullname
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.trim().toLowerCase());

        const matchesTab = activeTab === "all" || user.role === activeTab;

        return matchesSearch && matchesTab;
      })
    : [];

  const currentItems = filteredUsers.slice(startIndex, endIndex);

  const token = Cookies.get("adminToken");

  // Validation function for add admin form
  function validateAddField(fieldName, regex, value, errorMessage) {
    if (!regex.test(value)) {
      setAddErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      return false;
    } else {
      setAddErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return true;
    }
  }

  // Handle input change for add admin form
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: value,
    });

    if (name === "fullname") {
      validateAddField(
        "fullname",
        USERNAME_REGEX,
        value,
        "Username must start with a letter and may include numbers or underscore(_)"
      );
    } else if (name === "email") {
      validateAddField(
        "email",
        EMAIL_REGEX,
        value,
        "Please enter a valid email address"
      );
    } else if (name === "password") {
      validateAddField(
        "password",
        PASSWORD_REGEX,
        value,
        "Password must be 8+ characters with at least one uppercase, lowercase, digit, and special character"
      );
    }
  };

  // Handle role selection for add admin form
  const handleAddRoleChange = (value) => {
    setAddFormData({
      ...addFormData,
      role: value,
    });
  };

  // Handle role selection for update admin form
  const handleUpdateRoleChange = (value) => {
    setUpdateFormData({
      ...updateFormData,
      role: value,
    });
  };

  // Check if all fields in add form are valid
  const allAddFieldsValid = Object.values(addErrorMessages).every(
    (error) => !error
  );

  // Add admin submit handler
  const handleAddSubmit = async () => {
    if (!allAddFieldsValid) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    if (!addFormData.role) {
      setAddErrorMessages((prev) => ({
        ...prev,
        role: "Please select a role",
      }));
      return;
    }

    setAddAdminOpen(false);

    toast.promise(Api.post("admin/auth/signup", addFormData), {
      loading: "Creating admin account...",
      success: (data) => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return data.data.message || "Admin created successfully";
      },
      error: (error) => {
        return error.response?.data?.error || "Failed to create admin account";
      },
    });
  };

  // Update admin submit handler
  const handleUpdateSubmit = async () => {
    if (!updateFormData.role) {
      setUpdateErrorMessages((prev) => ({
        ...prev,
        role: "Please select a role",
      }));
      return;
    }

    setUpdateAdminOpen(false);

    const item = {
      role: updateFormData.role,
      id: String(newAdmin._id),
    };

    toast.promise(
      Api.patch("admin/auth/account/admin", item, {
        headers: {
          Authorization: `Bearer ${String(token)}`,
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Updating admin account...",
        success: (response) => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
          return response.data.message || "Admin updated successfully";
        },
        error: (error) => {
          return (
            error.response?.data?.error || "Failed to update admin account"
          );
        },
      }
    );
  };

  // Delete admin handler
  function deleteUser(role, _id) {
    const data = {
      id: _id,
    };

    Swal.fire({
      title: `Are you sure you want to delete this ${role}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(
          Api.delete("admin/auth/account/admin", {
            data,
            headers: {
              Authorization: `Bearer ${String(token)}`,
            },
            withCredentials: true,
          }),
          {
            loading: "Deleting admin account...",
            success: (res) => {
              if (typeof window !== "undefined") {
                window.location.reload();
              }
              return res.data.message || "Admin deleted successfully";
            },
            error: (error) => {
              return (
                error.response?.data?.error || "Failed to delete admin account"
              );
            },
          }
        );
      }
    });
  }

  // Set update form data when opening update dialog
  const openUpdateDialog = (admin) => {
    setNewAdmin(admin);
    setUpdateFormData({
      role: admin.role,
    });
    setUpdateAdminOpen(true);
  };

  // Get badge color based on role
  const getBadgeColor = (role) => {
    switch (role) {
      case "editor":
        return "success";
      case "admin":
        return "secondary";
      case "superadmin":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card className="h-full w-full">
          <CardHeader className="pb-0">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Admin list
                </h3>
                <p className="text-muted-foreground mt-1">
                  See information about all members
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-2"
                  size="sm"
                  onClick={() => setAddAdminOpen(true)}
                >
                  <UserPlus className="h-4 w-4" /> Add Admin
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full md:w-fit"
              >
                <TabsList className="w-full">
                  {TABS.map(({ label, value }) => (
                    <TabsTrigger key={value} value={value}>
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="w-full md:w-72 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 py-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {TABLE_HEAD.map((head, index) => (
                      <TableHead key={head} className="cursor-pointer">
                        <div className="flex items-center justify-between gap-2 font-medium text-muted-foreground">
                          {head}{" "}
                          {index !== TABLE_HEAD.length - 1 && (
                            <ChevronsUpDownIcon className="h-4 w-4" />
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
                        className="text-center"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {Admins &&
                        currentItems.map(
                          (
                            { userdp, fullname, email, role, createdAt, _id },
                            index
                          ) => {
                            return (
                              <TableRow key={_id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage
                                        src={userdp}
                                        alt={fullname}
                                      />
                                      <AvatarFallback>
                                        {fullname
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {fullname}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        {email}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <Badge variant={getBadgeColor(role)}>
                                    {role}
                                  </Badge>
                                </TableCell>
                                <TableCell>{createdAt.split("T")[0]}</TableCell>

                                <TableCell>
                                  {CurrentUser &&
                                  CurrentUser.data.olduser.role ===
                                    "superadmin" &&
                                  role !== "superadmin" ? (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                              openUpdateDialog({
                                                userdp,
                                                fullname,
                                                email,
                                                role,
                                                createdAt,
                                                _id,
                                              })
                                            }
                                          >
                                            <Pencil className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Edit User {role}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ) : CurrentUser &&
                                    CurrentUser.data.olduser.role === "admin" &&
                                    role !== "superadmin" &&
                                    role !== "admin" ? (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                              openUpdateDialog({
                                                userdp,
                                                fullname,
                                                email,
                                                role,
                                                createdAt,
                                                _id,
                                              })
                                            }
                                          >
                                            <Pencil className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Edit User {role}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ) : null}
                                </TableCell>
                                <TableCell>
                                  {CurrentUser &&
                                  CurrentUser.data.olduser.role ===
                                    "superadmin" &&
                                  role !== "superadmin" ? (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                            onClick={() =>
                                              deleteUser(role, _id)
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Delete {role}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ) : CurrentUser &&
                                    CurrentUser.data.olduser.role === "admin" &&
                                    role !== "superadmin" &&
                                    role !== "admin" ? (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                            onClick={() =>
                                              deleteUser(role, _id)
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Delete {role}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ) : null}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                    </>
                  )}

                  {CurrentUser && CurrentUser.data.olduser.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={TABLE_HEAD.length}
                        className="text-center"
                      >
                        No Admin Found.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-4">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </span>
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
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Add Admin Dialog */}
      <Dialog open={addAdminOpen} onOpenChange={setAddAdminOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add An Admin</DialogTitle>
            <DialogDescription>
              Add a new admin user to the system
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder="e.g. John Doe"
                  value={addFormData.fullname}
                  onChange={handleAddInputChange}
                />
                {addErrorMessages.fullname && addFormData.fullname && (
                  <p className="text-sm text-destructive">
                    {addErrorMessages.fullname}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={addFormData.email}
                  onChange={handleAddInputChange}
                />
                {addErrorMessages.email && addFormData.email && (
                  <p className="text-sm text-destructive">
                    {addErrorMessages.email}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                {CurrentUser &&
                CurrentUser.data.olduser.role === "superadmin" ? (
                  <Select onValueChange={handleAddRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                ) : CurrentUser && CurrentUser.data.olduser.role === "admin" ? (
                  <Select onValueChange={handleAddRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="No permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {addErrorMessages.role && (
                  <p className="text-sm text-destructive">
                    {addErrorMessages.role}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="•••••••"
                  value={addFormData.password}
                  onChange={handleAddInputChange}
                />
                {addErrorMessages.password && addFormData.password && (
                  <p className="text-sm text-destructive">
                    {addErrorMessages.password}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAdminOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddSubmit}
              disabled={
                !addFormData.fullname ||
                !addFormData.email ||
                !addFormData.password ||
                !addFormData.role ||
                !allAddFieldsValid
              }
            >
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Admin Dialog */}
      <Dialog open={updateAdminOpen} onOpenChange={setUpdateAdminOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Admin</DialogTitle>
            <DialogDescription>
              Update the role of an existing admin user
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-fullname">Full Name</Label>
                <Input
                  id="update-fullname"
                  value={newAdmin?.fullname || ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-email">Email Address</Label>
                <Input
                  id="update-email"
                  value={newAdmin?.email || ""}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-role">Role</Label>
                {CurrentUser &&
                CurrentUser.data.olduser.role === "superadmin" ? (
                  <Select
                    defaultValue={newAdmin?.role}
                    onValueChange={handleUpdateRoleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                ) : CurrentUser && CurrentUser.data.olduser.role === "admin" ? (
                  <Select
                    defaultValue={newAdmin?.role}
                    onValueChange={handleUpdateRoleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="No permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {updateErrorMessages.role && (
                  <p className="text-sm text-destructive">
                    {updateErrorMessages.role}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-password">Password</Label>
                <Input
                  id="update-password"
                  type="password"
                  value="••••••••"
                  disabled
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateAdminOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSubmit}
              disabled={!updateFormData.role}
            >
              Update Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
