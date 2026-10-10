import styled from "styled-components";
import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import type { TDisplayTextFunction } from "../../hooks/useTrainDestinationConfig/types";

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid;
`;

type TTrainRowProps = {
  train: TTrainsQueryRow;
  displayTextFn: TDisplayTextFunction;
};

export const TrainRow = ({ train, displayTextFn }: TTrainRowProps) => {
  return <StyledRow>{displayTextFn(train)}</StyledRow>;
};
