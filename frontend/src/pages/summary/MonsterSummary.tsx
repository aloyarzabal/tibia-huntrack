import styled from "styled-components";
import { MonsterCard } from "./components/MonsterCard";
import Heading from "../../components/Heading";
import { CompactMonsterCard } from "./components/CompactMonsterCard";
import { TopHuntMonsterCard } from "./components/TopHuntMonsterCard";
import { Monster } from "./types/monster";

interface MonsterSummaryProps {
  killedMonsters: Monster[];
}

// TODO
// Calcular a partir de qué número debería ser TOP o COMPACT,
// de momento se queda "harcoded"

const MIN_AMOUNT = 80;

export function MonsterSummary({ killedMonsters }: MonsterSummaryProps) {
  const sortMonsters = () => {
    return killedMonsters.sort((a, b) => b.count - a.count);
  };

  const countKills = (monsters: Monster[]) => {
    return Object.values(monsters).reduce((acc, mon) => acc + mon.count, 0);
  };

  const sortedMonsters = sortMonsters();
  // const cuantos = countKills(sortedMonsters);

  // console.log(cuantos, sortedMonsters.length, cuantos / sortedMonsters.length);

  return (
    <>
      <Heading as={"h3"}>Monsters</Heading>
      <Container>
        {sortedMonsters.map((mons, i) =>
          mons.count > MIN_AMOUNT ? (
            <TopHuntMonsterCard monster={mons} position={i} />
          ) : (
            <CompactMonsterCard monster={mons} />
          ),
        )}
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
