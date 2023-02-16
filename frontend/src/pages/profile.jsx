import { useRouter } from "next/router";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styled from "styled-components";

const Container = styled.div``;

const UserName = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const UserEmail = styled.h3`
  font-size: 14px;
  font-weight: 400;
`;

const SectionTitle = styled.h1`
  width: 100%;
  padding: 10px;
  text-transform: uppercase;
  text-align: center;
`;

const Order = styled.div`
  display: flex;
  background: #ffffff;
  margin: 1rem 0;
  padding: 2rem;
  justify-content: space-between;
`;

const LightText = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const OrderItem = styled.h2`
  font-size: 12px;
  color: var(--primary);
`;

const Logout = styled.button`
  background: var(--primary);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

/**
 *
 * @param {*} user obtained automatically when using withPageAuthRequired
 * @param {*} orders server side prop of all user payments
 * @returns
 */
const Profile = ({ user, orders }) => {
  // router
  const router = useRouter();

  /**
   * logouts user
   */
  const handleLogout = () => {
    router.push("/api/auth/logout");
  };

  /**
   * @param {*} seconds stripe epoch date in seconds
   * @returns
   */
  const getFormattedDate = (seconds) => {
    // covert seconds to milli-seconds to get date.
    const orderDate = new Date(Number(seconds) * 1000).toLocaleDateString(
      "en-US"
    );
    return orderDate;
  };

  return (
    user && (
      <Container>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        <SectionTitle>ORDER SUMMARY</SectionTitle>
        <div>
          {orders.map((order) => (
            <Order key={order.id}>
              <OrderItem>
                Order Number: <LightText>{order.id}</LightText>
              </OrderItem>
              <OrderItem>
                Order Amount:{" "}
                <LightText>${Number(order.amount / 100).toFixed(2)}</LightText>
              </OrderItem>
              <OrderItem>
                Order Date:{" "}
                <LightText>{getFormattedDate(order.created)}</LightText>
              </OrderItem>
            </Order>
          ))}
        </div>
        <Logout onClick={handleLogout}>Logout</Logout>
      </Container>
    )
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const stripePaymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    return { props: { orders: stripePaymentIntents.data } };
  },
});
