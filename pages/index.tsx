import StoreFooter from 'components/common/sections/footer';
import StoreHeader from 'components/common/sections/header';
import PageTemplate from 'components/common/templates/page-template';
import ProductsView from 'components/products/products-view';
import {
  ProductFull,
  getProducts,
  getProductSearchParams,
  getCategories,
  Category,
} from 'lib/products';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Main = styled.main`
  padding: 1.25rem 0.25rem;

  @media ${up(breakpoints.sm)} {
    padding: 1.5rem 0.625rem;
  }

  @media ${up(breakpoints.md)} {
    padding: 2.25rem;
  }

  @media ${up(breakpoints.xl)} {
    padding: 3rem 4rem;
  }

  @media ${up(breakpoints.xxl)} {
    padding: 4rem 5rem;
  }
`;
//#endregion

interface HomeProps {
  categories: Category[];
  products: ProductFull[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query,
  locale,
}) => {
  const searchParams = getProductSearchParams(query);
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(searchParams),
  ]);
  return {
    props: {
      categories,
      products,
      messages: {
        ...require(`/public/l10n/common/${locale}.json`),
        ...require(`/public/l10n/home/${locale}.json`),
      },
    },
  };
};

const Home = ({ categories, products }: HomeProps) => {
  const t = useTranslations('Home');

  return (
    <PageTemplate>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <StoreHeader />
      <Main>
        <ProductsView
          categories={categories}
          products={products}
          headingLevel="h2"
        />
      </Main>
      <StoreFooter />
    </PageTemplate>
  );
};

export default Home;
