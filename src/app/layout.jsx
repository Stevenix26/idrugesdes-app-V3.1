import { Montserrat } from 'next/font/google'
import './global/globals.css'
import ClientLayout from './components/ClientLayout'
// import { StagewiseToolbar } from '@stagewise/toolbar-next'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from './provider'

// Font configuration
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["200", "400", "500", "600", "700"]
})

// Metadata configuration
export const metadata = {
  title: 'iDrugdes - Your Digital Pharmacy',
  description: 'A comprehensive digital pharmacy platform for managing prescriptions and medications',
  keywords: ['pharmacy', 'digital pharmacy', 'prescriptions', 'medications'],
  authors: [{ name: 'Agboola Stephen' }],
}

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${montserrat.variable} h-full scroll-smooth antialiased`}
        suppressHydrationWarning
      >
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="min-h-screen bg-background">
          <Providers>
            <ClientLayout>
              {/* <StagewiseToolbar
                config={{
                  plugins: [],
                }}
              /> */}

              {/* Main content */}
              <main className="flex-1">
                {children}
              </main>
            </ClientLayout>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}

