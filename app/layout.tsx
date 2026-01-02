import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./global.css";
import WhatsAppChat from "./components/WhatsappChat";
import ChatBot from "./components/ChatBot";
import { ThemeProvider } from "./components/ThemeProvider";
import Navigation from "./components/Navigation";
import LocomotiveScroll from "./components/Locomotive";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description: "Full-stack developer specializing in creating beautiful, performant, and user-friendly web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${interFont.variable} ${monoFont.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* ThemeProvider removed - Dark mode only */}
        {/* <ThemeProvider> */}
        {/* <LocomotiveScroll> */}
          <Navigation />
          {children}
        {/* </LocomotiveScroll> */}
        {/* <WhatsAppChat /> */}
        {/* <ChatBot /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
