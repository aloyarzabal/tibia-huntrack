export type DatabaseDamage = {
  id: number;
  sessionId: number;
  createdAt: string;
  receivedDamage: number;
  maxDps: number;

  damageTypes: { name: string; amount: number; percentage: number }[];
  damageSources: { name: string; amount: number; percentage: number }[];
};
