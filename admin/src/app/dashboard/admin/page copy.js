"use client";
import { AddAdminMeMber } from "@/components/AdminMemeber/AddAdminMember";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
// import useallAdmin from "@/hooks/useallAdmin";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import useCurrentAdmin from "@/hooks/useCurrentAdmin";
import { UpdateAdmin } from "@/components/updateAdmin/UpdateAdmin";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

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
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isError, isLoading, isSuccess } = useallAdmin();
  const { CurrentUser } = useCurrentAdmin();
  const Admins = user?.data;
  const value = Admins?.data;

  const [NewAdmin, setNewAdmin] = useState(null);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => {
    setOpen2(!open2);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalItems = Admins ? Admins.data.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredUsers = user
    ? Admins.data.filter(
        (user) =>
          user.fullname
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : [];

  const currentItems = filteredUsers.slice(startIndex, endIndex);


  const token = Cookies.get("adminToken");

  function DeleteUser(role, _id) {
    const id = { _id };

    console.log("id: " + id._id);

    let data = {
      id: id._id,
    };

    Swal.fire({
      title: `Are you sure you want to delete this ${role}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Api.delete("admin/auth/account/admin", {
            data,
            headers: {
              Authorization: `Bearer ${String(token)}`,
            },
            withCredentials: true,
          }).then((res) => {
            console.log(res, "res from bg");
            if (res && res.status === 200) {
              console.log(res, "sucess");
              Swal.fire({
                title: "Acoount Deleted!",
                text: `${res?.data?.message}`,
                icon: "success",
              });
              window.location.reload();
            } else if (res.status === 500) {
              Swal.fire({
                title: `${res.data.error}`,
                text: "you're not eligble to make this request.",
                icon: "error",
              });
            }
          });
        }
      })
      .catch(function (err) {
        Swal.fire({
          title: "Account not Deleted!",
          text: `${err}`,
          icon: "error",
        });
      });
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <svg
            className="w-20 h-20 mr-3 -ml-1 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      ) : (
        <Card className="h-full w-full px-3">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Admin list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  onClick={handleOpen}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Admin
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-[60%]">
                <TabsHeader className="w-full">
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="w-full">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  <>
                    {Admins &&
                      currentItems.map(
                        (
                          { userdp, fullname, email, role, createdAt, _id },
                          index
                        ) => {
                          const isLast = index === Admins.data.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={createdAt}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    src={userdp}
                                    alt={fullname}
                                    size="sm"
                                  />
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {fullname}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70"
                                    >
                                      {email}
                                    </Typography>
                                  </div>
                                </div>
                              </td>

                              <td className={classes}>
                                <div className="w-max">
                                  <Chip
                                    variant="ghost"
                                    size="sm"
                                    value={
                                      role === "admin"
                                        ? "admin"
                                        : role === "superadmin"
                                        ? "superadmin"
                                        : role === "editor"
                                        ? "editor"
                                        : ""
                                    }
                                    color={
                                      role === "editor"
                                        ? "green"
                                        : role === "admin"
                                        ? "silver"
                                        : role === "superadmin"
                                        ? "gold"
                                        : userpackage === "diamond"
                                    }
                                  />
                                </div>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {createdAt.split("T")[0]}
                                </Typography>
                              </td>

                              {CurrentUser &&
                              CurrentUser.data.olduser.role === "superadmin" &&
                              role !== "superadmin" ? (
                                <td className={classes}>
                                  <Tooltip content={`Edit User ${role}`}>
                                    <IconButton
                                      variant="text"
                                      onClick={() => {
                                        let data = {
                                          userdp,
                                          fullname,
                                          email,
                                          role,
                                          createdAt,
                                          _id,
                                        };
                                        setNewAdmin(data);
                                        handleOpen2();
                                      }}
                                    >
                                      <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              ) : CurrentUser &&
                                CurrentUser.data.olduser.role === "admin" &&
                                role !== "superadmin" &&
                                role !== "admin" ? (
                                <td className={classes}>
                                  <Tooltip content={`Edit User ${role}`}>
                                    <IconButton
                                      variant="text"
                                      onClick={() => {
                                        let data = {
                                          userdp,
                                          fullname,
                                          email,
                                          role,
                                          createdAt,
                                          _id,
                                        };
                                        setNewAdmin(data);
                                        handleOpen2();
                                      }}
                                    >
                                      <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              ) : (
                                <></>
                              )}
                              {CurrentUser &&
                              CurrentUser.data.olduser.role === "superadmin" &&
                              role !== "superadmin" ? (
                                <td className={classes}>
                                  <Tooltip content={`Delete ${role}`}>
                                    <IconButton
                                      variant="text"
                                      onClick={() => {
                                        DeleteUser(role, _id);
                                      }}
                                    >
                                      <MdDeleteForever className="h-6 w-6 text-red-600" />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              ) : CurrentUser &&
                                CurrentUser.data.olduser.role === "admin" &&
                                role !== "superadmin" &&
                                role !== "admin" ? (
                                <td className={classes}>
                                  <Tooltip content={`Delete ${role}`}>
                                    <IconButton
                                      variant="text"
                                      onClick={() => {
                                        DeleteUser(role, _id);
                                      }}
                                    >
                                      <MdDeleteForever className="h-6 w-6 text-red-600" />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              ) : (
                                <></>
                              )}
                            </tr>
                          );
                        }
                      )}
                  </>
                )}

                {CurrentUser && CurrentUser.data.olduser.length === 0 ? (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                      No Admin Found.
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <AddAdminMeMber
              open={open}
              handleOpen={handleOpen}
              CurrentUser={CurrentUser}
            />
            <UpdateAdmin
              open={open2}
              handleOpen={handleOpen2}
              CurrentUser={CurrentUser}
              NewAdmin={NewAdmin}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
}
