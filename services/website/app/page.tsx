import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Ultra Smoooooth Testing</p>
        <h1>QA Automation Website</h1>
        <p className="subtitle">Drive real service flows through the BFF while external integrations stay safely mocked.</p>
      </header>
      <ul className="home-links">
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
        <li>
          <Link data-testid="link-transfer" href="/transfer">
            Transfer Money (move funds and view transfer history)
          </Link>
        </li>
        <li>
          <Link data-testid="link-ekyc" href="/ekyc">
            eKYC Verification
          </Link>
        </li>
      </ul>
    </main>
  );
}
