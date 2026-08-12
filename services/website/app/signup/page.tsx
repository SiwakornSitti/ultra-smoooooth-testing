"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseResponse, useBffUrl } from "../lib/api";
import { MOCK_SCENARIO } from "../lib/mock-scenario";
import { getOrCreateNationalId } from "../lib/national-id";

const THAI_MOBILE_PHONE_PATTERN = /^\+66[689]\d{8}$/;

function responseError(data: unknown, fallback: string) {
  if (typeof data !== "object" || data === null) return fallback;
  const result = data as { error?: unknown; body?: unknown };
  if (typeof result.error === "string") return result.error;
  if (typeof result.body === "string") return result.body;
  return fallback;
}

export default function SignupPage() {
  const router = useRouter();
  const bffUrl = useBffUrl();
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo.user@example.com");
  const [phone, setPhone] = useState("+66800000000");
  const [result, setResult] = useState("");
  const [signupComplete, setSignupComplete] = useState(false);
  const [otpCode, setOtpCode] = useState("123456");
  const [otpScenario, setOtpScenario] = useState<string>(MOCK_SCENARIO.OTP.SUCCESS);
  const [otpResult, setOtpResult] = useState("");
  const phoneValid = THAI_MOBILE_PHONE_PATTERN.test(phone);

  async function signup() {
    setResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    const data = await parseResponse(res);
    if (res.ok && data.id) getOrCreateNationalId(data.id);
    setResult(res.ok ? "User created successfully." : `Error: ${responseError(data, "Unable to create user")}`);
    setSignupComplete(res.ok);
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
      router.replace("/login");
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">New customer</p>
        <h1>Sign up</h1>
        <p className="subtitle">Create your user profile before signing in.</p>
        <Link className="home-link" href="/login">
          Already have an account? Sign in
        </Link>
      </header>

      <section data-testid="section-signup">
        <label>
          Name{" "}
          <input data-testid="input-signup-name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email{" "}
          <input data-testid="input-signup-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone{" "}
          <input data-testid="input-signup-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <button data-testid="btn-signup" onClick={signup} disabled={!bffUrl}>
          Create User
        </button>
        {result && <p className="profile-result" data-testid="result-signup">{result}</p>}
      </section>

      {signupComplete && (
        <section data-testid="section-signup-otp">
          <h2>Verify OTP</h2>
          <label>
            Phone{" "}
            <input
              data-testid="input-signup-otp-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!phoneValid}
            />
          </label>
          {!phoneValid && <p data-testid="signup-phone-validation-error">Enter a valid Thai mobile number.</p>}
          <br />
          <label>
            OTP Code{" "}
            <input data-testid="input-signup-otp" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
          </label>
          <br />
          <label>
            OTP Mock Scenario{" "}
          <select data-testid="select-signup-otp-scenario" value={otpScenario} onChange={(e) => setOtpScenario(e.target.value)}>
            <option value="">Real service</option>
            <option value={MOCK_SCENARIO.OTP.SUCCESS}>{MOCK_SCENARIO.OTP.SUCCESS}</option>
              <option value={MOCK_SCENARIO.OTP.INVALID}>{MOCK_SCENARIO.OTP.INVALID}</option>
            </select>
          </label>
          <br />
          <button data-testid="btn-signup-verify-otp" onClick={verifyOtp} disabled={!phoneValid}>
            Verify OTP and continue
          </button>
          {otpResult && <p className="profile-result" data-testid="result-signup-otp">{otpResult}</p>}
        </section>
      )}
    </main>
  );
}
