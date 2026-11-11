import styled, { keyframes } from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import { EDestinationType } from "../../hooks/useTrainDestinationConfig/types";
import { getStationName, toLocalTime } from "../../utils/lib";

const fadeInAnimation = keyframes`
  to {
      opacity: 1;
      scale: 1;
  }
`;

const StyledRow = styled.div<{ $animationIndex: number }>`
  font-size: smaller;
  opacity: 0;
  scale: 0;
  animation: ${fadeInAnimation} 200ms ease-out
    ${(props) => props.$animationIndex * 10}ms forwards;
`;

const StyledInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding-top: 1rem;
  border-top: 1px solid black;
`;

const stripDuplicatesFromRows = (
  trainStops: TTrainsQueryRow["timeTableRows"],
) => {
  const firstAndLastStripped = trainStops.slice(1, -1);
  const duplicatesStripped = firstAndLastStripped.filter(
    (stop) => stop.type === EDestinationType.ARRIVAL,
  );
  return duplicatesStripped;
};

type TFullTrainInfoProps = {
  trainStops: TTrainsQueryRow["timeTableRows"];
};

export const FullTrainInfo = ({ trainStops }: TFullTrainInfoProps) => {
  const strippedRows = stripDuplicatesFromRows(trainStops);
  return (
    <StyledInfoBox>
      {strippedRows.map((row, index) => (
        <StyledRow key={index} $animationIndex={index}>
          {getStationName(row)} - {toLocalTime(row.scheduledTime)}
        </StyledRow>
      ))}
    </StyledInfoBox>
  );
};
