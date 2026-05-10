import { monsterNameToImageUrl } from "../utils/monsterToUrl";
import { Monster } from "../types/monster";
import * as S from "./TopHuntMonsterCard.styled";

interface MonsterCardProps {
  position: number;
  monster: Monster;
}

export function TopHuntMonsterCard({ monster, position }: MonsterCardProps) {
  const { name, count, hitPoints, experience } = monster;

  // TO DO
  // Hacer iterable los damages del monster (objeto, array),
  // renombrar las fotos con el mismo nombre que los items
  // de dentro del objeto.

  return (
    <S.TopCard position={position + 1}>
      <S.PositionChip position={position + 1}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
          <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
        </svg>
        #{position + 1}
      </S.PositionChip>
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

      <S.Section>
        <S.Elims>{count}</S.Elims>
        <S.DivisionLine />
        <S.ElementStats>
          <S.Elements>
            <S.Element>
              <S.ElementIcon src="/Physical.png"></S.ElementIcon>
              <S.ElementValue>{monster.physicalDmg}</S.ElementValue>
            </S.Element>

            <S.Element>
              <S.ElementIcon src="/Holy.png"></S.ElementIcon>
              <S.ElementValue>{monster.holyDmg}</S.ElementValue>
            </S.Element>

            <S.Element>
              <S.ElementIcon src="/Fire.png"></S.ElementIcon>
              <S.ElementValue>{monster.fireDmg}</S.ElementValue>
            </S.Element>

            <S.Element>
              <S.ElementIcon src="/Earth.png"></S.ElementIcon>
              <S.ElementValue>{monster.earthDmg}</S.ElementValue>
            </S.Element>

            <S.Element>
              <S.ElementIcon src="/Energy.png"></S.ElementIcon>
              <S.ElementValue>{monster.energyDmg}</S.ElementValue>
            </S.Element>

            <S.Element>
              <S.ElementIcon src="/Death.png"></S.ElementIcon>
              <S.ElementValue>{monster.deathDmg}</S.ElementValue>
            </S.Element>

            <S.Element>
              <S.ElementIcon src="/ice.png"></S.ElementIcon>
              <S.ElementValue>{monster.iceDmg}</S.ElementValue>
            </S.Element>

            <S.Element>
              <S.ElementIcon src="/Drowning.png"></S.ElementIcon>
              <S.ElementValue>{monster.drownDmg}</S.ElementValue>
            </S.Element>
          </S.Elements>
        </S.ElementStats>
      </S.Section>
    </S.TopCard>
  );
}
