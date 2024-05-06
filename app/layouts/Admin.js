"use client"
import React from "react";

// components


import AdminNavbar from "@/app/components/Navbars/AdminNavbar"
import Sidebar from "@/app/components/Sidebar/Sidebar.js";
import HeaderStats from "@/app/components/Headers/HeaderStats.js";
import FooterAdmin from "@/app/components/Footers/FooterAdmin.js";

 function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}


function AdminWithOutNav({ children }) {
  return (
    <>
      <Sidebar />

      <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export {Admin, AdminWithOutNav}