"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseResponse, useBffUrl } from "../lib/api";
import { MOCK_SCENARIO } from "../lib/mock-scenario";

const THAI_MOBILE_PHONE_PATTERN = /^\+66[689]\d{8}$/;

export default function SignupPage() {
  const router = useRouter();
  const bffUrl = useBffUrl();
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
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
    setResult(JSON.stringify(data));
    setSignupComplete(res.ok);
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
        <pre data-testid="result-signup">{result}</pre>
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
          <pre data-testid="result-signup-otp">{otpResult}</pre>
        </section>
      )}
    </main>
  );
}
