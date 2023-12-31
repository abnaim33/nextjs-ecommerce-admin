import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin',
  description: 'admin dashboard',
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {

// all complete but have to upgrade little bit

  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
attribute="class" 
defaultTheme="system" 
enableSystem
        >

        <ModalProvider/>
        <ToastProvider/>
        {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  )
}
