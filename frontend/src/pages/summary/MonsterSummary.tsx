import styled from "styled-components";
import { MonsterCard } from "./components/MonsterCard";
import Heading from "../../components/Heading";

interface MonsterSummaryProps {
  killedMonsters: {
    count: number;
    name: string;
    hitPoints: number;
    experience: number;
  }[];
}

export function MonsterSummary({ killedMonsters }: MonsterSummaryProps) {
  const sorted = killedMonsters.sort((a, b) => b.count - a.count);
  return (
    <>
      <Heading as={"h3"}>Monsters</Heading>
      <Container>
        {sorted.map((m) => (
          <MonsterCard
            count={m.count}
            name={m.name}
            hp={m.hitPoints}
            exp={m.experience}
          />
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
`;
