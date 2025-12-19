import styled from "styled-components";
import { itemNameToImageUrl } from "../utils/itemToUrl";

interface ItemCardProps {
  count: number;
  name: string;
}

export function ItemCard({ count, name }: ItemCardProps) {
  return (
    <Card>
      <ImageContainer>
        <Img src={itemNameToImageUrl(name)} alt={name}></Img>
      </ImageContainer>
      <TextContainer>
        <Name>{name}</Name>
        <Count>{count}</Count>
      </TextContainer>
    </Card>
  );
}

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: #000000b0;
  border-radius: var(--border-radius-sm);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const Card = styled.div`
  width: 200px;
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  background-color: #958e60;
  border-radius: var(--border-radius-sm);
`;

const Count = styled.p`
  margin: 0;
  font-size: 1.7rem;
  font-family: "Arimo", sans-serif;
  color: var(--color-grey-0);
  font-weight: bold;
`;

const Name = styled.p`
  margin: 0;
  font-size: 1.3rem;
  font-family: "Chakra Petch", sans-serif;
  text-transform: capitalize;
  color: white;
`;

const Img = styled.img`
  min-height: 45px;
`;
