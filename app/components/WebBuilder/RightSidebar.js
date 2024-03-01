<<<<<<< HEAD
"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function RightSidebar({Clickedbutton}) {
  const contentMap = {
    header: <div>Header Content</div>,
    mainBanner: <div>Main Banner Content</div>,
    emailNewsletter: <div>Email Newsletter Content</div>,
    footer: <div>Footer Content</div>,
  };
  return (
    <nav className="md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-80 z-10 py-4 px-8">
      <div className='flex items-center justify-between'>
      <h1>{contentMap[Clickedbutton]}</h1>
      <button className='bg-lightBlue-400 rounded-md p-2 hover:bg-cyan-500 border-none outline-none focus:outline-none '>Done</button>
      </div>
    </nav>
=======
import { useState } from "react";
import Style from "./RightSidbar.module.css";
import EditImage from "./EditImage";
import EditText from "./EditText";
function RightSidebar() {
  const [isText, setText] = useState(true);
  return (
    <div className={Style.container}>
      {isText ? <EditText /> : <EditImage />}
    </div>
>>>>>>> main
  );
}
