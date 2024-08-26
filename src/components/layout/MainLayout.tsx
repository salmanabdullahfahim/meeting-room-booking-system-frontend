import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="md:min-h-[calc(100vh-70px)]">
        <Outlet></Outlet>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
