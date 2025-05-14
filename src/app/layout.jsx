
import { Montserrat } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { CssBaseline } from '@mui/material'

import './global/globals.css'
import Providing from './components/resolver'
import Navnew from './components/layout/navbars'
import Footer from './components/layout/footer'


const inter = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["700", "600", "400", "500", "200"]
})

export const metadata = {
  title: 'Idrugdes',
  description: 'Created by Agboola Stephen'
}

const RootLayout = ({ children }) => {



  return (
    <html
      lang='en'
      className={`${inter.className} h-full scroll-smooth antialiased`}
      data-theme="light"
    >
      <body className="flex min-h-screen flex-col bg-base-100">
        <ClerkProvider>
          <Providing>
            <CssBaseline />
            <header className="sticky top-0 z-50 w-full bg-inherit shadow-sm">
              <Navnew />
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>

            <Footer />
          </Providing>
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout;
