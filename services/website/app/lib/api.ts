import { useEffect, useState } from "react";

// Backend error responses (e.g. http.Error in Go) are plain text, not JSON —
// fall back to raw text so the UI doesn't throw on non-JSON error bodies.
export async function parseResponse(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { status: res.status, body: text };
  }
}

// Runtime-fetched bff-service URL — see app/api/config/route.ts. Avoids
// baking a build-time NEXT_PUBLIC_* value in before the container's port is known.
export function useBffUrl() {
  const [bffUrl, setBffUrl] = useState("");

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((cfg) => setBffUrl(cfg.bffUrl));
  }, []);

  return bffUrl;
}
