import React from "react";
import styled from "styled-components";
import RegisterForm from "../components/register/RegisterForm";

const Wrapper = styled.div`
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RegisterPage: React.FC = () => {
  return (
    <Wrapper>
      <RegisterForm />
    </Wrapper>
  );
};

export default RegisterPage;
