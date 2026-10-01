import styled from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/useGetTrains/useGetTrains";
import { TrainRow } from "../TrainRow";

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: inset 0px 0px 10px black;
  width: 90%;
  height: 60dvh;
  overflow: scroll;

  :last-child {
    border-bottom: 0;
  }
`;

const StyledUnavailableText = styled.div`
  padding: 1rem;
`;

type TTrainListProps = {
  trains: TTrainsQueryRow[];
  loading: boolean;
};

export const TrainList = ({ trains, loading }: TTrainListProps) => {
  const noDataAvailable = !loading && trains.length === 0;

  return (
    <StyledList>
      {loading && (
        <StyledUnavailableText>Ladataan tietoja...</StyledUnavailableText>
      )}
      {noDataAvailable && (
        <StyledUnavailableText>Ei tietoja saatavilla</StyledUnavailableText>
      )}
      {trains.map((train) => (
        <TrainRow key={train.trainNumber} train={train} />
      ))}
    </StyledList>
  );
};
