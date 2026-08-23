"use client";

import { useEffect, useState } from "react";
import { getJSBridge, isJSBridgeAvailable, NativeDeviceInfo, GeolocationResult } from "./lib/jsbridge";
import { parseResponse, useBffUrl } from "./lib/api";

export default function MobileWebViewPage() {
  const bffUrl = useBffUrl();
  const [hasBridge, setHasBridge] = useState<boolean>(false);
  const [deviceInfo, setDeviceInfo] = useState<NativeDeviceInfo | null>(null);
  
  // Transfer state
  const [transferAmount, setTransferAmount] = useState("500");
  const [toAccount, setToAccount] = useState("ACC-002");
  const [transferResult, setTransferResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // QR Code scan state
  const [qrResult, setQrResult] = useState<string>("");

  // Geolocation state
  const [geoResult, setGeoResult] = useState<GeolocationResult | null>(null);
  const [diagnosticMsg, setDiagnosticMsg] = useState<string>("");

  // Check bridge on load
  useEffect(() => {
    const bridgeAvailable = isJSBridgeAvailable();
    setHasBridge(bridgeAvailable);

    if (bridgeAvailable) {
      const bridge = getJSBridge();
      bridge?.getNativeDeviceInfo()
        .then((info) => setDeviceInfo(info))
        .catch(() => undefined);
    }
  }, []);

  // Biometric Pay Handler
  async function handleBiometricPay() {
    setIsProcessing(true);
    setTransferResult("Requesting biometric authentication...");

    const bridge = getJSBridge();
    let bioToken = "web-fallback-token";

    if (bridge) {
      try {
        const bioRes = await bridge.requestBiometricAuth({ prompt: `Authorize payment of ฿${transferAmount}` });
        if (!bioRes.success) {
          setTransferResult(`Biometric authentication failed: ${bioRes.error || "User cancelled"}`);
          setIsProcessing(false);
          return;
        }
        bioToken = bioRes.token || "bio-token-verified";
      } catch (err: any) {
        setTransferResult(`Bridge error: ${err?.message || "Unknown error"}`);
        setIsProcessing(false);
        return;
      }
    }

    // Call BFF API
    try {
      const res = await fetch(`${bffUrl}/api/v1/transfers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Biometric-Token": bioToken,
          ...(deviceInfo ? {
            "X-Device-ID": deviceInfo.deviceId,
            "X-Platform": deviceInfo.platform,
            "X-App-Version": deviceInfo.appVersion,
          } : {}),
        },
        body: JSON.stringify({
          amount: parseFloat(transferAmount),
          to_account: toAccount,
        }),
      });

      const data = await parseResponse(res);
      if (res.ok) {
        setTransferResult(`Transfer COMPLETED via Biometrics! TxID: ${data.id || data.transaction_id || "TX-SUCCESS"}`);
        bridge?.triggerHaptic("notificationSuccess").catch(() => undefined);
      } else {
        setTransferResult(`Transfer failed: ${data.error || res.statusText}`);
        bridge?.triggerHaptic("notificationError").catch(() => undefined);
      }
    } catch (err: any) {
      setTransferResult(`Network error: ${err?.message}`);
    } finally {
      setIsProcessing(false);
    }
  }

  // QR Scanner Handler
  async function handleScanQR() {
    const bridge = getJSBridge();
    if (!bridge) {
      setQrResult("JSBridge unavailable in standard browser");
      return;
    }

    try {
      const res = await bridge.scanQRCode();
      if (res.success && res.data) {
        setQrResult(`Scanned: ${res.data}`);
        // If scanned URL is formatted transfer://ACC-00X?amount=Y
        const match = res.data.match(/transfer:\/\/([A-Z0-9-]+)(\?amount=([0-9.]+))?/);
        if (match) {
          if (match[1]) setToAccount(match[1]);
          if (match[3]) setTransferAmount(match[3]);
        }
      } else {
        setQrResult(`Scan failed: ${res.error || "No data"}`);
      }
    } catch (err: any) {
      setQrResult(`Camera error: ${err?.message}`);
    }
  }

  // Geolocation Handler
  async function handleGetLocation() {
    const bridge = getJSBridge();
    if (!bridge) {
      setDiagnosticMsg("JSBridge geolocation requires mobile container");
      return;
    }
    try {
      const pos = await bridge.getGeolocation();
      setGeoResult(pos);
      setDiagnosticMsg(`Lat: ${pos.latitude.toFixed(4)}, Lon: ${pos.longitude.toFixed(4)} (±${pos.accuracy}m)`);
    } catch (err: any) {
      setDiagnosticMsg(`Location error: ${err?.message}`);
    }
  }

  // Native Toast Handler
  async function handleNativeToast() {
    const bridge = getJSBridge();
    if (!bridge) {
      alert("Mock Toast: JSBridge not detected");
      return;
    }
    await bridge.showToast({ message: "Native Notification Triggered!" });
    setDiagnosticMsg("Native toast displayed");
  }

  return (
    <div className="mobile-frame">
      {/* Mobile Top Bar */}
      <div className="status-bar">
        <span>09:41</span>
        <div className="notch">
          <div className="notch-camera"></div>
        </div>
        <span>5G 100%</span>
      </div>

      {/* Header */}
      <header className="webview-header">
        <p className="eyebrow">Mobile WebView • Hybrid App</p>
        <h1 className="app-title">Paotang Mini-App</h1>
        <div
          data-testid="bridge-status"
          className={`bridge-status-pill ${hasBridge ? "connected" : "disconnected"}`}
        >
          <span>{hasBridge ? "🟢 JSBridge Connected" : "🟡 Browser Fallback Mode"}</span>
        </div>
      </header>

      {/* Content Body */}
      <div className="content-scroll">
        {/* Native Device Info Card */}
        <section className="card" data-testid="section-device-info">
          <h2 className="card-title">📱 Native Container Info</h2>
          <div className="info-grid" data-testid="device-info-grid">
            <div className="info-item">
              <span className="info-label">Platform</span>
              <p className="info-val" data-testid="info-platform">{deviceInfo?.platform || "Web Browser"}</p>
            </div>
            <div className="info-item">
              <span className="info-label">App Version</span>
              <p className="info-val" data-testid="info-app-version">{deviceInfo?.appVersion || "1.0.0-web"}</p>
            </div>
            <div className="info-item">
              <span className="info-label">Device ID</span>
              <p className="info-val" data-testid="info-device-id">{deviceInfo?.deviceId || "BROWSER-CLIENT"}</p>
            </div>
            <div className="info-item">
              <span className="info-label">OS Version</span>
              <p className="info-val" data-testid="info-os-version">{deviceInfo?.osVersion || "HTML5/ES2024"}</p>
            </div>
          </div>
        </section>

        {/* Biometric Quick Pay & Transfer */}
        <section className="card" data-testid="section-biometric-pay">
          <h2 className="card-title">⚡ Biometric Quick Transfer</h2>
          
          <div className="form-group">
            <label className="form-label">To Account</label>
            <input
              data-testid="input-to-account"
              className="form-input"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              placeholder="e.g. ACC-002"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amount (THB)</label>
            <input
              data-testid="input-transfer-amount"
              type="number"
              className="form-input"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>

          <button
            data-testid="btn-biometric-pay"
            className="btn-primary"
            onClick={handleBiometricPay}
            disabled={isProcessing}
          >
            <span>👆 Authorize & Transfer</span>
          </button>

          {transferResult && (
            <div
              data-testid="result-biometric-pay"
              className={`result-box ${transferResult.includes("COMPLETED") ? "success" : transferResult.includes("failed") || transferResult.includes("Error") ? "error" : ""}`}
            >
              {transferResult}
            </div>
          )}
        </section>

        {/* QR Scanner & Camera */}
        <section className="card" data-testid="section-qr-scanner">
          <h2 className="card-title">📷 Native QR Camera</h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
            Invoke native scanner to automatically fill transfer payload.
          </p>
          <button
            data-testid="btn-scan-qr"
            className="btn-secondary"
            style={{ width: "100%" }}
            onClick={handleScanQR}
          >
            📸 Open Native QR Scanner
          </button>
          {qrResult && (
            <div data-testid="result-scan-qr" className="result-box">
              {qrResult}
            </div>
          )}
        </section>

        {/* Hardware Diagnostics */}
        <section className="card" data-testid="section-diagnostics">
          <h2 className="card-title">🛠️ Native Diagnostics</h2>
          <div className="action-row">
            <button data-testid="btn-get-geo" className="btn-secondary" onClick={handleGetLocation}>
              📍 Geolocation
            </button>
            <button data-testid="btn-toast" className="btn-secondary" onClick={handleNativeToast}>
              🔔 Native Toast
            </button>
          </div>
          {diagnosticMsg && (
            <div data-testid="result-diagnostics" className="result-box">
              {diagnosticMsg}
            </div>
          )}
        </section>
      </div>

      {/* Bottom Nav Bar */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <span>🏠</span>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <span>💳</span>
          <span>Cards</span>
        </div>
        <div className="nav-item">
          <span>📊</span>
          <span>History</span>
        </div>
      </nav>
    </div>
  );
}
