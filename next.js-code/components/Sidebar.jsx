"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaCheckToSlot } from "react-icons/fa6";


const Sidebar = () => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    if (!session) router.push("/")
    return (
        <div>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setIsOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6 text-white" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="default-sidebar" className={`fixed bg-[#232222] top-0 left-0 z-40 w-max lg:w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 overflow-x-hidden`} aria-label="Sidebar">
                <span className="text-2xl sm:hidden absolute right-0 mr-1 top-1 cursor-pointer text-white" onClick={() => setIsOpen(false)}><RxCross2 /></span>
                <div className="h-full px-3 py-4 overflow-y-auto overflow-x-hidden text-white">
                    <ul className="space-y-2 font-medium">
                        {session?.user?.loggedUser?.isDoctor && <li>
                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center p-2 rounded-lg hover:text-black hover:bg-white">
                                <svg className=" w-5 h-5 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3 lg:flex hidden">Dashboard</span>
                            </Link>
                        </li>}
                        {!session?.user?.loggedUser?.isDoctor && <li>
                            <Link href="/doctor-list" onClick={() => setIsOpen(false)} className="flex items-center p-2 rounded-lg hover:text-black hover:bg-white">
                                <svg className="flex-shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap lg:flex hidden">Doctors</span>
                            </Link>
                        </li>}
                        {session?.user?.loggedUser?.isDoctor && <li>
                            <Link href="/slots" onClick={() => setIsOpen(false)} className="flex items-center p-2 rounded-lg hover:text-black hover:bg-white">
                                <span className=""><FaCheckToSlot /></span>
                                <span className="flex-1 ms-3 whitespace-nowrap lg:flex hidden ">Slots</span>
                            </Link>
                        </li>}
                        {session?.user?.loggedUser?.isDoctor && <li>
                            <Link href="/appointments" onClick={() => setIsOpen(false)} className="flex items-center p-2 rounded-lg hover:text-black hover:bg-white">
                                <span className=" "><MdOutlineMeetingRoom /></span>
                                <span className="flex-1 ms-3 whitespace-nowrap lg:flex hidden">Appointments</span>
                            </Link>
                        </li>}
                        <li>
                            <button onClick={() => { signOut(); router.push("/") }} className="flex items-center p-2 rounded-lg w-full hover:text-black hover:bg-white">
                                <span className=""><RiLogoutCircleRLine /></span>
                                <span className="flex-1 ms-3 whitespace-nowrap lg:flex hidden">Logout</span>
                            </button>
                        </li>
                        <div className="pt-16 max-w-full">
                    
             </div>
                    </ul>
                </div>
                
            </aside>
            
        </div>)
};
export default Sidebar;