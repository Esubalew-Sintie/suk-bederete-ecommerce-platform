import React from 'react'
import Navbar from '../components/Navbars/ThemeNavbar'

function ThemeLayout({children}) {
  return (
      <div className='bg-blueGray-800 text-white'>
      <div>
      <Navbar />
          </div>
          
          {children}
    </div>
  )
}

export default ThemeLayout