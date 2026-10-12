import styled from "styled-components";

import ArrowsSwitch from "../../assets/arrows-switch.svg";
import { ETrainStation } from "../../utils/types";
import { Button } from "../Button";

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
      <Button onClick={switchDestination}>
        <StyledIcon src={ArrowsSwitch} />
      </Button>
    </Stack>
  );
};
