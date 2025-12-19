import type { InputDamage } from "../../types/inputDamage";
import type { InputSession } from "../../types/inputSession";

// Gets a text copied from the game, divides it in lines and
// assigns the values to constants by iterating line per line.
// For the cases 'killedMonsters' and 'lootedItems' that return an array,
// will be necessary to change the mode in the iteration.
// The game returns the stats always with the same format.
//         **************************************
// Example:
// ...
// Supplies: 1,584
// Balance: 30,853
// Damage: 12,195
// Damage/h: 12,195
// ...
// Will return:
// {
//     ...
//     supplies: 1584,
//     balance: 30853,
//     damage: 12195,
//     damageHour: 12195,
//     ...
// }

export function parseSession(text: string): InputSession {
  // Divide in lines
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // CHECK 0: Cannot be empty
  if (lines.length === 0) {
    throw new Error("The text cannot be empty.");
  }

  // CHECK 1: Must have Session data
  const sessionDataLine = lines.find((l) => l.startsWith("Session data"));
  if (!sessionDataLine) {
    throw new Error("Invalid format");
  }

  // CHECK 2: Particular fields
  const hasAnyField =
    lines.some((l) => l.startsWith("Session:")) ||
    lines.some((l) => l.startsWith("Raw XP Gain")) ||
    lines.some((l) => l.startsWith("Killed Monsters")) ||
    lines.some((l) => l.startsWith("Looted Items")) ||
    lines.some((l) => l.startsWith("Damage")) ||
    lines.some((l) => l.startsWith("Healing"));

  if (!hasAnyField) {
    throw new Error("Invalid format. More fields are required.");
  }

  const session: InputSession = {
    sessionDate: new Date(),
    sessionLength: "",
    sessionHour: "",
    rawXpGain: 0,
    rawXpHour: 0,
    xpGain: 0,
    xpHour: 0,
    loot: 0,
    supplies: 0,
    balance: 0,
    damage: 0,
    damagePerHour: 0,
    healing: 0,
    healingPerHour: 0,
    killedMonsters: [],
    lootedItems: [],
  };

  let mode: "none" | "monsters" | "items" = "none";

  for (const line of lines) {
    // When edge cases are reached, the line contains no info,
    // so we can change the mode and 'continue' to the next line
    if (line.startsWith("Killed Monsters")) {
      mode = "monsters";
      continue;
    }
    if (line.startsWith("Looted Items")) {
      mode = "items";
      continue;
    }

    // This returns a long line with the starting and finishing date
    // with seconds precision, but only date is needed.
    if (line.startsWith("Session data")) {
      const match = line.match(/From\s([\d-]{10}),\s([\d:]{8})/);
      if (match) {
        session.sessionDate = new Date(match[1]);
        session.sessionHour = match[1] + " " + match[2];
      }
    }

    // When in 'monsters' mode, next lines are parsed and pushed to monsters array
    if (mode === "monsters") {
      const match = line.match(/^(\d+)x\s+(.+)$/);
      if (match) {
        session.killedMonsters.push({
          count: parseInt(match[1], 10),
          name: match[2],
        });
        continue;
      }
    }

    // When in 'items' mode, next lines are parsed and pushed to items array
    if (mode === "items") {
      const match = line.match(/^(\d+)x\s+(.+)$/);
      if (match) {
        session.lootedItems.push({
          count: parseInt(match[1], 10),
          name: match[2],
        });
        continue;
      }
    }

    // Parsing the rest of the fields
    const kv = line.match(/^(.+?):\s+(.*)$/);
    if (kv) {
      const key = kv[1].trim();
      const value = kv[2].trim().replace(/,/g, "");

      switch (key) {
        case "Session":
          session.sessionLength = value;
          break;
        case "Raw XP Gain":
          session.rawXpGain = Number(value);
          break;
        case "XP Gain":
          session.xpGain = Number(value);
          break;
        case "Raw XP/h":
          session.rawXpHour = Number(value);
          break;
        case "XP/h":
          session.xpHour = Number(value);
          break;
        case "Loot":
          session.loot = Number(value);
          break;
        case "Supplies":
          session.supplies = Number(value);
          break;
        case "Balance":
          session.balance = Number(value);
          break;
        case "Damage":
          session.damage = Number(value);
          break;
        case "Damage/h":
          session.damagePerHour = Number(value);
          break;
        case "Healing":
          session.healing = Number(value);
          break;
        case "Healing/h":
          session.healingPerHour = Number(value);
          break;
      }
    }
  }

  return session;
}

export function parseDamage(text: string): InputDamage {
  // Divide in lines
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // CHECK 0: Cannot be empty
  if (lines.length === 0) {
    throw new Error("The text cannot be empty.");
  }

  // CHECK 1: Must have Session data
  const receivedDamageLine = lines.find((l) => l.startsWith("Received Damage"));
  if (!receivedDamageLine) {
    throw new Error("Invalid format");
  }

  // CHECK 2: Particular fields
  const hasAnyField =
    lines.some((l) => l.startsWith("Total:")) ||
    lines.some((l) => l.startsWith("Max-DPS")) ||
    lines.some((l) => l.startsWith("Damage Types")) ||
    lines.some((l) => l.startsWith("Damage Sources"));

  if (!hasAnyField) {
    throw new Error("Invalid format. More fields are required.");
  }

  const result: InputDamage = {
    receivedDamage: 0,
    maxDps: 0,
    damageTypes: [],
    damageSources: [],
  };

  let mode: "none" | "types" | "sources" = "none";

  for (const line of lines) {
    // When edge cases are reached, the line contains no info,
    // so we can change the mode and 'continue' to the next line
    if (line.startsWith("Damage Types")) {
      mode = "types";
      continue;
    }
    if (line.startsWith("Damage Sources")) {
      mode = "sources";
      continue;
    }

    if (line.startsWith("Total:")) {
      result.receivedDamage = Number(
        line.replace("Total:", "").trim().replace(/,/g, "")
      );
      continue;
    }

    if (line.startsWith("Max-DPS:")) {
      result.maxDps = Number(
        line.replace("Max-DPS:", "").trim().replace(/,/g, "")
      );
      continue;
    }

    if (mode === "types" || mode === "sources") {
      // Ejemplo de formato:
      //   Physical 434,499 (71.9%)
      //   rot elemental 29,115 (4.8%)

      const match = line.match(/^(.+?)\s+([\d,]+)\s+\(([\d.]+)%\)$/);

      if (match) {
        const name = match[1].trim();
        const amount = Number(match[2].replace(/,/g, ""));
        const percentage = Number(match[3]);

        if (mode === "types") {
          result.damageTypes.push({ name, amount, percentage });
        } else {
          result.damageSources.push({ name, amount, percentage });
        }

        continue;
      }
    }
  }

  return result;
}
