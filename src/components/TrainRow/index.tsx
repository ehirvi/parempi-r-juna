import styled, { keyframes } from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import ArrowRight from "../../assets/arrow-sm-right.svg";
import {
  getFirstStationName,
  getFirstStationScheduledTime,
  getFirstStationShortCode,
  getLastStationName,
  getLastStationScheduledTime,
  getLastStationShortCode,
  getMiddleStationName,
  getMiddleStationScheduledTime,
} from "../../utils/lib";
import { ETrainStation } from "../../utils/types";

const fadeInAnimation = keyframes`
  from {
    transform: translateY(-25%);
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const StyledRow = styled.div<{ $animationIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0px 0px 5px black;
  opacity: 0;
  animation: ${fadeInAnimation} 200ms ease-out
    ${(props) => props.$animationIndex * 25}ms forwards;
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
  animationIndex: number;
};

type TStationDisplayTextConfig = Record<
  "first" | "middle" | "last",
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
  middle: {
    name: getMiddleStationName,
    scheduledTime: getMiddleStationScheduledTime,
  },
  last: {
    name: getLastStationName,
    scheduledTime: getLastStationScheduledTime,
  },
};

type TStationDisplayProps = Omit<TTrainRowProps, "animationIndex"> & {
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

export const TrainRow = ({ train, animationIndex }: TTrainRowProps) => {
  const firstStationConfig = stationDisplayTextConfig.first;
  const middleStationConfig = stationDisplayTextConfig.middle;
  const lastStationConfig = stationDisplayTextConfig.last;

  const showMiddleStation =
    getFirstStationShortCode(train) !== ETrainStation.RIIHIMAKI &&
    getLastStationShortCode(train) !== ETrainStation.RIIHIMAKI;

  return (
    <StyledRow $animationIndex={animationIndex}>
      <StationDisplay train={train} config={firstStationConfig} />
      <StyledIcon src={ArrowRight} />
      {showMiddleStation && (
        <>
          <StationDisplay train={train} config={middleStationConfig} />
          <StyledIcon src={ArrowRight} />
        </>
      )}
      <StationDisplay train={train} config={lastStationConfig} />
    </StyledRow>
  );
};
