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

// BFF URL resolved directly from environment variables
export function useBffUrl() {
  return (
    process.env.NEXT_PUBLIC_BFF_URL ||
    process.env.BFF_URL ||
    "http://localhost.com:8080"
  );
}

