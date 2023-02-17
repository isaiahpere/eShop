import { useQuery } from "urql";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

import { GET_PRODUCT_QUERY } from "../../utilities/lib/queries";
import { useCartContext } from "../../utilities/context/context";
import Head from "next/head";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  color: var(--secondary);
  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: var(--primary);
  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const ProductImage = styled.img`
  background: #ffffff;
  padding: 2px;
  width: 280px;
  border-radius: 24px;
  box-shadow: 0px 2px 9px -1px rgba(158, 153, 158, 1);
  margin-bottom: 14px;

  @media (min-width: 580px) {
    width: 400px;
  }
  @media (min-width: 1024px) {
    width: 600px;
  }
`;

const ProductInfo = styled.div``;

const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0 8px 0;
`;

const OrderTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--secondary);
  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

const Quantity = styled.p`
  font-size: 14px;
  text-align: center;
  color: var(--primary);
  @media (min-width: 1024px) {
    font-size: 18px;
  }
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
  @media (min-width: 1024px) {
    font-size: 28px;
  }
`;
const MinusIcon = styled(AiFillMinusCircle)`
  color: #494949;

  ${(props) =>
    props.disabled &&
    `
      color: #d1d1d1;
  `}
  @media (min-width: 1024px) {
    font-size: 28px;
  }
`;

const BuyButton = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
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
    addToCartToast(product);
  };

  const addToCartToast = (product) => {
    toast.success(`${product.title} - added!`, {
      duration: 1500,
      position: "top-center",
    });
  };

  return (
    <>
      <Head>
        <title>eShop - product</title>
        <meta name="description" content="ecommerce app" />
        <link rel="icon" href="/assets/eshop_logo.png" />
      </Head>
      <MainContainer>
        <ProductImage
          src={image.data.attributes.formats.medium.url}
          alt={title}
        />
        <ProductInfo>
          <CenterContainer>
            <ProductTitle>{title}</ProductTitle>
          </CenterContainer>
          <Description>{description}</Description>
          <OrderContainer>
            <OrderTitle>Quantity:</OrderTitle>
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
    </>
  );
};

export default ProductDetailsPage;
