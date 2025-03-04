"use client";
import { AddMember } from "@/components/User/AddUser";
import { useQuery } from "react-query";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import axios from "axios";
import UseUserlist from "@/hooks/UseUserlist";
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
import Api from "@/utils/Api";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Basics",
    value: "Subscriptions",
  },
  {
    label: "Coper",
    value: "coper",
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

const TABLE_HEAD = ["Member", "Package", "Creation Date", ""];

export default function Page() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { users, isLoading, isError, isSuccess } = UseUserlist();

  const handleOpen = () => setOpen(!open);
  //cookies
  const ITEMS_PER_PAGE = 10;
  const totalItems = users ? users.data.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredUsers = users
    ? users.data.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  
  const currentItems = filteredUsers.slice(startIndex, endIndex);
  const token = Cookies.get("adminToken");

  function DeleteUser(_id) {
    const id = { _id };
   console.log(id, "user id")

    let data = {
      id: id._id,
    };

    Swal.fire({
      title: `Are you sure you want to delete this user?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Api.delete("admin/auth/account/client", {
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
            } else {
              Swal.fire({
                title: "Account not Deleted!",
                text: "Account Not Deleted. Error occurred during the request.",
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
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card className="h-full w-full px-3">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Members list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  onClick={handleOpen}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add user
                </Button>
              </div>
            </div>
            <div className=" w-full flex justify-end mb-4">
              <div className="w-72 flex justify-end">
                <Input
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
            <div className="flex flex-col flex-c items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
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
                      No User Found.
                    </td>
                  </tr>
                ) : (
                  <>
                    {users &&
                      currentItems.map(
                        (
                          {
                            userdp,
                            fullname,
                            email,
                            userpackage,
                            createdAt,
                            _id,
                          },
                          index
                        ) => {
                          const isLast = index === users.data.length - 1;
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
                                      userpackage === "basic"
                                        ? "basic"
                                        : userpackage === "silver"
                                        ? "silver"
                                        : userpackage === "gold"
                                        ? "gold"
                                        : userpackage === "diamond"
                                        ? "diamond"
                                        : userpackage === "titanium"
                                        ? "titanium"
                                        : "offline"
                                    }
                                    color={
                                      userpackage === "basic"
                                        ? "green"
                                        : userpackage === "silver"
                                        ? "silver"
                                        : userpackage === "gold"
                                        ? "gold"
                                        : userpackage === "diamond"
                                        ? "diamond"
                                        : userpackage === "titanium"
                                        ? "titanium"
                                        : "blue-gray"
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
                              <td className={classes}>
                                <Tooltip content="delete User">
                                  <IconButton
                                    variant="text"
                                    onClick={() => {
                                      DeleteUser(_id);
                                    }}
                                  >
                                    <svg
                                      width="64px"
                                      height="64px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                                      className="h-5 w-5"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth={0}
                                      />
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                          d="M10 12V17"
                                          stroke="#000000"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />{" "}
                                        <path
                                          d="M14 12V17"
                                          stroke="#000000"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />{" "}
                                        <path
                                          d="M4 7H20"
                                          stroke="#000000"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />{" "}
                                        <path
                                          d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                          stroke="#000000"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />{" "}
                                        <path
                                          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                          stroke="#000000"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />{" "}
                                      </g>
                                    </svg>
                                  </IconButton>
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </>
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
            <AddMember
              open={open}
              handleOpen={handleOpen}
              // CurrentUser={CurrentUser}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
}
