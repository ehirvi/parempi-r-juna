import { ETrainStation } from "../../utils/types";
import {
  destinationFilterFunctionByStation,
  destinationFilterNameByStation,
  destinationTypeByStation,
  displayTextFunctionByStation,
} from "./lib";
import type { ITrainDestinationConfig } from "./types";

type TTrainDestinationConfigProps = {
  destinationStation: ETrainStation;
};

export const useTrainDestinationConfig = ({
  destinationStation,
}: TTrainDestinationConfigProps) => {
  const config: ITrainDestinationConfig = {
    type: destinationTypeByStation[destinationStation],
    filterFn: destinationFilterFunctionByStation[destinationStation],
    filterName: destinationFilterNameByStation[destinationStation],
    displayTextFn: displayTextFunctionByStation[destinationStation],
  };

  return config;
};
