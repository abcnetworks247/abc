'use client';
import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from '@material-tailwind/react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoMdGlobe } from 'react-icons/io';

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import { SlFolderAlt } from 'react-icons/sl';
import useCurrentAdmin from '@/hooks/useCurrentAdmin';
import Image from 'next/image';
import Logo from '@/resources/assets/images/AbcstudioNo.png';
import Link from 'next/link';
import { UseAdminContext } from '@/context/AdminContext';


export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [open2, setOpen2] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const { CurrentUser, isLoading } = useCurrentAdmin();
  const { state, dispatch } = UseAdminContext();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleOpen2 = (value) => {
    setOpen2(open2 === value ? 0 : value);
  };

  const UserValue = CurrentUser && CurrentUser.data.olduser;
  const [openNavItem, setOpenNavItem] = useState(true);

  const acceessDenied = (role) => {
    if (UserValue && role.includes(UserValue.role)) {
      setOpenNavItem(true);
    }
  };

  return (
    <div
      className={`lg:w-auto w-24 absolute lg:sticky top-0 z-40 lg:z-0 h-[100vh] ${
        state.toggle ? 'block  toggle-animation  ' : 'hidden'
      }  lg:block`}>
      <div className='bg-[#121e31] h-screen left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto'>
        <div className='relative flex flex-col h-full'>
          <div className='flex items-center text-centerjustify-between'>
            <Link
              href='/dashboard'
              onClick={() => {
                dispatch({ type: 'TOGGLE' });
              }}>
              <Image
                src={Logo}
                alt='logo'
                className='object-cover'
                width={100}
                height={100}
              />
            </Link>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8 text-white lg:hidden block cursor-pointer'
              onClick={() => {
                dispatch({ type: 'TOGGLE' });
              }}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </div>

          <ul className='flex flex-col justify-center items-start flex-1 my-3 space-y-1'>
            <li>
              <Link
                href='/dashboard'
                className='flex items-center px-4 py-3 text-sm text-white transition-all rounded hover:bg-gray-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='w-[18px] h-[18px] mr-4'
                  viewBox='0 0 512 512'>
                  <path
                    d='M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0'
                    data-original='#000000'
                  />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>

            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? 'rotate-180' : ''
                  }`}
                />
              }>
              <ListItem
                className='p-0 text-[#FFFFFF]  bg-[#121E31] active:bg-gray-700 hover:bg-gray-700 focus:text-[#ffff] focus:bg-gray-700'
                selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className='border-b-0 p-3 hover:text-[#ffffff] text-[#FFFFFF]'>
                  <ListItemPrefix>
                    <ShoppingBagIcon className='h-5 w-5 text-[#FFFFFF]' />
                  </ListItemPrefix>
                  <Typography
                    color='white'
                    className='mr-auto font-normal text-[#FFFFFF]'>
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className='py-1'>
                <List className='p-0 text-[#FFFFFF] '>
                  <Link
                    href='/dashboard/eccomerce/orders'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 text-sm hover:text-[#fff] focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      Orders
                    </ListItem>
                  </Link>

                  <Link
                    href='/dashboard/eccomerce/product'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 text-sm hover:text-[#fff] focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      Products
                    </ListItem>
                  </Link>
                  <Link
                    href='/dashboard/eccomerce/newproduct'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 text-sm hover:text-[#fff] focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      New Product
                    </ListItem>
                  </Link>
                  <Link
                    href='/dashboard/eccomerce/category'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 text-sm hover:text-[#fff] focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      Category
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <li>
              <Link
                href='/dashboard/filemanager'
                className='flex items-center px-4 py-3 text-sm text-white transition-all rounded hover:bg-gray-700'
                onClick={() => {
                  dispatch({ type: 'TOGGLE' });
                }}>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-[18px] h-[18px] mr-4'>
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <path
                      opacity='0.5'
                      d='M18 10L13 10'
                      stroke='#ffffff'
                      strokeWidth='1.5'
                      strokeLinecap='round'></path>{' '}
                    <path
                      opacity='0.5'
                      d='M10 3H16.5C16.9644 3 17.1966 3 17.3916 3.02567C18.7378 3.2029 19.7971 4.26222 19.9743 5.60842C20 5.80337 20 6.03558 20 6.5'
                      stroke='#ffffff'
                      strokeWidth='1.5'></path>{' '}
                    <path
                      d='M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z'
                      stroke='#ffffff'
                      strokeWidth='1.5'></path>{' '}
                  </g>
                </svg>

                <span>File Manager</span>
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/users'
                className='flex items-center px-4 py-3 text-sm text-white transition-all rounded hover:bg-gray-700'
                onClick={() => {
                  dispatch({ type: 'TOGGLE' });
                }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  data-slot='icon'
                  className='w-[18px] h-[18px] mr-4'>
                  <path
                    fillRule='evenodd'
                    d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z'
                    clipRule='evenodd'
                  />
                  <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z' />
                </svg>

                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/admin'
                className='flex items-center px-4 py-3 text-sm text-white transition-all rounded hover:bg-gray-700'
                onClick={() => {
                  dispatch({ type: 'TOGGLE' });
                }}>
                <MdAdminPanelSettings className='w-[18px] h-[18px] mr-4 text-white' />

                <span>Admin</span>
              </Link>
            </li>

            <Accordion
              open={open2 === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open2 === 2 ? 'rotate-180' : ''
                  }`}
                />
              }>
              <ListItem
                className='p-0 text-[#FFFFFF]  bg-[#121E31] active:bg-gray-700 hover:bg-gray-700 focus:text-[#ffff] focus:bg-gray-700'
                selected={open2 === 2}>
                <AccordionHeader
                  onClick={() => handleOpen2(2)}
                  className='border-b-0 p-3 hover:text-[#ffffff] text-[#FFFFFF]'>
                  <ListItemPrefix>
                    <IoMdGlobe className='h-5 w-5 text-[#FFFFFF]' />
                  </ListItemPrefix>
                  <Typography
                    color='white'
                    className='mr-auto font-normal text-[#FFFFFF]'>
                    News
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className='py-1'>
                <List className='p-0 text-[#FFFFFF] '>
                  <Link
                    href='/dashboard/news/all-news'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 hover:text-[#fff] text-sm focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      All News
                    </ListItem>
                  </Link>

                  <Link
                    href='/dashboard/news/create-news'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 text-sm hover:text-[#fff] focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      Create News
                    </ListItem>
                  </Link>
                  <Link
                    href='/dashboard/news/category'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 text-sm hover:text-[#fff] focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      News Category
                    </ListItem>
                  </Link>
                  <Link
                    href='/dashboard/news/type'
                    onClick={() => {
                      dispatch({ type: 'TOGGLE' });
                    }}>
                    <ListItem className='hover:bg-gray-700 text-sm hover:text-[#fff] focus:text-[#ffff] focus:bg-gray-700'>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className='w-5 h-3' />
                      </ListItemPrefix>
                      News Type
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <li>
              <Link
                href='/dashboard/settings'
                className='flex items-center px-4 py-3 text-sm text-white transition-all rounded hover:bg-gray-700'>
                <svg
                  fill='#ffffff'
                  viewBox='0 0 32 32'
                  version='1.1'
                  className='w-[18px] h-[18px] mr-4'
                  xmlns='http://www.w3.org/2000/svg'
                  stroke='#ffffff'>
                  <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <path d='M30.015 12.97l-2.567-0.569c-0.2-0.64-0.462-1.252-0.762-1.841l1.389-2.313c0.518-0.829 0.78-2.047 0-2.829l-1.415-1.414c-0.78-0.781-2.098-0.64-2.894-0.088l-2.251 1.434c-0.584-0.303-1.195-0.563-1.829-0.768l-0.576-2.598c-0.172-0.953-1.005-1.984-2.11-1.984h-2c-1.104 0-1.781 1.047-2 2l-0.642 2.567c-0.678 0.216-1.328 0.492-1.948 0.819l-2.308-1.47c-0.795-0.552-2.114-0.692-2.894 0.088l-1.415 1.414c-0.781 0.782-0.519 2 0 2.828l1.461 2.435c-0.274 0.552-0.517 1.123-0.705 1.72l-2.566 0.569c-0.953 0.171-1.984 1.005-1.984 2.109v2c0 1.105 1.047 1.782 2 2l2.598 0.649c0.179 0.551 0.404 1.080 0.658 1.593l-1.462 2.438c-0.518 0.828-0.78 2.047 0 2.828l1.415 1.414c0.78 0.782 2.098 0.64 2.894 0.089l2.313-1.474c0.623 0.329 1.277 0.608 1.96 0.823l0.64 2.559c0.219 0.953 0.896 2 2 2h2c1.105 0 1.938-1.032 2.11-1.985l0.577-2.604c0.628-0.203 1.23-0.459 1.808-0.758l2.256 1.438c0.796 0.552 2.114 0.692 2.895-0.089l1.415-1.414c0.78-0.782 0.518-2 0-2.828l-1.39-2.317c0.279-0.549 0.521-1.12 0.716-1.714l2.599-0.649c0.953-0.219 2-0.895 2-2v-2c0-1.104-1.031-1.938-1.985-2.11zM30.001 16.939c-0.085 0.061-0.245 0.145-0.448 0.192l-3.708 0.926-0.344 1.051c-0.155 0.474-0.356 0.954-0.597 1.428l-0.502 0.986 1.959 3.267c0.125 0.2 0.183 0.379 0.201 0.485l-1.316 1.314c-0.127-0.040-0.271-0.092-0.341-0.14l-3.292-2.099-1.023 0.529c-0.493 0.256-0.999 0.468-1.503 0.631l-1.090 0.352-0.824 3.723c-0.038 0.199-0.145 0.36-0.218 0.417h-1.8c-0.061-0.085-0.145-0.245-0.191-0.448l-0.921-3.681-1.066-0.338c-0.549-0.173-1.097-0.404-1.63-0.684l-1.028-0.543-3.293 2.099c-0.135 0.091-0.279 0.143-0.409 0.143l-1.311-1.276c0.018-0.104 0.072-0.274 0.181-0.449l2.045-3.408-0.487-0.98c-0.227-0.462-0.407-0.895-0.547-1.325l-0.343-1.052-3.671-0.918c-0.231-0.052-0.398-0.139-0.485-0.2v-1.86c0.001 0.001 0.002 0.001 0.005 0.001 0.034 0 0.198-0.117 0.335-0.142l3.772-0.835 0.346-1.103c0.141-0.449 0.333-0.917 0.588-1.43l0.487-0.98-2.024-3.373c-0.125-0.201-0.184-0.38-0.201-0.485l1.315-1.314c0.128 0.041 0.271 0.093 0.34 0.14l3.354 2.138 1.027-0.542c0.527-0.278 1.073-0.507 1.622-0.682l1.063-0.338 0.912-3.649c0.053-0.231 0.138-0.398 0.2-0.485h1.859c-0.014 0.020 0.115 0.195 0.142 0.339l0.84 3.794 1.089 0.352c0.511 0.165 1.023 0.38 1.523 0.639l1.023 0.532 3.224-2.053c0.135-0.092 0.279-0.143 0.409-0.143l1.313 1.276c-0.017 0.104-0.072 0.276-0.181 0.45l-1.98 3.296 0.505 0.988c0.273 0.533 0.48 1.033 0.635 1.529l0.346 1.104 3.697 0.82c0.224 0.041 0.398 0.171 0.434 0.241zM16.013 9.99c-3.321 0-6.023 2.697-6.023 6.010s2.702 6.010 6.023 6.010 6.023-2.697 6.023-6.009c0-3.313-2.702-6.010-6.023-6.010zM16 20c-2.205 0-4-1.794-4-4s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.794 4-4 4z' />{' '}
                  </g>
                </svg>
                <span>Settings</span>
              </Link>
            </li>

            <li>
              <Link
                href='/dashboard/transactions'
                className='flex items-center px-4 py-3 text-sm text-white transition-all rounded hover:bg-gray-700'
                onClick={() => {
                  dispatch({ type: 'TOGGLE' });
                }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  data-slot='icon'
                  className='w-[18px] h-[18px] mr-4'>
                  <path d='M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z' />
                  <path
                    fillRule='evenodd'
                    d='M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z'
                    clipRule='evenodd'
                  />
                </svg>

                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/profile'
                className='flex items-center px-4 py-3 text-sm text-white transition-all rounded hover:bg-gray-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='w-[18px] h-[18px] mr-4'
                  viewBox='0 0 512 512'>
                  <path
                    d='M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0'
                    data-original='#000000'
                  />
                </svg>
                <span>Profile</span>
              </Link>
            </li>
          </ul>

          {isLoading ? (
            <div className='flex flex-wrap items-center px-2 py-1 border border-gray-500 rounded-full cursor-pointer'>
              <div className='w-10 h-10 border-2 rounded-full animate-pulse bg-blue-gray-200 border-blue-gray-200 border-l-transparent'></div>
              <div className='ml-4'>
                <p className='w-5 h-2 text-sm text-white rounded-sm bg-blue-gray-200 animate-pulse'></p>
                <p className='w-5 h-2 text-sm text-white rounded-sm bg-blue-gray-200 animate-pulse'></p>
              </div>
            </div>
          ) : (
            <Link
              href='/dashboard/profile'
              onClick={() => {
                dispatch({ type: 'TOGGLE' });
              }}>
              <div className='flex flex-wrap items-center px-2 py-1 border border-gray-500 rounded-full cursor-pointer'>
                <Image
                  src={UserValue && UserValue.userdp}
                  height={50}
                  width={50}
                  className='border-2 object-cover border-white rounded-full w-9 h-9'
                />
                <div className='ml-4'>
                  <p className='text-sm text-white flex flex-row items-center gap-2'>
                    {UserValue && UserValue.fullname}{' '}
                    <span class='flex w-2 h-2 me-2 bg-green-400 border-white border  rounded-full'></span>
                  </p>
                  <p className='text-xs text-gray-300'>
                    Active {UserValue && UserValue.role} account
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
      
    </div>
  );
}
