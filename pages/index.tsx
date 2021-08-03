import Head from 'next/head';
import styled from 'styled-components';
import PageTemplate from 'components/templates/page-template';
import StoreHeader from 'components/organisms/store-header';
import ProductsView from 'components/organisms/products-view';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Main = styled.main`
  padding: 20px 4px 60px;

  @media ${up(breakpoints.md)} {
    padding: 40px 40px 60px;
  }

  @media ${up(breakpoints.xl)} {
    padding: 60px 85px;
  }
`;
//#endregion

const Home = () => {
  return (
    <PageTemplate>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <StoreHeader />
      <Main>
        <ProductsView />
      </Main>
    </PageTemplate>
  );
};

export default Home;
