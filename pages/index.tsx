import styled from 'styled-components';
import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import PageTemplate from 'components/templates/page-template';
import StoreHeader from 'components/organisms/store-header';
import ProductsView from 'components/organisms/products-view';
import { breakpoints } from 'styles/varibles';
import { up } from 'styles/mixins';
import { productConverter } from 'lib/product';
import admin from 'firebase/server';

//#region styled
const Main = styled.main`
  padding: 20px 4px 60px;

  @media ${up(breakpoints.sm)} {
    padding: 20px 20px 60px;
  }

  @media ${up(breakpoints.md)} {
    padding: 40px 40px 60px;
  }

  @media ${up(breakpoints.xl)} {
    padding: 60px 85px;
  }
`;
//#endregion

const Home = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageTemplate>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <StoreHeader />
      <Main>
        <ProductsView initialProducts={products} />
      </Main>
    </PageTemplate>
  );
};

export async function getStaticProps() {
  const db = admin.firestore();
  const snapshot = await db
    .collection('products')
    .withConverter(productConverter)
    .get();
  const products = snapshot.docs.map((v) => v.data());
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

export default Home;
