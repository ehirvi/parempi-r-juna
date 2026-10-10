import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";

export const EDestinationType = {
  DEPARTURE: "DEPARTURE",
} as const;

export type EDestinationType =
  (typeof EDestinationType)[keyof typeof EDestinationType];

export type TDestinationFilterFunction = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => TTrainsQueryRow[];

export type TDisplayTextFunction = (train: TTrainsQueryRow) => string;

export interface ITrainDestinationConfig {
  type: EDestinationType;
  filterFn: TDestinationFilterFunction;
  filterName: string;
  displayTextFn: TDisplayTextFunction;
}
