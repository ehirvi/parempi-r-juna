import styled from "styled-components";
import {
  addOneDayToDate,
  getTodayDate,
  subtractOneDayFromDate,
  toLocalDate,
} from "../../utils/lib";

const StyledDatePicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px black;
  padding: 0.5rem;
`;

const StyledInput = styled.input.attrs({ type: "text", readOnly: true })`
  border: none;
  border-radius: 0.5rem;
  box-shadow: inset 0px 0px 4px black;
  padding: 0.2rem;
  font-size: medium;
  text-align: center;
`;

const StyledButton = styled.button`
  border: none;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px black;
  background-color: white;
  font-size: larger;
  transition: 125ms;

  &:active {
    color: white;
    background-color: #6fa4e4;
  }
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
        <StyledButton onClick={subtractDay}>{"←"}</StyledButton>
        <StyledInput value={textToShow}></StyledInput>
        <StyledButton onClick={addDay}>{"→"}</StyledButton>
      </StyledDatePicker>
    </>
  );
};
