"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import Link from "next/link";
export default function TransactionModal({
  isOpen,
  transactionData,
  HandleOpen,
}) {
  const modalref = useRef(null);
  const closeRef = useRef(null);

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={HandleOpen}
          initialFocus={modalref}
          ref={closeRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  backdrop-blur-sm   bg-black bg-opacity-40  " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className="flex min-h-full items-center justify-center p-4 text-center"
              ref={modalref}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-center capitalize leading-6 text-gray-900"
                  >
                    {transactionData && transactionData?.name} Transaction
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="py-4 bg-gray-100 px-2">
                      <div className="mt-4">
                        <div className="flex flex-col flex-wrap items-start px-2">
                          <div className="border-b border-gray-200 py-2 bg-gray-100 w-full">
                            <dl className="flex flex-col w-full sm:flex-row sm:items-start justify-between ">
                              <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-4 w-full">
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Date Placed</dt>
                                  <dd className="text-gray-500 text-sm">
                                    {transactionData?.payment_Date}
                                  </dd>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Order ID</dt>
                                  <dd className="text-gray-500 text-sm w-32 truncate">
                                    {transactionData?.transaction_Id}
                                  </dd>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm"> Status</dt>
                                  <span
                                    className={`text-sm ${
                                      transactionData?.payment_status === "paid"
                                        ? "text-green-500"
                                        : "text-orange-500"
                                    }`}
                                  >
                                    {transactionData?.payment_status}
                                  </span>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Total</dt>
                                  <dd className="text-sm text-gray-500">
                                    ${transactionData?.amount}
                                  </dd>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Email</dt>
                                  <Link
                                    href={`mailto:${transactionData?.email}`}
                                  >
                                    <dd className="text-sm text-red-500 underline">
                                      {transactionData?.email}
                                    </dd>
                                  </Link>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Phone</dt>
                                  <dd className="text-sm text-gray-500">
                                    {transactionData?.phone}
                                  </dd>
                                </div>
                              </div>
                            </dl>
                          </div>

                          {transactionData &&
                            transactionData.cart.map((product) => (
                              <div
                                className="mt-4 w-full bg-white px-2 rounded-md"
                                key={product.id}
                              >
                                <div className="border-b border-b-gray-800 border-opacity-10 py-2 px-2 lg:px-4 flex flex-row items-center gap-4">
                                  <img
                                    src={product.product.thumbnail}
                                    alt="Product 1"
                                    className="w-16 h-16 rounded"
                                  />

                                  <div className=" py-2 px-2 lg:px-4">
                                    <div className="py-2 text-sm text-gray-500  flex flex-row items-start">
                                      {product.product.title}
                                    </div>

                                    <div className="text-gray-500 text-sm">
                                      ${product.product.price}
                                    </div>
                                  </div>

                                  <div className=" py-2 px-2 lg:px-4">
                                    <div className="py-2 text-sm text-gray-500  flex flex-row items-start">
                                      Quantity
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                      {product.quantity} X
                                    </div>
                                  </div>
                                  <div className=" py-2 px-2 lg:px-4">
                                    <div className="py-2 text-sm text-gray-500  flex flex-row items-start">
                                      Brand
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                      {product.product.brand}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={HandleOpen}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
