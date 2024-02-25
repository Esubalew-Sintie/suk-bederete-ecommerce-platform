import React from 'react'
import ThemeNavbar from '../components/Navbars/ThemeNavbar'

function ThemeLayout({children}) {
  return (
      <div>
          <ThemeNavbar />
          
          {children}
    </div>
  )
}

export default ThemeLayout