import AuthProvider from 'components/auth/auth-provider';
import CartProvider from 'components/cart/cart-provider';
import StoreFooter from 'components/common/sections/footer';
import StoreHeader from 'components/common/sections/header';
import PageTemplate, {
  pageMargin,
} from 'components/common/templates/page-template';
import ProductsView, { ProductList } from 'components/products/products-view';
import { Product, getProducts } from 'lib/products';
import { GetServerSideProps } from 'next';
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

interface HomeProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  locale,
}) => {
  return {
    props: {
      products: await getProducts(),
      messages: {
        ...require(`/public/l10n/common/${locale}.json`),
        ...require(`/public/l10n/home/${locale}.json`),
      },
    },
  };
};

const Home = ({ products }: HomeProps) => {
  return (
    <AuthProvider>
      <CartProvider>
        <PageTemplate>
          <Head>
            <title>TODO</title>
            <link rel="icon" href="/images/favicon.ico" />
          </Head>
          <StoreHeader />
          <Main>
            <ProductsView products={products} headingLevel="h2" />
          </Main>
          <StoreFooter />
        </PageTemplate>
      </CartProvider>
    </AuthProvider>
  );
};

export default Home;
