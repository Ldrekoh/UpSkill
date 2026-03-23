import { Footer } from "@/components/shared/Footer";
import { MarketingSidebar } from "@/components/shared/MarketingSidebar";
import { getCurrentUser } from "@/server/Users";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // On fetch l'user ici (Server Component) et on passe les données
  // au client component MarketingSidebar via props — pattern correct.
  const { currentUser } = await getCurrentUser();

  return (
    <div className="flex min-h-screen bg-background">
      <MarketingSidebar user={currentUser} />

      {/* Décalage de 256px (w-64) sur desktop pour laisser place à la sidebar */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
