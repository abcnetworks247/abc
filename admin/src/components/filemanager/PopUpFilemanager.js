"use client";

import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { LuFiles } from "react-icons/lu";
import { BsFileEarmarkPlus } from "react-icons/bs";
import UploadPop from "./UploadPop";
import FileCompPop from "./FileCompPop";

const PopUpFilemanager = ({
  handleOpen,
  size,
  setThumbnail,
  setGallery,
  setGallery2,
  setImageSrc,
  setAboutImageSrc,
}) => {
  const [selectedphoto, setSelectedPhoto] = useState(null);
  const [blogimage, setBlogImage] = useState(null);

  const data = [
    {
      label: "Select",
      value: "select",
      icon: LuFiles,
      childComponent: (
        <FileCompPop
          setThumbnail={setThumbnail}
          setGallery={setGallery}
          handleOpen={handleOpen}
          setImageSrc={setImageSrc}
          setGallery2={setGallery2}
          setAboutImageSrc={setAboutImageSrc}
        />
      ),
    },
    {
      label: "Upload",
      value: "upload",
      icon: BsFileEarmarkPlus,
      childComponent: <UploadPop />,
    },
  ];

  return (
    <div className="h-fit">
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        style={{ animation: "none" }}
        key={Math.random()}
        size={size || "sm"}
        handler={handleOpen}
      >
        <DialogBody className="px-6">
          <Tabs value="select" className="h-fit">
            <TabsHeader className="m-0 w-fit h-fit">
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value} className="px-8 m-0 h-fit">
                  <div className="flex items-center gap-2">
                    {icon}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="overflow-y-auto h-fit ">
              {data.map(({ value, childComponent }) => (
                <TabPanel key={value} value={value} className="mt-0">
                  {childComponent}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PopUpFilemanager;
