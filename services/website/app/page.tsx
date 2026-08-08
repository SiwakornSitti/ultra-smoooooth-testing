"use client";

import { useEffect, useState } from "react";
import { parseResponse, useBffUrl } from "./lib/api";
import { AUTH_SESSION_KEY } from "./lib/auth";
import { LogoutButton } from "./lib/logout-button";
import { MOCK_SCENARIO } from "./lib/mock-scenario";

type TransferRecord = {
  id: string;
  source_account_id: string;
  target_account_id: string;
  amount: number;
  currency: string;
  status: string;
};

type AccountBalance = {
  balance: number;
  currency: string;
};

export default function Home() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const bffUrl = useBffUrl();
  const [sourceAccountId, setSourceAccountId] = useState("00000000-0000-0000-0000-000000000011");
  const [targetAccountId, setTargetAccountId] = useState("00000000-0000-0000-0000-000000000012");
  const [amount, setAmount] = useState("100");
  const [transferResult, setTransferResult] = useState("");
  const [transfersResult, setTransfersResult] = useState("");
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);
  const [balanceAccountId, setBalanceAccountId] = useState("00000000-0000-0000-0000-000000000011");
  const [balanceResult, setBalanceResult] = useState("");
  const [accountBalance, setAccountBalance] = useState<AccountBalance | null>(null);
  const [balanceError, setBalanceError] = useState("");
  const [balanceScenario, setBalanceScenario] = useState("");
  const [showMockControls, setShowMockControls] = useState(true);
  const [transferScenario, setTransferScenario] = useState<string>(MOCK_SCENARIO.TRANSFER.CREATE_TRANSFER);
  const [listTransfersScenario, setListTransfersScenario] = useState<string>(MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS);
  const [customerId, setCustomerId] = useState("00000000-0000-0000-0000-000000000001");
  const [nationalId, setNationalId] = useState("1234567890123");
  const [fullName, setFullName] = useState("Narin Chaiyasit");
  const [ekycResult, setEkycResult] = useState("");

  useEffect(() => {
    setAuthenticated(window.sessionStorage.getItem(AUTH_SESSION_KEY) === "true");
  }, []);

  async function submitTransfer() {
    setTransferResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/transfers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(transferScenario ? { "Mock-Scenario": transferScenario } : {}),
      },
      body: JSON.stringify({
        source_account_id: sourceAccountId,
        target_account_id: targetAccountId,
        amount: parseFloat(amount),
      }),
    });
    const data = await parseResponse(res);
    setTransferResult(res.ok ? `Transfer ${data.status || "completed"}.` : `Error: ${data.error || "Transfer failed"}`);
  }

  async function listTransfers() {
    setTransfersResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/transfers`, {
      headers: listTransfersScenario ? { "Mock-Scenario": listTransfersScenario } : {},
    });
    const data = await parseResponse(res);
    if (res.ok && Array.isArray(data)) {
      setTransfers(data);
      setTransfersResult("");
    } else {
      setTransfers([]);
      setTransfersResult(`Error: ${data.error || "Unable to load transfer history"}`);
    }
  }

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
      headers: { "Content-Type": "application/json" },
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
        <LogoutButton />
        <label className="toggle-field">
          <input
            data-testid="toggle-mock-controls"
            type="checkbox"
            checked={showMockControls}
            onChange={(e) => {
              const enabled = e.target.checked;
              setShowMockControls(enabled);
              setTransferScenario(enabled ? MOCK_SCENARIO.TRANSFER.CREATE_TRANSFER : "");
              setListTransfersScenario(enabled ? MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS : "");
              setBalanceScenario("");
            }}
          />
          <span>Show mock controls</span>
        </label>
      </header>
      <div className="page-grid">
        <section data-testid="section-transfer">
          <p className="eyebrow">Payments</p>
          <h2>Transfer money</h2>
          <label>
            Source Account No.{" "}
            <input data-testid="input-source-account-id" value={sourceAccountId} onChange={(e) => setSourceAccountId(e.target.value)} />
          </label>
          <label>
            Target Account No.{" "}
            <input data-testid="input-target-account-id" value={targetAccountId} onChange={(e) => setTargetAccountId(e.target.value)} />
          </label>
          <label>
            Amount{" "}
            <input data-testid="input-transfer-amount" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          {showMockControls && (
            <label>
              Transfer Mock Scenario
              <select data-testid="select-transfer-scenario" value={transferScenario} onChange={(e) => setTransferScenario(e.target.value)}>
                <option value="">Real service</option>
                <option value={MOCK_SCENARIO.TRANSFER.CREATE_TRANSFER}>{MOCK_SCENARIO.TRANSFER.CREATE_TRANSFER}</option>
                <option value={MOCK_SCENARIO.TRANSFER.TRANSFER_INSUFFICIENT_AMOUNT}>{MOCK_SCENARIO.TRANSFER.TRANSFER_INSUFFICIENT_AMOUNT}</option>
              </select>
            </label>
          )}
          <button data-testid="btn-submit-transfer" onClick={submitTransfer} disabled={!bffUrl || !sourceAccountId || !targetAccountId}>
            Transfer Money
          </button>
          <p data-testid="result-transfer">{transferResult}</p>
        </section>

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
              <option value="00000000-0000-0000-0000-000000000011">Account 001 (00000000-0000-0000-0000-000000000011)</option>
              <option value="00000000-0000-0000-0000-000000000012">Account 002 (00000000-0000-0000-0000-000000000012)</option>
            </select>
          </label>
          {showMockControls && (
            <label>
              Balance Mock Scenario
              <select data-testid="select-balance-scenario" value={balanceScenario} onChange={(e) => setBalanceScenario(e.target.value)}>
                <option value="">Real service</option>
                <option value={MOCK_SCENARIO.BFF.GET_ACCOUNT_NOT_FOUND}>{MOCK_SCENARIO.BFF.GET_ACCOUNT_NOT_FOUND}</option>
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

        <section data-testid="section-transfer-history">
          <p className="eyebrow">Payments</p>
          <h2>Transfer History</h2>
          {showMockControls && (
            <label>
              List Transfers Mock Scenario
              <select data-testid="select-list-transfers-scenario" value={listTransfersScenario} onChange={(e) => setListTransfersScenario(e.target.value)}>
                <option value="">Real service</option>
                <option value={MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS}>{MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS}</option>
              </select>
            </label>
          )}
          <button data-testid="btn-list-transfers" onClick={listTransfers} disabled={!bffUrl}>
            Load Transfers
          </button>
          {transfersResult && <p className="error-message" data-testid="result-transfers">{transfersResult}</p>}
          {transfers.length > 0 && (
            <div className="table-wrapper" data-testid="result-transfers">
              <table>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Target</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((transfer) => (
                    <tr key={transfer.id}>
                      <td>{transfer.source_account_id}</td>
                      <td>{transfer.target_account_id}</td>
                      <td>{transfer.amount} {transfer.currency}</td>
                      <td>{transfer.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section data-testid="section-ekyc">
          <p className="eyebrow">Identity</p>
          <h2>eKYC verification</h2>
          <label>
            Customer ID{" "}
            <input data-testid="input-ekyc-customer-id" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
          </label>
          <label>
            National ID{" "}
            <input data-testid="input-ekyc-national-id" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
          </label>
          <label>
            Full name{" "}
            <input data-testid="input-ekyc-full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
          <button data-testid="btn-submit-ekyc" onClick={verifyIdentity} disabled={!bffUrl}>
            Verify Identity
          </button>
          <p data-testid="result-ekyc">{ekycResult}</p>
        </section>
      </div>
    </main>
  );
}
