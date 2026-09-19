import type { TTrainsQueryRow } from "../graphql/useGetTrains/useGetTrains";

export const getFirstStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(0)?.station.name.split(" ").at(0);
};

export const getLastStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(-1)?.station.name.split(" ").at(0);
};
