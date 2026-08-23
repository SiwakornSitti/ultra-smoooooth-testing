export interface NativeDeviceInfo {
  platform: "iOS" | "Android" | "MockBridge";
  appVersion: string;
  deviceId: string;
  osVersion: string;
}

export interface BiometricResult {
  success: boolean;
  token?: string;
  error?: string;
}

export interface QRCodeResult {
  success: boolean;
  data?: string;
  error?: string;
}

export interface GeolocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface ToastOptions {
  message: string;
  duration?: "short" | "long";
}

export interface JSBridgeInterface {
  getNativeDeviceInfo(): Promise<NativeDeviceInfo>;
  requestBiometricAuth(options?: { prompt?: string }): Promise<BiometricResult>;
  scanQRCode(): Promise<QRCodeResult>;
  getGeolocation(): Promise<GeolocationResult>;
  showToast(options: ToastOptions): Promise<{ success: boolean }>;
  triggerHaptic(type?: "impactLight" | "notificationSuccess" | "notificationError"): Promise<{ success: boolean }>;
  closeWebView(): Promise<{ success: boolean }>;
}

declare global {
  interface Window {
    JSBridge?: JSBridgeInterface;
  }
}

export function isJSBridgeAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.JSBridge !== "undefined";
}

export function getJSBridge(): JSBridgeInterface | null {
  if (typeof window !== "undefined" && window.JSBridge) {
    return window.JSBridge;
  }
  return null;
}
