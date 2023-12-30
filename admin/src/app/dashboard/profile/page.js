"use client";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import useCurrentAdmin from "@/hooks/useCurrentAdmin";
import { ProfileInfoCard, MessageCard } from "@/components/widget/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useState } from "react";
import { EditAdminProfile } from "@/components/editAdminProfile/EditAdminProfile";
import Image from "next/image";

export default function Page() {
  const { CurrentUser, isLoading } = useCurrentAdmin();
  const handleOpen = () => setOpen(!open);
  const [open, setOpen] = useState(false);
  const pathUrl = "/dashboard/news/all-news";
  const UserValue = CurrentUser && CurrentUser.data.olduser;
  const BlogValue = CurrentUser && CurrentUser.data.userblog;

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 4; 
  const totalItems = BlogValue ? BlogValue.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = CurrentUser ? BlogValue.slice(startIndex, endIndex) : [];
  console.log("user value", BlogValue && BlogValue);
  return (
    <>
      {isLoading && isLoading ? (
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
        <main className="flex flex-row w-[100%] *:mt-3">
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={UserValue && UserValue.userdp}
                    alt="bruce-mars"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {UserValue && UserValue.fullname}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {UserValue && UserValue.role}
                    </Typography>
                  </div>
                </div>
                <div className="w-auto">
                  <Tabs value="app">
                    <TabsHeader>
                      <Tab value="settings">
                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Settings
                      </Tab>
                    </TabsHeader>
                  </Tabs>
                </div>
              </div>
              <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Platform Settings
                  </Typography>
                  <div className="flex flex-col gap-12">
                    {platformSettingsData.map(({ title, options }) => (
                      <div key={title}>
                        <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                          {title}
                        </Typography>
                        <div className="flex flex-col gap-6">
                          {options.map(({ checked, label }) => (
                            <Switch
                              key={label}
                              id={label}
                              label={label}
                              defaultChecked={checked}
                              labelProps={{
                                className:
                                  "text-sm font-normal text-blue-gray-500",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <ProfileInfoCard
                  title="Profile Information"
                  description={UserValue && UserValue.userbio}
                  details={{
                    "first name": `${UserValue && UserValue.fullname}`,
                    mobile: "(44) 123 1234 123",
                    email: `${UserValue && UserValue.email}`,
                  }}
                  action={
                    <Tooltip content="Edit Profile">
                      <PencilIcon
                        className="h-4 w-4 cursor-pointer text-blue-gray-500"
                        onClick={handleOpen}
                      />
                    </Tooltip>
                  }
                />
              </div>
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  My Posts
                </Typography>

                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                  {CurrentUser &&
                    currentItems.map(
                      ({
                        blogimage,
                        title,
                        shortdescription,
                        category,
                        _id
                      }) => (
                        <Card key={title} color="transparent" shadow={false}>
                                  <Link href={`${pathUrl}/${_id}`}>

                          <CardHeader
                            floated={false}
                            color="gray"
                            className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                          >
                            <Image
                            height={200}
                            width={200}
                              src={blogimage}
                              alt={title}
                              className="h-full w-full object-cover"
                            />
                          </CardHeader>
                          <CardBody className="py-0 px-1 w-full ">
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              {category}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mt-1 overflow-hidden mb-2 w-[100%] whitespace-nowrap text-ellipsis"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              {shortdescription}
                            </Typography>
                          </CardBody>
                          <CardFooter className="mt-6 flex items-center gap-2 py-0 px-1">
                         
                              <Button variant="outlined" size="sm">
                                view News
                              </Button>
                            
                            <div>
                              
                                <Tooltip  content={ UserValue.fullname}>
                                  <Avatar
                                    src={UserValue && UserValue.userdp}
                                    alt={ UserValue.userdp}
                                    
                                    size="xs"
                                    variant="circular"
                                    className={`cursor-pointer border-2 border-white `}
                                  />
                                </Tooltip>
                             
                            </div>
                          </CardFooter>
                                  </Link>

                        </Card>
                      )
                    )}
                </div>
              </div>

              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
             Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm"   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
                Previous
              </Button>
              <Button variant="outlined" size="sm"  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
     
          </CardFooter>
            </CardBody>
            <EditAdminProfile
              open={open}
              UserValue={UserValue}
              handleOpen={handleOpen}
            />
          </Card>
        </main>
      )}
    </>
  );
}
