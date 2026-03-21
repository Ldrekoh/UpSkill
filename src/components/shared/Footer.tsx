"use client";
import { Globe, Share2, Users } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-bright">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="text-xl font-bold text-on-surface font-headline">
            Collaborative Authority
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
            The premier digital atelier for cross-disciplinary skill sharing and
            collaborative growth.
          </p>
          <div className="flex gap-4">
            <Share2 className="w-5 h-5 text-outline cursor-pointer hover:text-primary transition-colors" />
            <Globe className="w-5 h-5 text-outline cursor-pointer hover:text-primary transition-colors" />
            <Users className="w-5 h-5 text-outline cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Links: Platform */}
        <div className="flex flex-col gap-4">
          <h5 className="font-headline font-bold text-on-surface">Platform</h5>
          <nav className="flex flex-col gap-2">
            <FooterLink href="/explore">Explore</FooterLink>
            <FooterLink href="/mentor-signup">Become a Mentor</FooterLink>
            <FooterLink href="/workshops">Workshops</FooterLink>
            <FooterLink href="/affiliate">Affiliate Program</FooterLink>
          </nav>
        </div>

        {/* Links: Resources */}
        <div className="flex flex-col gap-4">
          <h5 className="font-headline font-bold text-on-surface">Resources</h5>
          <nav className="flex flex-col gap-2">
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/guidelines">Community Guidelines</FooterLink>
            <FooterLink href="/safety">Safety Center</FooterLink>
            <FooterLink href="/cases">Case Studies</FooterLink>
          </nav>
        </div>

        {/* Links: Legal */}
        <div className="flex flex-col gap-4">
          <h5 className="font-headline font-bold text-on-surface">Legal</h5>
          <nav className="flex flex-col gap-2">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Settings</FooterLink>
          </nav>
        </div>
      </div>

      <div className="border-t border-outline-variant/10 py-8 px-8 max-w-7xl mx-auto text-center">
        <p className="font-body text-sm text-outline">
          © {currentYear} The Collaborative Authority. Built for the Digital
          Atelier.
        </p>
      </div>
    </footer>
  );
};

// Petit composant utilitaire pour les liens du footer
const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-on-surface-variant hover:text-primary underline-offset-4 hover:underline text-sm transition-all w-fit"
  >
    {children}
  </Link>
);
