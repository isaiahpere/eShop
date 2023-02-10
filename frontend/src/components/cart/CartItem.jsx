import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useCartContext } from "@/utilities/context/context";
const { motion, AnimatePresence } = require("framer-motion");

const QTY_OF_ONE = 1;

const CartItemContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  background: #ffffff;
  padding: 16px;
  margin: 16px 0;
  overflow: hidden;
  transition: box-shadow 0.5s;

  &:hover {
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
  }
`;

const CartItemImage = styled.img`
  width: 128px;
  border-radius: 14px;
`;

const CartInfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3``;

const ProductPrice = styled.h3`
  margin-top: 8px;
  font-size: 14px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityText = styled.span`
  font-size: 14px;
  text-align: center;
  color: var(--primary);
`;

const OrderButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  font-size: 18px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const PlusIcon = styled(AiFillPlusCircle)`
  color: #494949;
  ${(props) =>
    props.disabled &&
    `
      color: #d1d1d1;
  `}
`;
const MinusIcon = styled(AiFillMinusCircle)`
  color: #494949;

  ${(props) =>
    props.disabled &&
    `
      color: #d1d1d1;
  `}
`;

const CartQuantity = styled.p`
  width: 1rem;
  text-align: center;
  color: var(--primary);
`;

const CartItem = ({ product, variants }) => {
  const { title, price, qty, image } = product;
  const { addProduct, removeProduct } = useCartContext();

  const handleItemDecrement = () => {
    removeProduct(product);
  };

  const handleItemIncrement = () => {
    addProduct(product, QTY_OF_ONE);
  };

  return (
    <AnimatePresence>
      <CartItemContainer variants={variants}>
        <CartItemImage
          src={image.data.attributes.formats.thumbnail.url}
          alt={title}
        />
        <CartInfoContainer>
          <ProductTitle>{title}</ProductTitle>
          <ProductPrice>${Number(price).toFixed(2)}</ProductPrice>
          <QuantityContainer>
            <QuantityText>Quantity</QuantityText>
            <OrderButton onClick={handleItemDecrement}>
              <MinusIcon />
            </OrderButton>
            <CartQuantity>{qty}</CartQuantity>
            <OrderButton onClick={handleItemIncrement}>
              <PlusIcon />
            </OrderButton>
          </QuantityContainer>
        </CartInfoContainer>
      </CartItemContainer>
    </AnimatePresence>
  );
};

export default CartItem;
