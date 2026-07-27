"use client";

import { useState } from "react";
import Link from "next/link";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";

export default function TransferPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();
  const [sourceAccountId, setSourceAccountId] = useState("00000000-0000-0000-0000-000000000011");
  const [targetAccountId, setTargetAccountId] = useState("00000000-0000-0000-0000-000000000012");
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState("THB");
  const [transferResult, setTransferResult] = useState("");
  const [transfersResult, setTransfersResult] = useState("");

  async function submitTransfer() {
    setTransferResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/transfers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_account_id: sourceAccountId,
        target_account_id: targetAccountId,
        amount: parseFloat(amount),
        currency,
      }),
    });
    const data = await parseResponse(res);
    setTransferResult(JSON.stringify(data));
  }

  async function listTransfers() {
    setTransfersResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/transfers`);
    const data = await parseResponse(res);
    setTransfersResult(JSON.stringify(data));
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <Link className="home-link" href="/">← Home</Link>
        <p className="eyebrow">Payments</p>
        <h1>Transfer money</h1>
        <p className="subtitle">Move funds securely between accounts and review completed transfers.</p>
      </header>

      <div className="page-grid">
      <section data-testid="section-create-transfer">
        <h2>Create Transfer</h2>
        <label>
          Source Account ID{" "}
          <input
            data-testid="input-source-account-id"
            value={sourceAccountId}
            onChange={(e) => setSourceAccountId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Target Account ID{" "}
          <input
            data-testid="input-target-account-id"
            value={targetAccountId}
            onChange={(e) => setTargetAccountId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Amount{" "}
          <input
            data-testid="input-transfer-amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Currency{" "}
          <input data-testid="input-transfer-currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
        </label>
        <br />
        <button
          data-testid="btn-submit-transfer"
          onClick={submitTransfer}
          disabled={!bffUrl || !sourceAccountId || !targetAccountId}
        >
          Transfer Money
        </button>
        <pre data-testid="result-transfer">{transferResult}</pre>
      </section>

      <section data-testid="section-list-transfers">
        <h2>Transfer History</h2>
        <button data-testid="btn-list-transfers" onClick={listTransfers} disabled={!bffUrl}>
          Load Transfers
        </button>
        <pre data-testid="result-transfers">{transfersResult}</pre>
      </section>
      </div>
    </main>
  );
}
