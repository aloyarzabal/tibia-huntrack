export function itemNameToImageUrl(name: string) {
  // 1. lower-case
  let normalized = name.toLowerCase().trim();

  // 2. quitar artículos opcionales
  normalized = normalized.replace(/^(a |an |the )/g, "").replace(/'/g, "");

  // 3. reemplazar espacios por "_"
  normalized = normalized.replace(/\s+/g, "_");

  return `https://tibiopedia.pl/images/static/items/${normalized}.gif`;
}

export function itemNametoDataUrl(name: string) {
  // 1. lower-case
  let normalized = name.toLowerCase().trim();

  // 2. quitar artículos opcionales
  normalized = normalized.replace(/^(a |an |the )/g, "").replace(/'/g, "");

  const capitalized = normalized
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  const formattedName = capitalized.replace(/\s+/g, "_");

  return `https://tibia.fandom.com/api.php?action=parse&page=${formattedName}&format=json&prop=wikitext`;
}
