import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useGetMotorcyclesQuery } from "../../../../services/motorcyclesApi";
import SideDrawer from "../../../../common/components/SideDrawer";

const FeaturedModels = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [motorcyclesList, setMotorcyclesList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState(null);

  const { data: motorcycles, isFetching } = useGetMotorcyclesQuery({
    page,
    limit,
  });

  React.useEffect(() => {
    if (motorcycles) {
      setMotorcyclesList((prev) => [...prev, ...motorcycles.data]);
    }
  }, [motorcycles]);

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCardClick = (motorcycle) => {
    setSelectedMotorcycle(motorcycle);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedMotorcycle(null);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Our Latest Models
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {motorcyclesList.map((model, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                border: "none",
                boxShadow: "none",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(model)}
            >
              <CardMedia
                component="img"
                height="200"
                image={model.image}
                alt={model.name}
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {model.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {model.specs}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleSeeMore}
          disabled={isFetching}
        >
          {isFetching ? "Loading..." : "See More"}
        </Button>
      </Box>

      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        motorcycle={selectedMotorcycle}
      />
    </Container>
  );
};

export default FeaturedModels;
