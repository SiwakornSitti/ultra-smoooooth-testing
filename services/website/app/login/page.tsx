"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseResponse, useBffUrl } from "../lib/api";
import { AUTH_SESSION_KEY } from "../lib/auth";
import { MOCK_SCENARIO } from "../lib/mock-scenario";

const THAI_MOBILE_PHONE_PATTERN = /^\+66[689]\d{8}$/;

type UserOption = {
  id: string;
  name: string;
  phone?: string;
};

const DEFAULT_PHONE_PRESETS = [
  { phone: "+66800000001", label: "+66800000001 (Narin Chaiyasit - Sender)" },
  { phone: "+66800000002", label: "+66800000002 (Pimchanok Rattanakul - Receiver)" },
  { phone: "0800000000", label: "0800000000 (Invalid Thai format - Demo)" },
];

function responseError(data: unknown, fallback: string) {
  if (typeof data !== "object" || data === null) return fallback;
  const result = data as { error?: unknown; body?: unknown };
  if (typeof result.error === "string") return result.error;
  if (typeof result.body === "string") return result.body;
  return fallback;
}

export default function LoginPage() {
  const router = useRouter();
  const bffUrl = useBffUrl();
  const [users, setUsers] = useState<UserOption[]>([]);

  useEffect(() => {
    if (!bffUrl) return;
    fetch(`${bffUrl}/api/v1/users`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setUsers(data);
      })
      .catch(() => undefined);
  }, [bffUrl]);

  // Step 1: Paotang authcode exchange
  const [authCode, setAuthCode] = useState("test-authcode");
  const [paotangScenario, setPaotangScenario] = useState<string>(MOCK_SCENARIO.PAOTANG.SUCCESS);
  const [paotangResult, setPaotangResult] = useState("");
  const [tokenExchanged, setTokenExchanged] = useState(false);
  const [showMockControls, setShowMockControls] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  // Step 2: OTP SMS verify
  const [phone, setPhone] = useState("+66800000001");
  const [otpCode, setOtpCode] = useState("123456");
  const [otpScenario, setOtpScenario] = useState<string>(MOCK_SCENARIO.OTP.SUCCESS);
  const [otpResult, setOtpResult] = useState("");
  const phoneValid = THAI_MOBILE_PHONE_PATTERN.test(phone);

  function toggleMockControls(enabled: boolean) {
    setShowMockControls(enabled);
    setPaotangScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);
    setOtpScenario(MOCK_SCENARIO.OTP.SUCCESS);
  }

  async function resetMockScenarios() {
    setIsResetting(true);
    try {
      const res = await fetch(`${bffUrl}/api/v1/workshop/reset`, { method: "POST" });
      if (res.ok) {
        setPaotangResult("Mock scenarios reset to initial state.");
        setOtpResult("");
        setTokenExchanged(false);
      } else {
        setPaotangResult("Unable to reset mock scenarios.");
      }
    } catch {
      setPaotangResult("Unable to reset mock scenarios.");
    } finally {
      setIsResetting(false);
    }
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
    setPaotangResult(res.ok ? "Authcode exchanged successfully." : `Error: ${responseError(data, "Authcode exchange failed")}`);
  }

  async function verifyOtp() {
    if (!phoneValid) {
      setOtpResult("Error: phone must match +66 followed by a valid 9-digit Thai mobile number");
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
    setOtpResult(res.ok ? "OTP verified successfully." : `Error: ${responseError(data, "OTP verification failed")}`);
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
        <div className="header-actions">
          <button
            className="reset-default-button"
            data-testid="btn-reset-default-data"
            type="button"
            disabled={!bffUrl || isResetting}
            onClick={resetMockScenarios}
          >
            <svg className="reset-danger-icon" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 3 2.5 20h19L12 3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 9v4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17.25" r="1" fill="currentColor" />
            </svg>
            {isResetting ? "Resetting…" : "Reset mock scenarios"}
          </button>
        </div>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Step 1: Exchange Authcode</h2>
            {tokenExchanged && <span className="profile-status" style={{ background: "#e1f5ea", color: "#14804a" }}>Exchanged</span>}
          </div>
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
                <option value={MOCK_SCENARIO.PAOTANG.SUCCESS}>{MOCK_SCENARIO.PAOTANG.SUCCESS} — Valid OAuth Exchange</option>
                <option value={MOCK_SCENARIO.PAOTANG.INVALID_GRANT}>{MOCK_SCENARIO.PAOTANG.INVALID_GRANT} — Expired / Invalid Code</option>
                <option value={MOCK_SCENARIO.PAOTANG.SUCCESS_ONCE}>{MOCK_SCENARIO.PAOTANG.SUCCESS_ONCE} — Single-Use Code (Replay Fails)</option>
              </select>
            </label>
          )}
          <button data-testid="btn-paotang-login" onClick={paotangLogin}>
            Exchange Authcode
          </button>
          {paotangResult && <p className="profile-result" data-testid="result-paotang">{paotangResult}</p>}
        </section>

        <section data-testid="section-otp">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Step 2: Verify OTP</h2>
            {!tokenExchanged ? (
              <span className="profile-status" style={{ background: "#fff3cd", color: "#856404" }}>Awaiting Step 1</span>
            ) : (
              <span className="profile-status" style={{ background: "#e7edff", color: "#315bea" }}>Ready</span>
            )}
          </div>
          <label>
            Select Phone Number{" "}
            <select
              data-testid="select-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {users.filter((u) => u.phone).length > 0 ? (
                <>
                  {users
                    .filter((u) => u.phone)
                    .map((u) => (
                      <option key={u.id} value={u.phone}>
                        {u.phone} ({u.name})
                      </option>
                    ))}
                  <option value="0800000000">0800000000 (Invalid Thai format - Demo)</option>
                </>
              ) : (
                DEFAULT_PHONE_PRESETS.map((preset) => (
                  <option key={preset.phone} value={preset.phone}>
                    {preset.label}
                  </option>
                ))
              )}
            </select>
          </label>
          <br />
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
                <option value={MOCK_SCENARIO.OTP.SUCCESS}>{MOCK_SCENARIO.OTP.SUCCESS} — Valid One-Time Password</option>
                <option value={MOCK_SCENARIO.OTP.INVALID}>{MOCK_SCENARIO.OTP.INVALID} — Incorrect / Rejected Code</option>
              </select>
            </label>
          )}
          <button data-testid="btn-verify-otp" onClick={verifyOtp} disabled={!tokenExchanged || !phoneValid}>
            Verify OTP
          </button>
          {otpResult && <p className="profile-result" data-testid="result-otp">{otpResult}</p>}
        </section>
      </div>
      <Link className="signup-button" data-testid="signup-button" href="/signup">
        Need an account? Sign up
      </Link>
    </main>
  );
}
