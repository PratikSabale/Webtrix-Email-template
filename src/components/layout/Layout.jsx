import React from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import PropertiesPage from "../../pages/PropertiesPage";
import PlayAreaPage from "../../pages/PlayAreaPage";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="h-[60px] flex items-center justify-between px-2 border-b border-gray-300 bg-white">
        <Nav />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex justify-center items-start overflow-y-auto bg-[#f6f6f6]">
          <PlayAreaPage />
        </div>

        <PropertiesPage />
      </div>
    </div>
  );
};

export default Layout;
