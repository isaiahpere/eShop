import styled from "styled-components";
import { useCartContext } from "@/utilities/context/context";
import CartItem from "./CartItem";
import { FaShoppingCart } from "react-icons/fa";
const { motion } = require("framer-motion");

const cards = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
  remove: { opacity: 0, scale: 0.8 },
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
  /* display: none; */
`;

const Cards = styled(motion.div)``;

const CartContainer = styled(motion.div)`
  min-width: 500px;
  background: #f1f1f1;
  padding: 24px;
  overflow-y: scroll;
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
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

const TotalContainer = styled.div`
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
  const { cartItems, toggleCart, showCart } = useCartContext();

  const cartIsEmpty = cartItems && cartItems.length < 1;

  const totalCartAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const handleOutsideClick = (event) => {
    toggleCart();
    event.stopPropagation();
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
        {cartIsEmpty && (
          <EmptyContainer
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", delay: 0.3 }}
          >
            <EmptyCartText>Your Cart is empty!</EmptyCartText>
            <CartIcon />
          </EmptyContainer>
        )}
        <Cards variants={cards} initial={"hidden"} animate={"show"}>
          {!cartIsEmpty && (
            <>
              {cartItems.map((item) => (
                <CartItem variants={card} key={item.title} product={item} />
              ))}
              <TotalContainer>
                <CartTotal>Subtotal: ${totalCartAmount}</CartTotal>
                <PurchaseButton>Purchase</PurchaseButton>
              </TotalContainer>
            </>
          )}
        </Cards>
      </CartContainer>
    </CartWrapper>
  );
};

export default Cart;
