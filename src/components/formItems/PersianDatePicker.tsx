import React from "react";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";

type Props = {
  control: any;
  label: string;
  errors: any;
};

export const PersianDatePicker = (props: Props) => {
  const { control, label, errors } = props;

  return (
    <FormControl fullWidth className="bg-white">
      <InputLabel id="demo-simple-date-label">{label}</InputLabel>
      <Controller
        control={control}
        name="date"
        defaultValue=""
        render={({ field }) => (
          <>
            <DatePicker
              {...field}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-left"
              value={field.value}
              onChange={(date) =>
                field.onChange(date?.format("YYYY/MM/DD") || "")
              }
              id="demo-simple-date"
            />
            {errors.date && (
              <FormHelperText className="custom-error-message">
                {errors.date?.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};
