"use client";

import { useState } from "react";
import Link from "next/link";
import { useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";
import { LogoutButton } from "../lib/logout-button";
import { AccountPanel } from "../components/account-panel";

export default function AccountPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();
  const [showMockControls, setShowMockControls] = useState(true);

  if (!authenticated) {
    return null;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <Link className="home-link" href="/">← Home</Link>
        <p className="eyebrow">Customer workspace</p>
        <h1>Create new bank account</h1>
        <p className="subtitle">Set up a customer profile, open an account, and retrieve the user profile.</p>
        <LogoutButton />
        <label className="toggle-field">
          <input
            data-testid="toggle-mock-controls"
            type="checkbox"
            checked={showMockControls}
            onChange={(e) => setShowMockControls(e.target.checked)}
          />
          <span>Show mock controls</span>
        </label>
      </header>

      <div className="page-grid">
        <AccountPanel bffUrl={bffUrl} showMockControls={showMockControls} />
      </div>
    </main>
  );
}
