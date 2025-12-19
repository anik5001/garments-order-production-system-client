import { Outlet } from "react-router";
import Sidebar from "../../components/DashBoard/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <div className="md:ml-64">
        <Navbar></Navbar>
      </div>
      <div className="relative  md:flex bg-white">
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="min-h-screen flex-1  md:ml-64">
          <div className="p-5">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
      <div className="md:ml-64">
        <Footer></Footer>
      </div>
    </>
  );
};

export default DashboardLayout;
