import styled from "styled-components";
import Link from "next/link";

const ProductContainer = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
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
