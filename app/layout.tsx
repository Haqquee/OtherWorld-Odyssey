import type { Metadata } from "next";
import localFont from "next/font/local";
import {Grenze_Gotisch} from "next/font/google"
import "./globals.css";
import BG from '/background.jpg'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const grenzeGotisch = Grenze_Gotisch({  
  subsets: ['latin'] 
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grenzeGotisch.className} antialiased bg-bg_image bg-cover bg-fixed`}>
        <div className="h-full bg-black bg-opacity-50 bg-cover">
          {children}
        </div>
        
      </body>
    </html>
  );
}
