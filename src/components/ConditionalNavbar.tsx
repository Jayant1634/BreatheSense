"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { usePathname } from "next/navigation";
import BreatheSenseNavbar from "@/app/components/Navbar";

export default function ConditionalNavbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Don't show navbar on dashboard routes when logged in
  if (user && pathname.startsWith("/dashboard")) {
    return null;
  }

  return <BreatheSenseNavbar />;
}
