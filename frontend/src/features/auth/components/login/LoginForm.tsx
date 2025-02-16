import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserCredentials } from "../../types/type";
import { loginUser } from "../../thunks/AuthThunk";
import MUIInput from "../../../../common/components/form/MUIInput";
import ReCAPTCHACheckBox from "../../../../common/components/ReCAPTCHACheckBox";

const FormContainer = styled.div`
  padding: 2rem;
  text-align: center;
  width: 670px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 750px) {
    max-width: 670px;
    width: auto;
  }
`;

const FormTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 36px !important;
`;

const SubmitButton = styled(Button)`
  background-color: #d32f2f;
  &:hover {
    background-color: #b71c1c;
  }
  margin-bottom: 16px;
  width: 300px;
  @media (max-width: 750px) {
    max-width: 300px;
    width: auto;
  }
`;

const RecaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>();
  const dispatch = useDispatch();

  const onSubmit = async (formData: UserCredentials) => {
    if (!formData.recaptcha) {
      return;
    }
    dispatch(loginUser(formData));
  };

  return (
    <FormContainer>
      <img
        src="company logo.png"
        alt="Logo"
        style={{ width: "200px", height: "200px", margin: "0 auto" }}
      />
      <FormTitle variant="h4" component="h1">
        Login{" "}
      </FormTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <MUIInput
          label="Email"
          name="email"
          register={register}
          errors={errors}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/i,
              message: "Invalid email format",
            },
          }}
        />

        <MUIInput
          label="Password"
          name="password"
          register={register}
          errors={errors}
          validationRules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          type="password"
        />

        <RecaptchaContainer>
          <ReCAPTCHACheckBox name="recaptcha" control={control} />
        </RecaptchaContainer>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "baseline",
          }}
        >
          <Link to="/forgot-password">Forgot your password?</Link>
          <SubmitButton type="submit" variant="contained" size="large">
            Login
          </SubmitButton>
        </div>
        <p>
          Don't have an account?{" "}
          <Link to="/MotorcycleXpert/register">Register</Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
