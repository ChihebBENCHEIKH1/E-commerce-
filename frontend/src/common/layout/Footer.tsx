import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LinkedIn,
} from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled(Box)`
  background-color: #000;
  color: #fff;
  padding: 40px 0;
  border-top: 1px solid #333;
`;

const StyledLink = styled(Link)`
  font-weight: 500;
  font-size: 0.875rem;
  color: inherit;
  text-decoration: none;
  &:hover {
    color: #ff0000;
  }
`;

const StyledIconButton = styled(IconButton)`
  color: #fff;
  &:hover {
    color: #ff0000;
  }
`;

const StyledLogoLink = styled.a`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Footer = () => {
  const links = [
    {
      text: "TERMS OF USE",
      href: "https://my.ducati.com/us/en/footer/terms-of-use",
    },
    { text: "PRIVACY INFORMATION", href: "/us/en/home/privacy" },
    { text: "COOKIES INFORMATION", href: "/us/en/home/cookie-policy" },
    {
      text: "CUSTOMER SERVICE",
      href: "https://www.ducati.com/us/en/company/customer-service",
    },
    {
      text: "MOTORCYCLE XPERT FINANCIAL SERVICES (216) 12345678",
      href: "https://www.ducati.com/us/en/editorial/2019-ducati-financial-services",
    },
  ];

  const socialIcons = [
    { icon: <Facebook />, href: "https://www.facebook.com/Ducati/" },
    { icon: <Twitter />, href: "https://twitter.com/ducatiusa" },
    { icon: <Instagram />, href: "https://www.instagram.com/ducatiusa/" },
    { icon: <YouTube />, href: "https://www.youtube.com/ducati" },
    {
      icon: <LinkedIn />,
      href: "https://www.linkedin.com/company/ducati-motor-holding/",
    },
  ];

  const secondaryLogos = [
    {
      logo: "https://images.ctfassets.net/x7j9qwvpvr5s/56kY1dy4ZO93CxK2Di9itU/5769a9e357351b930a7fee9c38ad818d/logo-scrambler.svg",
      alt: "The land of joy",
      text: "The land of joy",
      href: "https://www.scramblerducati.com/en-us/",
    },
    {
      logo: "https://images.ctfassets.net/x7j9qwvpvr5s/24gQQtOd5X3kapCVaB1Q92/5a5704392f85dc82388f89a19b023934/Radio-Scrambler-Ducati-Light.svg",
      alt: "Radio Scrambler",
      text: "Radio Scrambler",
      href: "https://www.scramblerducati.com/en-us/collab/scrambler-ducati-live/",
    },
  ];

  return (
    <FooterContainer>
      <Container>
        <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
          <img
            src="https://images.ctfassets.net/x7j9qwvpvr5s/2CsA99p11kL3UvzN4txafd/832dabdc0d00a62a43fe559933a46c35/Ducati-Member-of-the-Audi-Group.svg"
            alt="DUCATI"
            style={{ width: "200px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {links.map((link, index) => (
              <ListItem key={index} sx={{ width: "auto", padding: 0 }}>
                <StyledLink href={link.href} underline="none">
                  {link.text}
                </StyledLink>
              </ListItem>
            ))}
          </List>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginBottom: "40px", color: "#aaa" }}
        >
          Copyright © 2025 Motorcycle Xpert Holding S.p.A – A Sole Shareholder
          Company - A Company subject to the Management and Coordination
          activities of Motorcycle Xpert Holding S.p.A. All rights reserved. VAT
          1234567890
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {secondaryLogos.map((logo, index) => (
              <StyledLogoLink key={index} href={logo.href}>
                <img
                  src={logo.logo}
                  alt={logo.alt}
                  style={{ width: "100px" }}
                />
                <Typography variant="caption" display="block">
                  {logo.text}
                </Typography>
              </StyledLogoLink>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: "10px" }}>
            {socialIcons.map((social, index) => (
              <StyledIconButton key={index} href={social.href} target="_blank">
                {social.icon}
              </StyledIconButton>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://assets.prd.site.awsducati.com/dist/0.30.5/assets/img/flags/tn.png"
              alt="United States"
              style={{ width: "24px" }}
            />
            <Typography variant="body2">Tunisia</Typography>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
