import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });
const monteCarlo = localFont({
  src: "./fonts/MonteCarlo-Regular.woff2",
  variable: "--font-montecarlo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CityFix - City Complaint & Service Platform",
  description: "Report municipal problems, track status, and get things fixed.",
  icons: {
    icon: [
      { url: "/mango.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/mango.png", type: "image/png" },
    ],
    shortcut: "/mango.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} ${monteCarlo.variable} min-h-full flex flex-col antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
