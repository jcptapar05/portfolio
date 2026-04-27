import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Julius Tapar — Frontend & Full-Stack Developer",
    template: "%s | Julius Tapar",
  },
  description:
    "Julius Tapar is a Frontend and Full-Stack Developer from the Philippines specializing in React, Next.js, and MERN. Building scalable web applications, real-time systems, and exploring Go and Solidity.",
  keywords: [
    "Julius Tapar",
    "Frontend Developer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "MERN",
    "Philippines",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Julius Tapar", url: "https://github.com/jcptapar05" }],
  creator: "Julius Tapar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Julius Tapar — Frontend & Full-Stack Developer",
    description:
      "Frontend and Full-Stack Developer specializing in React, Next.js, MERN, real-time systems, and scalable web applications.",
    siteName: "Julius Tapar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julius Tapar — Frontend & Full-Stack Developer",
    description:
      "Frontend and Full-Stack Developer specializing in React, Next.js, MERN, real-time systems, and scalable web applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans overflow-x-hidden antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <ChatWidget
          apiUrl="/api/chat"
          persistKey="portfolio_chat_v1"
          position="bottom-right"
        />
      </body>
    </html>
  );
}
