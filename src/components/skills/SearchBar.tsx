// components/skills/SearchBar.tsx
"use client";

import { Search } from "@/components/ui/Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // On attend 300ms après la fin de la frappe pour éviter de spammer la DB
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
        size={18}
      />
      <input
        type="text"
        placeholder="Search by topic..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="h-12 w-64 md:w-80 bg-surface-container-low border-none rounded-2xl pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none italic"
      />
    </div>
  );
}
