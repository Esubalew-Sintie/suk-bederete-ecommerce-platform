"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import styles from './RightSidbar.module.css'

export default function RightSidebar({Clickedbutton}) {
  
  return (
    <nav className="md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-80 z-10 py-4 px-8">
      
      {Clickedbutton === "Header" && (
  <>
    <div className='flex items-center justify-between'>
      
        <h3 className='text-black font-semibold text-2xl'>{Clickedbutton}</h3>
        <button className='bg-lightBlue-400 rounded-md p-2 hover:bg-cyan-500 border-none outline-none focus:outline-none '>Done</button>
        </div>
      <div className='flex items-center justify-between mt-8'>
        <h3 className='text-black font-semibold text-xl'>Navigation</h3>
        <label className="toggle-switch">
        <input className={styles.toggleSwitch} type="checkbox"></input>
        <span className={styles.round}></span>
       </label>
      </div>
    
  </>
)}
      {Clickedbutton === "Main Banner" && (
  <h3 className='text-black font-semibold text-2xl'>{Clickedbutton}</h3>
     )}
     {Clickedbutton === "Email Newsletter" && (
      <div>
      <h3 className='text-black font-semibold text-xl'>{Clickedbutton}</h3>
      </div>

     )}
     {Clickedbutton === "Footer" &&(
      <div>
        <h3 className='text-black font-semibold text-2xl'>{Clickedbutton}</h3>
      </div>
     )}
      
      
    </nav>
  );
}
