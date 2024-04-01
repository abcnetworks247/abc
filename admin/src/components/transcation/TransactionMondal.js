"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";

export default function TransactionModal({
  isOpen,
  closeModal,
  transactionData,
  openModal,
}) {
  const modalref = useRef(null);
  const closeRef = useRef(null);

  /**
   * Function to handle closing modal.
   */
  useEffect(() => {
    const HandleCloseModal = () => {
      if (closeRef.current) {
        closeModal();
      }
    };

    typeof window !== "undefined" &&
      document.addEventListener("click", HandleCloseModal);

    return () => {
      typeof window !== "undefined" &&
        document.removeEventListener("click", HandleCloseModal);
    };
  }, []);

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={openModal}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {transactionData && transactionData?.name} Transaction
                  </Dialog.Title>
                  <div className="mt-2">
                    <ul className=" flex flex-col gap-3">
                      <li className="text-sm text-gray-500">
                        <span className="font-bold text-black text-md">
                          Amount:
                        </span>{" "}
                        ${transactionData?.amount}{" "}
                      </li>
                      <li className="text-sm text-gray-500 w-80 truncate">
                        <span className="font-bold text-black text-md">
                          Transaction ID:{" "}
                        </span>{" "}
                        {transactionData?.transaction_Id}
                      </li>
                      <li className="text-sm text-gray-500">
                        <span className="font-bold text-black text-md">
                          Status:
                        </span>{" "}
                        {transactionData?.payment_status}
                      </li>
                      <li className="text-sm text-gray-500">
                        <span className="font-bold text-black text-md">
                          Email:
                        </span>{" "}
                        {transactionData?.email}
                      </li>
                      <li className="text-sm text-gray-500">
                        <span className="font-bold text-black text-md">
                          Phone:
                        </span>{" "}
                        {transactionData?.phone}
                      </li>
                      <li className="text-sm text-gray-500">
                        <span className="font-bold text-black text-md">
                          Country:
                        </span>{" "}
                        {transactionData?.country}
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
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
