"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { loadingStore } from "@/lib/store/loadingStore";

function NavigationHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show loader on route change
    loadingStore.set("isLoading", true);

    // Hide loader after a short delay to ensure page is rendered
    const timer = setTimeout(() => {
      loadingStore.set("isLoading", false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Hide loader on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      loadingStore.set("isLoading", false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}

export default function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <NavigationHandler>{children}</NavigationHandler>
    </Suspense>
  );
}
