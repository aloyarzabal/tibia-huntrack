import styled from "styled-components";
import { MdOutlinePlaylistAdd } from "react-icons/md";

interface TopSessionsProps {}

export function TopSessions() {
  return <StyledTopSession></StyledTopSession>;
}

const AddSessionButton = styled.button`
  width: 100%;
  height: 80px;
  font-size: 4rem;
  cursor: pointer;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-grey-200);
`;

const StyledTopSession = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 200px;
`;
