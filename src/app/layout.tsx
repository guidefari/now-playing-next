import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { TanStackQueryProvider } from './providers'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Now Playing - Guide',
  description: 'What Guide is currently listening to on Spotify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>
        <TanStackQueryProvider>
          <main className="flex flex-col items-center pt-10 min-h-screen bg-slate-800">
            {children}
          </main>
        </TanStackQueryProvider>
      </body>
    </html>
  )
} 