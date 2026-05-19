import styled, { css } from "styled-components";
import { itemNameToImageUrl } from "../utils/itemToUrl";
import { EnrichedLootedItems } from "../../types/enrichedDatabaseSession";

interface ItemCardProps {
  item: EnrichedLootedItems;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card>
      <div>
        <ImageContainer price={item.npcValue}>
          <Img src={itemNameToImageUrl(item.name)} alt={item.name}></Img>
          <Count>x{item.count}</Count>
        </ImageContainer>
      </div>
      <TextContainer>
        <Name>{item.name}</Name>
        <PriceContainer>
          <ImgCoin src="/gold_coin.png" />
          <Price>{item.npcValue}</Price>
          {item.npcValue > 0 && (
            <Price>({(item.npcValue * item.count) / 1000}k)</Price>
          )}
        </PriceContainer>
        <Chip>{item.primaryType}</Chip>
      </TextContainer>
      <Bookmarks>
        {item.sellTo && item.sellTo[0] === "Rashid" && (
          <ImgBuyer src="/Rashid.png" />
        )}
        {item.sellTo &&
          (item.sellTo[0] === "Alesar" || item.sellTo[0] === "Yaman") && (
            <ImgBuyer src="/Green_Djinn.png" />
          )}
        {item.sellTo &&
          (item.sellTo[0] === "Nah'Bob" || item.sellTo[0] === "Haroun") && (
            <ImgBuyer src="/Blue_Djinn.png" />
          )}
        {item.sellTo && item.sellTo[0] === "Esrik;tomes-9" && (
          <ImgBuyer src="/Esrik.png" />
        )}
      </Bookmarks>
    </Card>
  );
}

const Card = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  position: relative;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-200);
  overflow: hidden;
  gap: 1rem;
`;

const ImageContainer = styled.div<{ price: number }>`
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-800);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => {
    if (props.price >= 1000000) {
      return css`
        border: 2px solid var(--color-price-veryhigh);
        box-shadow: var(--boxshadow-price-veryhigh);
      `;
    } else if (props.price >= 100000) {
      return css`
        border: 2px solid var(--color-price-high);
        box-shadow: var(--boxshadow-price-high);
      `;
    } else if (props.price >= 10000) {
      return css`
        border: 2px solid var(--color-price-med);
        box-shadow: var(--boxshadow-price-med);
      `;
    } else if (props.price >= 1000) {
      return css`
        border: 2px solid var(--color-price-low);
        box-shadow: var(--boxshadow-price-low);
      `;
    } else {
      return css`
        border: 2px solid var(--color-price-min);
        box-shadow: var(--boxshadow-price-min);
      `;
    }
  }};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bookmarks = styled.div`
  position: absolute;
  bottom: -10px;
  right: 0;
`;

const PriceContainer = styled.div`
  margin-bottom: 3px;
  line-height: 20px;
`;

const Count = styled.p`
  font-size: 1.2rem;
  font-family: "Chakra Petch";
  position: absolute;
  bottom: 0;
  left: 0;
  color: var(--color-grey-0);
  background-color: rgba(0, 0, 0, 0.65);
  padding: 0px 5px;
  border-radius: var(--border-radius-sm);
`;

const Name = styled.p`
  font-size: 1.1rem;
  font-family: "Arimo";
  text-transform: capitalize;
  color: var(--text-color);
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 1.1rem;
  display: inline-block;
  margin-left: 3px;
  color: var(--color-grey-600);
`;

const Img = styled.img`
  min-height: 45px;
`;

const ImgCoin = styled.img`
  height: 0.9rem;
`;

const ImgBuyer = styled.img`
  height: 25px;
  background: var(--color-grey-200);
  padding: 0px 3px;
  border-radius: 41%;
`;

const Chip = styled.p`
  font-size: 0.9rem;
  width: fit-content;
  border-radius: var(--border-radius-lg);
  padding: 0px 4px;
  background-color: var(--color-grey-200);
  color: var(--color-grey-400);
`;
