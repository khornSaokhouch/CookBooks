import '@/app/globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cookbook',
  description: 'A simple cookbook website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</head>
      <body className="antialiased bg-gray-50 text-gray-900">
        <main >{children}</main>
      </body>
    </html>
  );
}


