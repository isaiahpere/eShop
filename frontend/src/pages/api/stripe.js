import Stripe from "stripe";

// new stripe instance with secret
const stripeInstance = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const stripeApi = async (req, res) => {
  // POST METHOD
  if (req.method === "POST") {
    // check if stripe instance exist
    if (!stripeInstance) {
      console.log("Stripe has not yet loaded");
      return;
    }

    console.log(req.headers);

    // More about stripe checkout session: https://stripe.com/docs/api/checkout/sessions/object
    try {
      // create checkout session
      const session = await stripeInstance.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        shipping_options: [{ shipping_rate: "shr_1Ma8OIA5H1InCGm0pIPB5332" }],
        allow_promotion_codes: true,
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "USD",
              product_data: {
                name: item.title,
                images: [item.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: { enabled: true, minimum: 0, maximum: 10 },
            quantity: item.qty,
          };
        }),
        success_url: `${req.headers.referer}`,
        cancel_url: `${req.headers.referer}`,
      });

      res.status(200).json(session);
    } catch (error) {
      console.log("error:");
      console.log(error);
      res.status(error.statusCode || 500).json(error);
    }
  }
};

export default stripeApi;
