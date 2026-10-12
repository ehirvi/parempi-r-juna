import type { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: black;
  border-radius: 2rem;
  box-shadow: 0px 0px 5px black;
  background-color: white;
  font-size: x-large;
  transition: 100ms;

  &:active {
    box-shadow: 0px 0px 2.5px black;
    transform: scale(0.95);
  }
`;

type TButtonProps = PropsWithChildren & {
  onClick: () => void;
};

export const Button = ({ onClick, children }: TButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
