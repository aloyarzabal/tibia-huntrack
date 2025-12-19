export type InputDamage = {
  receivedDamage: number;
  maxDps: number;

  damageTypes: { name: string; amount: number; percentage: number }[];
  damageSources: { name: string; amount: number; percentage: number }[];
};
