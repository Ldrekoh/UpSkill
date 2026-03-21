import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-headline" });

export const metadata: Metadata = {
  title: "Collaborative Authority | Learn by Sharing",
  description:
    "The Digital Atelier for cross-disciplinary growth. Exchange expertise using tokens.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("scroll-smooth", inter.variable, manrope.variable)}
    >
      <body className="bg-background text-on-surface font-body antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
