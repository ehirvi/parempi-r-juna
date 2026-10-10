import { gql, type TypedDocumentNode } from "@apollo/client";

type GetTrainsQuery = {
  trainsByDepartureDate: Array<{
    trainNumber: number;
    cancelled: boolean;
    timeTableRows: Array<{
      type: "DEPARTURE" | "ARRIVAL";
      station: {
        name: string;
        shortCode: string;
      };
      trainStopping: boolean;
      scheduledTime: string;
    }>;
  }>;
};

export type TTrainsQueryRow = GetTrainsQuery["trainsByDepartureDate"][number];

type GetTrainsQueryVariables = {
  date: string | undefined;
  type: string;
};

export const GetTrainsQuery: TypedDocumentNode<
  GetTrainsQuery,
  GetTrainsQueryVariables
> = gql`
  query GetTrains($date: Date!, $type: String!) {
    trainsByDepartureDate(
      departureDate: $date
      where: {
        commuterLineid: { equals: "R" }
        timeTableRows: {
          contains: {
            station: { shortCode: { equals: "HKI" } }
            type: { equals: $type }
          }
        }
      }
    ) {
      trainNumber
      cancelled
      timeTableRows(where: { trainStopping: { equals: true } }) {
        type
        station {
          name
          shortCode
        }
        trainStopping
        scheduledTime
      }
    }
  }
`;
