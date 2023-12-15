import React from 'react'

const Sidebar = () => {
  return (
    // <!-- sidebar -->
        <div className="col-span-3">
            <div className="px-4 py-3 shadow flex items-center gap-4 bg-white">
                <div className="flex-shrink-0">
                    <img src="../assets/images/avatar.png" alt="profile"
                        className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover"/>
                </div>
                <div className="flex-grow">
                    <p className="text-gray-600">Hello,</p>
                    <h4 className="text-gray-800 font-medium">John Doe</h4>
                </div>
            </div>

            <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                <div className="space-y-1 pl-8">
                    <a href="#" className="relative text-primary block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-regular fa-address-card"></i>
                        </span>
                        Manage account
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        Profile information
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        Manage addresses
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        Change password
                    </a>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                    <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-solid fa-box-archive"></i>
                        </span>
                        My order history
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        My returns
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        My Cancellations
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        My reviews
                    </a>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                    <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-regular fa-credit-card"></i>
                        </span>
                        Payment methods
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        voucher
                    </a>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                    <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-regular fa-heart"></i>
                        </span>
                        My wishlist
                    </a>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                    <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-regular fa-arrow-right-from-bracket"></i>
                        </span>
                        Logout
                    </a>
                </div>

            </div>
        </div>
  )
}

export default Sidebar