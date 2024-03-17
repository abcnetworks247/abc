"use client";
import React from "react";
import { useState } from "react";

import { UseProductProvider } from "../../../../../contexts/ProductProvider";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import Ordered from "./Ordered";

const OrderComp = () => {
  const pathname = usePathname();
  const {
    handleLinkClick,
    userNav,
    isTabletOrMobile,
    isDesktop,
    userModal,
    desktopState,
    screen,
    handleUser,
  } = UseProductProvider();

  const [order, setOrder] = useState(true);
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => {
    setIsVisible((prev)=>!prev)
  }

  return (
    <>
      <div className={` w-full bg-white md:min-h-max h-[100vh] sm:rounded-md`}>
        {!order ? (
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
          <div className="mx-4 my-6">
            <div className="px-4">
              <h1 className="text-lg font-semibold text-gray-900">
                Order history
              </h1>
              <p className="text-sm mt-2">
                Check the status of recent orders, manage returns, and download
                invoices.
              </p>
            </div>
            <div className="py-4 bg-gray-100 px-2">
              <div className="mt-4">
                <div>
                  <h3 className="text-sm font-semibold">
                    Order placed on{" "}
                    <time dateTime="2021-01-22">January 22, 2021</time>
                  </h3>
                  <div className="border-b border-gray-200 py-2 bg-gray-100 px-2">
                    <dl className="flex flex-col w-full sm:flex-row sm:items-center justify-between ">
                      <div className=" flex flex-col  sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex flex-row justify-between w-full sm:flex-col items-center ">
                          <dt className="text-sm">Date placed</dt>
                          <dd className="text-gray-800 text-sm">
                            <time dateTime="2021-01-22">January 22, 2021</time>
                          </dd>
                        </div>
                        <div className="flex flex-row justify-between sm:flex-col items-center">
                          <dt className="text-sm">Order number</dt>
                          <dd className="text-gray-500 text-sm">WU88191111</dd>
                        </div>
                        <div className="flex flex-row justify-between sm:flex-col items-center">
                          <dt className="text-sm">Total amount</dt>
                          <dd className="text-sm text-gray-500">$238.00</dd>
                        </div>
                      </div>

                      <a
                         onClick={toggleVisibility}
                        className="cursor-pointer flex flex-row items-center justify-center bg-white border border-gray-300 px-2 py-2 rounded-md shadow-sm"
                      >
                          <span className="text-xs">{ isVisible ? 'View less' : 'View more'}</span>
                      </a>
                    </dl>
                  </div>
                  {isVisible && (
                    <table className="mt-4 w-full table-auto bg-white px-2">
                      <thead>
                        <tr>
                          <th className="py-2 text-sm text-gray-500">
                            Product
                          </th>
                          <th className="py-2 text-sm text-gray-500">Price</th>
                          <th className="hidden md:table-cell py-2 text-sm text-gray-500">
                            Status
                          </th>
                          <th className="py-2 text-sm text-gray-500">Info</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 pl-2">
                            <div className="flex items-center">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg"
                                alt="Product 1"
                                className="w-16 h-16 rounded"
                              />
                              <div className="ml-2">
                                <div className="text-sm">
                                  Machined Pen and Pencil Set
                                </div>
                                <div className="text-gray-500 text-sm">
                                  $70.00
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 text-sm">$70.00</td>
                          <td className=" hidden md:table-cell py-2 text-sm">
                            Delivered Jan 25, 2021
                          </td>
                          <td className="py-2 text-sm">
                            <a href="#" className="text-blue-600">
                              View product
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 pl-2">
                            <div className="flex items-center">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg"
                                alt="Product 1"
                                className="w-16 h-16 rounded"
                              />
                              <div className="ml-2">
                                <div className="text-sm">
                                  Machined Pen and Pencil Set
                                </div>
                                <div className="text-gray-500 text-sm">
                                  $70.00
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 text-sm">$70.00</td>
                          <td className=" hidden md:table-cell py-2 text-sm">
                            Delivered Jan 25, 2021
                          </td>
                          <td className="py-2 text-sm">
                            <a href="#" className="text-blue-600">
                              View product
                            </a>
                          </td>
                        </tr>

                        {/* <tr>
                  <td className="py-2">
                    <div className="flex items-center">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-02.jpg"
                        alt="Product 2"
                        className="w-16 h-16 rounded"
                      />
                      <div className="ml-2">
                        <div className="font-semibold">Earthen Mug</div>
                        <div className="text-gray-800">$28.00</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">$28.00</td>
                  <td className="py-2">Delivered Jan 25, 2021</td>
                  <td className="py-2">
                    <a href="#" className="text-blue-600">
                      View<span className="text-sm"> Product, Earthen Mug</span>
                    </a>
                  </td>
                </tr> */}
                        {/* <tr>
                  <td className="py-2">
                    <div className="flex items-center">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-03.jpg"
                        alt="Product 3"
                        className="w-16 h-16 rounded"
                      />
                      <div className="ml-2">
                        <div className="font-semibold">
                          Leatherbound Daily Journal Set
                        </div>
                        <div className="text-gray-800">$140.00</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">$140.00</td>
                  <td className="py-2">Delivered Jan 25, 2021</td>
                  <td className="py-2">
                    <a href="#" className="text-blue-600">
                      View
                      <span className="text-sm">
                        {" "}
                        Product, Leatherbound Daily Journal Set
                      </span>
                    </a>
                  </td>
                </tr> */}
                      </tbody>
                      </table>
                     )}
                </div>
                {/* <div className="mt-8">
            <h3 className="text-xl font-semibold">
              Order placed on <time dateTime="2021-01-05">January 5, 2021</time>
            </h3>
            <div className="border-b border-gray-200 py-2">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="font-semibold">Date placed</dt>
                  <dd className="text-gray-800">
                    <time dateTime="2021-01-05">January 5, 2021</time>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Order number</dt>
                  <dd className="text-gray-800">WU88191009</dd>
                </div>
                <div>
                  <dt className="font-semibold">Total amount</dt>
                  <dd className="text-gray-800">$115.00</dd>
                </div>
              </dl>
              <a href="#" className="inline-block mt-2 text-blue-600">
                View Invoice
                <span className="text-sm"> for order WU88191009</span>
              </a>
            </div>
            <table className="mt-4 w-full">
              <caption className="text-lg font-semibold">Products</caption>
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th scope="col" className="py-2">
                    Product
                  </th>
                  <th scope="col" className="py-2">
                    Price
                  </th>
                  <th scope="col" className="py-2">
                    Status
                  </th>
                  <th scope="col" className="py-2">
                    Info
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2">
                    <div className="flex items-center">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-04.jpg"
                        alt="Product 4"
                        className="w-16 h-16 rounded"
                      />
                      <div className="ml-2">
                        <div className="font-semibold">Carry Clutch</div>
                        <div className="text-gray-800">$80.00</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">$80.00</td>
                  <td className="py-2">Delivered Jan 7, 2021</td>
                  <td className="py-2">
                    <a href="#" className="text-blue-600">
                      View
                      <span className="text-sm"> Product, Carry Clutch</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">
                    <div className="flex items-center">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-05.jpg"
                        alt="Product 5"
                        className="w-16 h-16 rounded"
                      />
                      <div className="ml-2">
                        <div className="font-semibold">Nomad Tumbler</div>
                        <div className="text-gray-800">$35.00</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">$35.00</td>
                  <td className="py-2">Delivered Jan 7, 2021</td>
                  <td className="py-2">
                    <a href="#" className="text-blue-600">
                      View
                      <span className="text-sm"> Product, Nomad Tumbler</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderComp;
