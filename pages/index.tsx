import admin from 'app/firebase-admin';
import { path } from 'app/firebase/firestore';
import ProductsView, { ProductList } from 'components/organisms/products-view';
import StoreHeader from 'components/organisms/store-header';
import PageTemplate, { pageMargin } from 'components/templates/page-template';
import { Product } from 'lib/product';
import { Products } from 'lib/products';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Main = styled.main`
  width: fit-content;
  margin: 0 auto;
  padding: 20px 5px 60px;

  ${ProductList} {
    max-width: calc(100vw - ${pageMargin * 2}px - 10px);
  }

  @media ${up(breakpoints.sm)} {
    padding: 20px 20px 60px;

    ${ProductList} {
      max-width: calc(100vw - ${pageMargin * 2}px - 40px);
    }
  }

  @media ${up(breakpoints.md)} {
    padding: 40px 40px 60px;

    ${ProductList} {
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
  const snap = await db.collection(path.products).get();
  const products: Products = {};
  snap.forEach((doc) => (products[doc.id] = doc.data() as Product));

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

export default Home;
