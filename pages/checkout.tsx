import CheckoutForm from 'components/checkout/checkout-form';
import PageTemplate from 'components/common/templates/page-template';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

const Page = styled(PageTemplate)`
  justify-content: center;
  align-items: center;
`;

export const getStaticProps: GetStaticProps = ({ locale }) => ({
  props: {
    isProtected: true,
    messages: {
      ...require(`/public/l10n/common/${locale}.json`),
      ...require(`/public/l10n/checkout/${locale}.json`),
    },
  },
});

const Checkout = () => {
  return (
    <Page>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <main>
        <CheckoutForm />
      </main>
    </Page>
  );
};

export default Checkout;
