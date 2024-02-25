import React from 'react'
import ClientLayout from './ClientLayout'
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/img/brand/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/brand/apple-icon.png"
          />
        </head>
        <body className="text-blueGray-700 antialiased">
          <div id="page-transition"></div>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    )
  }


















































  