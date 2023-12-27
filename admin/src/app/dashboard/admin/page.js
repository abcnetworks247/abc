"use client";
import { AddAdminMeMber } from "@/components/AdminMemeber/AddAdminMember";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import useallAdmin from "@/hooks/useallAdmin";
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

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member", "Roles", "Date", "Employed", ""];

export default function Page() {
  const [open, setOpen] = useState(false);
  const { user, isError, isLoading, isSuccess } = useallAdmin();
  const { CurrentUser } = useCurrentAdmin();
  const Admins = user?.data;
  console.log("all admins", Admins);

  const handleOpen = () => setOpen(!open);

  function DeleteUser(role) {
    Swal.fire({
      title: `Are you sure you want to delete this ${role}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Acoount Deleted!",
          text: "Account Deleted Succefully.",
          icon: "success",
        });

        if (typeof window !== "undefined") {
          localStorage.removeItem("hasReloaded");
        }
        // HandleLogout();
      }
    });
  }

  console.log("CurrentUser.data.role", CurrentUser && CurrentUser.data.olduser);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
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
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
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
                <>
                  {Admins &&
                    Admins.data.map(
                      ({ userdp, fullname, email, role, createdAt }, index) => {
                        const isLast = index === Admins.data.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={createdAt}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Avatar src={userdp} alt={fullname} size="sm" />
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
                                      DeleteUser(role);
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
                                <Tooltip content={`Delete ${role}`}>
                                  <IconButton
                                    variant="text"
                                    onClick={() => {
                                      DeleteUser(role);
                                    }}
                                  >
                                    <PencilIcon className="h-4 w-4 " />
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
                                      DeleteUser(role);
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
                                      DeleteUser(role);
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
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
            <AddAdminMeMber
              open={open}
              handleOpen={handleOpen}
              CurrentUser={CurrentUser}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
}
