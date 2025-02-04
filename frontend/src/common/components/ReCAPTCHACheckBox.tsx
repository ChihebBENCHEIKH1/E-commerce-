import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, Control } from "react-hook-form";
import { RECAPTCHA_SECRET_KEY } from "../../config/env";

interface props {
  name: string;
  control: Control<any>;
}

const ReCAPTCHACheckBox: React.FC<props> = ({ name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ReCAPTCHA
          {...field}
          sitekey={RECAPTCHA_SECRET_KEY}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default ReCAPTCHACheckBox;
