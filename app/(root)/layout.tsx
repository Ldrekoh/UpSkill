// app/(root)/layout.tsx
import { Sidebar } from "@/components/navigation/Sidebar";
import { Navbar } from "@/components/navigation/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-container-lowest text-on-surface">
      {/* 1. Sidebar - Fixe à gauche sur desktop */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* 2. Zone de contenu principal */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Navbar - Toujours en haut */}
        <Navbar />

        {/* Contenu de la page - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
