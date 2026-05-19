import { EnrichedKilledMonsters } from "../../types/enrichedDatabaseSession";
import { monsterNameToImageUrl } from "../utils/monsterToUrl";
import * as S from "./CompactMonsterCard.styled";

interface MonsterCardProps {
  monster: EnrichedKilledMonsters;
}

export function CompactMonsterCard({ monster }: MonsterCardProps) {
  const { name, count, hitPoints, experience } = monster;

  return (
    <S.CompactCard>
      <S.Section>
        <S.Img src={monsterNameToImageUrl(name)} alt={name} />
        <S.GeneralStats>
          <S.MonsterName>{name}</S.MonsterName>
          <S.Stats>
            <S.Stat>
              <S.StatIcon src="/Health_Icon.png" />
              <S.StatValue>{hitPoints}</S.StatValue>
            </S.Stat>
            <S.Stat>
              <S.StatIcon src="/experience_icon.png" />
              <S.StatValue>{experience}</S.StatValue>
            </S.Stat>
          </S.Stats>
        </S.GeneralStats>
      </S.Section>

      <S.DivisionLine />

      <S.Elims>{count}</S.Elims>
    </S.CompactCard>
  );
}
