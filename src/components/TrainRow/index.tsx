import styled from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/useGetTrains/useGetTrains";
import { getFirstStationName, getLastStationName } from "../../utils/lib";

const toLocalTime = (row: TTrainsQueryRow) => {
  const scheduledTime = row.timeTableRows[0].scheduledTime;
  return new Date(scheduledTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid;
`;

type TTrainRowProps = {
  train: TTrainsQueryRow;
};

export const TrainRow = ({ train }: TTrainRowProps) => {
  return (
    <StyledRow>{`${getFirstStationName(train)} - ${toLocalTime(train)} - ${getLastStationName(train)}`}</StyledRow>
  );
};
