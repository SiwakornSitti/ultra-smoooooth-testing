"use client";

import Link from "next/link";
import { useState } from "react";
import { parseResponse, useBffUrl } from "../lib/api";
import { useRequireLogin } from "../lib/auth";

export default function EkycPage() {
  const authenticated = useRequireLogin();
  const bffUrl = useBffUrl();
  const [customerId, setCustomerId] = useState("00000000-0000-0000-0000-000000000001");
  const [nationalId, setNationalId] = useState("1234567890123");
  const [fullName, setFullName] = useState("Seed Sender");
  const [result, setResult] = useState("");

  async function verifyIdentity() {
    setResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/ekycs/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      </header>

      <section data-testid="section-ekyc">
        <label>
          Customer ID{" "}
          <input data-testid="input-ekyc-customer-id" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        </label>
        <br />
        <label>
          National ID{" "}
          <input data-testid="input-ekyc-national-id" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
        </label>
        <br />
        <label>
          Full name{" "}
          <input data-testid="input-ekyc-full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
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
