import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-2xl md:text-3xl font-semibold cursor-pointer duration-200 flex items-center italic"
    >
      <img src="/logo.png" className="w-10 h-10"></img>
      {/* T.<span className="text-md">Meet</span> */}
    </Link>
  );
};

export default Logo;
