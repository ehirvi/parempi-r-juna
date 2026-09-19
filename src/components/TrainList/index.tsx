import styled from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/useGetTrains/useGetTrains";
import { TrainRow } from "../TrainRow";

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  border-radius: 1rem;
  height: 50dvh;
  overflow: scroll;

  :last-child {
    border-bottom: 0;
  }
`;

type TTrainListProps = {
  trains: TTrainsQueryRow[];
};

export const TrainList = ({ trains }: TTrainListProps) => {
  return (
    <StyledList>
      {trains.map((train) => (
        <>
          <TrainRow key={train.trainNumber} train={train} />
        </>
      ))}
    </StyledList>
  );
};
