export interface ParsedItemData {
  npcValue: number;
  sellTo: string[] | null;
  imbuements: string[] | null;
  outfits: string[] | null;
}

export interface ItemCacheData {
  name: string;
  npcValue: number | null;
  sellTo: string[] | null;
  imbuements: string[] | null;
  outfits: string[] | null;
}
