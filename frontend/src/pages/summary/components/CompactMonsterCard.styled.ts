import styled from "styled-components";

export const CompactCard = styled.div`
  border: 1px solid #d3d3d39c;
  border-radius: 10px;
  font-family: "Chakra Petch";
  padding: 1rem 1rem 0 1rem;
  box-shadow: 1px 2px 2px lightgray;
`;

export const Section = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1.3rem 0;
`;

export const GeneralStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
export const Stat = styled.div`
  display: inline;
`;

export const MonsterName = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
`;
export const StatValue = styled.p`
  display: inline;
  font-size: 1.1rem;
  color: gray;
  margin-left: 0.5rem;
`;

export const Elims = styled.p`
  font-size: 3.5rem;
  text-align: center;
  font-weight: 600;
`;

export const DivisionLine = styled.div`
  border-bottom: 1px solid #d3d3d35c;
`;

export const StatIcon = styled.img`
  height: 1rem;
`;

export const Img = styled.img`
  height: 45px;
`;
