import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getCurrentUser } from "@/server/Users";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) redirect("/auth/sign-in");

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      <DashboardSidebar user={currentUser} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
