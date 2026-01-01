import type { DatabasePayload } from "../types/payloads";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";

import { SessionsTable } from "./SessionsTable";

describe("SessionsTable", () => {
  const onRowClick = jest.fn();
  const sessions: DatabasePayload[] = [
    {
      session: {
        id: 64,
        characterId: 2,
        characterLevel: 336,
        balance: 102308,
        damage: 2027140,
        damagePerHour: 2027140,
        healing: 635648,
        healingPerHour: 635648,
        loot: 410744,
        rawXpGain: 1413395,
        rawXpHour: 1803355,
        supplies: 308436,
        xpGain: 2120092,
        xpHour: 2705033,
        sessionLength: "00:46h",
        sessionDate: "2025-12-17",
        sessionHour: "2025-12-17 11:04:00",
        killedMonsters: [
          {
            name: "stabilizing reality reaver",
            count: 368,
          },
          {
            name: "stabilizing dread intruder",
            count: 365,
          },
        ],
        lootedItems: [
          {
            name: "a gold coin",
            count: 33754,
          },
          {
            name: "a platinum coin",
            count: 1395,
          },
          {
            name: "a great spirit potion",
            count: 85,
          },
          {
            name: "a great mana potion",
            count: 73,
          },
          {
            name: "a blue crystal splinter",
            count: 46,
          },
          {
            name: "a small energy ball",
            count: 43,
          },
          {
            name: "a great health potion",
            count: 41,
          },
          {
            name: "strange proto matter",
            count: 35,
          },
          {
            name: "a violet crystal shard",
            count: 31,
          },
          {
            name: "condensed energy",
            count: 30,
          },
          {
            name: "solid rage",
            count: 29,
          },
          {
            name: "a small amethyst",
            count: 27,
          },
          {
            name: "plasma pearls",
            count: 27,
          },
          {
            name: "an ultimate health potion",
            count: 26,
          },
          {
            name: "a cyan crystal fragment",
            count: 24,
          },
          {
            name: "a glistening bone",
            count: 23,
          },
          {
            name: "a small sapphire",
            count: 20,
          },
          {
            name: "a small ruby",
            count: 20,
          },
          {
            name: "a red crystal fragment",
            count: 12,
          },
          {
            name: "a blue crystal shard",
            count: 7,
          },
          {
            name: "a red gem",
            count: 3,
          },
          {
            name: "a wand of starstorm",
            count: 3,
          },
          {
            name: "a violet gem",
            count: 2,
          },
        ],
        createdAt: "2025-12-17T14:49:51.278Z",
      },
      damage: {
        id: 19,
        sessionId: 64,
        receivedDamage: 953589,
        maxDps: 1906,
        createdAt: "2025-12-17T14:49:58.591Z",
        damageTypes: [
          {
            name: "Physical",
            amount: 564924,
            percentage: 59.2,
          },
          {
            name: "Energy",
            amount: 179961,
            percentage: 18.9,
          },
          {
            name: "Death",
            amount: 148139,
            percentage: 15.5,
          },
          {
            name: "Life Drain",
            amount: 60565,
            percentage: 6.4,
          },
        ],
        damageSources: [
          {
            name: "stabilizing reality reaver",
            amount: 475778,
            percentage: 49.9,
          },
          {
            name: "stabilizing dread intruder",
            amount: 474318,
            percentage: 49.7,
          },
          {
            name: "(other)",
            amount: 3493,
            percentage: 0.4,
          },
        ],
      },
    },
  ];

  function renderSubject() {
    render(<SessionsTable onRowClick={onRowClick} sessions={sessions} />);
  }

  it("renders the table", () => {
    renderSubject();

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
