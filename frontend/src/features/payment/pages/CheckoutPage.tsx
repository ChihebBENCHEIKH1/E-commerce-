import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";
import useStripePayment from "../hooks/useStripe";
import { getPaymentStatus } from "../selectors/paymentSelectors";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../auth/selectors/AuthSelector";
import { getSelectedMotorcycle } from "../../home/selectors/homeSelector";
import { createPaymentIntent } from "../thunks/paymentThunks";
import { resetPayment } from "../slice/paymentSlice";

const Checkout = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { cardholderName: "" } });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handlePayment } = useStripePayment();
  const paymentStatus = useSelector(getPaymentStatus);
  const selectedMotorcycle = useSelector(getSelectedMotorcycle);
  const user = useSelector(getLoggedInUser);

  useEffect(() => {
    if (selectedMotorcycle) {
      dispatch(
        createPaymentIntent({
          amount: parseFloat(
            selectedMotorcycle.price.replace("$", "").replace(",", "")
          ),
          currency: "usd",
          user,
        })
      );
    }
  }, [selectedMotorcycle]);

  useEffect(() => {
    if (paymentStatus === "succeeded") {
      setTimeout(() => {
        dispatch(resetPayment());
        navigate("/MotorcycleXpert/home");
      }, 5000);
    }
  }, [paymentStatus]);
  const onSubmit = (data) => {
    if (paymentStatus !== "processing") {
      handlePayment(data.cardholderName);
    }
  };

  return (
    <Box
      sx={{
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a1a, #000)",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "#fff",
          }}
        >
          Payment
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          Enter your payment details to complete the purchase.
        </Typography>

        {paymentStatus === "succeeded" && (
          <Typography color="success.main" align="center" gutterBottom>
            Payment successful! 🎉
          </Typography>
        )}
        {paymentStatus === "failed" && (
          <Typography color="error.main" align="center" gutterBottom>
            Payment failed. Please try again.
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "2rem",
          }}
        >
          <Controller
            name="cardholderName"
            control={control}
            rules={{ required: "Cardholder name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Cardholder Name"
                error={!!errors.cardholderName}
                helperText={errors.cardholderName?.message}
                sx={{
                  mb: 3,
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
              />
            )}
          />

          <Box
            sx={{
              mb: 3,
              "& .StripeElement": {
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
              },
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    "::placeholder": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                  invalid: {
                    color: "#ff5252",
                  },
                },
              }}
            />
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={paymentStatus === "processing"}
            sx={{
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "8px",
              background: "#ff5252",
              "&:hover": {
                background: "#ff1744",
              },
            }}
          >
            {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Checkout;
