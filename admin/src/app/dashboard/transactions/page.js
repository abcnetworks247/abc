"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Producttransaction from "@/components/Alltransaction/Producttransaction";
import Donortransaction from "@/components/Alltransaction/Donortransaction";
import Premiumtransaction from "@/components/Alltransaction/Premiumtransaction";

const Alltransactiondata = [

  {
    label: "Product",
    value: "Product",
    childComponent: <Producttransaction />,
  },
  {
    label: "Donate",
    value: "Donor",
    childComponent: <Donortransaction />,
  },
  {
    label: "Subscription",
    value: "Premium",
    childComponent: <Premiumtransaction />,
  },
];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(Alltransactiondata[0].value);

  const handleTabClick = (value) => {
    setSelectedTab(value);
  };

  return (
    <Card className="w-auto px-3 p-0">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none overflow-x-auto"
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button> */}
          </div>
        </div>
      </CardHeader>
      <CardBody className=" ">
        <Tabs value={selectedTab} className="h-fit overflow-x-scroll">
          <TabsHeader className="m-0 w-fit h-fit">
            {Alltransactiondata.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                className="px-8 m-0 h-fit"
                onClick={() => handleTabClick(value)}
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className=" ">
            {Alltransactiondata.map(({ value, childComponent }) => (
              <TabPanel key={value} value={value} className="mt-0">
                {selectedTab === value && childComponent}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
