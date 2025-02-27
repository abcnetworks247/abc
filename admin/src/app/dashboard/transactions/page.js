"use client";

import React, { useState } from "react";
import { Download, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Producttransaction from "@/components/Alltransaction/Producttransaction";
import Donortransaction from "@/components/Alltransaction/Donortransaction";
import Premiumtransaction from "@/components/Alltransaction/Premiumtransaction";

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("donate");

  const transactionTabs = [
    // {
    //   id: "product",
    //   label: "Product",
    //   content: <Producttransaction />,
    // },
    {
      id: "donate",
      label: "Donate",
      content: <Donortransaction />,
    },
    {
      id: "subscription",
      label: "Subscription",
      content: <Premiumtransaction />,
    },
  ];

  return (
    <div className="container py-6">
      <Tabs
        defaultValue="product"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mx-2 md:mx-4 lg:mx-6">
          <div>
            <CardTitle className="text-2xl font-bold">
              Recent Transactions
            </CardTitle>
            <CardDescription>
              These are details about the last transactions
            </CardDescription>
          </div>
          <TabsList className="mb-4">
            {transactionTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {transactionTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
