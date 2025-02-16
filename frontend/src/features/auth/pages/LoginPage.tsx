import React from "react";
import styled from "styled-components";
import LoginForm from "../components/login/LoginForm";

const Wrapper = styled.div`
  background-color: #fbfbfb;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const LoginPage: React.FC = () => {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
};

export default LoginPage;
