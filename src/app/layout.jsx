
import Footer from './components/layout/footer'
// import Header from './components/layout/header'
import { Inter } from 'next/font/google'
import './components/ui/globals.css' 
import { ClerkProvider } from '@clerk/nextjs' 
import { Providers } from './provider'
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { CssBaseline, ThemeProvider } from "@mui/material";
import Providing from './components/resolver'
import Navnew from './components/layout/navbars'



const inter = Inter({
  subsets: ["latin"]
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
      datatheme="light"
    
    >
      <body className='flex flex-col bg-base-100'>
        
          <ClerkProvider>
          <Providing>
          
             {/* <Providers>  */}
            
              <Navnew />


             
              {/* <Header /> */}
              <main className='grow bg-base-100'>
                <article>
                  {children}
                </article>
              </main>
              
              <Footer />
             {/* </Providers> */}
          </Providing>
            
          </ClerkProvider>
        
      </body>
    </html>
  )
}

export default RootLayout
