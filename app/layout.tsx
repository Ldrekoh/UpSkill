import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Configuration des polices pour correspondre à ton design "Digital Atelier"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: "Collaborative Authority | Learn by Sharing",
  description:
    "The Digital Atelier for cross-disciplinary growth. Exchange expertise using tokens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("scroll-smooth", inter.variable, manrope.variable)}
    >
      <body className="bg-background text-on-surface font-body antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        <Navbar />

        {/* On ajoute un min-h-screen pour que le footer reste en bas si la page est courte */}
        <main className="min-h-screen pt-20">{children}</main>

        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
