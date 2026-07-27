"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AUTH_SESSION_KEY = "qa-authenticated";

export function useRequireLogin() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(AUTH_SESSION_KEY) !== "true") {
      router.replace("/login");
      return;
    }
    setAuthenticated(true);
  }, [router]);

  return authenticated;
}
