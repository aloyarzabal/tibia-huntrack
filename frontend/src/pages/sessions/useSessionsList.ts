import { useState, useEffect } from "react";
import type { DatabasePayload } from "../types/payloads";
import { fetchSessions } from "../../api/apiSessions";

export function useSessionsList() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<DatabasePayload[]>([]);

  useEffect(() => {
    fetchSessions()
      .then(setSessions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { sessions, loading, error };
}
