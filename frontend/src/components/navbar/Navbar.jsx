import styled from "styled-components";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import { useCartContext } from "@/utilities/context/context";
const { AnimatePresence } = require("framer-motion");

import Cart from "../cart/Cart";

const NavContainer = styled.div`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1024px) {
    margin: 0 40px;
  }
`;

const HomeIcon = styled(Link)`
  font-size: 18px;
  color: var(--primary);

  &:hover {
    color: #9d9999;
  }
`;

const NavItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 36px;
  cursor: pointer;
`;

const CartBadge = styled.span`
  background: #ff2626;
  color: white;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  right: 2px;
  pointer-events: none;
`;

const CartIcon = styled(FiShoppingBag)`
  font-size: 18px;
`;

const CartHeader = styled.h3`
  font-size: 14px;
  padding: 6px;
`;

const Navbar = () => {
  const { showCart, toggleCart, totalQty } = useCartContext();

  return (
    <NavContainer>
      <HomeIcon href={"/"}>Casa</HomeIcon>
      <NavItemsContainer>
        <NavItem onClick={toggleCart}>
          {totalQty > 0 && <CartBadge>{totalQty}</CartBadge>}
          <CartIcon />
          <CartHeader>Cart</CartHeader>
        </NavItem>
      </NavItemsContainer>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;
