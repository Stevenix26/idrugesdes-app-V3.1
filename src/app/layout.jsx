
import Footer from './components/layout/footer'
import Header from './components/layout/header'
import { Inter } from 'next/font/google'
import './components/ui/globals.css' 
import { ClerkProvider, CreateOrganization } from '@clerk/nextjs' 
import { Providers } from './provider'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const inter = Inter({
  subsets: ['latin']
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
    >
      <body className='flex h-full flex-col text-slate-200 pharmacy bg-background col-md-6 col-lg-12'>
         <ClerkProvider>
          <Header />
              <Providers>
             <main className='grow text-slate-200 bg-background'>{children}</main>
             </Providers>
          <Footer />
        </ClerkProvider>
      
      </body>
    </html>
  )
}

export default RootLayout
