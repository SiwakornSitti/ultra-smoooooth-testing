"use client";

import { useEffect, useState } from "react";
import { parseResponse } from "../lib/api";
import { MOCK_SCENARIO } from "../lib/mock-scenario";

type TransferRecord = {
  id: string;
  source_account_id: string;
  target_account_id: string;
  amount: number;
  currency: string;
  status: string;
};

type TransferPanelProps = {
  bffUrl: string;
  showMockControls: boolean;
};

export function TransferPanel({ bffUrl, showMockControls }: TransferPanelProps) {
  const [sourceAccountId, setSourceAccountId] = useState("00000000-0000-0000-0000-000000000011");
  const [targetAccountId, setTargetAccountId] = useState("00000000-0000-0000-0000-000000000012");
  const [amount, setAmount] = useState("100");
  const [transferResult, setTransferResult] = useState("");
  const [transfersResult, setTransfersResult] = useState("");
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);
  const [transferScenario, setTransferScenario] = useState<string>("");
  const [listTransfersScenario, setListTransfersScenario] = useState<string>("");

  useEffect(() => {
    if (!showMockControls) {
      setTransferScenario("");
      setListTransfersScenario("");
    }
  }, [showMockControls]);

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

  return (
    <>
      <section data-testid="section-transfer">
        <p className="eyebrow">Payments</p>
        <h2>Transfer money</h2>
        <label>
          Source Account No. <input data-testid="input-source-account-id" value={sourceAccountId} onChange={(e) => setSourceAccountId(e.target.value)} />
        </label>
        <label>
          Target Account No. <input data-testid="input-target-account-id" value={targetAccountId} onChange={(e) => setTargetAccountId(e.target.value)} />
        </label>
        <label>
          Amount <input data-testid="input-transfer-amount" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
                <tr><th>Source</th><th>Target</th><th>Amount</th><th>Status</th></tr>
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
    </>
  );
}
