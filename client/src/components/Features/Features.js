import React from 'react'

const Features = () => {
  return (
    <div className="container py-16">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src="assets/images/icons/delivery-van.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize text-lg">Free Shipping</h4>
                    <p className="text-gray-500 text-sm">Order over $200</p>
                </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src="assets/images/icons/money-back.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize text-lg">Money Rturns</h4>
                    <p className="text-gray-500 text-sm">30 days money returs</p>
                </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src="assets/images/icons/service-hours.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
                    <p className="text-gray-500 text-sm">Customer support</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features