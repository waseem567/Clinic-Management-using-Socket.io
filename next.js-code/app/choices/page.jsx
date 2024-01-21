import Link from 'next/link';
import React from 'react'
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const choices = () => {
    return (
        <div className='m-auto h-screen w-full p-5 flex justify-center items-center flex-col gap-4'>
            <div className='p-form p-5 flex gap-5 flex-col'>
            <Link href={"/doctor"}>
                <button className='bg-[#eac726] py-2 w-[300px] text-black rounded-full flex justify-center items-center cursor-pointer'>
                    <FaUserDoctor className='text-lg inline-block mr-4' />
                    <span className='flex justify-center items-center'>Create doctor account</span>
                </button>
            </Link>
            <Link href={"/patient"}>
                <button className='bg-[#eac726] py-2 w-[300px] text-black rounded-full flex justify-center items-center cursor-pointer'>
                    <FaHandHoldingMedical className='text-lg inline-block mr-4' />
                    <span className='flex justify-center items-center'>Create patient account</span>
                </button>
            </Link>
            <Link href={"/"}>
                <button className='bg-[#eac726] py-2 w-[300px] text-black rounded-full flex justify-center items-center cursor-pointer'>
                    
                    <span className='flex justify-center items-center'>Go Back To Login</span>
                </button>
            </Link>
            </div>
        </div>
    )
}

export default choices