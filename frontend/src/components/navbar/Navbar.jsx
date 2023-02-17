import styled from "styled-components";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
const { motion, AnimatePresence } = require("framer-motion");

import { useCartContext } from "../../utilities/context/context";
import User from "../User";
import Cart from "../cart/Cart";
import logo from "../../../public/assets/logo.png";

const NavContainer = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1024px) {
    margin: 0 60px;
  }
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
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

const CartBadge = styled(motion.span)`
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
  font-size: 20px;
`;

const CartHeader = styled.h3`
  font-size: 12px;
  padding: 6px;
`;

const Navbar = () => {
  // user
  const { user, error, isLoading } = useUser();

  // if (user) console.log(user);
  const { showCart, toggleCart, totalQty } = useCartContext();

  return (
    <NavContainer>
      <HomeIcon href={"/"}>
        <Image src={logo} width={40} />
      </HomeIcon>
      <NavItemsContainer>
        <NavItem>
          <User />
        </NavItem>
        <NavItem onClick={toggleCart}>
          {totalQty > 0 && (
            <CartBadge initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {totalQty}
            </CartBadge>
          )}
          <CartIcon />
          <CartHeader>Cart</CartHeader>
        </NavItem>
      </NavItemsContainer>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;
