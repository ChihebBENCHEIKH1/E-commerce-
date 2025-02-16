import React from "react";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const OtpVerified: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <Logo src="company logo.png" alt="Motorcycle Xpert Logo" />
      <FormTitle variant="h4" component="h1">
        OTP Verified Successfully
      </FormTitle>
      <Typography variant="body1" style={{ marginBottom: "2rem" }}>
        A password reset email has been sent to your email address. Please check
        your inbox and follow the instructions to reset your password.
      </Typography>
      <SubmitButton
        type="button"
        variant="contained"
        size="large"
        onClick={() => navigate("/MotorcycleXpert/login")}
      >
        Go to Login
      </SubmitButton>
    </FormContainer>
  );
};

export default OtpVerified;
