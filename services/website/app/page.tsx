import Link from "next/link";

export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: 640 }}>
      <h1>QA Automation Website</h1>
      <p>Drives the full flow through bff-service, exercising the WireMock-mocked external services.</p>
      <ul>
        <li>
          <Link data-testid="link-login" href="/login">
            Login (authcode exchange + OTP verify)
          </Link>
        </li>
        <li>
          <Link data-testid="link-account" href="/account">
            Create Account (create user/account + profile status check)
          </Link>
        </li>
      </ul>
    </main>
  );
}
