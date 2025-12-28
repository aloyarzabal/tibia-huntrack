import { useEffect, useState } from "react";
import { getSessionById } from "../../api/apiSessions";
import type { DatabasePayload } from "../types/payloads";

export function useSession(id: string) {
  const [session, setSession] = useState<DatabasePayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSessionById(id)
      .then(setSession)
      .catch((err) => setError(err.message ?? "Unknow error"))
      .finally(() => setLoading(false));
  }, [id]);

  return { session, loading, error };
}
