"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";
import { LogoutButton } from "../lib/logout-button";
import { MOCK_SCENARIO } from "../lib/mock-scenario";
import { EKYC_CUSTOMERS } from "../lib/ekyc-customers";
import { ACCOUNT_OPTIONS, getAccountNumber, INVALID_ACCOUNT_OPTION } from "../lib/accounts";

type AccountOption = {
  id: string;
  number?: string;
  user_id?: string;
  balance?: number;
  ownerName?: string;
};

type TransferRecord = {
  id: string;
  source_account_id: string;
  target_account_id: string;
  amount: number;
  status: string;
};

function responseError(data: unknown, fallback: string) {
  if (typeof data !== "object" || data === null) return fallback;
  const result = data as { error?: unknown; body?: unknown };
  if (typeof result.error === "string") return result.error;
  if (typeof result.body === "string") return result.body;
  return fallback;
}

function accountLabel(account: AccountOption) {
  const number = getAccountNumber(account.id);
  if (account.id === INVALID_ACCOUNT_OPTION.id) return `${number} (Invalid account)`;
  const owner = account.ownerName || account.user_id;
  return owner ? `${number} — ${owner}` : number;
}

export default function TransferPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();
  const [accounts, setAccounts] = useState<AccountOption[]>([...ACCOUNT_OPTIONS]);
  const [sourceAccountId, setSourceAccountId] = useState<string>(ACCOUNT_OPTIONS[0].id);
  const [targetAccountId, setTargetAccountId] = useState<string>(ACCOUNT_OPTIONS[1].id);
  const [amount, setAmount] = useState("10");
  const [transferResult, setTransferResult] = useState("");
  const [userScenario, setUserScenario] = useState("");
  const [transferScenario, setTransferScenario] = useState("");
  const [transfersResult, setTransfersResult] = useState("");
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);
  const [hasLoadedTransfers, setHasLoadedTransfers] = useState(false);
  const [listTransfersScenario, setListTransfersScenario] = useState("");
  const [historyCustomerId, setHistoryCustomerId] = useState<string>(EKYC_CUSTOMERS[0].id);
  const [historyAccountNo, setHistoryAccountNo] = useState<string>(ACCOUNT_OPTIONS[0].number);

  useEffect(() => {
    if (!bffUrl) return;

    fetch(`${bffUrl}/api/v1/accounts`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Unable to load accounts"))))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAccounts(data);
          setSourceAccountId(data[0].id);
          setTargetAccountId(data[Math.min(1, data.length - 1)].id);
          setHistoryAccountNo(getAccountNumber(data[0].id));
        }
      })
      .catch(() => undefined);

    fetch(`${bffUrl}/api/v1/users`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Unable to load users"))))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const names = new Map(data.map((user) => [user.id, user.name]));
        setAccounts((current) => current.map((account) => ({
          ...account,
          ownerName: account.user_id ? names.get(account.user_id) : undefined,
        })));
      })
      .catch(() => undefined);
  }, [bffUrl]);

  const selectableAccounts = [...accounts, INVALID_ACCOUNT_OPTION];
  const sourceAccount = accounts.find((account) => account.id === sourceAccountId);

  async function refreshAccounts() {
    const res = await fetch(`${bffUrl}/api/v1/accounts`);
    const data = await parseResponse(res);
    if (!res.ok || !Array.isArray(data)) return;

    setAccounts((current) => data.map((account) => ({
      ...account,
      ownerName: current.find((existing) => existing.id === account.id)?.ownerName,
    })));
  }

  async function submitTransfer() {
    setTransferResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/transfers?customer_id=${historyCustomerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(([userScenario, transferScenario].filter(Boolean).join(","))
          ? { "Mock-Scenario": [userScenario, transferScenario].filter(Boolean).join(",") }
          : {}),
      },
      body: JSON.stringify({
        source_account_id: sourceAccountId,
        target_account_id: targetAccountId,
        amount: parseFloat(amount),
      }),
    });
    const data = await parseResponse(res);
    if (res.ok) {
      await refreshAccounts();
      setTransferResult(`Transfer ${data.status || "completed"}.`);
      return;
    }
    setTransferResult(`Error: ${responseError(data, "Transfer failed")}`);
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
    if (res.ok && Array.isArray(data)) {
      setTransfers(data);
      setTransfersResult("");
      setHasLoadedTransfers(true);
    } else {
      setTransfers([]);
      setTransfersResult(`Error: ${responseError(data, "Unable to load transfer history")}`);
      setHasLoadedTransfers(false);
    }
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
            {selectableAccounts.map((account) => <option key={account.id} value={account.id}>{accountLabel(account)}</option>)}
          </select>
        </label>
        {sourceAccount?.balance !== undefined && (
          <p className="current-balance" data-testid="source-account-balance">
            Current balance: {sourceAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        )}
        <br />
        <label>
          Target Account ID{" "}
          <select
            data-testid="input-target-account-id"
            value={targetAccountId}
            onChange={(e) => setTargetAccountId(e.target.value)}
          >
            {selectableAccounts.map((account) => <option key={account.id} value={account.id}>{accountLabel(account)}</option>)}
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
          User Mock Scenario{" "}
          <select data-testid="select-transfer-user-scenario" value={userScenario} onChange={(e) => setUserScenario(e.target.value)}>
            <option value="">Real service</option>
            <option value={MOCK_SCENARIO.USER.GET_USER_BLOCKED}>{MOCK_SCENARIO.USER.GET_USER_BLOCKED}</option>
          </select>
        </label>
        <label>
          Transfer Mock Scenario{" "}
          <select data-testid="select-transfer-scenario" value={transferScenario} onChange={(e) => setTransferScenario(e.target.value)}>
            <option value="">Real service</option>
          </select>
        </label>
        <button
          data-testid="btn-submit-transfer"
          onClick={submitTransfer}
          disabled={!bffUrl || !sourceAccountId || !targetAccountId}
        >
          Transfer Money
        </button>
        {transferResult && <p className="profile-result" data-testid="result-transfer">{transferResult}</p>}
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
            {selectableAccounts.map((account) => <option key={account.id} value={getAccountNumber(account.id)}>{accountLabel(account)}</option>)}
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
        {transfersResult && <p className="profile-result" data-testid="result-transfers">{transfersResult}</p>}
        {transfers.length > 0 && (
          <div className="table-wrapper" data-testid="result-transfers">
            <table>
              <thead>
                <tr><th>Source</th><th>Target</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr key={transfer.id}>
                    <td>{getAccountNumber(transfer.source_account_id)}</td>
                    <td>{getAccountNumber(transfer.target_account_id)}</td>
                    <td>{transfer.amount}</td>
                    <td>{transfer.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {hasLoadedTransfers && !transfersResult && <p data-testid="empty-transfer-history">No transfers found.</p>}
      </section>
      </div>
    </main>
  );
}
