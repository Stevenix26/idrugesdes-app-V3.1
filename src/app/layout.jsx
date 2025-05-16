
import { Montserrat } from 'next/font/google'
import './global/globals.css'
import ClientLayout from './components/ClientLayout'

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

export default RootLayout;

