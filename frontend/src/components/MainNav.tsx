import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineQueryStats } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiCityLight } from "react-icons/pi";

export function MainNav() {
  return (
    <>
      <nav>
        <Ul>
          <li>
            <StyledNavLink to="/" aria-label="See the Dashboard">
              <MdOutlineDashboard />
              <NavText aria-hidden>Dashboard</NavText>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/sessions" aria-label="See the sessions">
              <MdOutlineQueryStats />
              <NavText aria-hidden>Sessions</NavText>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/stats" aria-label="See the stats">
              <IoStatsChartOutline />
              <NavText aria-hidden>Stats</NavText>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/raids" aria-label="See the raids">
              <PiCityLight />
              <NavText aria-hidden>Raids</NavText>
            </StyledNavLink>
          </li>
        </Ul>
      </nav>
    </>
  );
}

const NavText = styled.span`
  font-family: monospace;
  font-size: 2rem;
  font-weight: bolt;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;

  & li {
    list-style: none;
    padding: 0.3rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-500);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }
  & svg {
    font-size: 2.5rem;
    margin-right: 10px;
    vertical-align: sub;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-secondary-10);
    border-radius: var(--border-radius-sm);
    border-left: 3px solid #a1a1a1;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-grey-900);
    font-weight: bold;
  }
`;
