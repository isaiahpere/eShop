import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
const { motion } = require("framer-motion");
import styled from "styled-components";

import llama from "../../public/assets/llama.png";

const FlexContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  margin: 1rem 15rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 2rem;
  padding: 2rem;
`;

const Greetings = styled.div`
  padding-bottom: 16px;
`;

const GreetingText = styled.h1`
  font-size: 20px;
  font-weight: 800;
`;

const EmailContainer = styled(FlexContainer)`
  flex-direction: column;
  padding-bottom: 10px;
`;

const EmailTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const Emailtext = styled.p`
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding: 6px 0 10px 0;
`;

const AddressContainer = styled(FlexContainer)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 4rem;
`;

const SectionTitle = styled.h3`
  width: 100%;
  padding-bottom: 14px;
  text-align: center;
  text-transform: uppercase;
`;

const ProductContainer = styled(FlexContainer)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 4rem 3rem 4rem;
`;

const ItemContainer = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ProductItem = styled.p`
  padding: 2px 0;
  font-size: 14px;
  color: var(--primary);
`;

const KeyItem = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const Button = styled.button`
  color: #ffffff;
  background: var(--primary);
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 24px;
  padding: 1rem 2rem;
  cursor: pointer;
`;

/**
 * @param {*} order stripe order items
 * @returns
 */
const success = ({ order }) => {
  // router
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  // create a
  const renderAddressInfo = () => {
    const address = Object.entries(order.customer_details.address).map(
      ([key, value]) => (
        <ProductItem key={key}>
          <KeyItem>{key}:</KeyItem> {value}
        </ProductItem>
      )
    );
    return address;
  };

  return (
    <Container>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.4 }}
      >
        <Greetings>
          <GreetingText>Thank you for your order!</GreetingText>
        </Greetings>
        <EmailContainer>
          <EmailTitle>Confirmation email has been sent to</EmailTitle>
          <Emailtext>{order.customer_details.email}</Emailtext>
        </EmailContainer>
        <AddressContainer>
          <SectionTitle>Address</SectionTitle>
          {renderAddressInfo()}
        </AddressContainer>
        <ProductContainer>
          <SectionTitle>Products</SectionTitle>
          {order.line_items.data.map((item) => (
            <ItemContainer key={item.id}>
              <ProductItem>
                <KeyItem>Product:</KeyItem> {item.description}
              </ProductItem>
              <ProductItem>
                <KeyItem>Quantity:</KeyItem> {item.quantity}
              </ProductItem>
              <ProductItem>
                <KeyItem>Price:</KeyItem>{" "}
                {Number(item.price.unit_amount / 100).toFixed(2)}
              </ProductItem>
            </ItemContainer>
          ))}
        </ProductContainer>
        <Button onClick={handleClick}>Continue Shopping</Button>
        <Image src={llama} alt="happy llama" width={400} />
      </Card>
    </Container>
  );
};

// Server side Props to retrieve session_id items
export async function getServerSideProps(params) {
  // get id from url
  const sessionId = params.query.session_id;
  // retrieve order from stripe session
  const order = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"], // expand nested items
  });

  return { props: { order } };
}

export default success;
