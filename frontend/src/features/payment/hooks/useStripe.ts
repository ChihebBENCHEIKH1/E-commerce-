import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  paymentFailure,
  paymentSuccess,
  startPayment,
} from "../slice/paymentSlice";
import { getClientSecret } from "../selectors/paymentSelectors";

const useStripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const clientSecret = useSelector(getClientSecret);

  const handlePayment = async (cardholderName: string) => {
    if (!stripe || !elements) return;

    dispatch(startPayment());

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardholderName },
          },
        }
      );

      if (error) {
        dispatch(paymentFailure(error.message));
      } else if (paymentIntent.status === "succeeded") {
        dispatch(paymentSuccess());
      }
    } catch (err: any) {
      dispatch(paymentFailure(err.message));
    }
  };

  return { handlePayment };
};

export default useStripePayment;
