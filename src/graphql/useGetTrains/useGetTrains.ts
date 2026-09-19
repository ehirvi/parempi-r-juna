import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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
};

const query: TypedDocumentNode<GetTrainsQuery, GetTrainsQueryVariables> = gql`
  query GetTrains($date: Date!) {
    trainsByDepartureDate(
      departureDate: $date
      where: {
        commuterLineid: { equals: "R" }
        timeTableRows: {
          contains: {
            station: { shortCode: { equals: "HKI" } }
            type: { equals: "DEPARTURE" }
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

type TUseGetTrainsParams = {
  date: string | undefined;
};

export const useGetTrains = ({ date }: TUseGetTrainsParams) => {
  const { loading, error, data } = useQuery(query, {
    variables: { date },
    skip: !date,
  });

  const trains = data?.trainsByDepartureDate ?? [];
  return { trains, loading, error };
};
