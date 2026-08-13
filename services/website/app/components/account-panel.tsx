"use client";

import { useEffect, useState } from "react";
import { parseResponse } from "../lib/api";
import { MOCK_SCENARIO } from "../lib/mock-scenario";
import { getOrCreateNationalId } from "../lib/national-id";

type AccountPanelProps = {
  bffUrl: string;
  showMockControls: boolean;
};

type UserOption = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status?: string;
};

const INVALID_USER_OPTION: UserOption = {
  id: "00000000-0000-0000-0000-000099999999",
  name: "Invalid user",
};

type ProfileData = {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
  };
  accounts: Array<{
    id: string;
    user_id: string;
    balance: number;
  }>;
};

type AccountData = {
  id: string;
  user_id: string;
  balance: number;
};

function isProfileData(value: unknown): value is ProfileData {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { user?: unknown; accounts?: unknown };
  return typeof candidate.user === "object" && candidate.user !== null && Array.isArray(candidate.accounts);
}

function profileErrorMessage(value: unknown) {
  if (typeof value !== "object" || value === null) return "Unable to load user profile";
  const candidate = value as { error?: unknown; body?: unknown };
  if (typeof candidate.error === "string") return candidate.error;
  if (typeof candidate.body === "string") return candidate.body;
  return "Unable to load user profile";
}

function isUpdatedUser(value: unknown): value is Required<UserOption> {
  if (typeof value !== "object" || value === null) return false;
  const user = value as Partial<Required<UserOption>>;
  return typeof user.id === "string"
    && typeof user.name === "string"
    && typeof user.email === "string"
    && typeof user.phone === "string"
    && typeof user.status === "string";
}

function isAccountData(value: unknown): value is AccountData {
  if (typeof value !== "object" || value === null) return false;
  const account = value as Partial<AccountData>;
  return typeof account.id === "string" && typeof account.user_id === "string" && typeof account.balance === "number";
}

function UserSummary({ user, testId }: { user: Required<UserOption>; testId: string }) {
  return (
    <div className="profile-summary" data-testid={testId}>
      <div className="profile-summary-header">
        <div className="profile-customer">
          <strong>{user.name}</strong>
          <span className="profile-summary-id">ID: {user.id}</span>
        </div>
        <span className="profile-status">{user.status}</span>
      </div>
      <dl className="profile-details">
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
        </div>
      </dl>
    </div>
  );
}

