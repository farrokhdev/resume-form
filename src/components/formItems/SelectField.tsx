// "use client";
import React, { useState } from "react";
import { MenuItem, TextField, Select, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Controller } from "react-hook-form";

type Props = {
  label: string;
  selectItems?: any;
  control?: any;
  errors: any;
};

type selectItem = {
  val: string;
  name: string;
};
export const SelectField = (props: Props) => {
  const { label, selectItems, control, errors } = props;

  return (
    <FormControl fullWidth className="bg-white">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Controller
        name={
          label === "وضعیت نظام وظیفه"
            ? "militaryStatus"
            : label === "جنسیت"
              ? "gender"
              : "gender"
        }
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
          >
            {selectItems &&
              selectItems.map((item: selectItem, i: number) => {
                return (
                  <MenuItem value={item.val} key={i}>
                    {item.val}
                  </MenuItem>
                );
              })}
          </Select>
        )}
      />
      {errors[label === "وضعیت نظام وظیفه" ? "militaryStatus" : "gender"] && (
        <FormHelperText className="custom-error-message">
          {
            errors[label === "وضعیت نظام وظیفه" ? "militaryStatus" : "gender"]
              ?.message
          }
        </FormHelperText>
      )}
    </FormControl>
  );
};
