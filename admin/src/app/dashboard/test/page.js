"use client";

import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import { Button, ButtonGroup } from "@material-tailwind/react";
import React, { useState } from "react";

const page = () => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  return (
    <div>
      <Button variant="gradient" onClick={() => handleOpen("lg")}>
        Open
      </Button>
      <PopUpFilemanager handleOpen={handleOpen} size={size} />
    </div>
  );
};

export default page;
