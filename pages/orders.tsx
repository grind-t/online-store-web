import Header from 'components/common/sections/header';
import PageTemplate from 'components/common/templates/page-template';
import OrderTable from 'components/orders/order-table';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Main = styled.main`
  flex: 1;
  padding: 3.5rem 0;
  overflow-x: auto;

  @media ${up(breakpoints.md)} {
    overflow-x: initial;
  }

  @media ${up(breakpoints.lg)} {
    padding: 3.5rem 1.75rem;
  }
`;
//#endregion

export const getStaticProps: GetStaticProps = ({ locale }) => ({
  props: {
    messages: {
      ...require(`/public/l10n/common/${locale}.json`),
      ...require(`/public/l10n/orders/${locale}.json`),
    },
  },
});

const Orders = () => {
  return (
    <PageTemplate>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <OrderTable />
      </Main>
    </PageTemplate>
  );
};

export default Orders;
