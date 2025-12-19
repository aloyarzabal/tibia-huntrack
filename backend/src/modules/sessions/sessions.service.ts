import * as sessionQueries from "../../db/queries/sessions";
import * as damageQueries from "../../db/queries/damageInputs";
import { enrichMonsters } from "../monsters/monsters.service";
import { PostDatabaseDamage, PostDatabaseSession } from "./sessions.types";
import { enrichItems } from "../items/items.service";

export async function createSessionAndEnrich(
  session: PostDatabaseSession,
  damage?: PostDatabaseDamage
) {
  const savedSession = await sessionQueries.createSession(session);

  if (!savedSession) return null;

  // const enrichedSession = getSessionWithDetails(savedSession);

  const enrichedSession = { ...savedSession };

  if (savedSession.lootedItems?.length) {
    enrichedSession.lootedItems = await enrichItems(savedSession.lootedItems);
  }

  if (savedSession.killedMonsters?.length) {
    enrichedSession.killedMonsters = await enrichMonsters(
      savedSession.killedMonsters
    );
  }

  let createdDamage = null;

  if (damage) {
    const newDamageInput: damageQueries.NewDamageInput = {
      ...damage,
      sessionId: enrichedSession.id,
    };

    const result = await damageQueries.createDamageInput(newDamageInput);
    createdDamage = result;
  }

  return { enrichedSession, createdDamage };
}

export async function getSessionById(id: string) {
  const found = await sessionQueries.getSessionById(+id);

  if (!found) return null;

  const enrichedSession = { ...found };

  if (found.lootedItems?.length) {
    enrichedSession.lootedItems = await enrichItems(found.lootedItems);
  }

  if (found.killedMonsters?.length) {
    enrichedSession.killedMonsters = await enrichMonsters(found.killedMonsters);
  }

  // const enrichedSession = getSessionWithDetails(found);

  return enrichedSession;
}

export async function getSessionWithDetails(
  session: PostDatabaseSession | sessionQueries.SelectSession
) {
  const enrichedSession = { ...session };

  if (session.lootedItems?.length) {
    enrichedSession.lootedItems = await enrichItems(session.lootedItems);
  }

  if (session.killedMonsters?.length) {
    enrichedSession.killedMonsters = await enrichMonsters(
      session.killedMonsters
    );
  }

  return enrichedSession;
}
