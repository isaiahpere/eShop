import styled from "styled-components";
import { useCartContext } from "../../utilities/context/context";
import CartItem from "./CartItem";
import { FaShoppingCart } from "react-icons/fa";
import getStripe from "../../utilities/lib/getStripe";
import { CgClose } from "react-icons/cg";
const { motion } = require("framer-motion");

// framer-motion-parent
const cards = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  remove: { opacity: 0, scale: 0.8, transition: { duration: 5 } },
};
// framer-motion-children
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const CartWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

const Cards = styled(motion.div)``;

const CloseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 30px;
  right: 45px;
  transition: transform 0.5s ease;
  z-index: 5;
  background: var(--primary);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    transform: rotate(180deg);
  }
`;

const Close = styled(CgClose)`
  font-size: 24px;
  color: #ffffff;
`;

const CartContainer = styled(motion.div)`
  width: 100%;
  background: #f1f1f1;
  padding: 24px;
  overflow-y: scroll;
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
    width: unset;
    min-width: 500px;
  }
`;

const EmptyContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  /* left: 50%; */
  /* transform: translate(-50%, 0); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const EmptyCartText = styled.h1`
  font-size: 24px;
`;

const CartIcon = styled(FaShoppingCart)`
  margin-top: 10px;
  font-size: 60px;
  color: var(--secondary);
`;

const TotalContainer = styled(motion.div)`
  margin-top: 40px;
`;

const CartTotal = styled.h3``;

const PurchaseButton = styled.button`
  background: var(--primary);
  padding: 16px 24px;
  width: 100%;
  color: #ffffff;
  margin-top: 14px;
  border-radius: 10px;
  transition: transform 0.4s, box-shadow 0.6s linear;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 9px -1px rgba(158, 153, 158, 1);
    transform: translateY(-2px);
  }
`;

const Cart = () => {
  // cart context
  const { cartItems, toggleCart } = useCartContext();

  const cartIsEmpty = cartItems && cartItems.length < 1;

  const totalCartAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  /**
   * handles outside cart clicks to toggle cart
   * @param {*} event
   */
  const handleOutsideClick = (event) => {
    toggleCart();
    event.stopPropagation();
  };

  /**
   * handle stripe payments
   */
  const handleCheckout = async () => {
    const stripe = await getStripe();
    if (!stripe) console.log("cannot find stripe instance");

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  const toggleCartX = () => {
    toggleCart();
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeIn" }}
      onClick={handleOutsideClick}
    >
      <CartContainer
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon onClick={toggleCartX}>
          <Close />
        </CloseIcon>
        {cartIsEmpty && (
          <EmptyContainer
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", delay: 0.2 }}
          >
            <EmptyCartText>Your Cart is empty!</EmptyCartText>
            <CartIcon />
          </EmptyContainer>
        )}
        <Cards layout variants={cards} initial={"hidden"} animate={"show"}>
          {!cartIsEmpty && (
            <>
              {cartItems.map((item) => (
                <CartItem variants={card} key={item.title} product={item} />
              ))}
              <TotalContainer layout>
                <CartTotal>Subtotal: ${totalCartAmount}</CartTotal>
                <PurchaseButton onClick={handleCheckout}>
                  Purchase
                </PurchaseButton>
              </TotalContainer>
            </>
          )}
        </Cards>
      </CartContainer>
    </CartWrapper>
  );
};

export default Cart;
