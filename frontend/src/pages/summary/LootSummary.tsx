import styled from "styled-components";
import { ItemCard } from "./components/ItemCard";
import Heading from "../../components/Heading";
import { EnrichedLootedItems } from "../types/enrichedDatabaseSession";

interface LootSummaryProps {
  lootedItems: EnrichedLootedItems[];
}

export function LootSummary({ lootedItems }: LootSummaryProps) {
  const sorted = lootedItems.sort((a, b) => b.npcValue - a.npcValue);
  return (
    <>
      <Heading as={"h3"}>Items</Heading>
      <Container>
        {sorted.map((item) => (
          <ItemCard key={item.name} item={item} />
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
