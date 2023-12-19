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
  console.log(screen)

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
              <div className="">
                <svg
                  onClick={() => handleUser()}
                  className="w-4 h-4 self-end"
                  viewBox="0 0 512 512"
                  version="1.1"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="_x37_12-_close__x2C__cross__x2C__cancel__x2C_">
                      <g>
                        <line
                          style={{
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: 30,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 2.6131,
                          }}
                          x1="486.21"
                          x2="26.739"
                          y1="26.814"
                          y2="486.139"
                        ></line>
                        <line
                          style={{
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: 30,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 2.6131,
                          }}
                          x1="486.21"
                          x2="26.739"
                          y1="486.139"
                          y2="26.814"
                        ></line>
                      </g>
                    </g>
                    <g id="Layer_1"></g>
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