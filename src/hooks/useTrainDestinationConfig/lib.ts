import type {
  TTrainsQueryRow,
  TTrainStationRow,
} from "../../graphql/GetTrainsQuery";
import {
  getFirstStationShortCode,
  getLastStationShortCode,
} from "../../utils/lib";
import { ETrainStation } from "../../utils/types";
import {
  EDestinationType,
  type TDepartureSortingFunction,
  type TDestinationFilterFunction,
} from "./types";

const toDefaultFiltered = (trains: TTrainsQueryRow[]) => {
  return trains.filter((train) => {
    const station = train.timeTableRows.find(
      (row) => row.station.shortCode === ETrainStation.RIIHIMAKI,
    );
    const isStopping = station?.trainStopping;
    return isStopping;
  });
};

const toFilteredByLastStation = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => {
  return filter
    ? trains.filter(
        (train) => getLastStationShortCode(train) === ETrainStation.RIIHIMAKI,
      )
    : toDefaultFiltered(trains);
};

const toFilteredByFirstStation = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => {
  return filter
    ? trains.filter(
        (train) => getFirstStationShortCode(train) === ETrainStation.RIIHIMAKI,
      )
    : toDefaultFiltered(trains);
};

const compareScheduledTimes = (
  first: TTrainStationRow,
  second: TTrainStationRow,
) => {
  const firstTimeInMs = Date.parse(first.scheduledTime);
  const secondTimeInMs = Date.parse(second.scheduledTime);

  return firstTimeInMs - secondTimeInMs;
};

const toSortedByDepartureFromFirstStation = (trains: TTrainsQueryRow[]) => {
  return trains.toSorted((prevTrain, nextTrain) => {
    const prevRow = prevTrain.timeTableRows.at(0);
    const nextRow = nextTrain.timeTableRows.at(0);
    if (!prevRow || !nextRow) {
      return 0;
    }

    return compareScheduledTimes(prevRow, nextRow);
  });
};

const toSortedByDepartureFromMiddleStation = (trains: TTrainsQueryRow[]) => {
  return trains.toSorted((prevTrain, nextTrain) => {
    const prevRow = prevTrain.timeTableRows.find(
      (row) => row.station.shortCode === ETrainStation.RIIHIMAKI,
    );
    const nextRow = nextTrain.timeTableRows.find(
      (row) => row.station.shortCode === ETrainStation.RIIHIMAKI,
    );
    if (!prevRow || !nextRow) {
      return 0;
    }

    return compareScheduledTimes(prevRow, nextRow);
  });
};

export const destinationTypeByStation: Record<ETrainStation, EDestinationType> =
  {
    [ETrainStation.RIIHIMAKI]: EDestinationType.DEPARTURE,
    [ETrainStation.HELSINKI]: EDestinationType.ARRIVAL,
  };

export const destinationNameByStation: Record<ETrainStation, string> = {
  [ETrainStation.RIIHIMAKI]: "Helsinki - Riihimäki",
  [ETrainStation.HELSINKI]: "Riihimäki - Helsinki",
};

export const destinationFilterFunctionByStation: Record<
  ETrainStation,
  TDestinationFilterFunction
> = {
  [ETrainStation.RIIHIMAKI]: toFilteredByLastStation,
  [ETrainStation.HELSINKI]: toFilteredByFirstStation,
};

export const departureSortingFunctionByStation: Record<
  ETrainStation,
  TDepartureSortingFunction
> = {
  [ETrainStation.RIIHIMAKI]: toSortedByDepartureFromFirstStation,
  [ETrainStation.HELSINKI]: toSortedByDepartureFromMiddleStation,
};
