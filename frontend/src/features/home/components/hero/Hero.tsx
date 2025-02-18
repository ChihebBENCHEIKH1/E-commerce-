import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import styled, { keyframes } from "styled-components";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// Styled Components
const HeroContainer = styled(Box)`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

const BlurredOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
`;

const AnimatedTypography = styled(Typography)`
  animation: ${fadeIn} ${({ delay }) => delay || "1.5s"} ease-out;
  font-family: "'Poppins', sans-serif";
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
  letter-spacing: 0.1em;
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  padding: 0.75rem 3rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 25px;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${glow} 2s infinite;

  &:hover {
    transform: scale(1.05);
    animation: none;
    box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.8);
  }
`;

const ScrollIndicator = styled(Box)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  animation: ${bounce} 2s infinite;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <StyledVideo autoPlay loop muted>
        <source src="hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </StyledVideo>

      <BlurredOverlay />

      <Container sx={{ position: "relative", zIndex: 1 }}>
        <AnimatedTypography
          variant="h1"
          uppercase
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
            mb: 2,
          }}
        >
          Experience the BMW S1000RR
        </AnimatedTypography>
        <AnimatedTypography
          variant="h5"
          delay="2s"
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            mb: 4,
            fontWeight: 300,
          }}
        >
          The ultimate sport bike for adrenaline seekers.
        </AnimatedTypography>
        <StyledButton
          variant="contained"
          color="error"
          onClick={() => alert("Explore Now!")}
        >
          Explore Now
        </StyledButton>
      </Container>

      <ScrollIndicator>
        <ArrowDownward sx={{ fontSize: "2.5rem", color: "#fff" }} />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;
