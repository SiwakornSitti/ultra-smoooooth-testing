"use client";

import { useState } from "react";
import { parseResponse, useBffUrl } from "../lib/api";

export default function LoginPage() {
  const bffUrl = useBffUrl();

  // Step 1: Paotang authcode exchange
  const [authCode, setAuthCode] = useState("test-authcode");
  const [paotangScenario, setPaotangScenario] = useState("PT_PASS:SUCCESS");
  const [paotangResult, setPaotangResult] = useState("");
  const [tokenExchanged, setTokenExchanged] = useState(false);

  // Step 2: OTP SMS verify
  const [phone, setPhone] = useState("+66800000000");
  const [otpCode, setOtpCode] = useState("123456");
  const [otpScenario, setOtpScenario] = useState("OTP:SUCCESS");
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
  }

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: 640 }}>
      <h1>Login</h1>
      <p>Exchange Paotang authcode for token, then verify second factor via OTP SMS.</p>

      <section data-testid="section-paotang">
        <h2>1. Exchange Authcode</h2>
        <label>
          Auth Code{" "}
          <input data-testid="input-authcode" value={authCode} onChange={(e) => setAuthCode(e.target.value)} />
        </label>
        <br />
        <label>
          Paotang Mock Scenario{" "}
          <select
            data-testid="select-paotang-scenario"
            value={paotangScenario}
            onChange={(e) => setPaotangScenario(e.target.value)}
          >
            <option value="PT_PASS:SUCCESS">PT_PASS:SUCCESS</option>
            <option value="PT_PASS:INVALID_GRANT">PT_PASS:INVALID_GRANT</option>
            <option value="PT_PASS:SUCCESS_ONCE">PT_PASS:SUCCESS_ONCE</option>
          </select>
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
        <label>
          OTP Mock Scenario{" "}
          <select data-testid="select-otp-scenario" value={otpScenario} onChange={(e) => setOtpScenario(e.target.value)}>
            <option value="OTP:SUCCESS">OTP:SUCCESS</option>
            <option value="OTP:INVALID">OTP:INVALID</option>
          </select>
        </label>
        <br />
        <button data-testid="btn-verify-otp" onClick={verifyOtp} disabled={!tokenExchanged}>
          Verify OTP
        </button>
        <pre data-testid="result-otp">{otpResult}</pre>
      </section>
    </main>
  );
}
