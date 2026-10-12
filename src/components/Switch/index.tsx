import styled from "styled-components";

const Stack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Frame = styled.div<{ $checked: boolean }>`
  height: 30px;
  width: 60px;
  border-radius: 1rem;
  box-shadow: inset 0px 0px 5px black;
  position: relative;
  background-color: ${(props) => (props.$checked ? "#77e079" : "#e55e5e")};
  cursor: pointer;
`;

const StyledInput = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
  cursor: pointer;
`;

const Knob = styled.span<{ $checked: boolean }>`
  height: 26px;
  width: 26px;
  position: absolute;
  border-radius: 1rem;
  transform: ${(props) =>
    props.$checked
      ? "translateX(32px) translateY(2px)"
      : "translateX(2px) translateY(2px)"};
  transition: transform 250ms;
  background-color: white;
  box-shadow: 0px 0px 5px black;
`;

const StyledLabel = styled.label`
  font-size: medium;
`;

type TSwitchProps = {
  checked: boolean;
  label: string;
  handleChecked: () => void;
};

export const Switch = ({ checked, label, handleChecked }: TSwitchProps) => {
  return (
    <Stack>
      <StyledLabel>{label}</StyledLabel>
      <Frame $checked={checked} onClick={handleChecked}>
        <StyledInput id="filter" checked={checked} />
        <Knob $checked={checked} />
      </Frame>
    </Stack>
  );
};
