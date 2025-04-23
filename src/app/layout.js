import "./globals.css"
import "bootstrap/dist/css/bootstrap.min.css";

import { Anta } from 'next/font/google'

const anta = Anta({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export const metadata = {
  title: "Planet X",
  description: "A game for space enthusiasts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-bs-theme="dark" className={anta.className}>{children}
      </body>
    </html>
  );
}
