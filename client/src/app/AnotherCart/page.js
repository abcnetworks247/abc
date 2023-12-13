import React from 'react'

const page = () => {
  return (
    // <div className="relative font-poppins">
    <div className="flex flex-row font-poppins">
    {/* <div className="fixed inset-0 bg-gray-700 opacity-25"></div> */}
    {/* <div className="fixed top-0 bottom-0 right-0 z-10 w-full max-w-xl overflow-y-scroll bg-white dark:bg-gray-800"> */}
    <div className=' bg-gray-200 max-h-screen w-2/3'>
        <img src="/assets/images/shopping.jpg" className='h-full w-full object-cover'/>
    </div>

    {/* <div className="max-w-xl overflow-y-scroll bg-white dark:bg-gray-800"> */}
    <div className="max-h-screen overflow-y-scroll bg-white dark:bg-gray-800">
        <div className="p-6 bg-white md:pt-12 md:pb-6 md:px-12 dark:bg-gray-800">
            <div className="text-right">
                <button className="text-gray-700 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                        <path fillRule="evenodd"
                            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center mb-10">
                <h2 className="text-3xl font-bold dark:text-gray-400 ">Shopping Cart</h2>
                <span
                    className="inline-flex items-center justify-center w-8 h-8 ml-4 text-base font-bold bg-red-600 rounded-full dark:text-gray-400 dark:bg-gray-700 text-gray-50">6</span>
            </div>
            <div className="block pb-6 mb-6 -mx-4 border-b border-gray-200 dark:border-gray-700 md:flex">
                <div className="w-full px-4 mb-6 md:w-1/3 md:mb-0">
                    <div className="flex w-full h-96 md:h-32 md:w-32">
                        <img src="https://i.postimg.cc/hj6h6Vwv/pexels-artem-beliaikin-2292919.jpg" alt=""
                            className="object-cover w-full h-full rounded-md"/>
                    </div>
                </div>
                <div className="w-full px-4 md:2/3">
                    <div className="flex justify-between">
                        <div className="">
                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">Product Name</h2>
                            <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 "> Quantity: 4</p>
                            <div>
                                <button
                                    className="px-4 py-2 mb-4 mr-4 font-medium text-center text-blue-700 border border-blue-500 rounded-md md:mb-0 dark:hover:border-gray-900 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-gray-100">Edit</button>
                                <button
                                    className="px-4 py-2 font-medium text-center text-blue-700 border border-blue-500 rounded-md dark:hover:border-gray-900 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 hover:bg-blue-600 hover:text-gray-100">Remove</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-blue-500 dark:text-gray-400">$299.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block pb-6 mb-6 -mx-4 border-b border-gray-200 dark:border-gray-700 md:flex">
                <div className="w-full px-4 mb-6 md:w-1/3 md:mb-0">
                    <div className="flex w-full h-96 md:h-32 md:w-32">
                        <img src="https://i.postimg.cc/x1dZ1XSV/pexels-k-bra-do-u-10154821.jpg" alt=""
                            className="object-cover w-full h-full rounded-md"/>
                    </div>
                </div>
                <div className="w-full px-4 md:2/3">
                    <div className="flex justify-between">
                        <div className="">
                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">Product Name</h2>
                            <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 "> Quantity: 4</p>
                            <div>
                                <button
                                    className="px-4 py-2 mb-4 mr-4 font-medium text-center text-blue-700 border border-blue-500 rounded-md md:mb-0 dark:hover:border-gray-900 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-gray-100">Edit</button>
                                <button
                                    className="px-4 py-2 font-medium text-center text-blue-700 border border-blue-500 rounded-md dark:hover:border-gray-900 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 hover:bg-blue-600 hover:text-gray-100">Remove</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-blue-500 dark:text-gray-400">$299.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block pb-6 mb-6 -mx-4 border-b border-gray-200 dark:border-gray-700 md:flex">
                <div className="w-full px-4 mb-6 md:w-1/3 md:mb-0">
                    <div className="flex w-full h-96 md:h-32 md:w-32">
                        <img src="https://i.postimg.cc/pdcRLwSq/pexels-igor-ovsyannykov-205961.jpg" alt=""
                            className="object-cover w-full h-full rounded-md"/>
                    </div>
                </div>
                <div className="w-full px-4 md:2/3">
                    <div className="flex justify-between">
                        <div className="">
                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">Product Name</h2>
                            <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 "> Quantity: 4</p>
                            <div>
                                <button
                                    className="px-4 py-2 mb-4 mr-4 font-medium text-center text-blue-700 border border-blue-500 rounded-md md:mb-0 dark:hover:border-gray-900 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-gray-100">Edit</button>
                                <button
                                    className="px-4 py-2 font-medium text-center text-blue-700 border border-blue-500 rounded-md dark:hover:border-gray-900 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 hover:bg-blue-600 hover:text-gray-100">Remove</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-blue-500 dark:text-gray-400">$299.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between text-base dark:text-gray-400">
                <p>Subtotal</p>
                <p>$400.00</p>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">Shipping calculated at checkout period.</p>
            <div className="flex items-center justify-center mt-6">
                <button
                    className="w-full py-3 text-lg font-medium bg-blue-600 rounded-md text-gray-50 hover:bg-blue-700">Checkout</button>
            </div>
            <div className="flex items-center justify-center mt-6">
                <p><span className="dark:text-gray-400">or,</span>
                    <button className="pl-1 text-blue-600 hover:underline dark:text-gray-300">Continue Shopping
                    </button>
                </p>
            </div>
        </div>
    </div>
</div>
  )
}

export default page