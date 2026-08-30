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
        <h1>Account Management</h1>
        <p className="subtitle">Manage user profiles and bank accounts.</p>
        <div className="header-actions">
          <LogoutButton />
        </div>
        <section className="workshop-controls" aria-label="Workshop controls">
          <label className="toggle-field">
            <input
              data-testid="toggle-mock-controls"
              type="checkbox"
              checked={showMockControls}
              onChange={(e) => setShowMockControls(e.target.checked)}
            />
            <span>Show mock controls</span>
          </label>
        </section>
      </header>
      <div className="page-grid">
        <div className="workspace-column">
          <AccountPanel bffUrl={bffUrl} showMockControls={showMockControls} showCreateUser={true} />
        </div>
      </div>
    </main>
  );
}
