import styled from "styled-components";
import {
  addOneDayToDate,
  getTodayDate,
  subtractOneDayFromDate,
  toLocalDate,
} from "../../utils/lib";
import ArrowLeft from "../../assets/arrow-sm-left.svg";
import ArrowRight from "../../assets/arrow-sm-right.svg";

const StyledDatePicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 2rem;
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

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: black;
  border-radius: 2rem;
  box-shadow: 0px 0px 5px black;
  background-color: white;
  font-size: x-large;
  transition: 125ms;

  &:active {
    color: white;
    background-color: #c7d0dc;
  }
`;

const StyledIcon = styled.img`
  height: 30px;
  height: 30px;
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
        <StyledButton onClick={subtractDay}>
          <StyledIcon src={ArrowLeft} />
        </StyledButton>
        <StyledInput value={textToShow}></StyledInput>
        <StyledButton onClick={addDay}>
          <StyledIcon src={ArrowRight} />
        </StyledButton>
      </StyledDatePicker>
    </>
  );
};
