"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { parseResponse, useBffUrl } from "./lib/api";
import { AUTH_SESSION_KEY } from "./lib/auth";
import { LogoutButton } from "./lib/logout-button";
import { MOCK_SCENARIO } from "./lib/mock-scenario";
import { EKYC_CUSTOMERS } from "./lib/ekyc-customers";
import { ACCOUNT_OPTIONS } from "./lib/accounts";
import { TransferPanel } from "./components/transfer-panel";
import { AccountPanel } from "./components/account-panel";

type AccountBalance = {
  balance: number;
  currency: string;
};

export default function Home() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const bffUrl = useBffUrl();
  const [balanceAccountId, setBalanceAccountId] = useState<string>(ACCOUNT_OPTIONS[0].id);
  const [balanceResult, setBalanceResult] = useState("");
  const [accountBalance, setAccountBalance] = useState<AccountBalance | null>(null);
  const [balanceError, setBalanceError] = useState("");
  const [balanceScenario, setBalanceScenario] = useState("");
  const [showMockControls, setShowMockControls] = useState(true);
  const [customerId, setCustomerId] = useState("00000000-0000-0000-0000-000000000001");
  const [nationalId, setNationalId] = useState("1234567890123");
  const [fullName, setFullName] = useState("Narin Chaiyasit");
  const [ekycResult, setEkycResult] = useState("");
  const [ekycScenario, setEkycScenario] = useState("");

  useEffect(() => {
    setAuthenticated(window.sessionStorage.getItem(AUTH_SESSION_KEY) === "true");
  }, []);

  async function checkBalance() {
    setBalanceResult("Loading...");
    setAccountBalance(null);
    setBalanceError("");
    const res = await fetch(`${bffUrl}/api/v1/accounts/${balanceAccountId}`, {
      headers: balanceScenario ? { "Mock-Scenario": balanceScenario } : {},
    });
    const data = await parseResponse(res);
    if (res.ok) {
      setAccountBalance(data);
      setBalanceResult("");
    } else {
      setBalanceResult("");
      setBalanceError(data.error || "Unable to load account balance");
    }
  }

  async function verifyIdentity() {
    setEkycResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/ekycs/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ekycScenario ? { "Mock-Scenario": ekycScenario } : {}),
      },
      body: JSON.stringify({ customer_id: customerId, national_id: nationalId, full_name: fullName }),
    });
    const data = await parseResponse(res);
    setEkycResult(res.ok ? "Identity verification completed." : `Error: ${data.error || "Identity verification failed"}`);
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
        <h1>QA Automation Website</h1>
        <p className="subtitle">Drive real service flows through the BFF while external integrations stay safely mocked.</p>
        <Link className="home-link" href="#section-create-account">Create new bank account</Link>
        <LogoutButton />
        <label className="toggle-field">
          <input
            data-testid="toggle-mock-controls"
            type="checkbox"
            checked={showMockControls}
            onChange={(e) => {
              const enabled = e.target.checked;
              setShowMockControls(enabled);
              setBalanceScenario("");
              setEkycScenario("");
            }}
          />
          <span>Show mock controls</span>
        </label>
      </header>
      <div className="page-grid">
        <AccountPanel bffUrl={bffUrl} showMockControls={showMockControls} />
        <TransferPanel bffUrl={bffUrl} showMockControls={showMockControls} />

        <section data-testid="section-balance">
          <p className="eyebrow">Payments</p>
          <h2>Current Balance</h2>
          <label>
            Account No.{" "}
            <select
              data-testid="input-balance-account-id"
              value={balanceAccountId}
              onChange={(e) => setBalanceAccountId(e.target.value)}
            >
              {ACCOUNT_OPTIONS.map((account) => <option key={account.id} value={account.id}>{account.number}</option>)}
            </select>
          </label>
          {showMockControls && (
            <label>
              Balance Mock Scenario
              <select data-testid="select-balance-scenario" value={balanceScenario} onChange={(e) => setBalanceScenario(e.target.value)}>
                <option value="">Real service</option>
                <option value={MOCK_SCENARIO.BANK_ACCOUNT.GET_ACCOUNT_NOT_FOUND}>{MOCK_SCENARIO.BANK_ACCOUNT.GET_ACCOUNT_NOT_FOUND}</option>
              </select>
            </label>
          )}
          <button data-testid="btn-check-balance" onClick={checkBalance} disabled={!bffUrl || !balanceAccountId}>
            Check Current Balance
          </button>
          {balanceResult && <p data-testid="balance-loading">{balanceResult}</p>}
          {balanceError && <p className="error-message" data-testid="balance-error">Error: {balanceError}</p>}
          {accountBalance && (
            <p data-testid="result-balance">
              Balance: {accountBalance.balance} {accountBalance.currency}
            </p>
          )}
        </section>

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
                if (customer) {
                  setCustomerId(customer.id);
                  setNationalId(customer.nationalId);
                  setFullName(customer.name);
                }
              }}
            >
              {EKYC_CUSTOMERS.map((customer) => (
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
          <p data-testid="result-ekyc">{ekycResult}</p>
        </section>
      </div>
    </main>
  );
}
