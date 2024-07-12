'use client';

import { IoStorefrontOutline } from 'react-icons/io5';
import { UseUserContext } from '../../../contexts/UserContext';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa6';
import { CgLivePhoto } from 'react-icons/cg';
import { BiHomeSmile } from 'react-icons/bi';
import Logo from '@/resources/assets/image/AbcstudioNo.png';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineContacts } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Api from '@/utils/Api';

export default function Sidebar() {
  const [type, setType] = useState(null);
  const [category, setCategory] = useState([]);
  const { loading, UserData, Authtoken } = UseUserContext();
  const pathUrl = '/news/';

  const fetchData = async () => {
    try {
      const response = await Api.get('admin/category/news/type');

      if (response.status === 200) {
        console.log('data file 2', response.data.data);
        setType(response.data.data);
      }
    } catch (error) {
      // console.log(" Error------------->>", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='sm:w-full sm:max-w-[18rem] z-90 z-50 '>
        <input
          type='checkbox'
          id='sidebar-mobile-fixed'
          className='hidden sidebar-state'
        />
        <label
          htmlFor='sidebar-mobile-fixed'
          className='sidebar-overlay lg:hidden '></label>
        <aside className='justify-start h-full bg-white sidebar md:hidden lg:hidden sidebar-fixed-left sidebar-mobile max-sm:fixed max-sm:-translate-x-full'>
          <div className='flex items-center justify-between pr-6'>
            <section className='items-center p-4 sidebar-title'>
              <Image src={Logo} alt='logo' width={100} height={100} />
            </section>
            <div>
              <label htmlFor='sidebar-mobile-fixed'>
                <MdClose className='text-3xl cursor-pointer text-blackInverted' />
              </label>
            </div>
          </div>
          <section className='sidebar-content'>
            <nav className='rounded-md menu'>
              <section className='px-4 menu-section'>
                <span className='menu-title'>Main menu</span>
                <ul className='menu-items'>
                  <Link href='/'>
                    <li className='menu-item'>
                      <BiHomeSmile className='w-5 h-5 opacity-75' />
                      <span>Home</span>
                    </li>
                  </Link>
                  <li>
                    <input
                      type='checkbox'
                      id='menu-1'
                      className='hidden menu-toggle'
                    />
                    <label
                      className='justify-between menu-item'
                      htmlFor='menu-1'>
                      <div className='flex gap-2'>
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          className='w-[23px] h-[23px] opacity-75'
                          xmlns='http://www.w3.org/2000/svg'>
                          <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                          <g
                            id='SVGRepo_tracerCarrier'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <g id='SVGRepo_iconCarrier'>
                            {' '}
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M6.15407 7.30116C7.52877 5.59304 9.63674 4.5 12 4.5C12.365 4.5 12.7238 4.52607 13.0748 4.57644L13.7126 5.85192L11.2716 8.2929L8.6466 8.6679L7.36009 9.95441L6.15407 7.30116ZM5.2011 8.82954C4.75126 9.79256 4.5 10.8669 4.5 12C4.5 15.6945 7.17133 18.7651 10.6878 19.3856L11.0989 18.7195L8.8147 15.547L10.3741 13.5256L9.63268 13.1549L6.94027 13.6036L6.41366 11.4972L5.2011 8.82954ZM7.95559 11.4802L8.05962 11.8964L9.86722 11.5951L11.3726 12.3478L14.0824 11.9714L18.9544 14.8135C19.3063 13.9447 19.5 12.995 19.5 12C19.5 8.93729 17.6642 6.30336 15.033 5.13856L15.5377 6.1481L11.9787 9.70711L9.35371 10.0821L7.95559 11.4802ZM18.2539 16.1414C16.9774 18.0652 14.8369 19.366 12.3859 19.4902L12.9011 18.6555L10.6853 15.578L12.0853 13.7632L13.7748 13.5286L18.2539 16.1414ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z'
                              fill='#080341'
                            />{' '}
                          </g>
                        </svg>

                        <span>News</span>
                      </div>

                      <span className='menu-icon'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'>
                          <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                    </label>

                    <div className='menu-item-collapse'>
                      <div className='min-h-0'>
                        {type &&
                          type.map((item, index) => {
                            return (
                              <Link key={index} href={`${pathUrl}${item._id}`}>
                                <label className='ml-6 menu-item menu-item-disabled'>
                                  {item.name}
                                </label>
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                  </li>
                  <Link href='/store'>
                    <li className='menu-item'>
                      <IoStorefrontOutline className='w-5 h-5 opacity-75' />

                      <p>Store</p>
                    </li>
                  </Link>
                  {Authtoken && UserData.userpackage !== 'basic' ? (
                    <Link href='/live'>
                      <li className='menu-item'>
                        <CgLivePhoto className='w-5 h-5 text-red-600 opacity-75' />

                        <span className='px-4 py-1 text-sm font-medium text-white bg-red-600 rounded-lg'>
                          Live{' '}
                        </span>
                      </li>
                    </Link>
                  ) : (
                    <Link href='/live'>
                      <li className='menu-item'>
                        <CgLivePhoto className='w-5 h-5 text-red-600 opacity-75' />

                        <span className='px-4 py-1 text-sm font-medium text-white bg-red-600 rounded-lg'>
                          Live{' '}
                        </span>
                      </li>
                    </Link>
                  )}
                  <Link href='/pricing'>
                    <li className='menu-item'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='opacity-75'
                        width='22'
                        height='22'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path
                          stroke='none'
                          d='M0 0h24v24H0z'
                          fill='none'></path>
                        <path d='M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z'></path>
                        <path d='M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
                        <path d='M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2'></path>
                      </svg>
                      Membership
                    </li>
                  </Link>
                  <Link href='/donate'>
                    <li className='menu-item'>
                      <svg
                        height='25px'
                        width='25px'
                        version='1.1'
                        id='Layer_1'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        viewBox='0 0 511.999 511.999'
                        xmlSpace='preserve'
                        fill='#000000'>
                        <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                        <g
                          id='SVGRepo_tracerCarrier'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <g id='SVGRepo_iconCarrier'>
                          {' '}
                          <path
                            style={{ fill: '#000000' }}
                            d='M457.246,476.261H123.109c-21.42,0-41.994-10.142-55.041-27.13l-57.491-74.863 c-1.939-2.525-2.982-5.623-2.963-8.806l0.328-56.891c0.046-7.879,6.447-14.24,14.323-14.24c0.013,0,0.024,0,0.037,0 c16.997,0.044,41.367,0.12,60.942,0.239c8.637,0.052,15.951,0.109,21.125,0.173c11.003,0.135,13.96,0.17,18.186,4.387l84.293,84.293 c9.738,9.738,25.582,9.738,35.32,0l0.127-0.127c9.737-9.737,9.737-25.582,0-35.32l-78.822-77.56 c-9.449-9.298-21.954-14.419-35.209-14.419H14.323C6.412,255.998,0,249.586,0,241.675c0-7.91,6.412-14.323,14.323-14.323h113.94 c20.822,0,40.462,8.042,55.301,22.647l78.902,77.64c20.988,20.988,20.988,55.005,0.083,75.912l-0.126,0.126 c-20.908,20.907-54.925,20.907-75.831,0l-80.264-80.264c-9.036-0.129-30.615-0.278-69.823-0.398l-0.218,37.7l54.499,70.967 c7.661,9.976,19.744,15.933,32.322,15.933h334.137c13.771,0,24.976-11.203,24.976-24.976v-0.179 c0-13.771-11.203-24.976-24.976-24.976H319.006c-7.91,0-14.323-6.412-14.323-14.323s6.412-14.323,14.323-14.323h138.238 c29.566,0,53.621,24.054,53.621,53.621v0.179C510.867,452.207,486.812,476.261,457.246,476.261z'
                          />{' '}
                          <circle
                            style={{ fill: '#CEE8FA' }}
                            cx='363.596'
                            cy='184.132'
                            r='134.075'
                          />{' '}
                          <g>
                            {' '}
                            <path
                              style={{ fill: '#000000' }}
                              d='M363.601,332.534c-81.827,0-148.399-66.57-148.399-148.399c0-81.827,66.57-148.397,148.399-148.397 c81.827,0,148.397,66.57,148.397,148.397C512,265.964,445.428,332.534,363.601,332.534z M363.601,64.383 c-66.032,0-119.753,53.72-119.753,119.752s53.722,119.753,119.753,119.753s119.752-53.722,119.752-119.753 S429.633,64.383,363.601,64.383z'
                            />{' '}
                            <path
                              style={{ fill: '#000000' }}
                              d='M358.087,255.922c-24.062-0.802-43.713-13.234-43.713-26.067c0-6.818,6.016-16.843,13.635-16.843 c8.422,0,15.239,11.831,30.078,14.437v-32.484c-18.448-7.018-40.104-15.64-40.104-41.307c0-25.466,18.849-37.697,40.104-40.704 v-5.614c0-2.807,3.208-5.414,7.62-5.414c3.81,0,7.62,2.607,7.62,5.414v5.013c12.432,0.401,35.893,3.609,35.893,17.445 c0,5.414-3.609,16.442-12.432,16.442c-6.617,0-10.427-6.417-23.461-7.419v29.276c18.247,6.818,39.502,16.242,39.502,43.312 c0,24.864-16.041,39.903-39.502,43.713v5.815c0,2.807-3.81,5.414-7.62,5.414c-4.411,0-7.62-2.607-7.62-5.414V255.922z M360.092,163.283v-23.862c-9.023,1.805-12.833,6.417-12.833,11.229C347.259,156.465,352.473,160.075,360.092,163.283z M371.321,200.379v26.869c6.818-1.604,12.232-5.414,12.232-12.633C383.553,207.998,378.54,203.787,371.321,200.379z'
                            />{' '}
                          </g>{' '}
                        </g>
                      </svg>
                      Donate
                    </li>
                  </Link>
                  <Link href='/about'>
                    <li className='menu-item'>
                      <IoInformationCircleOutline className='w-5 h-5 text-black opacity-75' />
                      About
                    </li>
                  </Link>
                  <Link href='/contact'>
                    <li className='menu-item'>
                      <MdOutlineContacts className='w-5 h-5 text-black opacity-75' />
                      Contact
                    </li>
                  </Link>
                </ul>
              </section>
              <div className='my-0 divider'></div>
              <section className='px-4 menu-section'>
                <span className='menu-title'>More</span>
                <ul className='menu-items'>
                  {!Authtoken ? (
                    <></>
                  ) : (
                    <Link href='/userdashboard'>
                      <li className='menu-item'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='opacity-75'
                          width='22'
                          height='22'
                          viewBox='0 0 24 24'
                          strokeWidth='2'
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <path
                            stroke='none'
                            d='M0 0h24v24H0z'
                            fill='none'></path>
                          <path d='M3 21l18 0'></path>
                          <path d='M3 10l18 0'></path>
                          <path d='M5 6l7 -3l7 3'></path>
                          <path d='M4 10l0 11'></path>
                          <path d='M20 10l0 11'></path>
                          <path d='M8 14l0 3'></path>
                          <path d='M12 14l0 3'></path>
                          <path d='M16 14l0 3'></path>
                        </svg>
                        Payments
                      </li>
                    </Link>
                  )}
                  <Link href='/wish'>
                    <li className='menu-item'>
                      <FaRegHeart className='text-2xl' />
                      Wishlist
                    </li>
                  </Link>
                  <Link href='/cart'>
                    <li className='menu-item'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='opacity-75'
                        width='22'
                        height='22'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path
                          stroke='none'
                          d='M0 0h24v24H0z'
                          fill='none'></path>
                        <path d='M7 10l5 -6l5 6'></path>
                        <path d='M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z'></path>
                        <path d='M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
                      </svg>
                      Cart
                    </li>
                  </Link>
                </ul>
              </section>
            </nav>
          </section>
          <section className='justify-end pt-2 sidebar-footer bg-gray-2'>
            <div className='my-0 divider'></div>
            <div className='z-50 flex w-full cursor-pointer dropdown h-fit hover:bg-gray-4'>
              <div className='flex flex-row gap-4 p-4'>
                {Authtoken && UserData && Authtoken.length !== 0 ? (
                  <>
                    {loading === false ? (
                      <div className='items-center gap-4 dropdown-container'>
                        <div className='avatar-square avatar avatar-md'>
                          <Image
                            src={UserData && UserData.userdp}
                            height={20}
                            width={33}
                            quality={100}
                            loading='lazy'
                            className='object-cover rounded-full cursor-pointer'
                            alt='avatar'
                            // style={{
                            //   width: '100%',
                            //   height: 'auto',
                            // }}
                          />
                        </div>

                        <div className='flex flex-col'>
                          <span>{UserData && UserData.fullname}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className='h-full w-[40px] rounded-full bg-gray-400 animate-pulse'></div>
                      </>
                    )}
                  </>
                ) : (
                  <Link href='/login'>
                    <FaRegUser className='text-gray-700 hover:text-primary transition  text-[26px] cursor-pointer block md:hidden' />
                  </Link>
                )}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
