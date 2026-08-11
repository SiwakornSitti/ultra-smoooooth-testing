"use client";

import { useEffect, useState } from "react";
import { parseResponse } from "../lib/api";
import { MOCK_SCENARIO } from "../lib/mock-scenario";

type AccountPanelProps = {
  bffUrl: string;
  showMockControls: boolean;
};

type UserOption = {
  id: string;
  name: string;
};

export function AccountPanel({ bffUrl, showMockControls }: AccountPanelProps) {
  // Step 1: create user
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("+66800000000");
  const [userScenario, setUserScenario] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<UserOption[]>([]);
  const [userResult, setUserResult] = useState("");

  // Step 2: create account
  const [balance, setBalance] = useState("1000");
  const currency = "USD";
  const [smsScenario, setSmsScenario] = useState<string>(MOCK_SCENARIO.SMS.SUCCESS);
  const [accountResult, setAccountResult] = useState("");

  // Step 3: verify profile status not blocked
  const [profileResult, setProfileResult] = useState("");
  const [profileStatus, setProfileStatus] = useState("");
  const [profileScenario, setProfileScenario] = useState("");

  // Step 3: update user status
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

  async function loadUsers(selectedUserId?: string) {
    const res = await fetch(`${bffUrl}/api/v1/users`);
    const data = await parseResponse(res);
    if (res.ok && Array.isArray(data)) {
      setUsers(data);
      if (selectedUserId) {
        setUserId(selectedUserId);
      }
    }
  }

  useEffect(() => {
    if (bffUrl) {
      void loadUsers();
    }
  }, [bffUrl]);

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
      await loadUsers(data.id);
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
      <section className="account-section" data-testid="section-create-user" id="section-create-user">
        <p className="eyebrow">Customer workspace</p>
        <h2>Create User</h2>
        <label>
          Name{" "}
          <input data-testid="input-name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email{" "}
          <input data-testid="input-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone{" "}
          <input data-testid="input-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
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

      <section className="account-section" data-testid="section-create-account" id="section-create-account">
        <p className="eyebrow">Customer workspace</p>
        <h2>Create New Bank Account</h2>
        <label>
          User ID{" "}
          <select data-testid="input-user-id" value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="" disabled>Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.id})
              </option>
            ))}
          </select>
        </label>
        <label>
          Balance{" "}
          <input data-testid="input-balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
        </label>
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

      <section className="account-section" data-testid="section-verify-profile" id="section-verify-profile">
        <p className="eyebrow">Customer workspace</p>
        <h2>Get & Update User Profile</h2>
        <label>
          User ID{" "}
          <select
            data-testid="select-profile-user-id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="" disabled>Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.id})
              </option>
            ))}
          </select>
        </label>
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
