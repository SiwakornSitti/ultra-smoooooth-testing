"use client";

import { useEffect, useState } from "react";
import { parseResponse } from "../lib/api";
import { MOCK_SCENARIO } from "../lib/mock-scenario";
import { EKYC_CUSTOMERS } from "../lib/ekyc-customers";

type AccountPanelProps = {
  bffUrl: string;
  showMockControls: boolean;
};

const INVALID_USER_ID = "00000000-0000-0000-0000-000000000000";

export function AccountPanel({ bffUrl, showMockControls }: AccountPanelProps) {
  // Step 1: create user
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("+66800000000");
  const [userScenario, setUserScenario] = useState("");
  const [userId, setUserId] = useState("");
  const [userResult, setUserResult] = useState("");

  // Step 2: create account (triggers SMS)
  const [balance, setBalance] = useState("1000");
  const currency = "USD";
  const [smsScenario, setSmsScenario] = useState<string>(MOCK_SCENARIO.SMS.SUCCESS);
  const [accountResult, setAccountResult] = useState("");

  // Step 3: verify profile status not blocked
  const [profileResult, setProfileResult] = useState("");
  const [profileStatus, setProfileStatus] = useState("");
  const [profileScenario, setProfileScenario] = useState("");

  // Step 4: update user status
  const [updateStatus, setUpdateStatus] = useState("active");
  const [updateUserResult, setUpdateUserResult] = useState("");

  useEffect(() => {
    if (!showMockControls) {
      setUserScenario("");
      setSmsScenario("");
      setProfileScenario("");
    } else if (!smsScenario) {
      setSmsScenario(MOCK_SCENARIO.SMS.SUCCESS);
    }
  }, [showMockControls]);

  async function createUser() {
    setUserResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(showMockControls && userScenario ? { "Mock-Scenario": userScenario } : {}),
      },
      body: JSON.stringify({ name, email, phone }),
    });
    const data = await parseResponse(res);
    if (res.ok && data.id) {
      setUserId(data.id);
    }
    setUserResult(JSON.stringify(data));
  }

  async function createAccount() {
    if (!userId) {
      setAccountResult(JSON.stringify({ error: "user id is required" }));
      return;
    }

    setAccountResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(showMockControls && smsScenario ? { "Mock-Scenario": smsScenario } : {}),
      },
      body: JSON.stringify({
        user_id: userId,
        balance: parseFloat(balance),
        currency,
        phone,
      }),
    });
    const data = await parseResponse(res);
    setAccountResult(JSON.stringify(data));
  }

  async function verifyProfile() {
    if (!userId) {
      setProfileResult(JSON.stringify({ error: "user id is required" }));
      return;
    }

    setProfileResult("Loading...");
    setProfileStatus("");
    const res = await fetch(`${bffUrl}/api/v1/users/${userId}`, {
      headers: showMockControls && profileScenario ? { "Mock-Scenario": profileScenario } : {},
    });
    const data = await parseResponse(res);
    setProfileResult(JSON.stringify(data));
    if (res.ok && data.user) {
      setProfileStatus(data.user.status === "blocked" ? "blocked" : "active");
    }
  }

  async function updateUserStatus() {
    if (!userId) {
      setUpdateUserResult(JSON.stringify({ error: "user id is required" }));
      return;
    }

    setUpdateUserResult("Loading...");
    const res = await fetch(`${bffUrl}/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updateStatus }),
    });
    const data = await parseResponse(res);
    setUpdateUserResult(JSON.stringify(data));
    if (res.ok && data.status) {
      setProfileStatus(data.status === "blocked" ? "blocked" : "active");
    }
  }

  return (
    <>
      <section data-testid="section-create-user" id="section-create-user">
        <p className="eyebrow">Customer workspace</p>
        <h2>1. Create User</h2>
        <label>
          Name{" "}
          <input data-testid="input-name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email{" "}
          <input data-testid="input-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone{" "}
          <input data-testid="input-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        {showMockControls && (
          <label>
            User Mock Scenario{" "}
            <select data-testid="select-create-user-scenario" value={userScenario} onChange={(e) => setUserScenario(e.target.value)}>
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.USER.CREATE_USER_FAILED}>{MOCK_SCENARIO.USER.CREATE_USER_FAILED}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-create-user" onClick={createUser}>
          Create User
        </button>
        <pre data-testid="result-create-user">{userResult}</pre>
      </section>

      <section data-testid="section-create-account" id="section-create-account">
        <p className="eyebrow">Customer workspace</p>
        <h2>2. Create New Bank Account (triggers SMS)</h2>
        <label>
          User ID{" "}
          <input data-testid="input-user-id" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Balance{" "}
          <input data-testid="input-balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
        </label>
        <br />
        {showMockControls && (
          <label>
            Account Mock Scenario
            <select data-testid="select-sms-scenario" value={smsScenario} onChange={(e) => setSmsScenario(e.target.value)}>
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.SMS.SUCCESS}>{MOCK_SCENARIO.SMS.SUCCESS}</option>
              <option value={MOCK_SCENARIO.SMS.INVALID_NUMBER}>{MOCK_SCENARIO.SMS.INVALID_NUMBER}</option>
              <option value={MOCK_SCENARIO.SMS.UNAVAILABLE}>{MOCK_SCENARIO.SMS.UNAVAILABLE}</option>
              <option value={MOCK_SCENARIO.BANK_ACCOUNT.ACCOUNT_NUMBER_ALREADY_EXISTS}>{MOCK_SCENARIO.BANK_ACCOUNT.ACCOUNT_NUMBER_ALREADY_EXISTS}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-create-account" onClick={createAccount} disabled={!bffUrl || !userId}>
          Create Account
        </button>
        <pre data-testid="result-create-account">{accountResult}</pre>
      </section>

      <section data-testid="section-verify-profile" id="section-verify-profile">
        <p className="eyebrow">Customer workspace</p>
        <h2>3. Get & Update User Profile</h2>
        <label>
          Select User{" "}
          <select
            data-testid="select-profile-user-id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            {userId && !EKYC_CUSTOMERS.some((c) => c.id === userId) && userId !== INVALID_USER_ID && (
              <option value={userId}>Created User ({userId})</option>
            )}
            {EKYC_CUSTOMERS.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.id})
              </option>
            ))}
            <option value={INVALID_USER_ID}>
              {INVALID_USER_ID} (Invalid / Not Found User)
            </option>
          </select>
        </label>
        <label>
          User ID{" "}
          <input
            data-testid="input-profile-user-id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <br />
        {showMockControls && (
          <label>
            Profile Mock Scenario{" "}
            <select
              data-testid="select-profile-scenario"
              value={profileScenario}
              onChange={(e) => setProfileScenario(e.target.value)}
            >
              <option value="">Real service</option>
              <option value={MOCK_SCENARIO.USER.GET_USER_SUCCESS}>{MOCK_SCENARIO.USER.GET_USER_SUCCESS}</option>
              <option value={MOCK_SCENARIO.USER.GET_USER_INVALID}>{MOCK_SCENARIO.USER.GET_USER_INVALID}</option>
            </select>
          </label>
        )}
        <br />
        <button data-testid="btn-verify-profile" onClick={verifyProfile} disabled={!bffUrl || !userId}>
          Get User Profile
        </button>

        <label style={{ marginTop: "1rem" }}>
          Update Status{" "}
          <select
            data-testid="select-update-user-status"
            value={updateStatus}
            onChange={(e) => setUpdateStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </label>
        <button
          data-testid="btn-update-user-status"
          onClick={updateUserStatus}
          disabled={!bffUrl || !userId}
        >
          Update User Status
        </button>
        {updateUserResult && <pre data-testid="result-update-user-status">{updateUserResult}</pre>}

        {profileStatus && (
          <p style={{ color: profileStatus === "blocked" ? "red" : "green" }}>
            Account is {profileStatus === "blocked" ? "Blocked" : "Active"}
          </p>
        )}
        <pre data-testid="result-verify-profile">{profileResult}</pre>
      </section>
    </>
  );
}
