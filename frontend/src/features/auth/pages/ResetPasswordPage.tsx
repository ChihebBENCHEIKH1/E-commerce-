import React from "react";
import styled from "styled-components";
import ResetPasswordForm from "../components/resetPassword/ResetPasswordForm";

const Wrapper = styled.div`
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ResetPasswordPage: React.FC = () => {
  return (
    <Wrapper>
      <ResetPasswordForm />
    </Wrapper>
  );
};

export default ResetPasswordPage;
