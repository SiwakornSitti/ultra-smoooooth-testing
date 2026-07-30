"use client";

import { useState } from "react";
import Link from "next/link";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";

export default function AccountPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();

  // Step 1: create user
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("+66800000000");
  const [status, setStatus] = useState("active");
  const [userId, setUserId] = useState("");
  const [userResult, setUserResult] = useState("");

  // Step 2: create account (triggers SMS)
  const [balance, setBalance] = useState("1000");
  const [currency, setCurrency] = useState("USD");
  const [smsScenario, setSmsScenario] = useState("SMS:SUCCESS");
  const [accountResult, setAccountResult] = useState("");
  const [showMockControls, setShowMockControls] = useState(true);

  // Step 3: verify profile status not blocked
  const [profileResult, setProfileResult] = useState("");
  const [profileStatus, setProfileStatus] = useState("");

  function toggleMockControls(enabled: boolean) {
    setShowMockControls(enabled);
    setSmsScenario(enabled ? "SMS:SUCCESS" : "");
  }

  async function createUser() {
    setUserResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, status }),
    });
    const data = await parseResponse(res);
    if (res.ok && data.id) {
      setUserId(data.id);
    }
    setUserResult(JSON.stringify(data));
  }

  async function createAccount() {
    setAccountResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(smsScenario ? { "Mock-Scenario": smsScenario } : {}),
      },
      body: JSON.stringify({
        user_id: userId,
        balance: parseFloat(balance),
        currency,
        phone,
      }),
    });
    const data = await parseResponse(res);
    setAccountResult(JSON.stringify(data));
  }

  async function verifyProfile() {
    setProfileResult("Loading...");
    setProfileStatus("");
    const res = await fetch(`${bffUrl}/api/v1/users/${userId}`);
    const data = await parseResponse(res);
    setProfileResult(JSON.stringify(data));
    if (res.ok && data.user) {
      setProfileStatus(data.user.status === "blocked" ? "blocked" : "active");
    }
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <Link className="home-link" href="/">← Home</Link>
        <p className="eyebrow">Customer workspace</p>
        <h1>Create account</h1>
        <p className="subtitle">Set up a customer profile, open an account, and verify its profile status.</p>
        <label className="toggle-field">
          <input
            data-testid="toggle-mock-controls"
            type="checkbox"
            checked={showMockControls}
            onChange={(e) => toggleMockControls(e.target.checked)}
          />
          <span>Show mock controls</span>
        </label>
      </header>

      <div className="page-grid">
      <section data-testid="section-create-user">
        <h2>1. Create User</h2>
        <label>
          Name{" "}
          <input data-testid="input-name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email{" "}
          <input data-testid="input-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone{" "}
          <input data-testid="input-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Status{" "}
          <select data-testid="select-user-status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">active</option>
            <option value="blocked">blocked</option>
          </select>
        </label>
        <br />
        <button data-testid="btn-create-user" onClick={createUser}>
          Create User
        </button>
        <pre data-testid="result-create-user">{userResult}</pre>
      </section>

      <section data-testid="section-create-account">
        <h2>2. Create Account (triggers SMS)</h2>
        <label>
          User ID{" "}
          <input data-testid="input-user-id" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Balance{" "}
          <input data-testid="input-balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
        </label>
        <br />
        <label>
          Currency{" "}
          <input data-testid="input-currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
        </label>
        <br />
        {showMockControls && (
          <label>
            SMS Mock Scenario
            <select data-testid="select-sms-scenario" value={smsScenario} onChange={(e) => setSmsScenario(e.target.value)}>
              <option value="SMS:SUCCESS">SMS:SUCCESS</option>
              <option value="SMS:INVALID_NUMBER">SMS:INVALID_NUMBER</option>
            </select>
          </label>
        )}
        <button data-testid="btn-create-account" onClick={createAccount}>
          Create Account
        </button>
        <pre data-testid="result-create-account">{accountResult}</pre>
      </section>

      <section data-testid="section-verify-profile">
        <h2>3. Verify Profile</h2>
        <button data-testid="btn-verify-profile" onClick={verifyProfile}>
          Verify Profile
        </button>
        {profileStatus && (
          <p style={{ color: profileStatus === "blocked" ? "red" : "green" }}>
            Account is {profileStatus === "blocked" ? "BLOCKED" : "active"}
          </p>
        )}
        <pre data-testid="result-verify-profile">{profileResult}</pre>
      </section>
      </div>
    </main>
  );
}
