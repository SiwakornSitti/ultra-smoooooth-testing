"use client";

import { useState } from "react";
import Link from "next/link";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";
import { LogoutButton } from "../lib/logout-button";
import { MOCK_SCENARIO } from "../lib/mock-scenario";
import { EKYC_CUSTOMERS } from "../lib/ekyc-customers";
import { ACCOUNT_OPTIONS, INVALID_ACCOUNT_OPTION } from "../lib/accounts";

export default function TransferPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();
  const [sourceAccountId, setSourceAccountId] = useState<string>(ACCOUNT_OPTIONS[0].id);
  const [targetAccountId, setTargetAccountId] = useState<string>(ACCOUNT_OPTIONS[1].id);
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState("THB");
  const [transferResult, setTransferResult] = useState("");
  const [transfersResult, setTransfersResult] = useState("");
  const [hasLoadedTransfers, setHasLoadedTransfers] = useState(false);
  const [listTransfersScenario, setListTransfersScenario] = useState("");
  const [historyCustomerId, setHistoryCustomerId] = useState<string>(EKYC_CUSTOMERS[0].id);
  const [historyAccountNo, setHistoryAccountNo] = useState(ACCOUNT_OPTIONS[0].number);

  async function submitTransfer() {
    setTransferResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/transfers?customer_id=${historyCustomerId}`, {
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
    setHasLoadedTransfers(false);
    const query = new URLSearchParams({ customer_id: historyCustomerId });
    if (historyAccountNo) query.set("account_no", historyAccountNo);
    const res = await fetch(`${bffUrl}/api/v1/transfers?${query.toString()}`, {
      headers: listTransfersScenario ? { "Mock-Scenario": listTransfersScenario } : {},
    });
    const data = await parseResponse(res);
    setTransfersResult(Array.isArray(data) && data.length === 0 ? "" : JSON.stringify(data));
    setHasLoadedTransfers(res.ok && Array.isArray(data));
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
        <LogoutButton />
      </header>

      <div className="page-grid">
      <section data-testid="section-create-transfer">
        <h2>Create Transfer</h2>
        <label>
          Source Account ID{" "}
          <select
            data-testid="input-source-account-id"
            value={sourceAccountId}
            onChange={(e) => setSourceAccountId(e.target.value)}
          >
            {[...ACCOUNT_OPTIONS, INVALID_ACCOUNT_OPTION].map((account) => <option key={account.id} value={account.id}>{account.id === INVALID_ACCOUNT_OPTION.id ? `${account.number} (Invalid account)` : account.number}</option>)}
          </select>
        </label>
        <br />
        <label>
          Target Account ID{" "}
          <select
            data-testid="input-target-account-id"
            value={targetAccountId}
            onChange={(e) => setTargetAccountId(e.target.value)}
          >
            {[...ACCOUNT_OPTIONS, INVALID_ACCOUNT_OPTION].map((account) => <option key={account.id} value={account.id}>{account.id === INVALID_ACCOUNT_OPTION.id ? `${account.number} (Invalid account)` : account.number}</option>)}
          </select>
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
        <label>
          Customer{" "}
          <select data-testid="select-transfer-history-customer" value={historyCustomerId} onChange={(e) => setHistoryCustomerId(e.target.value)}>
            {EKYC_CUSTOMERS.map((customer) => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </label>
        <label>
          Account No. {" "}
          <select data-testid="select-transfer-history-account-no" value={historyAccountNo} onChange={(e) => setHistoryAccountNo(e.target.value)}>
            {[...ACCOUNT_OPTIONS, INVALID_ACCOUNT_OPTION].map((account) => <option key={account.id} value={account.number}>{account.id === INVALID_ACCOUNT_OPTION.id ? `${account.number} (Invalid account)` : account.number}</option>)}
          </select>
        </label>
        <label>
          Transfer History Mock Scenario{" "}
          <select data-testid="select-list-transfers-scenario" value={listTransfersScenario} onChange={(e) => setListTransfersScenario(e.target.value)}>
            <option value="">Real service</option>
            <option value={MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS}>{MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS}</option>
            <option value={MOCK_SCENARIO.TRANSFER.EMPTY_LIST}>{MOCK_SCENARIO.TRANSFER.EMPTY_LIST}</option>
          </select>
        </label>
        <br />
        <button data-testid="btn-list-transfers" onClick={listTransfers} disabled={!bffUrl}>
          Load Transfers
        </button>
        <pre data-testid="result-transfers">{transfersResult}</pre>
        {hasLoadedTransfers && !transfersResult && <p data-testid="empty-transfer-history">No transfers found.</p>}
      </section>
      </div>
    </main>
  );
}
