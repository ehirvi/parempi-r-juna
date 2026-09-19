import { useState } from "react";
import {
  useGetTrains,
  type TTrainsQueryRow,
} from "../../graphql/useGetTrains/useGetTrains";
import { CheckBox } from "../../components/CheckBox";

const getFirstStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(0)?.station.name.split(" ").at(0);
};

const getLastStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(-1)?.station.name.split(" ").at(0);
};

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

const toLocalTime = (row: TTrainsQueryRow) => {
  const scheduledTime = row.timeTableRows[0].scheduledTime;
  return new Date(scheduledTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const toISODate = (date: Date) => {
  return date.toISOString().split("T").at(0);
};

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

  const trainsFiltered = toFilteredByLastStation(trains, showOnlyFilteredRows);
  const trainsSorted = toSortedByScheduledTime(trainsFiltered);

  return (
    <>
      <CheckBox
        checked={showOnlyFilteredRows}
        handleChecked={handleCheckboxChange}
        label="Näytä vain Riihimäelle päättyvät R-junat"
      />
      <div>
        {trainsSorted.map((train, index) => (
          <p key={index}>
            {`${getFirstStationName(train)} ${toLocalTime(train)} ${getLastStationName(train)}`}
          </p>
        ))}
      </div>
    </>
  );
};
