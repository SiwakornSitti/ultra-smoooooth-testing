"use client";

import { useEffect, useState } from "react";
import { parseResponse, useBffUrl } from "./lib/api";
import { AUTH_SESSION_KEY } from "./lib/auth";
import { LogoutButton } from "./lib/logout-button";
import { MOCK_SCENARIO } from "./lib/mock-scenario";
import { EKYC_CUSTOMERS } from "./lib/ekyc-customers";
import { getOrCreateNationalId } from "./lib/national-id";
import { TransferPanel } from "./components/transfer-panel";
import { AccountPanel } from "./components/account-panel";
import { EkycSummary, isEkycResult, type EkycResult } from "./components/ekyc-summary";

type UserOption = {
  id: string;
  name: string;
};

export default function Home() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const bffUrl = useBffUrl();
  const [showMockControls, setShowMockControls] = useState(true);
  const [customerId, setCustomerId] = useState("00000000-0000-0000-0000-000000000001");
  const [users, setUsers] = useState<UserOption[]>([]);
  const [nationalId, setNationalId] = useState("1234567890123");
  const [fullName, setFullName] = useState("Narin Chaiyasit");
  const [ekycResult, setEkycResult] = useState("");
  const [ekycData, setEkycData] = useState<EkycResult | null>(null);
  const [ekycScenario, setEkycScenario] = useState("");

  useEffect(() => {
    setAuthenticated(window.sessionStorage.getItem(AUTH_SESSION_KEY) === "true");
  }, []);

  useEffect(() => {
    if (!bffUrl) return;
    fetch(`${bffUrl}/api/v1/users`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Unable to load users"))))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setUsers(data);
      })
      .catch(() => undefined);
  }, [bffUrl]);

  async function verifyIdentity() {
    setEkycResult("Loading...");
    setEkycData(null);
    const res = await fetch(`${bffUrl}/api/v1/ekycs/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ekycScenario ? { "Mock-Scenario": ekycScenario } : {}),
      },
      body: JSON.stringify({ customer_id: customerId, national_id: nationalId, full_name: fullName }),
    });
    const data = await parseResponse(res);
    if (res.ok && isEkycResult(data)) {
      setEkycResult("");
      setEkycData(data);
    } else {
      setEkycResult(`Error: ${data.error || "Identity verification failed"}`);
    }
  }

  if (authenticated === null) {
    return null;
  }

  if (!authenticated) {
    window.location.replace("/login");
    return null;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Ultra Smoooooth Testing</p>
        <h1>Website</h1>
        <p className="subtitle">Mock the world. Control the chaos. Test without limits.</p>
        <LogoutButton />
        <label className="toggle-field">
          <input
            data-testid="toggle-mock-controls"
            type="checkbox"
            checked={showMockControls}
            onChange={(e) => {
              const enabled = e.target.checked;
              setShowMockControls(enabled);
              setEkycScenario("");
            }}
          />
          <span>Show mock controls</span>
        </label>
      </header>
      <div className="page-grid">
        <AccountPanel bffUrl={bffUrl} showMockControls={showMockControls} />
        <TransferPanel bffUrl={bffUrl} showMockControls={showMockControls} />

        <section data-testid="section-ekyc">
          <p className="eyebrow">Identity</p>
          <h2>eKYC verification</h2>
          <label>
            Customer name{" "}
            <select
              data-testid="input-ekyc-customer-id"
              value={customerId}
              onChange={(e) => {
                const customer = EKYC_CUSTOMERS.find((item) => item.id === e.target.value);
                const user = users.find((item) => item.id === e.target.value);
                if (customer) {
                  setCustomerId(customer.id);
                  setNationalId(customer.nationalId);
                  setFullName(customer.name);
                } else if (user) {
                  setCustomerId(user.id);
                  setNationalId(getOrCreateNationalId(user.id));
                  setFullName(user.name);
                }
              }}
            >
              {(users.length > 0 ? users : EKYC_CUSTOMERS).map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </label>
          <label>
            National ID{" "}
            <input data-testid="input-ekyc-national-id" value={nationalId} disabled />
          </label>
          {showMockControls && (
            <label>
              eKYC Mock Scenario{" "}
              <select data-testid="select-ekyc-scenario" value={ekycScenario} onChange={(e) => setEkycScenario(e.target.value)}>
                <option value="">Real service</option>
                <option value={MOCK_SCENARIO.EKYC.VERIFY_APPROVED}>{MOCK_SCENARIO.EKYC.VERIFY_APPROVED}</option>
                <option value={MOCK_SCENARIO.EKYC.VERIFY_FAILED}>{MOCK_SCENARIO.EKYC.VERIFY_FAILED}</option>
              </select>
            </label>
          )}
          <button data-testid="btn-submit-ekyc" onClick={verifyIdentity} disabled={!bffUrl}>
            Verify Identity
          </button>
          {ekycResult && <p data-testid="result-ekyc">{ekycResult}</p>}
          {ekycData && <EkycSummary result={ekycData} />}
        </section>
      </div>
    </main>
  );
}
