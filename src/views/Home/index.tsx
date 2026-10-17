import { useState } from "react";
import { getTodayDate } from "../../utils/lib";
import { TrainList } from "../../components/TrainList";
import styled from "styled-components";
import { DatePicker } from "../../components/DatePicker";
import { Switch } from "../../components/Switch";
import { ETrainStation } from "../../utils/types";
import { useGetTrains } from "../../hooks/useGetTrains";
import { useTrainDestinationConfig } from "../../hooks/useTrainDestinationConfig";
import { DestinationSwitcher } from "../../components/DestinationSwitcher";
import { EDestinationType } from "../../hooks/useTrainDestinationConfig/types";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: large;
`;

export const Home = () => {
  const [date, setDate] = useState(getTodayDate());
  const [destination, setDestination] = useState<ETrainStation>(
    ETrainStation.RIIHIMAKI,
  );
  const [showOnlyFilteredRows, setShowOnlyFilteredRows] = useState(true);

  const destinationConfig = useTrainDestinationConfig({
    destination,
  });

  const { type, destinationText, filterFn, sortingFn } = destinationConfig;

  const { trains, loading } = useGetTrains({
    date,
    type,
  });

  const handleCheckboxChange = () => {
    setShowOnlyFilteredRows((v) => !v);
  };

  const trainsToShow = sortingFn(filterFn(trains, showOnlyFilteredRows));

  return (
    <StyledHome>
      <DatePicker date={date} setDate={setDate} />
      <DestinationSwitcher
        destination={destinationText}
        setDestination={setDestination}
      />
      <Switch
        checked={showOnlyFilteredRows}
        handleChecked={handleCheckboxChange}
        label={
          type === EDestinationType.DEPARTURE
            ? "Näytä vain Riihimäelle päättyvät R-junat"
            : "Näytä vain Riihimäeltä lähtevät R-junat"
        }
      />
      <TrainList trains={trainsToShow} loading={loading} />
    </StyledHome>
  );
};
