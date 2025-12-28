import styled from "styled-components";

interface Props {
  onClick: () => void;
  text: string;
}

export function Button({ onClick, text }: Props) {
  return (
    <BoxButton onClick={onClick}>
      <StyledButton>
        <Span>{text}</Span>
      </StyledButton>
    </BoxButton>
  );
}

const BoxButton = styled.div`
  cursor: pointer;
  border: 4px solid black;
  background-color: gray;
  padding-bottom: 10px;
  transition: 0.1s ease-in-out;
  user-select: none;
  display: inline-block;

  &:active {
    padding: 0;
    margin-bottom: 10px;
    transform: translateY(10px);
  }
`;

const StyledButton = styled.button`
  background-color: #dddddd;
  border: 4px solid #fff;
  padding: 3px 8px;
`;

const Span = styled.span`
  font-size: 1.2em;
  letter-spacing: 1px;
`;
