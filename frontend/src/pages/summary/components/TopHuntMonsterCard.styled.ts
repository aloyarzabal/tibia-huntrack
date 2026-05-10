import styled from "styled-components";

export const TopCard = styled.div<PositionProps>`
  border: 1px solid ${(props) => positionColors[props.position] || defaultColor};
  border-radius: 10px;
  font-family: "Chakra Petch";
  padding: 1rem 2rem;
  box-shadow: 1px 2px 2px
    ${(props) => positionColors[props.position] || defaultColor};
`;
export const Section = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 0;
`;
export const GeneralStats = styled.div``;
export const ElementStats = styled.div``;
export const Stats = styled.div`
  padding-top: 0.4rem;
  display: flex;
  gap: 1.5rem;
`;
export const Stat = styled.div``;
export const Elements = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding-top: 0.5rem;
`;

export const Element = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const DivisionLine = styled.div`
  border-bottom: 1px solid #d3d3d35c;
`;

export const StatValue = styled.p`
  display: inline;
  font-size: 1.6rem;
  margin-left: 0.5rem;
`;

export const ElementValue = styled.p`
  display: inline;
  font-size: 1.1rem;
  margin-left: 0.5rem;
`;

export const Elims = styled.p`
  font-size: 4rem;
  text-align: center;
  font-weight: 600;
`;

export const Title = styled.p`
  font-size: 1.1rem;
  text-transform: uppercase;
`;

export const MonsterName = styled.h4`
  font-size: 1.7rem;
  text-transform: uppercase;
  font-weight: 600;
  color: black;
`;

export const StatIcon = styled.img`
  height: 1.2rem;
`;

export const ElementIcon = styled.img`
  height: 1.3rem;
`;

export const Img = styled.img`
  max-height: 60px;
`;

// export const PositionChip = styled.button`
//   width: fit-content;
//   font-size: 1rem;
//   display: flex;
//   padding: 0.6em 0.5rem;
//   gap: 0.4rem;
//   font-weight: bold;
//   border-radius: 5px;
//   text-shadow: 2px 2px 3px rgb(136 0 136 / 50%);
//   background: linear-gradient(15deg, #f09f33) no-repeat;
//   background-size: 300%;
//   color: #000;
//   border: none;
//   box-shadow: 0 30px 10px -20px rgba(0, 0, 0, 0.2);
//   align-items: center;

//   & svg {
//     width: 13px;
//     fill: black;
//   }
// `;

// 1. Definimos los colores por posición
export const positionColors: Record<number, string> = {
  1: "#FFD700", // Oro
  2: "#C0C0C0", // Plata
  3: "#CD7F32", // Bronce
};

export const defaultColor = "#d3d3d39c"; // Color para 4ª posición o más

interface PositionProps {
  position: number;
}

// 2. Creamos el styled component usando la prop
export const PositionChip = styled.button<PositionProps>`
  width: fit-content;
  font-size: 1rem;
  display: flex;
  padding: 0.6em 0.5rem;
  gap: 0.4rem;
  font-weight: bold;
  border-radius: 5px;
  text-shadow: 2px 2px 3px rgb(136 0 136 / 50%);

  /* Cambiamos el color dinámicamente */
  background: ${(props) =>
      `linear-gradient(15deg, ${positionColors[props.position] || defaultColor})`}
    no-repeat;

  background-size: 300%;
  color: #000;
  border: none;
  box-shadow: 0 30px 10px -20px rgba(0, 0, 0, 0.2);
  align-items: center;

  & svg {
    width: 13px;
    fill: black;
  }
`;
