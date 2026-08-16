import {
  useGetTrains,
  type TTrainsQueryRow,
} from "../../graphql/useGetTrains/useGetTrains";

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

const getFirstStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(0)?.station.name.split(" ").at(0);
};

const getLastStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(-1)?.station.name.split(" ").at(0);
};

const toLocalTime = (row: TTrainsQueryRow) => {
  const scheduledTime = row.timeTableRows[0].scheduledTime;
  return new Date(scheduledTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const Home = () => {
  const { trains, loading, error } = useGetTrains({ date: "2026-08-17" });

  const noDataAvailable = trains.length === 0 || error;

  if (loading) {
    return <p>loading...</p>;
  }

  if (noDataAvailable) {
    return <p>no data</p>;
  }

  const trainsSorted = toSortedByScheduledTime(trains);

  return (
    <div>
      {trainsSorted.map((train, index) => (
        <p key={index}>
          {`${getFirstStationName(train)} ${toLocalTime(train)} ${getLastStationName(train)}`}
        </p>
      ))}
    </div>
  );
};
