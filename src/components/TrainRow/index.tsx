import styled from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import ArrowRight from "../../assets/arrow-sm-right.svg";
import {
  getFirstStationName,
  getFirstStationScheduledTime,
  getLastStationName,
  getLastStationScheduledTime,
} from "../../utils/lib";

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0px 0px 5px black;
`;

const StyledIcon = styled.img`
  height: 30px;
  width: 30px;
`;

const StyledDisplayText = styled.div`
  display: flex;
  flex-direction: column;
`;

type TTrainRowProps = {
  train: TTrainsQueryRow;
};

type TStationDisplayTextConfig = Record<
  "first" | "last",
  {
    name: (train: TTrainsQueryRow) => string | undefined;
    scheduledTime: (train: TTrainsQueryRow) => string | undefined;
  }
>;

const stationDisplayTextConfig: TStationDisplayTextConfig = {
  first: {
    name: getFirstStationName,
    scheduledTime: getFirstStationScheduledTime,
  },
  last: {
    name: getLastStationName,
    scheduledTime: getLastStationScheduledTime,
  },
};

type TStationDisplayProps = TTrainRowProps & {
  config: TStationDisplayTextConfig[keyof TStationDisplayTextConfig];
};

const StationDisplay = ({ train, config }: TStationDisplayProps) => {
  const { name, scheduledTime } = config;

  return (
    <StyledDisplayText>
      <span>{name(train)}</span>
      <span>{scheduledTime(train)}</span>
    </StyledDisplayText>
  );
};

export const TrainRow = ({ train }: TTrainRowProps) => {
  const firstStationConfig = stationDisplayTextConfig.first;
  const lastStationConfig = stationDisplayTextConfig.last;

  return (
    <StyledRow>
      <StationDisplay train={train} config={firstStationConfig} />
      <StyledIcon src={ArrowRight} />
      <StationDisplay train={train} config={lastStationConfig} />
    </StyledRow>
  );
};
