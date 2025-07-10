import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "YYA Portfolio",
  description: "Premium Professional Web Developer Portfolio - Creating Exceptional Digital Experiences",
  keywords: "web developer, portfolio, premium, professional, react, next.js",
    // generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                emailjs.init({
                  publicKey: "FU2EZkKoJw-_55W6y", // Replace with your EmailJS public key
                });
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
