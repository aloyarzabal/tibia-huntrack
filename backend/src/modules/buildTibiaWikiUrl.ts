function normalizeTibiaName(name: string): string {
  if (!name) return "";

  return name.trim().replace(/^(a|an)\s+/i, "");
}

function formatTibiaWikiName(name: string): string {
  if (!name) return "";

  const normalized = normalizeTibiaName(name);

  return normalized
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("_");
}

export function buildTibiaWikiUrl(name: string): string {
  const formattedName = formatTibiaWikiName(name);

  return `https://tibia.fandom.com/api.php?action=parse&page=${formattedName}&format=json&prop=wikitext`;
}
