"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronsUpDownIcon as ChevronUpDownIcon,
  UserPlusIcon,
} from "lucide-react";
import { format } from "date-fns";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrentAdmin from "@/hooks/useCurrentAdmin";
import useAllAdmin from "@/hooks/useallAdmin";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

const TABS = [
  { label: "All", value: "all" },
  { label: "SuperAdmin", value: "superadmin" },
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
];

const TABLE_HEAD = ["Member", "Roles", "Date", "Employed", ""];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const router = useRouter();
  const { user, isError, isLoading, isSuccess, mutate } = useAllAdmin();
  const { currentAdmin } = useCurrentAdmin();
  const Admins = user?.data || [];
  const ITEMS_PER_PAGE = 10;

  const filteredAdmins = Admins.filter(
    (admin) =>
      (admin.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeTab === "all" || admin.role === activeTab)
  );

  const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddAdmin = async (data) => {
    try {
      const response = await Api.post("admin/auth/signup", data);
      if (response.status === 201) {
        mutate();
        setIsAddDialogOpen(false);
        toast.success(response.data.message || "Admin added successfully");
      } else {
        toast.error(response.data.message || "Failed to add admin");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleEditAdmin = async (data) => {
    try {
      const response = await Api.patch("admin/auth/account/admin", {
        ...data,
        id: selectedAdmin._id,
      });
      if (response.status === 200) {
        mutate();
        setIsEditDialogOpen(false);
        toast.success(response.data.message || "Admin updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update admin");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      const response = await Api.delete("admin/auth/account/admin", {
        data: { id: selectedAdmin._id },
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });
      if (response.status === 200) {
        mutate();
        setIsDeleteDialogOpen(false);
        toast.success(response.data.message || "Admin deleted successfully");
      } else {
        toast.error(response.data.message || "Failed to delete admin");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const canEdit = (admin) => {
    if (currentAdmin?.role === "superadmin") return true;
    if (
      currentAdmin?.role === "admin" &&
      admin.role !== "superadmin" &&
      admin.role !== "admin"
    )
      return true;
    return false;
  };

  const canDelete = canEdit;

  useEffect(() => {
    console.log("Admins", Admins);
    console.log("user admin", user);
    console.log("Filters changed:", { searchQuery, activeTab });
    console.log("Filtered admins count:", filteredAdmins.length);
  }, [searchQuery, activeTab, filteredAdmins.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage and view all admin users
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlusIcon className="mr-2 h-4 w-4" /> Add Admin
        </Button>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList>
              {TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search admins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  setSearchQuery("");
                  setActiveTab("all");
                } else {
                  setActiveTab(value);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="superadmin">Superadmin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {TABLE_HEAD.map((head, index) => (
                  <TableHead key={head}>
                    <div className="flex items-center justify-between">
                      {head}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAdmins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={admin.userdp} alt={admin.fullname} />
                        <AvatarFallback>{admin.fullname[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{admin.fullname}</p>
                        <p className="text-sm text-muted-foreground">
                          {admin.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        admin.role === "superadmin"
                          ? "destructive"
                          : admin.role === "admin"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {admin.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(admin.createdAt), "PPP")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(admin.createdAt), "PPP")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedAdmin(admin);
                            setIsEditDialogOpen(true);
                          }}
                          disabled={!canEdit(admin)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedAdmin(admin);
                            setIsDeleteDialogOpen(true);
                          }}
                          disabled={!canDelete(admin)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedAdmins.length} of {filteredAdmins.length} admins
        </p>
        <div className="flex space-x-2">
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
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>

      <AddAdminDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddAdmin}
      />

      <EditAdminDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditAdmin}
        admin={selectedAdmin}
      />

      <DeleteAdminDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAdmin}
        admin={selectedAdmin}
      />
    </Card>
  );
}

function AddAdminDialog({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
  const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;

  const validateField = (fieldName, regex, value, errorMessage) => {
    if (!regex.test(value)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      return false;
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "fullname") {
      validateField(
        "fullname",
        USERNAME_REGEX,
        value,
        "Username must start with a letter and may include numbers or underscore"
      );
    } else if (name === "email") {
      validateField(
        "email",
        EMAIL_REGEX,
        value,
        "Please enter a valid email address"
      );
    } else if (name === "password") {
      validateField(
        "password",
        PASSWORD_REGEX,
        value,
        "Password must be 8+ characters with at least one uppercase, lowercase, digit, and special character"
      );
    }
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
    if (!value) {
      setErrorMessages((prev) => ({ ...prev, role: "Please select a role" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, role: "" }));
    }
  };

  const allFieldsValid =
    Object.values(errorMessages).every((error) => !error) &&
    Object.values(formData).every((value) => value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allFieldsValid) {
      toast.error("Please fill in all fields correctly");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>Create a new admin user here.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Full Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {errorMessages.fullname && (
                  <p className="text-sm text-destructive mt-1">
                    {errorMessages.fullname}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errorMessages.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errorMessages.email}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="col-span-3">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errorMessages.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errorMessages.password}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <div className="col-span-3">
                <Select
                  name="role"
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="superadmin">Superadmin</SelectItem>
                  </SelectContent>
                </Select>
                {errorMessages.role && (
                  <p className="text-sm text-destructive mt-1">
                    {errorMessages.role}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!allFieldsValid}>
              Add Admin
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditAdminDialog({ isOpen, onClose, onSubmit, admin }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    role: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    fullname: "",
    email: "",
    role: "",
  });

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;

  useEffect(() => {
    if (admin) {
      setFormData({
        fullname: admin.fullname,
        email: admin.email,
        role: admin.role,
      });
      setErrorMessages({
        fullname: "",
        email: "",
        role: "",
      });
    }
  }, [admin]);

  const validateField = (fieldName, regex, value, errorMessage) => {
    if (!regex.test(value)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      return false;
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "fullname") {
      validateField(
        "fullname",
        USERNAME_REGEX,
        value,
        "Username must start with a letter and may include numbers or underscore"
      );
    } else if (name === "email") {
      validateField(
        "email",
        EMAIL_REGEX,
        value,
        "Please enter a valid email address"
      );
    }
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
    if (!value) {
      setErrorMessages((prev) => ({ ...prev, role: "Please select a role" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, role: "" }));
    }
  };

  const allFieldsValid =
    Object.values(errorMessages).every((error) => !error) &&
    Object.values(formData).every((value) => value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allFieldsValid) {
      toast.error("Please fill in all fields correctly");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Admin</DialogTitle>
          <DialogDescription>
            Make changes to the admin user here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Full Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {errorMessages.fullname && (
                  <p className="text-sm text-destructive mt-1">
                    {errorMessages.fullname}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errorMessages.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errorMessages.email}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <div className="col-span-3">
                <Select
                  name="role"
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="superadmin">Superadmin</SelectItem>
                  </SelectContent>
                </Select>
                {errorMessages.role && (
                  <p className="text-sm text-destructive mt-1">
                    {errorMessages.role}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!allFieldsValid}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteAdminDialog({ isOpen, onClose, onConfirm, admin }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Admin</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this admin? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
