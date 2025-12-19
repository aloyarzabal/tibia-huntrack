import type { PostPayload } from "../pages/types/payloads";

export async function getAllSessions() {
  const res = await fetch("http://localhost:3000/sessions/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();

  return data;
}

export async function createSession(payload: PostPayload) {
  const res = await fetch("http://localhost:3000/sessions/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res;
}

export async function getSessionById(id: string) {
  const res = await fetch(`http://localhost:3000/sessions/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const { data } = await res.json();
  return data;
}

export async function previewSession(payload: PostPayload) {
  const res = await fetch("http://localhost:3000/sessions/preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res;
}
