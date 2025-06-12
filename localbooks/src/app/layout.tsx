import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CartProvider from "@/components/CartProvider";
// import CartProvider from "@/components/CartProvider";
//import { createContext } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Local Books",
  description: "A location to buy books in you area",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  //const CartContext = createContext({});

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
        <Header session={session} />
        {/* <CartContext.Provider value={{}}>
        </CartContext.Provider> */}
          {children}

        </CartProvider>

      </body>
    </html>
  );
}
