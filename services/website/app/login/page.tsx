"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseResponse, useBffUrl } from "../lib/api";
import { AUTH_SESSION_KEY } from "../lib/auth";
import { MOCK_SCENARIO } from "../lib/mock-scenario";

const THAI_MOBILE_PHONE_PATTERN = /^\+66[689]\d{8}$/;

export default function LoginPage() {
  const router = useRouter();
  const bffUrl = useBffUrl();

  // Step 1: Paotang authcode exchange
  const [authCode, setAuthCode] = useState("test-authcode");
  const [paotangScenario, setPaotangScenario] = useState<string>(MOCK_SCENARIO.PAOTANG.SUCCESS);
  const [paotangResult, setPaotangResult] = useState("");
  const [tokenExchanged, setTokenExchanged] = useState(false);
  const [showMockControls, setShowMockControls] = useState(true);

  // Step 2: OTP SMS verify
  const [phone, setPhone] = useState("+66800000001");
  const [otpCode, setOtpCode] = useState("123456");
  const [otpScenario, setOtpScenario] = useState<string>(MOCK_SCENARIO.OTP.SUCCESS);
  const [otpResult, setOtpResult] = useState("");
  const phoneValid = THAI_MOBILE_PHONE_PATTERN.test(phone);

  function toggleMockControls(enabled: boolean) {
    setShowMockControls(enabled);
    setPaotangScenario(enabled ? MOCK_SCENARIO.PAOTANG.SUCCESS : "");
    setOtpScenario(enabled ? MOCK_SCENARIO.OTP.SUCCESS : "");
  }

  async function paotangLogin() {
    setPaotangResult("Loading...");
    const res = await fetch(`${bffUrl}/auth/paotang/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(paotangScenario ? { "Mock-Scenario": paotangScenario } : {}),
      },
      body: JSON.stringify({ code: authCode }),
    });
    const data = await parseResponse(res);
    setTokenExchanged(res.ok);
    setPaotangResult(JSON.stringify(data));
  }

  async function verifyOtp() {
    if (!phoneValid) {
      setOtpResult(JSON.stringify({ error: "phone must match +66 followed by a valid 9-digit Thai mobile number" }));
      return;
    }

    setOtpResult("Loading...");
    const res = await fetch(`${bffUrl}/auth/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(otpScenario ? { "Mock-Scenario": otpScenario } : {}),
      },
      body: JSON.stringify({ phone, code: otpCode }),
    });
    const data = await parseResponse(res);
    setOtpResult(JSON.stringify(data));
    if (res.ok && data.verified === true) {
      window.sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      router.replace("/");
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Secure access</p>
        <h1>Sign in</h1>
        <p className="subtitle">Exchange your Paotang auth code, then verify your identity with a one-time password.</p>
        <div data-testid="example-user">
          <strong>Example user</strong>
          <p>Name: Narin Chaiyasit</p>
          <p>Email: sender@example.com</p>
          <p>Phone: +66800000001</p>
        </div>
        <label className="toggle-field">
          <input
            data-testid="toggle-mock-controls"
            type="checkbox"
            checked={showMockControls}
            onChange={(e) => toggleMockControls(e.target.checked)}
          />
          <span>Show mock controls</span>
        </label>
      </header>

      <div className="page-grid">
      <section data-testid="section-paotang">
        <h2>1. Exchange Authcode</h2>
        <label>
          Auth Code{" "}
          <input data-testid="input-authcode" value={authCode} onChange={(e) => setAuthCode(e.target.value)} />
        </label>
        <br />
        {showMockControls && (
          <label>
            Paotang Mock Scenario
            <select
              data-testid="select-paotang-scenario"
              value={paotangScenario}
              onChange={(e) => setPaotangScenario(e.target.value)}
            >
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.PAOTANG.SUCCESS}>{MOCK_SCENARIO.PAOTANG.SUCCESS}</option>
              <option value={MOCK_SCENARIO.PAOTANG.INVALID_GRANT}>{MOCK_SCENARIO.PAOTANG.INVALID_GRANT}</option>
              <option value={MOCK_SCENARIO.PAOTANG.SUCCESS_ONCE}>{MOCK_SCENARIO.PAOTANG.SUCCESS_ONCE}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-paotang-login" onClick={paotangLogin}>
          Exchange Authcode
        </button>
        <pre data-testid="result-paotang">{paotangResult}</pre>
      </section>

      <section data-testid="section-otp">
        <h2>2. Verify OTP</h2>
        <label>
          Phone{" "}
          <input
            data-testid="input-phone"
            type="tel"
            inputMode="tel"
            pattern="\\+66[689][0-9]{8}"
            title="Enter a Thai mobile number such as +66800000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!phoneValid}
          />
        </label>
        {!phoneValid && (
          <p data-testid="phone-validation-error">
            Enter a valid Thai mobile number starting with +66 and followed by exactly 9 digits.
          </p>
        )}
        <br />
        <label>
          OTP Code{" "}
          <input data-testid="input-otp" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
        </label>
        <br />
        {showMockControls && (
          <label>
            OTP Mock Scenario
            <select data-testid="select-otp-scenario" value={otpScenario} onChange={(e) => setOtpScenario(e.target.value)}>
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.OTP.SUCCESS}>{MOCK_SCENARIO.OTP.SUCCESS}</option>
              <option value={MOCK_SCENARIO.OTP.INVALID}>{MOCK_SCENARIO.OTP.INVALID}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-verify-otp" onClick={verifyOtp} disabled={!tokenExchanged || !phoneValid}>
          Verify OTP
        </button>
        <pre data-testid="result-otp">{otpResult}</pre>
      </section>
      </div>
      <Link className="signup-button" data-testid="signup-button" href="/signup">
        Need an account? Sign up
      </Link>
    </main>
  );
}
