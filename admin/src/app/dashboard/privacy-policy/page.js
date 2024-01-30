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


const PrivacyPolicyPage = () => {
    const [privacyContent, setPrivacyContent] = useState('');

    useEffect(() => {
        // Fetch the privacy content from the server and set it to the state
        fetchPrivacyContent();
    }, []);

    const fetchPrivacyContent = async () => {
        try {
            const response = await Api.get('admin/pages/policy');
            const data = await response.json();
            // setPrivacyContent(data.content);
            console.log(data.content);
        } catch (error) {
            console.error('Error fetching privacy content:', error);
        }
    };

    const savePrivacyContent = async () => {
        try {
            // const res = await Api.post('admin/pages/policy', { description: privacyContent });
           
            console.log('Privacy content saved successfully!', privacyContent);
        } catch (error) {

            console.error('Error saving privacy content:', error);
        }
    };
    const onChange = (e) => {
        setPrivacyContent(e.target.value);
    }
    return (
        <div>
            <div>
                <div className="relative flex items-center justify-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 ">
                    <div className="z-10 p-10 bg-white  lg:w-[70%] md:w-[80%] w-[90%] shadow-md rounded-xl">
                        <div className="text-center">
                            <h2 className="mt-5 text-3xl font-bold text-gray-900">
                                Create a post!
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Lorem ipsum is placeholder text.

                            </p>
                        </div>
                        <form
                            className="mt-8 space-y-3"
                            onSubmit={() => {
                                savePrivacyContent()
                            }}
                            method="POST"
                        >

                            <div className="grid grid-cols-1 space-y-2">
                                <label className="text-sm font-bold tracking-wide text-gray-500">
                                    Full Details
                                </label>
                                <EditorProvider>
                                    <Editor value={privacyContent} onChange={onChange} className="h-[80vh">
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
                            <div>
                                <button
                                    type="submit"
                                    className="flex justify-center w-full p-4 my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600"
                                >

                                    <p>Upload</p>

                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
