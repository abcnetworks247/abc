"use client";
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import {
    BtnBold,
    BtnItalic,
    createButton,
    BtnStrikeThrough,
    Editor,
    EditorProvider,
    BtnLink,
    Toolbar,
    BtnStyles,
    Separator,
} from "react-simple-wysiwyg";
import { useRouter } from 'next/router';
import Api from '@/utils/Api';
import Cookies from "js-cookie";


//store Auth token
const AuthToken = Cookies.get("adminToken");

const TermsPage = () => {
    const [terms, setTerms] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTerms = async () => {
        try {
            const response = await Api.get('admin/pages/terms');
            const data = await response.data
            // setTerms(data.content);
            console.log(data.content);
            setLoading(false)
            
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    };

    const data = {
        description: terms
    }

    const saveTerms = async () => {
        try {
            setLoading(true)
            const res = await Api.post('admin/pages/terms', data, {
                headers: { Authorization: `Bearer ${String(AuthToken)}` },
            });

            // console.log('Privacy content saved successfully!', res);
            setLoading(false)
            if (res.status === 200) {
                Swal.fire({
                    title: "Content updated successfully!",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {

            setError(error.message)
            console.error('Error saving content:', error);
            setLoading(false)
            Swal.fire({
                title: error.message,
                icon: "error",
                timer: 3000,
                showConfirmButton: false,
            });
        }
    };


    const onChange = (e) => {
        setTerms(e.target.value);
    }


    useEffect(() => {
        // Fetch the privacy content from the server and set it to the state
        fetchTerms();
    }, []);
    return (
        <div>
            <div>
                <div className="relative flex items-center justify-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 ">
                    <div className="z-10 p-10 bg-white  lg:w-[70%] md:w-[80%] w-[90%] shadow-md rounded-xl">
                        <div className="text-center">
                            <h2 className="mt-5 text-3xl font-bold text-gray-900">
                                Terms & Conditions
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Lorem ipsum is placeholder text.

                            </p>
                        </div>
                        <form
                            className="mt-8 space-y-3"

                        >

                            <div className="grid grid-cols-1 space-y-2">
                                <label className="text-sm font-bold tracking-wide text-gray-500">
                                    Full Details
                                </label>
                                <EditorProvider>
                                    <Editor value={terms} onChange={onChange} className="h-[80vh">
                                        <Toolbar>
                                            <BtnBold />
                                            <Separator />
                                            <BtnItalic />
                                            <Separator />
                                            <BtnLink />
                                            <Separator />
                                            <BtnStrikeThrough />
                                            <Separator />
                                            <BtnStyles />
                                        </Toolbar>
                                    </Editor>
                                </EditorProvider>
                            </div>

                        </form>
                        <div>
                            <button
                                onClick={saveTerms}
                                className="flex justify-center w-full p-4 my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600"
                            >
                                {
                                    loading ? <p>Loading...</p> :<p>Upload</p>
                                }
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default TermsPage;
