import { useQuery } from "@apollo/client/react";
import { GetTrainsQuery } from "../graphql/GetTrainsQuery";

type TUseGetTrainsParams = {
  date: string | undefined;
};

export const useGetTrains = ({ date }: TUseGetTrainsParams) => {
  const { loading, error, data } = useQuery(GetTrainsQuery, {
    variables: { date },
    // skip: !date,
    skip: true,
  });

  const trains = data?.trainsByDepartureDate ?? [];
  return { trains, loading, error };
};
