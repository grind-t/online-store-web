import { useMediaQuery } from '@react-hookz/web';
import StandaloneCartView from 'components/cart/cart-view';
import HeaderTemplate from 'components/common/templates/header-template';
import PageTemplate from 'components/common/templates/page-template';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

export const getStaticProps: GetStaticProps = ({ locale }) => ({
  props: {
    messages: {
      ...require(`/public/l10n/common/${locale}.json`),
      ...require(`/public/l10n/cart/${locale}.json`),
    },
  },
});

//#region styled
const CartView = styled(StandaloneCartView).attrs({
  container: 'main',
  headingLevel: 'h1',
})`
  padding: 0.5rem;

  @media ${up(breakpoints.md)} {
    padding: 1rem;
  }

  @media ${up(breakpoints.xxl)} {
    padding-top: 6rem;
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
