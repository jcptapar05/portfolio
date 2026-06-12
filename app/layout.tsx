import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatWidget from "@/components/ChatWidget";
import CanvasNodesBackground from "@/components/CanvasNodesBackground";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  metadataBase: new URL("https://www.juliustapar.com"),
  title: {
    default: "Julius Tapar — Full-Stack Developer & AI Automation Specialist",
    template: "%s | Julius Tapar",
  },
  description:
    "Julius Tapar is a Full-Stack Developer & AI Automation Specialist from the Philippines specializing in Next.js, Golang, and automated workflows. Building scalable web systems and n8n integrations.",
  keywords: [
    "Julius Tapar",
    "Full-Stack Developer",
    "AI Automation",
    "n8n",
    "Next.js",
    "React",
    "Golang",
    "TypeScript",
    "Philippines",
    "Software Engineer",
  ],
  authors: [{ name: "Julius Tapar", url: "https://github.com/jcptapar05" }],
  creator: "Julius Tapar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Julius Tapar — Full-Stack Developer & AI Automation Specialist",
    description:
      "Full-Stack Developer & AI Automation Specialist specializing in React, Next.js, Golang, and enterprise workflows using n8n and Zapier.",
    siteName: "Julius Tapar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julius Tapar — Full-Stack Developer & AI Automation Specialist",
    description:
      "Full-Stack Developer & AI Automation Specialist specializing in React, Next.js, Golang, and enterprise workflows using n8n and Zapier.",
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
          <CanvasNodesBackground />
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
      <GoogleAnalytics gaId="G-J4YVYY8LXE" />
    </html>
  );
}
