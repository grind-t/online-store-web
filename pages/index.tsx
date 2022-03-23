import StoreFooter from 'components/common/sections/footer';
import StoreHeader from 'components/common/sections/header';
import PageTemplate from 'components/common/templates/page-template';
import ProductsView from 'components/products/products-view';
import { ProductFull, getProducts, SortBy } from 'lib/products';
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
  products: ProductFull[];
  sortBy: SortBy;
  sortAscending?: boolean;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query,
  locale,
}) => {
  const sortBy: SortBy = Number.parseInt(query['sort-by'] as any) || 0;
  const sortAscending = query['sort-asc'] !== undefined;
  return {
    props: {
      products: await getProducts(sortBy, sortAscending),
      sortBy,
      sortAscending,
      messages: {
        ...require(`/public/l10n/common/${locale}.json`),
        ...require(`/public/l10n/home/${locale}.json`),
      },
    },
  };
};

const Home = ({ products, sortBy, sortAscending }: HomeProps) => {
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
          products={products}
          sortBy={sortBy}
          sortAscending={sortAscending}
          headingLevel="h2"
        />
      </Main>
      <StoreFooter />
    </PageTemplate>
  );
};

export default Home;
