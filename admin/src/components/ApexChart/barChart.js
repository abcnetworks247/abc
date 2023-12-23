'use client'

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  
   

   
  export default function BarChart() {

    
    return (
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          {/* profit this week */}
          <div className="flex flex-col gap-2">
            <Typography color="gray">Profit this week</Typography>
            <Typography color="green">+55.5%</Typography>
          </div>

        </CardHeader>
        <CardBody className="px-2 pb-0">
          {/* random image url in unsplash */}
          <img
            src="https://images.unsplash.com/photo-1593642532452-2b7f5b6d9b4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyJTIwY2hhcnQlMjBwcm9maXQlMjBjaGFydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            alt="..."
            className="w-full rounded-lg"
          />

        </CardBody>
      </Card>
    );
  }