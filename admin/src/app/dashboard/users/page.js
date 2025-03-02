"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";
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
  Edit,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AddMember } from "@/components/User/AddUser";
import UseUserlist from "@/hooks/UseUserlist";
import Api from "@/utils/Api";
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "@/utils/regex";

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
  {
    label: "Admins",
    value: "admin",
  },
];

const TABLE_HEAD = ["Member", "Package", "Creation Date", "Actions"];
const ROLES = ["editor", "admin", "superadmin"];

export default function MembersPage() {
  // Member management state
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Admin management state
  const [adminOpen, setAdminOpen] = useState(false);
  const [updateAdminOpen, setUpdateAdminOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Add Admin form state
  const [addAdminFormData, setAddAdminFormData] = useState({
    role: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [addAdminErrorMessages, setAddAdminErrorMessages] = useState({
    email: "",
    fullname: "",
    password: "",
    role: "",
  });
  const [addAdminIsValidData, setAddAdminIsValidData] = useState(true);

  // Update Admin form state
  const [updateAdminFormData, setUpdateAdminFormData] = useState({
    role: "",
  });
  const [updateAdminErrorMessages, setUpdateAdminErrorMessages] = useState({
    role: "",
  });
  const [updateAdminIsValidData, setUpdateAdminIsValidData] = useState(true);

  const { users, isLoading, isError, isSuccess, refetch } = UseUserlist();

  const handleOpen = () => setOpen(!open);
  const handleAdminOpen = () => setAdminOpen(!adminOpen);
  const handleUpdateAdminOpen = () => setUpdateAdminOpen(!updateAdminOpen);

  const ITEMS_PER_PAGE = 10;

  // Filter users based on search query and active tab
  const filteredUsers = users
    ? users.data.filter((user) => {
        const matchesSearch =
          user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab =
          activeTab === "all" ||
          user.userpackage === activeTab ||
          (activeTab === "admin" && user.role);

        return matchesSearch && matchesTab;
      })
    : [];

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  const token = Cookies.get("adminToken");

  // Fetch current user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get("adminToken");
        if (token) {
          const response = await Api.get("admin/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setCurrentUser(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Validation function for form fields
  function validateField(fieldName, regex, value, errorMessage, formType) {
    if (!regex.test(value)) {
      if (formType === "addAdmin") {
        setAddAdminErrorMessages((prevErrors) => ({
          ...prevErrors,
          [fieldName]: errorMessage,
        }));
        setAddAdminIsValidData(false);
      } else {
        setUpdateAdminErrorMessages((prevErrors) => ({
          ...prevErrors,
          [fieldName]: errorMessage,
        }));
        setUpdateAdminIsValidData(false);
      }
      return false;
    } else {
      if (formType === "addAdmin") {
        setAddAdminErrorMessages((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "",
        }));
        setAddAdminIsValidData(true);
      } else {
        setUpdateAdminErrorMessages((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "",
        }));
        setUpdateAdminIsValidData(true);
      }
      return true;
    }
  }

  // Handle input change for Add Admin form
  const handleAddAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAddAdminFormData({
      ...addAdminFormData,
      [name]: value,
    });

    if (name === "fullname") {
      validateField(
        "fullname",
        USERNAME_REGEX,
        value,
        "Username must start with a letter and may include numbers or underscore(_)",
        "addAdmin"
      );
    } else if (name === "email") {
      validateField(
        "email",
        EMAIL_REGEX,
        value,
        "Please enter a valid email address.",
        "addAdmin"
      );
    } else if (name === "password") {
      validateField(
        "password",
        PASSWORD_REGEX,
        value,
        "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)",
        "addAdmin"
      );
    }
  };

  // Handle role selection for Add Admin form
  const handleAddAdminRoleChange = (value) => {
    setAddAdminFormData({
      ...addAdminFormData,
      role: value,
    });
  };

  // Handle role selection for Update Admin form
  const handleUpdateAdminRoleChange = (value) => {
    setUpdateAdminFormData({
      ...updateAdminFormData,
      role: value,
    });
  };

  // Submit Add Admin form
  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();

    const allFieldsValid = Object.keys(addAdminErrorMessages).every(
      (field) => !addAdminErrorMessages[field]
    );

    if (!allFieldsValid) {
      toast.error("Please fill in all the fields correctly");
      return;
    }

    if (!addAdminFormData.role) {
      setAddAdminErrorMessages((prevErrors) => ({
        ...prevErrors,
        role: "Please select a role.",
      }));
      return;
    }

    setAdminOpen(false);

    toast.promise(
      async () => {
        const response = await Api.post("admin/auth/signup", addAdminFormData);

        if (response.status === 201) {
          await refetch();
          return response.data.message;
        } else {
          throw new Error(response.data.message || "Error creating admin");
        }
      },
      {
        loading: "Creating admin...",
        success: (message) => message || "Admin created successfully",
        error: (error) => error.message || "Failed to create admin",
      }
    );
  };

  // Submit Update Admin form
  const handleUpdateAdminSubmit = async (e) => {
    e.preventDefault();

    if (!updateAdminFormData.role) {
      setUpdateAdminErrorMessages((prevErrors) => ({
        ...prevErrors,
        role: "Please select a role.",
      }));
      return;
    }

    setUpdateAdminOpen(false);

    toast.promise(
      async () => {
        const item = {
          role: updateAdminFormData.role,
          id: String(selectedAdmin._id),
        };

        const response = await Api.patch("admin/auth/account/admin", item, {
          headers: {
            Authorization: `Bearer ${String(token)}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          await refetch();
          return response.data.message;
        } else {
          throw new Error(response.data.message || "Error updating admin");
        }
      },
      {
        loading: "Updating admin...",
        success: (message) => message || "Admin updated successfully",
        error: (error) => error.message || "Failed to update admin",
      }
    );
  };

  // Handle delete user
  function handleDeleteUser(user) {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  }

  // Confirm delete user
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
        setDeleteDialogOpen(false);
        toast.success("User deleted successfully", {
          description:
            response?.data?.message ||
            "The user has been removed from the system",
        });
        await refetch();
      } else {
        setDeleteDialogOpen(false);
        toast.error("Failed to delete user", {
          description: "An error occurred while deleting the user",
        });
      }
    } catch (error) {
      setDeleteDialogOpen(false);
      toast.error("Failed to delete user", {
        description:
          error.message || "An error occurred while deleting the user",
      });
    }
  }

  // Handle update admin
  function handleUpdateAdmin(admin) {
    setSelectedAdmin(admin);
    setUpdateAdminFormData({
      role: admin.role || "",
    });
    setUpdateAdminOpen(true);
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
      <Toaster position="top-bottom" />
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
              <div className="flex gap-2">
                <Button onClick={handleOpen} className="md:w-auto" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
                {currentUser &&
                  (currentUser.data.olduser.role === "admin" ||
                    currentUser.data.olduser.role === "superadmin") && (
                    <Button
                      onClick={handleAdminOpen}
                      className="md:w-auto"
                      variant="outline"
                      size="sm"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Admin
                    </Button>
                  )}
              </div>
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
                                {user.role && (
                                  <Badge
                                    variant="outline"
                                    className="mt-1 w-fit"
                                  >
                                    {user.role}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.userpackage ? (
                              <Badge
                                variant={getPackageBadgeVariant(
                                  user.userpackage
                                )}
                                className="capitalize"
                              >
                                {user.userpackage}
                              </Badge>
                            ) : user.role ? (
                              <Badge variant="secondary">Admin</Badge>
                            ) : (
                              <Badge variant="outline">None</Badge>
                            )}
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
                                {user.role &&
                                  currentUser &&
                                  (currentUser.data.olduser.role === "admin" ||
                                    currentUser.data.olduser.role ===
                                      "superadmin") && (
                                    <DropdownMenuItem
                                      onClick={() => handleUpdateAdmin(user)}
                                    >
                                      <Edit className="h-4 w-4 mr-2" />
                                      Update Role
                                    </DropdownMenuItem>
                                  )}
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

      {/* Add Member Dialog (kept as a component) */}
      <AddMember open={open} handleOpen={handleOpen} />

      {/* Add Admin Dialog */}
      <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add An Admin</DialogTitle>
            <DialogDescription>
              Create a new admin user with specific permissions
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddAdminSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder="e.g. John Doe"
                  value={addAdminFormData.fullname}
                  onChange={handleAddAdminInputChange}
                  required
                />
                {addAdminErrorMessages.fullname &&
                  addAdminFormData.fullname && (
                    <p className="text-sm text-destructive">
                      {addAdminErrorMessages.fullname}
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
                  value={addAdminFormData.email}
                  onChange={handleAddAdminInputChange}
                  required
                />
                {addAdminErrorMessages.email && addAdminFormData.email && (
                  <p className="text-sm text-destructive">
                    {addAdminErrorMessages.email}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={addAdminFormData.role}
                  onValueChange={handleAddAdminRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentUser &&
                    currentUser.data.olduser.role === "superadmin" ? (
                      ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </SelectItem>
                      ))
                    ) : currentUser &&
                      currentUser.data.olduser.role === "admin" ? (
                      <SelectItem value="editor">Editor</SelectItem>
                    ) : null}
                  </SelectContent>
                </Select>
                {addAdminErrorMessages.role && (
                  <p className="text-sm text-destructive">
                    {addAdminErrorMessages.role}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={addAdminFormData.password}
                  onChange={handleAddAdminInputChange}
                  required
                />
                {addAdminErrorMessages.password &&
                  addAdminFormData.password && (
                    <p className="text-sm text-destructive">
                      {addAdminErrorMessages.password}
                    </p>
                  )}
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setAdminOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={Object.values(addAdminFormData).some(
                  (value) => value === ""
                )}
              >
                Create Admin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Admin Dialog */}
      <Dialog open={updateAdminOpen} onOpenChange={setUpdateAdminOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Admin Role</DialogTitle>
            <DialogDescription>
              Change the role and permissions for this admin user
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateAdminSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-fullname">Full Name</Label>
                <Input
                  id="update-fullname"
                  value={selectedAdmin?.fullname || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-email">Email Address</Label>
                <Input
                  id="update-email"
                  value={selectedAdmin?.email || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="update-role">Role</Label>
              <Select
                value={updateAdminFormData.role || selectedAdmin?.role || ""}
                onValueChange={handleUpdateAdminRoleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {currentUser &&
                  currentUser.data.olduser.role === "superadmin" ? (
                    ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))
                  ) : currentUser &&
                    currentUser.data.olduser.role === "admin" ? (
                    <SelectItem value="editor">Editor</SelectItem>
                  ) : null}
                </SelectContent>
              </Select>
              {updateAdminErrorMessages.role && (
                <p className="text-sm text-destructive">
                  {updateAdminErrorMessages.role}
                </p>
              )}
            </div>
            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setUpdateAdminOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!updateAdminFormData.role}>
                Update Role
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
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
