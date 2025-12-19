import styled from "styled-components";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";

export function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-100);
  grid-row: 1 / -1;
  grid-column: 1;
`;
