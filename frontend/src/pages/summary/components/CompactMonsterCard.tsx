import styled from "styled-components";
import { monsterNameToImageUrl } from "../utils/monsterToUrl";

interface MonsterCardProps {
  monster: {
    count: number;
    name: string;
    bestiaryLevel: string;
    creatureClass: string;
    deathDmg: number;
    drownDmg: number;
    earthDmg: number;
    energyDmg: number;
    experience: number;
    fireDmg: number;
    hitPoints: number;
    holyDmg: number;
    hpDrainDmg: number;
    iceDmg: number;
    isBoss: boolean;
    physicalDmg: number;
    updatedAt: string;
  };
}

export function CompactMonsterCard({ monster }: MonsterCardProps) {
  const {
    name,
    count,
    hitPoints,
    experience,
    physicalDmg,
    holyDmg,
    fireDmg,
    iceDmg,
    earthDmg,
    energyDmg,
    deathDmg,
    drownDmg,
    hpDrainDmg,
  } = monster;
  return (
    <Card>
      <Section>
        <Img src={monsterNameToImageUrl(name)} alt={name} />
        <GeneralStats>
          <Name>{name}</Name>
          <Stats>
            <Stat>
              <StatIcon src="/Health_Icon.png" />
              <StatValue>{hitPoints}</StatValue>
            </Stat>
            <Stat>
              <StatIcon src="/experience_icon.png" />
              <StatValue>{experience}</StatValue>
            </Stat>
          </Stats>
        </GeneralStats>
      </Section>

      <DivisionLine />

      <Elims>{count}</Elims>
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid #d3d3d39c;
  border-radius: 10px;
  font-family: "Chakra Petch";
  padding: 1rem 1rem 0 1rem;
  box-shadow: 1px 2px 2px lightgray;
`;

const Section = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1.3rem 0;
`;

const GeneralStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
const Stat = styled.div`
  display: inline;
`;

const Name = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
`;
const StatValue = styled.p`
  display: inline;
  font-size: 1.1rem;
  color: gray;
  margin-left: 0.5rem;
`;

const Elims = styled.p`
  font-size: 3.5rem;
  text-align: center;
  font-weight: 600;
`;

const DivisionLine = styled.div`
  border-bottom: 1px solid #d3d3d35c;
`;

const StatIcon = styled.img`
  height: 1rem;
`;

const Img = styled.img`
  height: 45px;
`;
