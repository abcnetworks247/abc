import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import UseUserlist from "@/hooks/UseUserlist";
import Link from "next/link";
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
import { AddMember } from "@/components/User/AddUser";
import { useState } from "react";

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
    label: "Subscribe",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member", "Package", "Creation Date", ""];

export function MembersTable() {
  const { users, isLoading, isError, isSuccess } = UseUserlist();

  const SliceUsers = users && users.data.slice(0, 6);
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
            <div className="mb-[2px] flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Members list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link href="/dashboard/users">
                  <Button variant="outlined" size="sm">
                    view all
                  </Button>
                </Link>
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
                  {users &&
                    SliceUsers.map(
                      (
                        { userdp, fullname, email, userpackage, createdAt },
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
                                <IconButton variant="text">
                                  <svg
                                    width="64px"
                                    height="64px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                                    className="h-5 w-5"
                                  >
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
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

                                  {/* <PencilIcon className="h-4 w-4" /> */}
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </>
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </>
  );
}
