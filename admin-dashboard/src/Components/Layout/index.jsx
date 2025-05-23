import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Layout/Topbar";

const Layout = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div className="main-content mt-20 p-6">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
