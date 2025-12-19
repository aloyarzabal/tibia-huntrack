import styled from "styled-components";
import { monsterNameToImageUrl } from "../utils/monsterToUrl";

interface MonsterCardProps {
  name: string;
  count: number;
  hp: number;
  exp: number;
}

export function MonsterCard({ name, count, hp, exp }: MonsterCardProps) {
  return (
    <Card>
      <Img src={monsterNameToImageUrl(name)} alt={name} />
      <Count>{count}</Count>
      <IconImg src="./Health_Icon.png"></IconImg>
      <Name>{hp}</Name>
      <IconImg src="./experience_icon.png"></IconImg>
      <Name>{exp}</Name>
      <Name>{name}</Name>
    </Card>
  );
}

const Card = styled.div`
  min-width: 60px;
  text-align: center;
  padding: 0.4rem 0.6rem;
  border-radius: 10%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  background: linear-gradient(transparent 20%, #a7961d 65%, transparent 102%);
`;

const Count = styled.p`
  padding: 1rem;
  margin: 0;
  font-size: 3.7rem;
  font-family: "Arimo", sans-serif;
  color: var(--color-grey-0);
`;

const Name = styled.p`
  margin: 0;
  font-size: 1.3rem;
  font-family: "Chakra Petch", sans-serif;
  text-transform: capitalize;
`;

const Img = styled.img`
  min-height: 40px;
`;
const IconImg = styled.img`
  height: 1.2rem;
`;
