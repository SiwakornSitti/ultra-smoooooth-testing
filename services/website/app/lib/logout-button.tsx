"use client";

import { useRouter } from "next/navigation";
import { AUTH_SESSION_KEY } from "./auth";

export function LogoutButton() {
  const router = useRouter();

  function logout() {
    window.sessionStorage.removeItem(AUTH_SESSION_KEY);
    router.replace("/login");
  }

  return (
    <button data-testid="btn-logout" type="button" onClick={logout}>
      Logout
    </button>
  );
}
