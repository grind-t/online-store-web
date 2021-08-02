import Head from 'next/head';
import styled from 'styled-components';
import PageTemplate from 'components/templates/page-template';
import StoreHeader from 'components/organisms/store-header';
import ProductsView from 'components/organisms/products-view';
import { lerpByVW, up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const lerpByWidth = (from: number, to: number) =>
  lerpByVW(from, to, breakpoints.xs, breakpoints.xl);

const Main = styled.main`
  padding-top: 20px;
  padding-right: ${lerpByWidth(4, 85)};
  padding-bottom: 60px;
  padding-left: ${lerpByWidth(4, 85)};

  @media ${up(breakpoints.md)} {
    padding-top: 40px;
  }

  @media ${up(breakpoints.xl)} {
    padding-top: 60px;
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
