import { useMediaQuery } from '@react-hookz/web';
import StandaloneCartView from 'components/organisms/cart-view';
import HeaderTemplate from 'components/templates/header-template';
import PageTemplate from 'components/templates/page-template';
import Head from 'next/head';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const CartView = styled(StandaloneCartView).attrs({
  container: 'main',
  headingLevel: 'h1',
})`
  @media ${up(breakpoints.md)} {
    margin-top: 10px;
  }

  @media ${up(breakpoints.xl)} {
    margin-top: 100px;
  }
`;
//#endregion

const Cart = () => {
  const upMD = useMediaQuery(up(breakpoints.md));
  return (
    <PageTemplate>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {upMD && <HeaderTemplate />}
      <CartView />
    </PageTemplate>
  );
};

export default Cart;
