import { BsYoutube, BsLinkedin, BsFacebook, BsReddit } from "react-icons/bs";

import { Link } from "react-router-dom";
import Logo from "../Navbar/Logo";

const offices = [
  {
    title: "USA Office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "12/2, 43 RD Apartment, Jackson Street, New York, USA",
  },
  {
    title: "Head Office",
    timings: "Sun-Wed 9am to 5pm.",
    address: "367 CDA Avenue, East Nasirabad, Chittagong 4100, Bangladesh",
  },
];

const Footer = () => {
  return (
    <div className="w-full bg-[#242424] text-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-12">
        <div className="flex flex-col gap-y-4">
          <Logo />
          <p>Book Your Ideal Meeting Room with Ease!</p>

          <div className="flex items-center gap-x-4">
            <span className="inline-flex justify-center items-center text-lg cursor-pointer">
              <BsYoutube />
            </span>

            <span className="inline-flex justify-center items-center text-lg cursor-pointer">
              <BsLinkedin />
            </span>
            <span className="inline-flex justify-center items-center text-lg cursor-pointer">
              <BsFacebook />
            </span>
            <span className="inline-flex justify-center items-center text-lg cursor-pointer">
              <BsReddit />
            </span>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold">Office Address</p>
          <ul className="mt-2 flex flex-col gap-y-2 text-sm font-light">
            {offices.map((office, index) => (
              <li key={index} className="flex flex-col">
                <span className="text-headerText hover:text-blue-400 cursor-pointer font-semibold">
                  {office.title}
                </span>
                <span className="">{office.timings}</span>
                <span className="">{office.address}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-lg font-bold">Links</p>
          <ul className="flex flex-col mt-2 gap-y-2 text-sm font-medium">
            <Link to="/">
              <li className="hover:text-headerText cursor-pointer duration-200">
                Home
              </li>
            </Link>
            <Link to="/meetings-rooms">
              <li className="hover:text-headerText cursor-pointer duration-200">
                Meeting Rooms
              </li>
            </Link>
            <Link to="/about-us">
              <li className="hover:text-headerText cursor-pointer duration-200">
                About
              </li>
            </Link>
            <Link to="/contact-us">
              <li className="hover:text-headerText cursor-pointer duration-200">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <p className="text-md mb-2">Pay us with your trusted partner.</p>
          <img
            src="/payment.png"
            alt="payment"
            className="w-full h-10 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
