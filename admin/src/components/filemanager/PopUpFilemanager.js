"use client";

import { useState, useEffect } from "react";
import { Files, FilePlus, Search, SortAsc, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadPop from "./UploadPop";
import FileCompPop from "./FileCompPop";
import { toast } from "sonner";

const PopUpFilemanager = ({
  handleOpen,
  size,
  setThumbnail,
  setGallery,
  setGallery2,
  setImageSrc,
  setAboutImageSrc,
}) => {
  const [activeTab, setActiveTab] = useState("select");
  const [refreshFiles, setRefreshFiles] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [showSearch, setShowSearch] = useState(false);

  const isOpen =
    size === "xs" ||
    size === "sm" ||
    size === "md" ||
    size === "lg" ||
    size === "xl" ||
    size === "xxl";

  const handleUploadSuccess = () => {
    // Trigger a refresh of the file list
    setRefreshFiles((prev) => prev + 1);
    // Switch to select tab after successful upload
    setActiveTab("select");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass search term to FileCompPop
    setRefreshFiles((prev) => prev + 1);
  };

  const tabData = [
    {
      label: "Select",
      value: "select",
      icon: <Files className="h-4 w-4" />,
      component: (
        <FileCompPop
          setThumbnail={setThumbnail}
          setGallery={setGallery}
          handleOpen={handleOpen}
          setImageSrc={setImageSrc}
          setGallery2={setGallery2}
          setAboutImageSrc={setAboutImageSrc}
          key={refreshFiles}
          initialSearchTerm={searchTerm}
          initialSortOption={sortOption}
        />
      ),
    },
    {
      label: "Upload",
      value: "upload",
      icon: <FilePlus className="h-4 w-4" />,
      component: (
        <UploadPop
          handleOpen={handleOpen}
          onUploadSuccess={handleUploadSuccess}
        />
      ),
    },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
    toast.info(
      `Switched to ${value === "select" ? "Select Files" : "Upload Files"} tab`
    );
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => handleOpen(null)}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <Tabs
          defaultValue="select"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="border-b px-6 py-2 flex items-center justify-between">
            <TabsList className="grid w-[200px] grid-cols-2">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* {activeTab === "select" && (
              <div className="flex items-center gap-2">
                {showSearch ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <Input
                      type="search"
                      placeholder="Search files..."
                      className="w-[180px] h-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <Button
                    onClick={toggleSearch}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}

                <Select
                  value={sortOption}
                  onValueChange={(value) => {
                    setSortOption(value);
                    setRefreshFiles((prev) => prev + 1);
                  }}
                >
                  <SelectTrigger className="w-[40px] h-8 border-none">
                    <SortAsc className="h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Sort By Newest</SelectItem>
                    <SelectItem value="oldest">Sort By Oldest</SelectItem>
                    <SelectItem value="name">Sort By Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )} */}
          </div>

          {tabData.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpFilemanager;
