import { loadStripe } from "@stripe/stripe-js";

/**
 * Create a stripe instance
 */
const getStripe = async () => {
  let stripe;

  if (!stripe) {
    // create new stripe instance
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  }

  // return strip instance
  return stripe;
};

export default getStripe;
