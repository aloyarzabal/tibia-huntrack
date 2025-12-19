export function monsterNameToImageUrl(name: string) {
  // 1. lower-case
  let normalized = name.toLowerCase().trim();

  // 2. quitar artículos opcionales
  normalized = normalized.replace(/^(a |an |the )/g, "");

  // 3. reemplazar espacios por "_"
  normalized = normalized.replace(/\s+/g, "_");

  return `https://tibiopedia.pl/images/static/monsters/${normalized}.gif`;
}
