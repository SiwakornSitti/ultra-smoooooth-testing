"use client";

import Link from "next/link";
import { useState } from "react";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";
import { EKYC_CUSTOMERS } from "../lib/ekyc-customers";
import { MOCK_SCENARIO } from "../lib/mock-scenario";
import { LogoutButton } from "../lib/logout-button";

export default function EkycPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();
  const [customerId, setCustomerId] = useState("00000000-0000-0000-0000-000000000001");
  const [nationalId, setNationalId] = useState("1234567890123");
  const [fullName, setFullName] = useState("Narin Chaiyasit");
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState("");

  async function verifyIdentity() {
    setResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/ekycs/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(scenario ? { "Mock-Scenario": scenario } : {}),
      },
      body: JSON.stringify({ customer_id: customerId, national_id: nationalId, full_name: fullName }),
    });
    setResult(JSON.stringify(await parseResponse(res)));
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <Link className="home-link" href="/">← Home</Link>
        <p className="eyebrow">Identity</p>
        <h1>eKYC verification</h1>
        <p className="subtitle">Verify a customer identity through the BFF.</p>
        <LogoutButton />
      </header>

      <section data-testid="section-ekyc">
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
        <br />
        <label>
          National ID{" "}
          <input data-testid="input-ekyc-national-id" value={nationalId} disabled />
        </label>
        <br />
        <label>
          eKYC Mock Scenario{" "}
          <select data-testid="select-ekyc-scenario" value={scenario} onChange={(e) => setScenario(e.target.value)}>
            <option value="">Real service</option>
            <option value={MOCK_SCENARIO.EKYC.VERIFY_APPROVED}>{MOCK_SCENARIO.EKYC.VERIFY_APPROVED}</option>
            <option value={MOCK_SCENARIO.EKYC.VERIFY_FAILED}>{MOCK_SCENARIO.EKYC.VERIFY_FAILED}</option>
          </select>
        </label>
        <br />
        <button data-testid="btn-submit-ekyc" onClick={verifyIdentity} disabled={!bffUrl}>
          Verify Identity
        </button>
        <pre data-testid="result-ekyc">{result}</pre>
      </section>
    </main>
  );
}
