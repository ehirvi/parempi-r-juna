import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import {
  getFirstStationShortCode,
  getLastStationShortCode,
} from "../../utils/lib";
import { ETrainStation } from "../../utils/types";
import { EDestinationType, type TDestinationFilterFunction } from "./types";

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

const toFilteredByFirstStation = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => {
  return filter
    ? trains.filter(
        (train) => getFirstStationShortCode(train) === ETrainStation.RIIHIMAKI,
      )
    : trains;
};

export const destinationTypeByStation: Record<ETrainStation, EDestinationType> =
  {
    [ETrainStation.RIIHIMAKI]: EDestinationType.DEPARTURE,
    [ETrainStation.HELSINKI]: EDestinationType.ARRIVAL,
  };

export const destinationFilterFunctionByStation: Record<
  ETrainStation,
  TDestinationFilterFunction
> = {
  [ETrainStation.RIIHIMAKI]: toFilteredByLastStation,
  [ETrainStation.HELSINKI]: toFilteredByFirstStation,
};

export const destinationNameByStation: Record<ETrainStation, string> = {
  [ETrainStation.RIIHIMAKI]: "Helsinki - Riihimäki",
  [ETrainStation.HELSINKI]: "Riihimäki - Helsinki",
};
