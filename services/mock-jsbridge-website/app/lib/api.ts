import { useEffect, useState } from "react";

export function useBffUrl(): string {
  const [bffUrl, setBffUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setBffUrl(data.bffUrl))
      .catch(() => setBffUrl("http://localhost:8080"));
  }, []);

  return bffUrl;
}

export async function parseResponse(res: Response): Promise<any> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
