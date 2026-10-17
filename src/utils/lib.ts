import type { TTrainsQueryRow } from "../graphql/GetTrainsQuery";
import { ETrainStation } from "./types";

export const getFirstStationShortCode = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(0)?.station.shortCode;
};

export const getLastStationShortCode = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(-1)?.station.shortCode;
};

export const getFirstStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(0)?.station.name.split(" ").at(0);
};

export const getMiddleStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows
    .find((rows) => rows.station.shortCode === ETrainStation.RIIHIMAKI)
    ?.station.name.split(" ")
    .at(0);
};

export const getLastStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(-1)?.station.name.split(" ").at(0);
};

export const toLocalTime = (time: string) => {
  return new Date(time).toLocaleTimeString("fi", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getFirstStationScheduledTime = (train: TTrainsQueryRow) => {
  const scheduledTime = train.timeTableRows.at(0)?.scheduledTime;
  return scheduledTime ? toLocalTime(scheduledTime) : undefined;
};

export const getMiddleStationScheduledTime = (train: TTrainsQueryRow) => {
  const scheduledTime = train.timeTableRows.find(
    (row) => row.station.shortCode === ETrainStation.RIIHIMAKI,
  )?.scheduledTime;
  return scheduledTime ? toLocalTime(scheduledTime) : undefined;
};

export const getLastStationScheduledTime = (train: TTrainsQueryRow) => {
  const scheduledTime = train.timeTableRows.at(-1)?.scheduledTime;
  return scheduledTime ? toLocalTime(scheduledTime) : undefined;
};

export const toISODate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const toLocalDate = (date: string) => {
  const localDate = new Date(date).toLocaleDateString("fi", {
    dateStyle: "long",
  });
  return localDate;
};

export const getTodayDate = () => {
  return toISODate(new Date(Date.now()));
};

export const subtractOneDayFromDate = (date: string) => {
  const currentDate = new Date(date);
  const updatedDate = currentDate.getDate() - 1;
  currentDate.setDate(updatedDate);
  return toISODate(currentDate);
};

export const addOneDayToDate = (date: string) => {
  const currentDate = new Date(date);
  const updatedDate = currentDate.getDate() + 1;
  currentDate.setDate(updatedDate);
  return toISODate(currentDate);
};
