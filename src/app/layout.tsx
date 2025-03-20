
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import { authoption } from "./api/auth/[...nextauth]/route";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StarSupport",
  description: "Get supported",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authoption)
  
  return (
    <html lang="en" suppressHydrationWarning >
      <body >
        <Provider>
          <div className="max-w-screen-xl mx-auto ">

        <Header  />
        
          {children }
            {/* <footer className="w-full h-52 bg-red-400"></footer> */}
            <Footer/>
          </div>
        </Provider>
        

      </body>
    </html>
  );
}
