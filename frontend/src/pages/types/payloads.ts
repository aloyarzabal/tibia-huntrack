import type { DatabaseDamage } from "./databaseDamage";
import type { DatabaseSession } from "./databaseSession";
import type { EnrichedDatabaseDamage } from "./enrichedDatabaseDamage";
import type { EnrichedDatabaseSession } from "./enrichedDatabaseSession";
import type { InputDamage } from "./inputDamage";
import type { InputSession } from "./inputSession";
import type { PostDamage } from "./postDamage";
import type { PostSession } from "./postSession";

export type DatabasePayload = {
  session: DatabaseSession;
  damage?: DatabaseDamage;
};

export type EnrichedDatabasePayload = {
  session: EnrichedDatabaseSession;
  damage?: EnrichedDatabaseDamage;
};

export type PostPayload = {
  session: PostSession;
  damage?: PostDamage | null;
};

export type InputPayload = {
  session: InputSession;
  damage?: InputDamage | null;
};
