"use client"
import React from 'react'
import { UseProductProvider } from '../../../../contexts/ProductProvider';
import Ordered from '../components/Ordered'
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';


const page = () => {
  const pathname = usePathname();
  const {
    cartProducts,
    handleLinkClick,
    userNav,
    isTabletOrMobile,
    isDesktop,
    userModal,
    desktopState,
    screen,
    handleUser

  } = UseProductProvider();
  

  return (
    <>
      <div
        className={` ${
          screen ? "hidden" : ""
        } h-full w-full absolute sm:static sm:block top-0 z-30 md:basis-3/4 bg-white md:min-h-max sm:shadow-md sm:rounded-md`}
      >
        {/* <div className={`${screen && "hidden"}`} onClick={() => handleUser()}>
          cancel
        </div> */}

        {cartProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <div className="w-[200p] h-[200px]">
                <img
                  src="/assets/images/purchaseOrder.png"
                  className="object-contain w-full h-full"
                />
              </div>

              <p className="text-sm ">
                {" "}
                It looks like you haven't made any purchases yet
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between accountInformation px-4 py-2 text-bold ">
              <p className="px-4 py-2 text-bold ">Orders</p>
              <div className="sm:hidden">
                <svg
                  viewBox="0 0 1024 1024"
                  className="w-6 h-6"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#737373"
                  stroke="#737373"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M704 288h-281.6l177.6-202.88a32 32 0 0 0-48.32-42.24l-224 256a30.08 30.08 0 0 0-2.24 3.84 32 32 0 0 0-2.88 4.16v1.92a32 32 0 0 0 0 5.12A32 32 0 0 0 320 320a32 32 0 0 0 0 4.8 32 32 0 0 0 0 5.12v1.92a32 32 0 0 0 2.88 4.16 30.08 30.08 0 0 0 2.24 3.84l224 256a32 32 0 1 0 48.32-42.24L422.4 352H704a224 224 0 0 1 224 224v128a224 224 0 0 1-224 224H320a232 232 0 0 1-28.16-1.6 32 32 0 0 0-35.84 27.84 32 32 0 0 0 27.84 35.52A295.04 295.04 0 0 0 320 992h384a288 288 0 0 0 288-288v-128a288 288 0 0 0-288-288zM103.04 760a32 32 0 0 0-62.08 16A289.92 289.92 0 0 0 140.16 928a32 32 0 0 0 40-49.92 225.6 225.6 0 0 1-77.12-118.08zM64 672a32 32 0 0 0 22.72-9.28 37.12 37.12 0 0 0 6.72-10.56A32 32 0 0 0 96 640a33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72 32 32 0 0 0-34.88 6.72A32 32 0 0 0 32 640a32 32 0 0 0 2.56 12.16 37.12 37.12 0 0 0 6.72 10.56A32 32 0 0 0 64 672z"
                      fill="#737373"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            {/* <p className="accountInformation px-4 py-2 text-bold ">Orders</p> */}

            <div className="mx-2 py-2">
              {cartProducts.map((product) => (
                <Ordered key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default page