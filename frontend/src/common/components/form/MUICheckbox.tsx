import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { UseFormRegister, FieldValues, Controller } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  control: any;
  validationRules?: any;
}

const MUICheckbox: React.FC<Props> = ({
  label,
  name,
  control,
  validationRules = {},
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={false}
    rules={validationRules}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            checked={Boolean(field.value)}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        }
        label={label}
      />
    )}
  />
);

export default MUICheckbox;
