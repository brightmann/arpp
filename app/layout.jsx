import { Inter } from 'next/font/google'
import './globals.css'

import Navigation from './components/Navigation'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Unlcoaching | Coaching Bordeaux | Jérémy Prat',
  description:
    'Allier entraînement rigoureux et nutrition équilibrée pour un mode de vie sain et durable.',
  icon: {
    icon: ['favicon.icon'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`{inter.className} bg-white text-slate-900 overflow-x-hidden w-full`}
      >
        <Navigation />
        {children}
      </body>
      <Footer className="bg-white border-t border-gray-200" />
    </html>
  )
}
