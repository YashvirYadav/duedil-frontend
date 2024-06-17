import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

type BasicDatePickerProps = {
  dateLabel: string;
  onDateChange: (date: Dayjs | null) => void;
};

export default function BasicDatePicker(props: BasicDatePickerProps) {
  const { dateLabel,onDateChange } = props;
  const [value, setValue] = React.useState<Dayjs | null>();

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={dateLabel}
          value={value}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
