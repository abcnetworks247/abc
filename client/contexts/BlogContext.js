"use client"
import Api from "@/utils/Api";
import { useContext, createContext, useState, useEffect } from "react";

// create context for blog
const BlogContext = createContext()

/**
 * @returns {Object} 
 */

export const BlogContextProvider = ({children})=>{


 


    return <BlogContext value={{}}>{children}</BlogContext>
}



/**
 * 
 * @returns {Object} custom function for using blogContext
 * 
 */
export const UseBlogContex = ()=>{
    const blogContext = BlogContext;
    if(!blogContext){
        throw new Error("useBlog must be used within a BlogProvider")
    }
    return useContext(blogContext)
}