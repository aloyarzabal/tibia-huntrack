import styled from "styled-components";

export function Logo() {
  return (
    <StyledLogo>
      <Img src="./ferumbras.png" alt="App's logo"></Img>
      <AppName> Tibia Huntrack</AppName>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  position: absolute;
  top: 10px;
`;

const Img = styled.img`
  height: 10rem;
`;

const AppName = styled.h2`
  font-size: 1.7rem;
  text-transform: uppercase;
  font-weight: lighter;
  color: #ada8a8;
  letter-spacing: -2px;
`;
