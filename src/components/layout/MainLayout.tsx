import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollTop from "@/utils/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="md:min-h-[calc(100vh-70px)]">
        <Outlet></Outlet>
        <ScrollTop />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
