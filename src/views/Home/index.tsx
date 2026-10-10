import { useState } from "react";
import { type TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import {
  // getFirstStationShortCode,
  getLastStationShortCode,
  getTodayDate,
} from "../../utils/lib";
import { TrainList } from "../../components/TrainList";
import styled from "styled-components";
import { DatePicker } from "../../components/DatePicker";
import { Switch } from "../../components/Switch";
import { ETrainStation } from "../../utils/types";
import { useGetTrains } from "../../hooks/useGetTrains";

// const toFilteredByFirstStation = (
//   trains: TTrainsQueryRow[],
//   filter: boolean,
// ) => {
//   return filter
//     ? trains.filter(
//         (train) => getFirstStationShortCode(train) === ETrainStation.RIIHIMAKI,
//       )
//     : trains;
// };

const toFilteredByLastStation = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => {
  return filter
    ? trains.filter(
        (train) => getLastStationShortCode(train) === ETrainStation.RIIHIMAKI,
      )
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

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: large;
`;

export const Home = () => {
  const [date, setDate] = useState(getTodayDate());
  const [showOnlyFilteredRows, setShowOnlyFilteredRows] = useState(true);

  const { trains, loading } = useGetTrains({ date });

  const handleCheckboxChange = () => {
    setShowOnlyFilteredRows((v) => !v);
  };

  const trainsToShow = toSortedByScheduledTime(
    toFilteredByLastStation(trains, showOnlyFilteredRows),
  );

  return (
    <StyledHome>
      <DatePicker date={date} setDate={setDate} />
      <Switch
        checked={showOnlyFilteredRows}
        handleChecked={handleCheckboxChange}
        label="Näytä vain Riihimäelle päättyvät R-junat"
      />
      <TrainList trains={trainsToShow} loading={loading} />
    </StyledHome>
  );
};
