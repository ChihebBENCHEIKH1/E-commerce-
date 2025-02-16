import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import MUIInput from "../../../../common/components/form/MUIInput";
import { resetPassword } from "../../thunks/AuthThunk";
import { getIsPasswordReset } from "../../selectors/AuthSelector";

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

const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPasswordReset = useSelector(getIsPasswordReset);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isResetComplete, setIsResetComplete] = useState(false);

  const password = watch("password");

  useEffect(() => {
    if (isPasswordReset) {
      setIsResetComplete(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    }
  }, [isPasswordReset, navigate]);

  const onSubmit = ({ password }: { password: string }) => {
    dispatch(resetPassword({ token, newPassword: password }));
  };

  return (
    <FormContainer>
      <img
        src="company logo.png"
        alt="Logo"
        style={{ width: "200px", height: "200px", margin: "0 auto" }}
      />
      {isResetComplete ? (
        <Typography variant="h5" color="green">
          Password reset successfully! Redirecting to login...
        </Typography>
      ) : (
        <>
          <FormTitle variant="h4" component="h1">
            Reset Password
          </FormTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <MUIInput
              label="New Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              validationRules={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />

            <MUIInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              errors={errors}
              validationRules={{
                required: "Please confirm your password",
                validate: (value: string) =>
                  value === password || "Passwords do not match",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#d32f2f",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Reset Password
            </button>
          </form>
        </>
      )}
    </FormContainer>
  );
};

export default ResetPasswordForm;
