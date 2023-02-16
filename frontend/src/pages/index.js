import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCTS_QUERY } from "../utilities/lib/queries";
import styled from "styled-components";

import Product from "../components/product/Product";

const Container = styled.div`
  padding: 16px 0;
`;

const Gallary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 340px));
  grid-gap: 2rem;
  justify-content: center;

  /* tablet */
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 300px));
  }
`;

export default function Home() {
  // fetch products

  const [result] = useQuery({ query: PRODUCTS_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <h1>Loading....</h1>;
  if (error)
    return (
      <div>
        <p>oooh Nooo! {error.message}</p>
      </div>
    );
  if (data.products.data.length <= 0) {
    return <div>Not able to fetch data at the moment</div>;
  }
  const products = data.products.data;

  return (
    <>
      <Head>
        <title>ecommerce app</title>
        <meta name="description" content="ecommerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Gallary>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </Gallary>
      </Container>
    </>
  );
}
