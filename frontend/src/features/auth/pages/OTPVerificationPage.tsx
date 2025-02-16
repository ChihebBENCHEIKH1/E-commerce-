import React, { useMemo } from "react";
import styled from "styled-components";
import OtpLoginForm from "../components/otp/OTPLoginForm";
import { useSelector } from "react-redux";
import { getIsOTPVerified } from "../selectors/AuthSelector";
import OtpVerified from "../components/otp/OtpVerified";

const Wrapper = styled.div`
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const OTPVerificationPage: React.FC = () => {
  const isOTPVerified = useSelector(getIsOTPVerified);
  const renderContent = useMemo(() => {
    return !isOTPVerified ? <OtpLoginForm /> : <OtpVerified />;
  }, [isOTPVerified]);

  return <Wrapper>{renderContent}</Wrapper>;
};

export default OTPVerificationPage;
