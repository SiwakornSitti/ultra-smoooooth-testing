#!/usr/bin/env bash
# Verification helper script for Burp Suite MITM Proxy Lab

PROXY_HOST="127.0.0.1"
PROXY_PORT="8080"
BFF_TARGET="http://localhost:8080"

echo "========================================================"
echo "🧪 Burp Suite MITM Proxy Verification Helper"
echo "========================================================"

echo "Checking if Burp Suite proxy listener is running on ${PROXY_HOST}:${PROXY_PORT}..."
if nc -z -w 2 "$PROXY_HOST" "$PROXY_PORT" 2>/dev/null; then
    echo "✅ Burp Suite Proxy is running on ${PROXY_HOST}:${PROXY_PORT}"
else
    echo "⚠️ Burp Suite Proxy listener is NOT detected on ${PROXY_HOST}:${PROXY_PORT}."
    echo "   Ensure Burp Suite Community / Professional is open with Proxy listener active."
fi

echo ""
echo "Sending test request through proxy..."
echo "Command: curl -s -x http://${PROXY_HOST}:${PROXY_PORT} ${BFF_TARGET}/health"

RESPONSE=$(curl -s -x "http://${PROXY_HOST}:${PROXY_PORT}" "${BFF_TARGET}/health" 2>/dev/null)
if [ "$RESPONSE" = "OK" ]; then
    echo "✅ Successfully proxied request through Burp Suite! Response: ${RESPONSE}"
else
    echo "ℹ️ Direct request attempt without proxy fallback..."
    DIRECT_RESP=$(curl -s "${BFF_TARGET}/health" 2>/dev/null)
    echo "   Direct BFF Health Response: ${DIRECT_RESP:-'BFF service not reachable. Run docker compose up first.'}"
fi
