import React from 'react'

export default function page() {
  return (
    <div>
      <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
  <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-4 pb-0">
    <div className="flex items-center justify-between">
      <div>
        <h6 className="dark:text-white">Order Details</h6>
        <p className="mb-0 leading-normal text-sm">
          Order no.
          <b>241342</b>
          from
          <b>23.02.2021</b>
        </p>
        <p className="leading-normal text-sm">
          Code:
          <b>KF332</b>
        </p>
      </div>
      <a
        href="javascript:;"
        className="inline-block px-6 py-3 mb-0 ml-auto font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-gradient-to-tl from-slate-600 to-slate-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25"
      >
        Invoice
      </a>
    </div>
  </div>
  <div className="flex-auto p-4 pt-0">
    <hr className="h-px mt-0 mb-6 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full px-3 flex-0 md:w-6/12">
        <div className="flex">
          <div>
            <img
              className="mr-4 w-28 h-28 text-base ease-soft-in-out inline-flex items-center justify-center rounded-xl text-white transition-all duration-200"
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt="product image"
            />
          </div>
          <div>
            <h6 className="mt-2 mb-0 dark:text-white text-lg">Gold Glasses</h6>
            <p className="mb-4 leading-normal text-sm">
              Order was delivered 2 days ago
            </p>
            <span className="py-1.8 px-3 text-xxs rounded-1 inline-block whitespace-nowrap bg-gradient-to-tl from-green-600 to-lime-400 text-center align-baseline font-bold uppercase leading-none text-white">
              Delivered
            </span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full px-3 my-auto text-right flex-0 md:w-6/12">
        <a
          href="javascript:;"
          className="inline-block px-6 py-3 mb-4 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-gradient-to-tl from-blue-600 to-cyan-400 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25"
        >
          Contact Us
        </a>
        <p className="mt-2 mb-0 leading-normal text-sm">
          Do you like the product? Leave us a review{" "}
          <a className="dark:text-lime-500" href="javascript:;">
            here
          </a>
          .
        </p>
      </div>
    </div>
    <hr className="h-px mt-0 mb-6 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full px-3 lg:w-3/12 flex-0 md:w-6/12">
        <h6 className="mb-4 dark:text-white">Track order</h6>
        <div className="relative before:left-4 before:-ml-px before:content-[''] before:absolute before:top-0 before:h-full before:border-r-2 before:border-solid before:border-r-slate-100 ">
          <div className="relative mb-4">
            <span className="left-4 absolute inline-flex items-center justify-center w-6.5 h-6.5 rounded-circle bg-white text-center -translate-x-1/2 text-base font-semibold z-1">
              <i className="ni leading-none ni-bell-55 text-slate-400 leading-pro" />
            </span>
            <div className="ml-12 pt-1.4 relative -top-1.5 w-auto lg:max-w-120">
              <h6 className="mb-0 font-semibold leading-normal dark:text-white text-sm text-slate-700">
                Order received
              </h6>
              <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                22 DEC 7:20 AM
              </p>
            </div>
          </div>
          <div className="relative mb-4">
            <span className="left-4 absolute inline-flex items-center justify-center w-6.5 h-6.5 rounded-circle bg-white text-center -translate-x-1/2 text-base font-semibold z-1">
              <i className="ni leading-none ni-html5 text-slate-400 leading-pro" />
            </span>
            <div className="ml-12 pt-1.4 relative -top-1.5 w-auto lg:max-w-120 float-none">
              <h6 className="mb-0 font-semibold leading-normal dark:text-white text-sm text-slate-700">
                Generate order id #1832412
              </h6>
              <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                22 DEC 7:21 AM
              </p>
            </div>
          </div>
          <div className="relative mb-4">
            <span className="left-4 absolute inline-flex items-center justify-center w-6.5 h-6.5 rounded-circle bg-white text-center -translate-x-1/2 text-base font-semibold z-1">
              <i className="ni leading-none ni-cart text-slate-400 leading-pro" />
            </span>
            <div className="ml-12 pt-1.4 relative -top-1.5 w-auto lg:max-w-120">
              <h6 className="mb-0 font-semibold leading-normal dark:text-white text-sm text-slate-700">
                Order transmited to courier
              </h6>
              <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                22 DEC 8:10 AM
              </p>
            </div>
          </div>
          <div className="relative mb-4">
            <span className="left-4 absolute inline-flex items-center justify-center w-6.5 h-6.5 rounded-circle bg-white text-center -translate-x-1/2 text-base font-semibold z-1">
              <i className="ni leading-none ni-check-bold text-lime-500 leading-pro" />
            </span>
            <div className="ml-12 pt-1.4 relative -top-1.5 w-auto lg:max-w-120 float-none">
              <h6 className="mb-0 font-semibold leading-normal dark:text-white text-sm text-slate-700">
                Order delivered
              </h6>
              <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                22 DEC 4:54PM
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full px-3 flex-0 md:w-6/12 lg:w-5/12">
        <h6 className="mb-4 dark:text-white">Payment details</h6>
        <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 bg-clip-border dark:border-slate-700">
          <img
            className="mb-0 mr-4 w-1/10"
            src="../../../assets/img/logos/mastercard.png"
            alt="logo"
          />
          <h6 className="mb-0 dark:text-white">
            ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
          </h6>
          <button
            type="button"
            className="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 ml-auto flex cursor-pointer items-center justify-center border border-solid border-slate-400 bg-transparent text-center align-middle font-bold text-slate-400 shadow-none transition-all hover:bg-transparent hover:text-slate-400 hover:opacity-75 hover:shadow-none active:bg-slate-400 active:text-black hover:active:bg-transparent hover:active:text-slate-400 hover:active:opacity-75 hover:active:shadow-none"
          >
            <i className="fas fa-info text-3xs" aria-hidden="true" />
          </button>
        </div>
        <h6 className="mt-6 mb-4 dark:text-white">Billing Information </h6>
        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
          <li className="relative flex p-6 mb-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-inherit">
            <div className="flex flex-col">
              <h6 className="mb-4 leading-normal dark:text-white text-sm">
                Oliver Liam
              </h6>
              <span className="mb-2 leading-tight text-xs">
                Company Name:
                <span className="ml-2 font-semibold text-slate-700 dark:text-white/70">
                  Viking Burrito
                </span>
              </span>
              <span className="mb-2 leading-tight text-xs">
                Email Address:
                <span className="ml-2 font-semibold text-slate-700 dark:text-white/70">
                  oliver@burrito.com
                </span>
              </span>
              <span className="leading-tight text-xs">
                VAT Number:
                <span className="ml-2 font-semibold text-slate-700 dark:text-white/70">
                  FRB1235476
                </span>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="w-full max-w-full px-3 ml-auto lg:w-3/12 flex-0">
        <h6 className="mb-4 dark:text-white">Order Summary</h6>
        <div className="flex justify-between">
          <span className="mb-2 leading-normal text-sm">Product Price:</span>
          <span className="ml-2 font-semibold text-slate-700 dark:text-white">
            $90
          </span>
        </div>
        <div className="flex justify-between">
          <span className="mb-2 leading-normal text-sm">Delivery:</span>
          <span className="ml-2 font-semibold text-slate-700 dark:text-white">
            $14
          </span>
        </div>
        <div className="flex justify-between">
          <span className="mb-2 leading-normal text-sm">Taxes:</span>
          <span className="ml-2 font-semibold text-slate-700 dark:text-white">
            $1.95
          </span>
        </div>
        <div className="flex justify-between mt-6">
          <span className="mb-2 text-lg">Total:</span>
          <span className="ml-2 font-semibold text-lg text-slate-700 dark:text-white">
            $105.95
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
