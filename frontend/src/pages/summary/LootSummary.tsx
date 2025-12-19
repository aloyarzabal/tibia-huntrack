import styled from "styled-components";
import { ItemCard } from "./components/ItemCard";
import Heading from "../../components/Heading";

interface LootSummaryProps {
  lootedItems: { count: number; name: string }[];
}

export function LootSummary({ lootedItems }: LootSummaryProps) {
  const sorted = lootedItems.sort((a, b) => b.count - a.count);
  return (
    <>
      <Heading as={"h3"}>Items</Heading>
      <Container>
        {sorted.map((item) => (
          <ItemCard count={item.count} name={item.name} />
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
