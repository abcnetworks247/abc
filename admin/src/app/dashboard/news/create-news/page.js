/**
 * Represents the page component for creating news.
 * @component
 * @returns {JSX.Element} The JSX element for the page component.
 */
'use client';
import Image from 'next/image';
import Link from 'next/link';
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
} from 'react-simple-wysiwyg';

import 'react-quill/dist/quill.snow.css';
import { useState, useEffect, useMemo } from 'react';
import { UseFileManager } from '@/context/FileManagerProvidert';
import PopUpFilemanager from '@/components/filemanager/PopUpFilemanager';
import { IoFolderOpenOutline } from 'react-icons/io5';
import Api from '@/utils/Api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function page() {
  /**
   * Represents the state of the HTML content.
   * @type {string}
   */
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [html, setHtml] = useState('');
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [type, setType] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newType, setNewType] = useState('');
  const [category, setCategory] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );


  const [full, setFull] = useState(true);
  const router = useRouter();

  // dialog open state that is recieved from filemanger context
  const { handleOpen, size } = UseFileManager();

  // function to handle the change of the html content
  function onChange(e) {
    setHtml(e.target.value);
  }

  //store Auth token
  const AuthToken = Cookies.get('adminToken');

  // custom toast

  // function to handle the click of the upload button
  const handleUpload = async (e) => {
    try {
      e.preventDefault();

      const data = {
        title: title,
        type: newType,
        category: newCategory,
        shortdescription: shortDescription,
        longdescription: html,
        blogimage: imageSrc,
      };

      console.log('Request Data:', data);
      setLoad(true);

      const response = await Api.post('admin/blog/create', data, {
        headers: { Authorization: `Bearer ${String(AuthToken)}` },
      });

      console.log('Response:', response);
      setLoad(false);
      if (response.status === 201) {
        Swal.fire({
          heightAuto: false,
          position: 'center',
          icon: 'success',
          title: 'News Created Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push('/dashboard/news/all-news');
      }
    } catch (error) {
      setLoad(false);
      console.error('Error:', error);
      const errorMessage = error.response.data.message;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: `${errorMessage}` || `Something went wrong!`,
      });
    }
  };

  //fetch data from api
  const fetchData = async () => {
    try {
      const typeRes = await Api.get('admin/category/news/type');
      const catRes = await Api.get('admin/category/news/category');

      if (catRes.status === 200) {
        console.log('------------->>', catRes.data);
        setCategory(catRes.data.data);
        setLoading(false);
      }
      if (typeRes.status === 200) {
        console.log(typeRes.data.data);
        setType(typeRes.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //if error is true show error message
  if (error === true) {
    return (
      <div className='flex items-center justify-center h-full'>
        <h1 className='text-2xl font-bold text-red-500'>
          Something went wrong
        </h1>
      </div>
    );
  }

  const HandleDeleteNewsimg = () => {
    setImageSrc(null);
  };

  return loading ? (
    <div className='flex items-center justify-center h-[70svh] lg:h-full'>
      <svg
        className='w-20 h-20 mr-3 -ml-1 text-blue-500 animate-spin'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
        />
      </svg>
    </div>
  ) : (
    <div>
      <div className='relative flex items-center justify-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 '>
        <div className='z-10 p-10 bg-white  lg:w-[70%] md:w-[80%] w-[90%] shadow-md rounded-xl'>
          <div className='text-center'>
            <h2 className='mt-5 text-3xl font-bold text-gray-900'>
              Create a post!
            </h2>
            <p className='mt-2 text-sm text-gray-400'>
              Lorem ipsum is placeholder text.
              {newCategory && (
                <span className='text-green-500'>{newCategory}</span>
              )}
              {'    '}
              {
                <span className='text-green-500'>
                  {newType && <span>{newType}</span>}
                </span>
              }
            </p>
          </div>
          <form
            className='mt-8 space-y-3'
            onSubmit={(e) => {
              handleUpload(e);
            }}
            method='POST'>
            <div className='grid grid-cols-1 space-y-2'>
              <label className='text-sm font-bold tracking-wide text-gray-500'>
                Title
              </label>
              <input
                className='p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                type=''
                placeholder='Example: 10 Best Laptops'
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
                required
              />
            </div>
            <div className='grid grid-cols-1 space-y-2'>
              {/* a div with two option select for categories and type */}
              <div className='grid grid-cols-2 gap-2'>
                <select
                  className='p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                  name='type'
                  id='type'
                  required
                  onChange={(e) => setNewType(e.target.value)}>
                  <option hidden>Select Type</option>
                  {type &&
                    type.map((item) => {
                      return (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>

                <select
                  className='p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                  name='type'
                  id='type'
                  required
                  onChange={(e) => setNewCategory(e.target.value)}>
                  <option hidden>Select Category</option>
                  {category &&
                    category.map((item) => {
                      return (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <br />
              <label className='text-sm font-bold tracking-wide text-gray-500'>
                Short Description
              </label>
              <textarea
                defaultValue={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                name=''
                id=''
                cols='10'
                rows='10'
                required
                placeholder=' News details'
                className='h-20 p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'></textarea>
              <label className='text-sm font-bold tracking-wide text-gray-500'>
                Full Details
              </label>
              {/* <EditorProvider>
                <Editor value={html} onChange={onChange} className="h-[80vh">
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
              </EditorProvider> */}
              <ReactQuill
                theme='snow'
                value={html}
                onChange={onChange}
                className='min-h-[80vh'
              />
            </div>
            <div className='flex flex-col gap-5'>
              <a href='#value=newsimage'>
                <div className='flex items-center justify-center w-full'>
                  <div
                    className='flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-50'
                    onClick={() => handleOpen('lg')}>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <svg
                        className='w-10 h-10 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                        />
                      </svg>
                      <p className='py-1 text-sm text-gray-600'>
                        Upload a file or drag and drop
                      </p>
                      <p className='text-xs text-gray-500'>
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              {imageSrc && (
                <div className='w-full relative'>
                  <Image
                    className='w-full h-[50vh] object-cover rounded-lg'
                    src={imageSrc}
                    height={500}
                    width={500}
                    alt=''
                  />
                  <div
                    className='cursor-pointer absolute top-4 right-4 p-2 bg-gray-200 rounded-full'
                    onClick={HandleDeleteNewsimg}>
                    <svg
                      className='w-6 h-6 text-red-600 cursor-pointer'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div>
              <button
                type='submit'
                className='flex justify-center w-full p-4 my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600'>
                {load ? (
                  <svg
                    className='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />
                  </svg>
                ) : (
                  <p>Upload</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <PopUpFilemanager
        handleOpen={handleOpen}
        size={size}
        setImageSrc={setImageSrc}
      />
    </div>
  );
}

export default page;
