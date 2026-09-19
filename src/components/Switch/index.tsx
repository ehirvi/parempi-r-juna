import styled from "styled-components";

const Stack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Frame = styled.label<{ $checked: boolean }>`
  height: 20px;
  width: 40px;
  outline: 1px solid;
  border-radius: 1rem;
  position: relative;
  background-color: ${(props) => (props.$checked ? "#77e079" : "#e55e5e")};
`;

const StyledInput = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
`;

const Knob = styled.span<{ $checked: boolean }>`
  height: 16px;
  width: 16px;
  outline: 1px solid;
  position: absolute;
  border-radius: 1rem;
  transform: ${(props) =>
    props.$checked
      ? "translateX(22px) translateY(2px)"
      : "translateX(2px) translateY(2px)"};
  transition: transform 250ms;
  background-color: white;
  box-shadow: 0px 0px 5px 1px;
`;

type TSwitchProps = {
  checked: boolean;
  label: string;
  handleChecked: () => void;
};

export const Switch = ({ checked, label, handleChecked }: TSwitchProps) => {
  return (
    <Stack>
      <label>{label}</label>
      <Frame $checked={checked} onClick={handleChecked}>
        <StyledInput id="filter" checked={checked} />
        <Knob $checked={checked} />
      </Frame>
    </Stack>
  );
};
