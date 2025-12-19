import styled from "styled-components";
import { monsterNameToImageUrl } from "../summary/utils/monsterToUrl";
import Heading from "../../components/Heading";
import type { DatabasePayload } from "../types/payloads";

interface LastSessionsProps {
  sessions?: DatabasePayload[];
  setSessionId: (id: number) => void;
}
export function LastSessions({ sessions, setSessionId }: LastSessionsProps) {
  const formatter = new Intl.NumberFormat("es-ES");

  return (
    <StyledLastSessions>
      <Heading as={"h2"}>Last sessions</Heading>
      <SessionCards>
        {sessions &&
          sessions.map(({ session, damage }) => (
            <Card key={session.id} onClick={() => setSessionId(session.id)}>
              <Monsters>
                {session.killedMonsters.slice(0, 3).map((monster) => {
                  return (
                    <Monster
                      key={monster.name}
                      src={monsterNameToImageUrl(monster.name)}
                      alt={monster.name}
                    />
                  );
                })}
              </Monsters>
              <Balance isPositive={session.balance >= 0}>
                <Img src="./crystal_coin_max.png" alt="logo"></Img>
                {formatter.format(session.balance)}
              </Balance>
              <Experience>
                <Img src="./xp_logo_original.png" alt="logo"></Img>
                {formatter.format(session.xpGain)}
              </Experience>
            </Card>
          ))}
      </SessionCards>
    </StyledLastSessions>
  );
}
const StyledLastSessions = styled.div``;

const SessionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 5rem 0;
`;

const Card = styled.div`
  width: 235px;
  text-align: center;
  box-shadow: var(--color-grey-300) 4px 4px;
  padding: 1.4rem 2.6rem;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
`;

interface ValueProps {
  isPositive: boolean;
}
const Balance = styled.p<ValueProps>`
  font-size: 2.3rem;
  font-family: "Arimo", sans-serif;
  color: ${(props) =>
    props.isPositive ? "var(--color-green-700)" : "var(--color-red-700)"};
`;

const Experience = styled.p`
  font-size: 2.3rem;
  font-family: "Arimo", sans-serif;
`;

const Monster = styled.img`
  height: 4rem;
  margin: 0 5px;
`;

const Monsters = styled.div`
  margin: 2rem 0;
`;

const Img = styled.img`
  height: 2.5rem;
  margin: 0 5px;
`;
