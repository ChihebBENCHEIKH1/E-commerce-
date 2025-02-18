import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const DrawerContainer = styled(Box)`
  background-color: #f5f5f5;
  padding: 24px;
`;

const DrawerHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #000;
  color: white;
`;

const DrawerContent = styled(Box)`
  color: #000;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  motorcycle: any;
};
const SideDrawer = ({ isOpen, onClose, motorcycle }: Props) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "400px",
          maxWidth: "90%",
        },
      }}
    >
      <DrawerHeader>
        <Typography variant="h6">Motorcycle Details</Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {motorcycle && (
        <DrawerContainer>
          <img
            src={motorcycle.image}
            alt={motorcycle.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <DrawerContent>
            <Typography variant="h5" gutterBottom>
              {motorcycle.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {motorcycle.specs}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {motorcycle.info}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Price: {motorcycle.price}
            </Typography>
            <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
              Buy Now
            </Button>
          </DrawerContent>
        </DrawerContainer>
      )}
    </Drawer>
  );
};

export default SideDrawer;
