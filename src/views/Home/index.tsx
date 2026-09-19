import { useState } from "react";
import {
  useGetTrains,
  type TTrainsQueryRow,
} from "../../graphql/useGetTrains/useGetTrains";
import { CheckBox } from "../../components/CheckBox";
import { getLastStationName } from "../../utils/lib";
import { TrainList } from "../../components/TrainList";
import styled from "styled-components";

const toFilteredByLastStation = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => {
  return filter
    ? trains.filter((train) => getLastStationName(train) === "Riihimäki")
    : trains;
};

const toSortedByScheduledTime = (trains: TTrainsQueryRow[]) => {
  return trains.toSorted((prevTrain, nextTrain) => {
    const prevRow = prevTrain.timeTableRows.at(0);
    const nextRow = nextTrain.timeTableRows.at(0);
    if (!prevRow || !nextRow) {
      return 0;
    }

    const prevTimeInMs = Date.parse(prevRow.scheduledTime);
    const nextTimeInMs = Date.parse(nextRow.scheduledTime);

    return prevTimeInMs - nextTimeInMs;
  });
};

const toISODate = (date: Date) => {
  return date.toISOString().split("T").at(0);
};

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Home = () => {
  const [date] = useState(toISODate(new Date(Date.now())));
  const [showOnlyFilteredRows, setShowOnlyFilteredRows] = useState(true);

  const { trains, loading, error } = useGetTrains({ date });

  const noDataAvailable = trains.length === 0 || error;

  const handleCheckboxChange = () => {
    setShowOnlyFilteredRows((v) => !v);
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (noDataAvailable) {
    return <p>no data</p>;
  }

  const trainsToShow = toSortedByScheduledTime(
    toFilteredByLastStation(trains, showOnlyFilteredRows),
  );

  return (
    <StyledHome>
      <CheckBox
        checked={showOnlyFilteredRows}
        handleChecked={handleCheckboxChange}
        label="Näytä vain Riihimäelle päättyvät R-junat"
      />
      <TrainList trains={trainsToShow} />
    </StyledHome>
  );
};
