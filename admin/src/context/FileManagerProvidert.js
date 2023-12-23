"use client"
import { createContext, useContext, useState } from "react";
/**
 * creating context to for filemanger
 */
const FilemangerContext = createContext();

/**
 *
 * @param {children} children - allowing my children component to recieved data
 * @returns
 */

export const FileManagerProvider = ({ children }) => {
  // size for filemager dialog
  const [size, setSize] = useState(null);
  // fille manger dialog trigger
  const handleOpen = (value) => setSize(value);

  return (
    <FilemangerContext.Provider value={{ size, handleOpen }}>
      {children}
    </FilemangerContext.Provider>
  );
};

/**
 *
 * @returns {filemanger} useFilemanger - allowing me to use filemanager context
 */
export const UseFileManager = () => {
  const filemanger = FilemangerContext;
  if (!filemanger) {
    throw new Error("user can not use filemanager provider");
  }
  return useContext(filemanger); // returning filemanger
};
