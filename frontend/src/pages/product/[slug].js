import { useQuery } from "urql";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { GET_PRODUCT_QUERY } from "../../utilities/lib/queries";
import { useCartContext } from "@/utilities/context/context";
import { motion } from "framer-motion";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  color: var(--secondary);
`;

const Description = styled.p`
  font-size: 12px;
  color: var(--primary);
`;

const ProductImage = styled.img`
  width: 50%;
`;

const ProductInfo = styled.div`
  width: 40%;
`;

const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
`;

const OrderTitle = styled.span`
  font-size: 14px;
  color: var(--secondary);
`;

const Quantity = styled.p`
  width: 1rem;
  text-align: center;
  color: var(--primary);
`;

const OrderButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  font-size: 1.5rem;
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

const BuyButton = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const ProductDetailsPage = () => {
  // context
  const { qty, increaseQty, decreaseQty, addProduct } = useCartContext();

  // queyr
  const { query } = useRouter();

  // fetch product
  const [result] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = result;

  // fetch error check
  if (fetching) return <h1>Fetching Data...</h1>;
  if (error) return <h1>Error While Fetching Data!! {error.message}</h1>;

  // destruct data
  const { title, description, image } = data.products.data[0].attributes;

  const handleAddProductToCart = () => {
    const product = data.products.data[0].attributes;
    addProduct(product, qty);
  };

  return (
    <MainContainer>
      <ProductImage
        src={image.data.attributes.formats.medium.url}
        alt={title}
      />
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <Description>{description}</Description>
        <OrderContainer>
          <OrderTitle>Quantity</OrderTitle>
          <OrderButton onClick={decreaseQty}>
            <MinusIcon disabled={qty <= 1} />
          </OrderButton>
          <Quantity>{qty}</Quantity>
          <OrderButton onClick={increaseQty}>
            <PlusIcon disabled={qty >= 9} />
          </OrderButton>
        </OrderContainer>
        <BuyButton onClick={handleAddProductToCart}>Add to cart</BuyButton>
      </ProductInfo>
    </MainContainer>
  );
};

export default ProductDetailsPage;
