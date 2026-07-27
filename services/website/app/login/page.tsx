"use client";

import { useState } from "react";
import { parseResponse, useBffUrl } from "../lib/api";
import { AUTH_SESSION_KEY } from "../lib/auth";

export default function LoginPage() {
  const bffUrl = useBffUrl();

  // Step 1: Paotang authcode exchange
  const [authCode, setAuthCode] = useState("test-authcode");
  const paotangScenario = "PT_PASS:SUCCESS";
  const [paotangResult, setPaotangResult] = useState("");
  const [tokenExchanged, setTokenExchanged] = useState(false);

  // Step 2: OTP SMS verify
  const [phone, setPhone] = useState("+66800000000");
  const [otpCode, setOtpCode] = useState("123456");
  const otpScenario = "OTP:SUCCESS";
  const [otpResult, setOtpResult] = useState("");

  async function paotangLogin() {
    setPaotangResult("Loading...");
    const res = await fetch(`${bffUrl}/auth/paotang/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Mock-Scenario": paotangScenario,
      },
      body: JSON.stringify({ code: authCode }),
    });
    const data = await parseResponse(res);
    setTokenExchanged(res.ok);
    setPaotangResult(JSON.stringify(data));
  }

  async function verifyOtp() {
    setOtpResult("Loading...");
    const res = await fetch(`${bffUrl}/auth/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Mock-Scenario": otpScenario,
      },
      body: JSON.stringify({ phone, code: otpCode }),
    });
    const data = await parseResponse(res);
    setOtpResult(JSON.stringify(data));
    if (res.ok && data.verified === true) {
      window.sessionStorage.setItem(AUTH_SESSION_KEY, "true");
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Secure access</p>
        <h1>Sign in</h1>
        <p className="subtitle">Exchange your Paotang auth code, then verify your identity with a one-time password.</p>
      </header>

      <div className="page-grid">
      <section data-testid="section-paotang">
        <h2>1. Exchange Authcode</h2>
        <label>
          Auth Code{" "}
          <input data-testid="input-authcode" value={authCode} onChange={(e) => setAuthCode(e.target.value)} />
        </label>
        <br />
        <button data-testid="btn-paotang-login" onClick={paotangLogin}>
          Exchange Authcode
        </button>
        <pre data-testid="result-paotang">{paotangResult}</pre>
      </section>

      <section data-testid="section-otp">
        <h2>2. Verify OTP</h2>
        <label>
          Phone{" "}
          <input data-testid="input-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label>
          OTP Code{" "}
          <input data-testid="input-otp" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
        </label>
        <br />
        <button data-testid="btn-verify-otp" onClick={verifyOtp} disabled={!tokenExchanged}>
          Verify OTP
        </button>
        <pre data-testid="result-otp">{otpResult}</pre>
      </section>
      </div>
    </main>
  );
}
