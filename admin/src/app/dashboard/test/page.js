"use client";

import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { UseFileManager } from "@/context/FileManagerProvidert";
const page = () => {
  const { handleOpen, size } = UseFileManager();

  return (
    <div>
      <Button variant="gradient" onClick={() => handleOpen("lg")}>
        Open
      </Button>
      <h1>handleOpen

        ccccccccccccccccccccccc
      </h1>
      <PopUpFilemanager handleOpen={handleOpen} size={size} />
    </div>
  );
};

export default page;
