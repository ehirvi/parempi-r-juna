import styled from "styled-components";

import ArrowsSwitch from "../../assets/arrows-switch.svg";
import { ETrainStation } from "../../utils/types";

const Stack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const StyledInput = styled.input.attrs({ type: "text", readOnly: true })`
  border: none;
  border-radius: 1rem;
  box-shadow: inset 0px 0px 4px black;
  padding: 0.2rem;
  font-size: large;
  text-align: center;
`;

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
  transition: 125ms;

  &:active {
    color: white;
    background-color: #c7d0dc;
  }
`;

const StyledIcon = styled.img`
  height: 30px;
  height: 30px;
`;

type TDestinationSwitcherProps = {
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<ETrainStation>>;
};

export const DestinationSwitcher = ({
  destination,
  setDestination,
}: TDestinationSwitcherProps) => {
  const switchDestination = () => {
    setDestination((value) =>
      value === ETrainStation.RIIHIMAKI
        ? ETrainStation.HELSINKI
        : ETrainStation.RIIHIMAKI,
    );
  };
  return (
    <Stack>
      <StyledInput value={destination} />
      <StyledButton onClick={switchDestination}>
        <StyledIcon src={ArrowsSwitch} />
      </StyledButton>
    </Stack>
  );
};
