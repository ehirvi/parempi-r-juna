import { useQuery } from "@apollo/client/react";
import { GetTrainsQuery } from "../graphql/GetTrainsQuery";
import type { EDestinationType } from "./useTrainDestinationConfig/types";

type TUseGetTrainsParams = {
  date: string | undefined;
  type: EDestinationType;
};

export const useGetTrains = ({ date, type }: TUseGetTrainsParams) => {
  const { loading, error, data } = useQuery(GetTrainsQuery, {
    variables: { date, type },
    skip: !date,
  });

  const trains = data?.trainsByDepartureDate ?? [];
  return { trains, loading, error };
};