export function AccountPanel({ bffUrl, showMockControls }: AccountPanelProps) {
  // Step 1: create user
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo.user@example.com");
  const [phone, setPhone] = useState("+66800000000");
  const [userScenario, setUserScenario] = useState("");
  const [accountUserId, setAccountUserId] = useState("");
  const [profileUserId, setProfileUserId] = useState("");
  const [updateUserId, setUpdateUserId] = useState("");
  const [users, setUsers] = useState<UserOption[]>([]);
  const [userResult, setUserResult] = useState("");
  const [createdUser, setCreatedUser] = useState<Required<UserOption> | null>(null);

  // Step 2: create account
  const [balance, setBalance] = useState("1000");
  const currency = "USD";
  const [smsScenario, setSmsScenario] = useState<string>(MOCK_SCENARIO.SMS.SUCCESS);
  const [accountResult, setAccountResult] = useState("");
  const [createdAccount, setCreatedAccount] = useState<AccountData | null>(null);

  // Step 3: verify profile status not blocked
  const [profileResult, setProfileResult] = useState("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileScenario, setProfileScenario] = useState("");

  // Step 3: update user status
  const [updateStatus, setUpdateStatus] = useState("active");
  const [updateUserResult, setUpdateUserResult] = useState("");
  const [updatedUser, setUpdatedUser] = useState<Required<UserOption> | null>(null);
  useEffect(() => {
    if (!showMockControls) {
      setUserScenario("");
      setProfileScenario("");
    }
  }, [showMockControls]);

  async function loadUsers(selectedUserId?: string) {
    const res = await fetch(`${bffUrl}/api/v1/users`);
    const data = await parseResponse(res);
    if (res.ok && Array.isArray(data)) {
      setUsers(data);
      if (selectedUserId) {
        setAccountUserId(selectedUserId);
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
    setCreatedUser(null);
    const res = await fetch(`${bffUrl}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(showMockControls && userScenario ? { "Mock-Scenario": userScenario } : {}),
      },
      body: JSON.stringify({ name, email, phone }),
    });
    const data = await parseResponse(res);
    if (res.ok && isUpdatedUser(data)) {
      setUserResult("");
      setCreatedUser(data);
      getOrCreateNationalId(data.id);
      await loadUsers(data.id);
    } else {
      setUserResult(profileErrorMessage(data));
    }
  }

  async function createAccount() {
    if (!accountUserId) {
      setAccountResult(JSON.stringify({ error: "user id is required" }));
      return;
    }

    setAccountResult("Loading...");
    setCreatedAccount(null);
    const res = await fetch(`${bffUrl}/api/v1/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(showMockControls && smsScenario ? { "Mock-Scenario": smsScenario } : {}),
      },
      body: JSON.stringify({
        user_id: accountUserId,
        balance: parseFloat(balance),
        currency,
        phone,
      }),
    });
    const data = await parseResponse(res);
    if (res.ok && isAccountData(data)) {
      setAccountResult("");
      setCreatedAccount(data);
    } else {
      setAccountResult(profileErrorMessage(data));
    }
  }

  async function verifyProfile() {
    if (!profileUserId) {
      setProfileResult("User ID is required");
      return;
    }

    setProfileResult("Loading...");
    setProfileData(null);
    const res = await fetch(`${bffUrl}/api/v1/users/${profileUserId}`, {
      headers: showMockControls && profileScenario ? { "Mock-Scenario": profileScenario } : {},
    });
    const data = await parseResponse(res);
    if (res.ok && isProfileData(data)) {
      setProfileData(data);
      setProfileResult("");
    } else {
      setProfileResult(profileErrorMessage(data));
    }
  }

  async function updateUserStatus() {
    if (!updateUserId) {
      setUpdateUserResult(JSON.stringify({ error: "user id is required" }));
      return;
    }

    setUpdateUserResult("Loading...");
    setUpdatedUser(null);
    const res = await fetch(`${bffUrl}/api/v1/users/${updateUserId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updateStatus }),
    });
    const data = await parseResponse(res);
    if (res.ok && isUpdatedUser(data)) {
      setUpdateUserResult("");
      setUpdatedUser(data);
    } else {
      setUpdateUserResult(profileErrorMessage(data));
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
              <option value={MOCK_SCENARIO.USER.EMAIL_DUPLICATE}>{MOCK_SCENARIO.USER.EMAIL_DUPLICATE}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-create-user" onClick={createUser}>
          Create User
        </button>
        {createdUser && <UserSummary user={createdUser} testId="created-user-summary" />}
        {userResult && <p className="profile-result" data-testid="result-create-user">{userResult}</p>}
      </section>

      <section className="account-section" data-testid="section-create-account" id="section-create-account">
        <p className="eyebrow">Customer workspace</p>
        <h2>Create New Bank Account</h2>
        <label>
          User ID{" "}
          <select data-testid="input-user-id" value={accountUserId} onChange={(e) => setAccountUserId(e.target.value)}>
            <option value="" disabled>Select a user</option>
            {(showMockControls ? [...users, INVALID_USER_OPTION] : users).map((user) => (
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
            SMS Mock Scenario
            <select data-testid="select-sms-scenario" value={smsScenario} onChange={(e) => setSmsScenario(e.target.value)}>
              <option value={MOCK_SCENARIO.SMS.SUCCESS}>{MOCK_SCENARIO.SMS.SUCCESS}</option>
              <option value={MOCK_SCENARIO.SMS.INVALID_NUMBER}>{MOCK_SCENARIO.SMS.INVALID_NUMBER}</option>
              <option value={MOCK_SCENARIO.SMS.UNAVAILABLE}>{MOCK_SCENARIO.SMS.UNAVAILABLE}</option>
            </select>
          </label>
        )}
        <button data-testid="btn-create-account" onClick={createAccount} disabled={!bffUrl || !accountUserId}>
          Create Account
        </button>
        {createdAccount && (
          <div className="profile-summary account-summary" data-testid="created-account-summary">
            <div className="profile-summary-header">
              <div className="profile-customer">
                <strong>Bank account created</strong>
                <span className="profile-summary-id">Account ID: {createdAccount.id}</span>
              </div>
              <span className="profile-status">Active</span>
            </div>
            <dl className="profile-details">
              <div>
                <dt>User ID</dt>
                <dd>{createdAccount.user_id}</dd>
              </div>
              <div>
                <dt>Balance</dt>
                <dd>{createdAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</dd>
              </div>
            </dl>
          </div>
        )}
        {accountResult && <p className="profile-result" data-testid="result-create-account">{accountResult}</p>}
      </section>

      <section className="account-section profile-panel" data-testid="section-verify-profile" id="section-verify-profile">
        <h2>Get User Profile</h2>
        <label>
          User ID{" "}
          <select
            data-testid="select-profile-user-id"
            value={profileUserId}
            onChange={(e) => setProfileUserId(e.target.value)}
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
        <button data-testid="btn-verify-profile" onClick={verifyProfile} disabled={!bffUrl || !profileUserId}>
          Get User Profile
        </button>

        {profileData && (
          <div className="profile-summary" data-testid="profile-summary">
            <div className="profile-summary-header">
              <div className="profile-customer">
                <strong>{profileData.user.name}</strong>
                <span className="profile-summary-id">ID: {profileData.user.id}</span>
              </div>
              <span className="profile-status" data-testid="profile-status">{profileData.user.status}</span>
            </div>

            <dl className="profile-details">
              <div>
                <dt>Email</dt>
                <dd>{profileData.user.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{profileData.user.phone}</dd>
              </div>
            </dl>

            <div className="profile-accounts">
              <div className="profile-accounts-header">
                <h3>Accounts</h3>
                <span>{profileData.accounts.length} total</span>
              </div>
              {profileData.accounts.length > 0 ? (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Account ID</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileData.accounts.map((account) => (
                        <tr key={account.id}>
                          <td>{account.id}</td>
                          <td>{account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="profile-empty">No accounts found.</p>
              )}
            </div>
          </div>
        )}
        {profileResult ? (
          <p className="profile-result" data-testid="result-verify-profile">{profileResult}</p>
        ) : null}
      </section>

      <section className="account-section" data-testid="section-update-user" id="section-update-user">
        <p className="eyebrow">Customer workspace</p>
        <h2>Update User Status</h2>
        <label>
          User ID{" "}
          <select
            data-testid="select-update-user-id"
            value={updateUserId}
            onChange={(e) => setUpdateUserId(e.target.value)}
          >
            <option value="" disabled>Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.id})
              </option>
            ))}
          </select>
        </label>
        <label>
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
          disabled={!bffUrl || !updateUserId}
        >
          Update User Status
        </button>
        {updatedUser && (
          <UserSummary user={updatedUser} testId="updated-user-summary" />
        )}
        {updateUserResult && <p className="profile-result" data-testid="result-update-user-status">{updateUserResult}</p>}
      </section>
    </>
  );
}
