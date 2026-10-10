import type { TTrainsQueryRow } from "../../graphql/GetTrainsQuery";

export const EDestinationType = {
  DEPARTURE: "DEPARTURE",
  ARRIVAL: "ARRIVAL",
} as const;

export type EDestinationType =
  (typeof EDestinationType)[keyof typeof EDestinationType];

export type TDisplayTextFunction = (train: TTrainsQueryRow) => string;

export type TDestinationFilterFunction = (
  trains: TTrainsQueryRow[],
  filter: boolean,
) => TTrainsQueryRow[];

export interface ITrainDestinationConfig {
  type: EDestinationType;
  destinationText: string;
  filterFn: TDestinationFilterFunction;
}
