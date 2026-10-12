import styled from "styled-components";
import {
  addOneDayToDate,
  getTodayDate,
  subtractOneDayFromDate,
  toLocalDate,
} from "../../utils/lib";
import ArrowLeft from "../../assets/arrow-sm-left.svg";
import ArrowRight from "../../assets/arrow-sm-right.svg";
import { Button } from "../Button";

const StyledDatePicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 2rem;
  background-color: white;
  box-shadow: 0px 0px 5px black;
  padding: 0.5rem;
`;

const StyledInput = styled.input.attrs({ type: "text", readOnly: true })`
  border: none;
  border-radius: 1rem;
  box-shadow: inset 0px 0px 4px black;
  padding: 0.2rem;
  font-size: large;
  text-align: center;
`;

const StyledIcon = styled.img`
  height: 30px;
  width: 30px;
`;

type TDatePickerProps = {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

export const DatePicker = ({ date, setDate }: TDatePickerProps) => {
  const subtractDay = () => {
    setDate((v) => subtractOneDayFromDate(v));
  };

  const addDay = () => {
    setDate((v) => addOneDayToDate(v));
  };

  const today = getTodayDate();
  const tomorrow = addOneDayToDate(today);
  const isToday = date === today;
  const isTomorrow = date === tomorrow;
  const textToShow = isToday
    ? "Tänään"
    : isTomorrow
      ? "Huomenna"
      : toLocalDate(date);

  return (
    <>
      <StyledDatePicker>
        <Button onClick={subtractDay}>
          <StyledIcon src={ArrowLeft} />
        </Button>
        <StyledInput value={textToShow}></StyledInput>
        <Button onClick={addDay}>
          <StyledIcon src={ArrowRight} />
        </Button>
      </StyledDatePicker>
    </>
  );
};
