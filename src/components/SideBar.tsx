import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaChalkboardTeacher } from 'react-icons/fa'
import homeIcon from '../assets/home.svg'
import { TiThMenuOutline } from 'react-icons/ti'
import { ItemSidebar } from './sidebar/Item'

export const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen)
    }

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={toggleSidebar}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <TiThMenuOutline className="h-6 w-6" />
                            </button>
                            <div className="flex ms-2 md:me-24">
                                <FaChalkboardTeacher className="h-8 me-3 w-8 text-white" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    Tutorías CodeFactory
                                </span>
                            </div>
                        </div>
                        <div className="relative flex items-center ms-3">
                            <button
                                type="button"
                                onClick={toggleUserMenu}
                                className="transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-105 flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                aria-expanded={isUserMenuOpen ? 'true' : 'false'}
                                aria-haspopup="true"
                            >
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt="user photo"
                                />
                            </button>
                            {isUserMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg dark:bg-gray-700"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu"
                                    style={{ top: 'calc(100% + 10px)' }}
                                >
                                    <div className="px-4 py-3">
                                        <p className="text-sm text-gray-900 dark:text-white">Neil Sims</p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                                            neil.sims@com
                                        </p>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                <div
                    className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                        isSidebarOpen ? 'translate-x-0 w-full md:w-64' : '-translate-x-full'
                    } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                >
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <ItemSidebar icon={homeIcon} title="Home" active={true} route="/home" />
                        </ul>
                        <ul className="space-y-2 font-medium">
                            <ItemSidebar icon={homeIcon} title="Login" active={true} route="/login" />
                        </ul>

                    </div>
                </div>

                <main
                    className={`flex-1 p-4 overflow-auto sm:ml-64 transition-all duration-300 mt-16`}
                >
                    <Outlet />
                </main>
            </div>
        </>
    )
}
