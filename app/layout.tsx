import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'GovHub - Government API Gateway',
  description: 'Ministry of ICT - Unified Government API Integration Platform',
  generator: 'GovHub',
  icons: {
    icon: [
      {
        url: 'https://images.seeklogo.com/logo-png/31/1/coat-of-arms-of-the-republic-of-uganda-logo-png_seeklogo-311603.png',
        sizes: '32x32',
      },
      {
        url: 'https://images.seeklogo.com/logo-png/31/1/coat-of-arms-of-the-republic-of-uganda-logo-png_seeklogo-311603.png',
        sizes: '16x16',
      },
    ],
    apple: 'https://images.seeklogo.com/logo-png/31/1/coat-of-arms-of-the-republic-of-uganda-logo-png_seeklogo-311603.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFD700' },
    { media: '(prefers-color-scheme: dark)', color: '#FFD700' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
