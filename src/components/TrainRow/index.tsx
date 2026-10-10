import styled from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import {
  getFirstStationName,
  getLastStationName,
  toLocalTime,
} from "../../utils/lib";

export const getDisplayTextForDirection = (train: TTrainsQueryRow) => {
  return `${getFirstStationName(train)} - ${toLocalTime(train)} - ${getLastStationName(train)}`;
};

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid;
`;

type TTrainRowProps = {
  train: TTrainsQueryRow;
};

export const TrainRow = ({ train }: TTrainRowProps) => {
  return <StyledRow>{getDisplayTextForDirection(train)}</StyledRow>;
};
