"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";
import { EKYC_CUSTOMERS } from "../lib/ekyc-customers";
import { MOCK_SCENARIO } from "../lib/mock-scenario";
import { LogoutButton } from "../lib/logout-button";
import { getOrCreateNationalId } from "../lib/national-id";
import { EkycSummary, isEkycResult, type EkycResult } from "../components/ekyc-summary";

type UserOption = {
  id: string;
  name: string;
};

export default function EkycPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();
  const [customerId, setCustomerId] = useState("00000000-0000-0000-0000-000000000001");
  const [users, setUsers] = useState<UserOption[]>([]);
  const [nationalId, setNationalId] = useState("1234567890123");
  const [fullName, setFullName] = useState("Narin Chaiyasit");
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState("");
  const [ekycData, setEkycData] = useState<EkycResult | null>(null);

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
    setResult("Loading...");
    setEkycData(null);
    const res = await fetch(`${bffUrl}/api/v1/ekycs/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(scenario ? { "Mock-Scenario": scenario } : {}),
      },
      body: JSON.stringify({ customer_id: customerId, national_id: nationalId, full_name: fullName }),
    });
    const data = await parseResponse(res);
    if (res.ok && isEkycResult(data)) {
      setResult("");
      setEkycData(data);
    } else {
      setResult(`Error: ${data.error || "Identity verification failed"}`);
    }
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
        {result && <p data-testid="result-ekyc">{result}</p>}
        {ekycData && <EkycSummary result={ekycData} />}
      </section>
    </main>
  );
}
