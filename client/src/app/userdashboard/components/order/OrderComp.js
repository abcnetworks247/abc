"use client";
import React from "react";

import { UseProductProvider } from "../../../../../contexts/ProductProvider";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import Ordered from "./Ordered";

const OrderComp = () => {
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
    handleUser,
  } = UseProductProvider();

  return (
    <>
    
      <div
        className={` w-full bg-white md:min-h-max h-[100vh] sm:rounded-md`}
      >
     

        {!cartProducts ||cartProducts.length === 0 ? (
          <div className="flex items-center justify-center min-h-full">
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
            <div className="flex items-center justify-between accountInformation px-4 py-2 text-bold w-full ">
              <p className="px-4 py-2 text-bold ">Orders</p>
            </div>

            {/* <p className="accountInformation px-4 py-2 text-bold ">Orders</p> */}

            <div className="mx-2 py-2">
              {cartProducts && cartProducts.map((product) => (
                <Ordered key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderComp;
