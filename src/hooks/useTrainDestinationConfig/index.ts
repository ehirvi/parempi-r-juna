import { ETrainStation } from "../../utils/types";
import {
  departureSortingFunctionByStation,
  destinationFilterFunctionByStation,
  destinationNameByStation,
  destinationTypeByStation,
} from "./lib";
import type { ITrainDestinationConfig } from "./types";

type TTrainDestinationConfigProps = {
  destination: ETrainStation;
};

export const useTrainDestinationConfig = ({
  destination,
}: TTrainDestinationConfigProps) => {
  const config: ITrainDestinationConfig = {
    type: destinationTypeByStation[destination],
    destinationText: destinationNameByStation[destination],
    filterFn: destinationFilterFunctionByStation[destination],
    sortingFn: departureSortingFunctionByStation[destination],
  };

  return config;
};
