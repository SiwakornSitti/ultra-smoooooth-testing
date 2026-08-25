"use client";

import { useEffect, useState } from "react";
import { parseResponse } from "../lib/api";
import { EKYC_CUSTOMERS } from "../lib/ekyc-customers";
import { ACCOUNT_OPTIONS, getAccountNumber, INVALID_ACCOUNT_OPTION } from "../lib/accounts";
import { MOCK_SCENARIO } from "../lib/mock-scenario";

type TransferRecord = {
  id: string;
  source_account_id: string;
  target_account_id: string;
  amount: number;
  status: string;
};

type TransferPanelProps = {
  bffUrl: string;
  showMockControls: boolean;
};

type AccountOption = {
  id: string;
  number?: string;
  user_id?: string;
  balance?: number;
  ownerName?: string;
};

function accountLabel(account: AccountOption) {
  const number = getAccountNumber(account.id);
  if (account.id === INVALID_ACCOUNT_OPTION.id) return `${number} (Invalid account)`;
  const owner = account.ownerName || account.user_id;
  return owner ? `${number} — ${owner}` : number;
}

export function TransferPanel({ bffUrl, showMockControls }: TransferPanelProps) {
  const [accounts, setAccounts] = useState<AccountOption[]>([...ACCOUNT_OPTIONS]);
  const [sourceAccountId, setSourceAccountId] = useState<string>(ACCOUNT_OPTIONS[0].id);
  const [targetAccountId, setTargetAccountId] = useState<string>(ACCOUNT_OPTIONS[1].id);
  const [amount, setAmount] = useState("10");
  const [transferResult, setTransferResult] = useState("");
  const [transfersResult, setTransfersResult] = useState("");
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);
  const [hasLoadedTransfers, setHasLoadedTransfers] = useState(false);
  const [userScenario, setUserScenario] = useState<string>("");
  const [transferScenario, setTransferScenario] = useState<string>("");
  const [listTransfersScenario, setListTransfersScenario] = useState<string>("");
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

  useEffect(() => {
    if (!showMockControls) {
      setUserScenario("");
      setTransferScenario("");
      setListTransfersScenario("");
    }
  }, [showMockControls]);

  const selectableAccounts = showMockControls ? [...accounts, INVALID_ACCOUNT_OPTION] : accounts;
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
    setTransferResult(`Error: ${data.error || "Transfer failed"}`);
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
      setTransfersResult(`Error: ${data.error || "Unable to load transfer history"}`);
    }
  }

  return (
    <>
      <section data-testid="section-transfer">
        <p className="eyebrow">Payments</p>
        <h2>Transfer money</h2>
        <label>
          Source Account No.{" "}
          <select data-testid="input-source-account-id" value={sourceAccountId} onChange={(e) => setSourceAccountId(e.target.value)}>
            {selectableAccounts.map((account) => <option key={account.id} value={account.id}>{accountLabel(account)}</option>)}
          </select>
        </label>
        {sourceAccount?.balance !== undefined && (
          <p className="current-balance" data-testid="source-account-balance">
            Current balance: {sourceAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        )}
        <label>
          Target Account No.{" "}
          <select data-testid="input-target-account-id" value={targetAccountId} onChange={(e) => setTargetAccountId(e.target.value)}>
            {selectableAccounts.map((account) => <option key={account.id} value={account.id}>{accountLabel(account)}</option>)}
          </select>
        </label>
        <label>
          Amount <input data-testid="input-transfer-amount" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        {showMockControls && (
          <label>
            User Mock Scenario
            <select data-testid="select-transfer-user-scenario" value={userScenario} onChange={(e) => setUserScenario(e.target.value)}>
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.USER.GET_USER_BLOCKED}>{MOCK_SCENARIO.USER.GET_USER_BLOCKED}</option>
            </select>
          </label>
        )}
        {showMockControls && (
          <label>
            Transfer Mock Scenario
            <select data-testid="select-transfer-scenario" value={transferScenario} onChange={(e) => setTransferScenario(e.target.value)}>
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.TRANSFER.SUCCESS}>{MOCK_SCENARIO.TRANSFER.SUCCESS}</option>
              <option value={MOCK_SCENARIO.TRANSFER.INSUFFICIENT_AMOUNT}>{MOCK_SCENARIO.TRANSFER.INSUFFICIENT_AMOUNT}</option>
              <option value={MOCK_SCENARIO.TRANSFER.INVALID_ACCOUNT}>{MOCK_SCENARIO.TRANSFER.INVALID_ACCOUNT}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-submit-transfer" onClick={submitTransfer} disabled={!bffUrl || !sourceAccountId || !targetAccountId}>
          Transfer Money
        </button>
        <p data-testid="result-transfer">{transferResult}</p>
      </section>

      <section data-testid="section-transfer-history">
        <p className="eyebrow">Payments</p>
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
        {showMockControls && (
          <label>
            List Transfers Mock Scenario
            <select data-testid="select-list-transfers-scenario" value={listTransfersScenario} onChange={(e) => setListTransfersScenario(e.target.value)}>
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS}>{MOCK_SCENARIO.TRANSFER.LIST_TRANSFERS}</option>
              <option value={MOCK_SCENARIO.TRANSFER.EMPTY_LIST}>{MOCK_SCENARIO.TRANSFER.EMPTY_LIST}</option>
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
        {hasLoadedTransfers && transfers.length === 0 && (
          <p data-testid="empty-transfer-history">No transfers found.</p>
        )}
      </section>
    </>
  );
}
