import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import FooterComp from '@/components/Footer/FooterComp';

const Press = () => {
    return (
        <>
            <div className="bg-[#111827] sticky top-0 z-[10]">
                <Navbar />
            </div>
            <div className="flex flex-col w-full ">
                <div className="flex items-center justify-center w-full h-14 bg-black ">
                    <h1 className="text-3xl text-white text-center">Our Press Release</h1>
                </div>
                <div className="shadow-lg m-12 border h-[110vh] p-5 overflow-y-auto">
                    <h2 className='text-blue-500 text-xl'>The Interim Government's Statement on the Conflict between Russia and Ukraine</h2>
                    <p className='text-sm font-bold'>Published on 2nd March 2022</p>
                </div>
            </div>
            <FooterComp />
        </>
    );
}

export default Press;