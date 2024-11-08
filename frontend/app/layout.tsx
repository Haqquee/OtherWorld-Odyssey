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
  title: "OtherWorld Odyssey",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grenzeGotisch.className} h-screen antialiased bg-bg_image bg-cover bg-fixed`}>
        <div className="inset-0 bg-black fixed bg-opacity-50 z-10"></div>
        <div className="relative z-20 h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
