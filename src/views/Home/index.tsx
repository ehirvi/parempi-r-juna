import { useState } from "react";
import { type TTrainsQueryRow } from "../../graphql/GetTrainsQuery";
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

const toSortedByScheduledTime = (trains: TTrainsQueryRow[]) => {
  return trains.toSorted((prevTrain, nextTrain) => {
    const prevRow = prevTrain.timeTableRows.at(0);
    const nextRow = nextTrain.timeTableRows.at(0);
    if (!prevRow || !nextRow) {
      return 0;
    }

    const prevTimeInMs = Date.parse(prevRow.scheduledTime);
    const nextTimeInMs = Date.parse(nextRow.scheduledTime);

    return prevTimeInMs - nextTimeInMs;
  });
};

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

  const { type, destinationText, filterFn } = destinationConfig;

  const { trains, loading } = useGetTrains({
    date,
    type,
  });

  const handleCheckboxChange = () => {
    setShowOnlyFilteredRows((v) => !v);
  };

  const trainsToShow = toSortedByScheduledTime(
    filterFn(trains, showOnlyFilteredRows),
  );

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
