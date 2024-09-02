import homeIcon from "@assets/home.svg";
import { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { Link, Outlet } from "react-router-dom";
import { ItemSidebar } from "./sidebar/Item";

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.clear();
    if (!localStorage.length) {
      console.log("Se ha cerrado sesión satisfactoriamente");
    }
  };


  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-secondary-green border-secondary-green shadow-xl">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm  rounded-lg sm:hidden bg-primary-green  focus:outline-none focus:ring-2 text-light focus:ring-primary-green"
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
                className="transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-105 flex text-sm bg-primary-green rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={isUserMenuOpen ? "true" : "false"}
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
                  className="absolute right-0 mt-2 w-48 py-2 bg-secondary-green rounded-md shadow-lg"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                  style={{ top: "calc(100% + 10px)" }}
                >
                  <div className="px-4 py-3">
                    <p className="text-sm text-light">Neil Sims</p>
                    <p className="text-sm font-medium truncate text-dark">
                      neil.sims@com
                    </p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-light dark:hover:bg-primary-green hover:text-white"
                        role="menuitem"
                      >
                        Cerrar Sesión
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
            isSidebarOpen ? "translate-x-0 w-full md:w-64" : "-translate-x-full"
          } bg-secondary-green border-r border-secondary-green sm:translate-x-0 shadow-xl`}
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-secondary-green border-secondary-green">
            <ul className="space-y-2 font-medium">
              <ItemSidebar
                icon={homeIcon}
                title="Home"
                active={true}
                route="/home"
              />
            </ul>
            <ul className="space-y-2 font-medium">
              <ItemSidebar
                icon={homeIcon}
                title="Login"
                active={true}
                route="/login"
              />
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
  );
};
