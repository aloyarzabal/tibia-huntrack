import { buildTibiaWikiUrl } from "../buildTibiaWikiUrl";

export async function fetchFromTibiaWikia(
  name: string
): Promise<string | null> {
  const url = buildTibiaWikiUrl(name);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, { signal: controller.signal });

    clearTimeout(timeout);

    if (!res.ok) {
      // throw new Error(`TibiaWiki request failed with status ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (!data?.parse?.wikitext?.["*"]) {
      // throw new Error(`Wikitext not found for item "${name}"`);
      return null;
    }

    return data.parse.wikitext["*"];
  } catch (err) {
    console.warn(`[TibiaWikia Fetch Warning] Could not fetch "${name}"`);

    return null;
  }
}
