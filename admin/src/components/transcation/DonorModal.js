"use client";
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
export default function DonorModal({ isOpen, DonorData, HandleOpen }) {
  const modalref = useRef(null);
  const closeRef = useRef(null);
  const NewTime = (timeString) => {
    const timeParts = timeString?.split(":");

    if (timeParts?.length !== 3) {
      return "Invalid time format";
    }

    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return "Invalid time format";
    }

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const amOrPm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const formattedTime = `${formattedHours}:${minutes}${amOrPm}`;
    return formattedTime;
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          className="relative z-[999]"
          as="div"
          onClose={HandleOpen}
          ref={closeRef}
          initialFocus={modalref}
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
            <div className="fixed inset-0  backdrop-blur-sm   bg-black bg-opacity-40" />
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
                    {DonorData && DonorData?.name} Transaction
                  </Dialog.Title>
                  <div className="mx-4 my-6">
                    <div className="px-4 mb-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold text-gray-900">
                          Donation history
                        </h1>
                        <div className=" py-2 px-2 lg:px-4 flex flex-row items-center ">
                          <div className="py-2 text-sm text-gray-500  flex flex-row items-start">
                            Time:
                          </div>
                          <div className="text-gray-500 text-sm">
                            {NewTime(DonorData && DonorData?.donation_Time)}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm mt-2">
                        Check the status of recent transactions, view and access
                        them in full details
                      </p>
                    </div>
                    <div className="py-4 bg-gray-100 px-2">
                      <div className="mt-4">
                        <div className="flex flex-col items-start px-2">
                          <div className="border-b border-gray-200 py-2 bg-gray-100 w-full">
                            <dl className="flex flex-col w-full sm:flex-row sm:items-start justify-between ">
                              <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-4 w-full">
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Date Placed</dt>
                                  <dd className="text-gray-500 text-sm">
                                    {DonorData && DonorData?.donation_Date}
                                  </dd>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Order ID</dt>
                                  <dd className="text-gray-500 text-sm w-32 truncate">
                                    {DonorData && DonorData?.transaction_Id}
                                  </dd>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm"> Status</dt>
                                  <span
                                    className={`text-sm ${
                                      DonorData &&
                                      DonorData?.payment_status === "paid"
                                        ? "text-green-500"
                                        : "text-orange-500"
                                    }`}
                                  >
                                    {DonorData && DonorData?.payment_status}
                                  </span>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Total</dt>
                                  <dd className="text-sm text-gray-500">
                                    ${DonorData && DonorData?.amount}
                                  </dd>
                                </div>
                                <div className="flex flex-row justify-between sm:flex-col items-start w-full">
                                  <dt className="text-sm">Email</dt>
                                  <Link
                                    href={`mailto:${
                                      DonorData && DonorData?.email
                                    }`}
                                  >
                                    <dd className="text-sm text-red-500 underline">
                                      {DonorData && DonorData?.email}
                                    </dd>
                                  </Link>
                                </div>
                              </div>
                            </dl>
                          </div>

                          {
                            <div className="mt-4 w-full bg-white px-2 rounded-md">
                              <div className="border-b border-b-gray-800 border-opacity-10 py-2 px-2 lg:px-4 flex flex-row items-center gap-4">
                                <div className=" py-2 px-2 lg:px-4">
                                  <div className="py-2 text-sm text-gray-500  flex flex-row items-start">
                                    Name: {DonorData && DonorData?.name}
                                  </div>

                                  <div className="text-gray-500 text-sm">
                                    Payment type:{" "}
                                    {DonorData &&
                                      DonorData?.payment_method_types}
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
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