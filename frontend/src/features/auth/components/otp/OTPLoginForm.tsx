import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MuiOtpInput } from "mui-one-time-password-input";

import { useNavigate } from "react-router-dom";
import {
  getIsAuthenticated,
  getTokenStatus,
} from "../../selectors/AuthSelector";
import { verifyOtp } from "../../thunks/AuthThunk";

const FormContainer = styled.div`
  padding: 2rem;
  text-align: center;
  max-width: 670px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const FormTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
`;

const SubmitButton = styled(Button)`
  background-color: #d32f2f;
  &:hover {
    background-color: #b71c1c;
  }
  margin-bottom: 16px;
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const OTP_LENGTH = 6;
const OTP_GAP = 8;

const OtpLoginForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ otp: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isTokenChecked = useSelector(getTokenStatus);

  useEffect(() => {
    if (isAuthenticated && isTokenChecked) {
      navigate("/");
    }
  }, [isAuthenticated, isTokenChecked, navigate]);

  const onSubmit = async (formData: { otp: string }) => {
    const email = sessionStorage.getItem("email") || "";
    dispatch(verifyOtp({ otp: formData.otp, email }));
  };

  return (
    <FormContainer>
      <Logo src="company logo.png" alt="Biker Xpert Logo" />
      <FormTitle variant="h4" component="h1">
        Motorcycle Xpert OTP Verification
      </FormTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <Controller
          name="otp"
          control={control}
          defaultValue=""
          rules={{ required: "OTP is required" }}
          render={({ field }) => (
            <MuiOtpInput
              value={field.value}
              onChange={field.onChange}
              length={OTP_LENGTH}
              gap={OTP_GAP}
              containerStyle={{ justifyContent: "center" }}
              aria-label="One-time password"
            />
          )}
        />
        {errors.otp && (
          <Typography variant="body2" color="error">
            {errors.otp.message}
          </Typography>
        )}
        <SubmitButton type="submit" variant="contained" size="large">
          Verify OTP
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default OtpLoginForm;
