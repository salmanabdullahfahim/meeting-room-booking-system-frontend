import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ProfileDropDown from "./ProfileDropDown";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Meeting Rooms",
      href: "/meetings-rooms",
    },
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "Contact Us",
      href: "/contact-us",
    },
  ];

  return (
    <div className=" bg-white flex items-center justify-between h-[65px] p-4 md:px-12   w-full shadow-md sticky top-0 z-20">
      {/* Company logo or name */}
      <Logo />
      {/* desktop menu */}
      <div className="hidden lg:block">
        <ul className="flex gap-8 z-10 bg-transparent  font-medium text-md items-center">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) => (isActive ? "text-darkText" : "")}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <Logo />
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#ECC500] -m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                          : "-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      }
                      onClick={toggleMenu}
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Login / profile */}

      {user?.email ? (
        <ProfileDropDown user={user} />
      ) : (
        <NavLink to="/sign-in" className="ml-3 md:ml-0 hidden md:block">
          <div className="flex justify-center items-center bg-[#4a53c0] hover:bg-[#4a53c0]/90 text-slate-100 hover:text-white rounded-full px-4 py-1.5 border-[1px]   duration-200 cursor-pointer relative">
            Sign In
          </div>
        </NavLink>
      )}

      {/* mobile menu button */}
      <div className="lg:hidden">
        <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
