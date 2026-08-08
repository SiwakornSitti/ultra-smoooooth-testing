"use client";

import { useState } from "react";
import Link from "next/link";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";
import { LogoutButton } from "../lib/logout-button";
import { MOCK_SCENARIO } from "../lib/mock-scenario";

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
  const [smsScenario, setSmsScenario] = useState<string>(MOCK_SCENARIO.SMS.SUCCESS);
  const [accountResult, setAccountResult] = useState("");
  const [showMockControls, setShowMockControls] = useState(true);

  // Step 3: verify profile status not blocked
  const [profileResult, setProfileResult] = useState("");
  const [profileStatus, setProfileStatus] = useState("");
  const [profileScenario, setProfileScenario] = useState("");

  function toggleMockControls(enabled: boolean) {
    setShowMockControls(enabled);
    setSmsScenario(enabled ? MOCK_SCENARIO.SMS.SUCCESS : "");
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
    if (!userId) {
      setAccountResult(JSON.stringify({ error: "user id is required" }));
      return;
    }

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
    if (!userId) {
      setProfileResult(JSON.stringify({ error: "user id is required" }));
      return;
    }

    setProfileResult("Loading...");
    setProfileStatus("");
    const res = await fetch(`${bffUrl}/api/v1/users/${userId}`, {
      headers: profileScenario ? { "Mock-Scenario": profileScenario } : {},
    });
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
        <p className="subtitle">Set up a customer profile, open an account, and retrieve the user profile.</p>
        <LogoutButton />
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
            Account Mock Scenario
            <select data-testid="select-sms-scenario" value={smsScenario} onChange={(e) => setSmsScenario(e.target.value)}>
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.SMS.SUCCESS}>{MOCK_SCENARIO.SMS.SUCCESS}</option>
              <option value={MOCK_SCENARIO.SMS.INVALID_NUMBER}>{MOCK_SCENARIO.SMS.INVALID_NUMBER}</option>
              <option value={MOCK_SCENARIO.SMS.UNAVAILABLE}>{MOCK_SCENARIO.SMS.UNAVAILABLE}</option>
              <option value={MOCK_SCENARIO.BANK_ACCOUNT.ACCOUNT_NUMBER_ALREADY_EXISTS}>{MOCK_SCENARIO.BANK_ACCOUNT.ACCOUNT_NUMBER_ALREADY_EXISTS}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-create-account" onClick={createAccount} disabled={!bffUrl || !userId}>
          Create Account
        </button>
        <pre data-testid="result-create-account">{accountResult}</pre>
      </section>

      <section data-testid="section-verify-profile">
        <h2>3. Get User Profile</h2>
        <label>
          User ID{" "}
          <input
            data-testid="input-profile-user-id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Profile Mock Scenario{" "}
          <select
            data-testid="select-profile-scenario"
            value={profileScenario}
            onChange={(e) => setProfileScenario(e.target.value)}
          >
            <option value="">Real service</option>
            <option value={MOCK_SCENARIO.USER.GET_USER_SUCCESS}>{MOCK_SCENARIO.USER.GET_USER_SUCCESS}</option>
            <option value={MOCK_SCENARIO.USER.GET_USER_INVALID}>{MOCK_SCENARIO.USER.GET_USER_INVALID}</option>
          </select>
        </label>
        <br />
        <button data-testid="btn-verify-profile" onClick={verifyProfile} disabled={!bffUrl || !userId}>
          Get User Profile
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
