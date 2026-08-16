import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const query = gql`
  query GetTrains {
    trainsByDepartureDate(
      departureDate: "2026-08-17"
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

const toLocalTime = (row: string) => {
  return new Date(row).toLocaleTimeString();
};

export const Home = () => {
  const { loading, error, data } = useQuery(query);

  if (loading || error) {
    return <p>no data</p>;
  }

  const rows = ((data as any).trainsByDepartureDate as Array<any>).map(
    (row) => row.timeTableRows[0].scheduledTime as string,
  );

  return (
    <div>
      {rows.map((row, index) => (
        <p key={index}>{toLocalTime(row)}</p>
      ))}
    </div>
  );
};
