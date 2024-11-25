import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";

// فعال کردن افزونه‌ی jalaliday برای dayjs
dayjs.extend(jalaliday);

export const PersianDatePicker: React.FC = () => {
  const [value, setValue] = useState<dayjs.Dayjs | null>(
    dayjs().calendar("jalali")
  );

  // تنظیم کمترین و بیشترین تاریخ
  const minDate = dayjs("1300-01-01", { jalali: true }); // سال 1300 شمسی
  const maxDate = dayjs("1450-12-29", { jalali: true }); // سال 1450 شمسی

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="fa"
      dateLibInstance={dayjs}
    >
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue?.calendar("jalali") || null)}
        views={["year", "month", "day"]}
        minDate={minDate} // تنظیم حداقل سال
        maxDate={maxDate} // تنظیم حداکثر سال
        className="w-full bg-white"
        renderInput={(params) => <input {...params} />}
        format="YYYY/MM/DD" // فرمت شمسی
      />
    </LocalizationProvider>
  );
};
