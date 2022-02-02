import AuthForm from 'components/auth/auth-form';
import AuthProvider from 'components/auth/auth-provider';
import PageTemplate from 'components/common/templates/page-template';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';

//#region styled
const Page = styled(PageTemplate)`
  justify-content: center;
  align-items: center;
`;

//#endregion

export const getStaticProps: GetStaticProps = ({ locale }) => ({
  props: {
    messages: {
      ...require(`/public/l10n/common/${locale}.json`),
      ...require(`/public/l10n/auth/${locale}.json`),
    },
  },
});

const SignIn = () => {
  return (
    <Page>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <main>
        <AuthForm headingLevel="h1" />
      </main>
    </Page>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <AuthProvider>{page}</AuthProvider>;
};

export default SignIn;
