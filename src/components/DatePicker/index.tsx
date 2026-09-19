import type { ChangeEvent } from "react";

type TDatePickerProps = {
  date: string;
  setDate: (value: string) => void;
};

export const DatePicker = ({ date, setDate }: TDatePickerProps) => {
  const handleChange = (
    ev: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setDate(ev.target.value);
  };

  return <input type="date" value={date} onChange={handleChange}></input>;
};
