import type { TTrainsQueryRow } from "../graphql/GetTrainsQuery";

export const getFirstStationShortCode = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(0)?.station.shortCode;
};

export const getLastStationShortCode = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(-1)?.station.shortCode;
};

export const getFirstStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(0)?.station.name.split(" ").at(0);
};

export const getLastStationName = (train: TTrainsQueryRow) => {
  return train.timeTableRows.at(-1)?.station.name.split(" ").at(0);
};

export const toLocalTime = (row: TTrainsQueryRow) => {
  const scheduledTime = row.timeTableRows[0].scheduledTime;
  return new Date(scheduledTime).toLocaleTimeString("fi", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
