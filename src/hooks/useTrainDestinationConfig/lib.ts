import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
import {
  getFirstStationName,
  getLastStationName,
  getLastStationShortCode,
  toLocalTime,
} from "../../utils/lib";
import { ETrainStation } from "../../utils/types";
import { EDestinationType, type TDestinationFilterFunction, type TDisplayTextFunction } from "./types";

export const toFilteredByLastStation = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => {
  return filter
    ? trains.filter(
        (train) => getLastStationShortCode(train) === ETrainStation.RIIHIMAKI,
      )
    : trains;
};

export const getDisplayTextForDeparture = (train: TTrainsQueryRow) => {
  return `${getFirstStationName(train)} - ${toLocalTime(train)} - ${getLastStationName(train)}`;
};

export const destinationTypeByStation: Record<ETrainStation, string> = {
  [ETrainStation.RIIHIMAKI]: EDestinationType.DEPARTURE,
};

export const destinationFilterFunctionByStation: Record<
  ETrainStation,
  TDestinationFilterFunction
> = {
  [ETrainStation.RIIHIMAKI]: toFilteredByLastStation,
};

export const destinationFilterNameByStation: Record<ETrainStation, string> = {
  [ETrainStation.RIIHIMAKI]: "Helsinki - Riihimäki",
};

export const displayTextFunctionByStation: Record<
  ETrainStation,
  TDisplayTextFunction
> = {
  [ETrainStation.RIIHIMAKI]: getDisplayTextForDeparture,
};