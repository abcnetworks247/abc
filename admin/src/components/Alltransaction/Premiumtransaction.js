import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import CustompaymentFetch from "../Custom/CustompaymentFetch";

const TABLE_HEAD = [
  "Username",
  "Amount",
  "Plan Type",
  "Status",
  "Transaction ID",
  "Subscription Name",
  "View",
];



export default function Premiumtransaction() {
  const [donorData, setDonorData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    CustompaymentFetch(`subscribe`)
      .then((data) => {
        console.log(data.data.data, "subscrbe data");
        setDonorData(data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);
        console.error(error);
      });
  }, []);


  const test = "lorem2 000"

  console.log(test.slice(2,0))
  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center justify-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className=" py-4 flex items-center justify-center h-full">
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
      ) : donorData && donorData?.length !== 0 ? (
        <div>
          <CardBody className="overflow-x-scroll px-0">
            <table className="w-full min-w-max table-auto text-left ">
              <>
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {donorData &&
                    donorData?.map(
                      (
                        {
                          name,
                          amount,
                          donation_Date,
                          donation_Time,
                          currency,
                          payment_status,
                          status,
                          plan_type,
                          accountNumber,
                          subscription_id,
                          expiry,
                          _id,
                          subscription_status,
                          subscription_name
                        },
                        index
                      ) => {
                       

                        return (
                          <tr key={name}>
                            <td className={"p-4 border-b border-blue-gray-50"}>
                              <div className="flex items-center gap-3">
                                {/* <Avatar
                            src={img}
                            alt={name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          /> */}
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {name}
                                </Typography>
                              </div>
                            </td>
                            <td className={"p-4 border-b border-blue-gray-50"}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {currency === "usd"
                                  ? "$"
                                  : currency === "naira"
                                  ? "₦"
                                  : ""}
                                {amount}
                              </Typography>
                            </td>
                            <td className={"p-4 border-b border-blue-gray-50"}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                              {plan_type}
                              </Typography>
                            </td>
                            <td className={"p-4 border-b border-blue-gray-50"}>
                              <div className="w-max">
                                <Chip
                                  size="sm"
                                  variant="ghost"
                                  value={subscription_status}
                                  color={
                                    subscription_status === "paid"
                                      ? "green"
                                      : subscription_status === "canceled"
                                      ? "amber"
                                      : "red"
                                  }
                                />
                              </div>
                            </td>
                            <td className={"p-4 border-b border-blue-gray-50"}>
                              <div className="flex items-center gap-3">
                                <div className="   p-1 w-36 truncate">
                                  {subscription_id}
                     
                                </div>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal capitalize"
                                  >
                                    {/* {account.split("-").join(" ")} {accountNumber} */}
                                  </Typography>
                             
                                </div>
                              </div>
                            </td>
                            <td className={"p-4 border-b border-blue-gray-50"}>
                              <div className="flex items-center gap-3">
                                <div className="   p-1 w-[130px] truncate">
                                  {subscription_name?.slice(14)}
                     
                                </div>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal capitalize"
                                  >
                                    {/* {account.split("-").join(" ")} {accountNumber} */}
                                  </Typography>
                          
                                </div>
                              </div>
                            </td>
                            <td className={"p-4 border-b border-blue-gray-50"}>
                              <Tooltip content="View Info">
                                <IconButton variant="text">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
                                  >
                                    <g
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      fill="#000"
                                    >
                                      <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm-1 3a1 1 0 112 0 1 1 0 01-2 0z" />
                                      <path d="M21.83 11.28C19.542 7.153 15.812 5 12 5c-3.812 0-7.542 2.152-9.83 6.28a1.376 1.376 0 00-.01 1.308C4.412 16.8 8.163 19 12 19c3.837 0 7.588-2.199 9.84-6.412a1.376 1.376 0 00-.01-1.307zM12 17c-2.939 0-5.96-1.628-7.908-5.051C6.069 8.596 9.073 7 12 7c2.927 0 5.931 1.596 7.908 4.949C17.96 15.372 14.94 17 12 17z" />
                                    </g>
                                  </svg>
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </CardFooter>
        </div>
      ) : (
        <div>
          <h1 className="text-center ">
            You have no transaction history yet on Subscripttion.{" "}
          </h1>
        </div>
      )}
    </div>
  );
}
