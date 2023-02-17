import styled from "styled-components";
import Link from "next/link";

const ProductContainer = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 24px;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div``;

const Image = styled.img`
  width: 100%;
  cursor: pointer;
`;

const ProductTitle = styled.div`
  padding: 0.5rem 0rem;
`;

const ProductPrice = styled.h3``;

const Product = ({ product }) => {
  // extract values
  const { title, price, image, slug } = product.attributes;

  return (
    <ProductContainer>
      <Link href={`/product/${slug}`}>
        <ImageContainer>
          <Image src={image.data.attributes.formats.large.url} alt={title} />
        </ImageContainer>
      </Link>
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>${Number(price).toFixed(2)}</ProductPrice>
    </ProductContainer>
  );
};

export default Product;
