"use client";

import Link from "next/link";
import { useRequireLogin } from "./lib/auth";
import { LogoutButton } from "./lib/logout-button";

export default function Home() {
  const authenticated = useRequireLogin();

  if (!authenticated) {
    return null;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Ultra Smoooooth Testing</p>
        <h1>QA Automation Website</h1>
        <p className="subtitle">Drive real service flows through the BFF while external integrations stay safely mocked.</p>
        <LogoutButton />
      </header>
      <ul className="home-links">
        <li>
          <Link data-testid="link-login" href="/login">
            Login (authcode exchange + OTP verify)
          </Link>
        </li>
        <li>
          <Link data-testid="link-account" href="/account">
            Create Account (create user/account + profile status check)
          </Link>
        </li>
        <li>
          <Link data-testid="link-transfer" href="/transfer">
            Transfer Money (move funds and view transfer history)
          </Link>
        </li>
        <li>
          <Link data-testid="link-ekyc" href="/ekyc">
            eKYC Verification
          </Link>
        </li>
      </ul>
    </main>
  );
}
