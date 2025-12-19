import styled from "styled-components";
import { LootSummary } from "./LootSummary";
import { MonsterSummary } from "./MonsterSummary";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { VscSave } from "react-icons/vsc";

import Heading from "../../components/Heading";

import type { DatabasePayload, InputPayload } from "../types/payloads";

interface SummaryViewProps {
  sessionToDisplay: DatabasePayload | InputPayload;
  onSave: () => void;
  isNewSession: boolean;
}

export function SummaryView({
  sessionToDisplay,
  onSave,
  isNewSession,
}: SummaryViewProps) {
  const { session, damage } = sessionToDisplay;
  const formatter = new Intl.NumberFormat("es-ES");

  return (
    <>
      <Header>
        <TfiLayoutListThumb />
        <Heading as={"h2"}>Summary</Heading>
      </Header>

      <SessionData>
        <SessionInfo>
          <InfoRow>
            <p>Session duration:</p>
            <b>{session.sessionLength}</b>
          </InfoRow>
          <InfoRow>
            <p>Balance:</p>
            <b
              style={{
                color:
                  session.balance >= 0
                    ? "var(--color-positive-balance)"
                    : "var(--color-negative-balance)",
              }}
            >
              {formatter.format(Number(session.balance))}
            </b>
            <Img src="./gold_coin.png"></Img>
          </InfoRow>
          <InfoRow>
            <p>XP gain:</p>
            <b>{formatter.format(Number(session.xpGain))}</b>
            <Img src="./xp_logo_original.png"></Img>
          </InfoRow>
          <InfoRow>
            <p>Damage/h:</p>
            <b>{formatter.format(Number(session.damagePerHour))}</b>
            <Img src="./sword_melee.png"></Img>
          </InfoRow>
        </SessionInfo>
        {damage && (
          <DamageInfo>
            {damage &&
              damage.damageTypes.map((type) => {
                const src = `./${type.name}.png`;
                return (
                  <InfoRow>
                    <Img src={src} />
                    <b>{formatter.format(Number(type.amount))}</b>
                    <p>({type.percentage}%)</p>
                  </InfoRow>
                );
              })}
          </DamageInfo>
        )}
      </SessionData>

      <Section>
        <MonsterSummary killedMonsters={session.killedMonsters} />
      </Section>

      <Section>
        <LootSummary lootedItems={session.lootedItems} />
      </Section>

      {isNewSession && (
        <SaveButton onClick={onSave}>
          <VscSave />
          Save
        </SaveButton>
      )}
    </>
  );
}

const SessionData = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const SessionInfo = styled.ul`
  border: 1px solid var(--border-summary-color);
  border-radius: var(--border-radius-lg);
  padding: 1.2rem;
`;

const InfoRow = styled.li`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-family: monospace;
`;

const DamageInfo = styled.ul`
  border: 1px solid var(--border-summary-color);
  border-radius: var(--border-radius-lg);
  padding: 1.2rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;

  & svg {
    font-size: 3rem;
    color: var(--color-yellow-700);
  }
`;

const Section = styled.div`
  padding: 1.1rem 1.4rem;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-200);
  margin: 2rem 0;
`;

const Img = styled.img`
  height: 1.2rem;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 80px;
  font-size: 4rem;
  cursor: pointer;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-grey-200);
`;
