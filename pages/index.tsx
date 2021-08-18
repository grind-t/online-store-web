import styled from 'styled-components';
import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import PageTemplate, { pageMargin } from 'components/templates/page-template';
import StoreHeader from 'components/organisms/store-header';
import ProductsView, { ProductList } from 'components/organisms/products-view';
import { breakpoints } from 'styles/varibles';
import { up } from 'styles/mixins';
import { getProductsFromFirestore } from 'lib/product';
import admin from 'firebase/server';

//#region styled
const Main = styled.main`
  width: fit-content;
  margin: 0 auto;
  padding: 20px 5px 60px;

  & > ${ProductList} {
    max-width: calc(100vw - ${pageMargin * 2}px - 10px);
  }

  @media ${up(breakpoints.sm)} {
    padding: 20px 20px 60px;

    & > ${ProductList} {
      max-width: calc(100vw - ${pageMargin * 2}px - 40px);
    }
  }

  @media ${up(breakpoints.md)} {
    padding: 40px 40px 60px;

    & > ${ProductList} {
      max-width: calc(100vw - ${pageMargin * 2}px - 80px);
    }
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
  const products = await getProductsFromFirestore(db);

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

export default Home;
