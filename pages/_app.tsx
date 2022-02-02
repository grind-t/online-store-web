import type { NextPage } from 'next';
import { NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { UIDReset } from 'react-uid';
import { createGlobalStyle } from 'styled-components';
import { miniReset, nunitoFont } from 'styles/mixins';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const GlobalStyle = createGlobalStyle`
  ${nunitoFont()}
  ${miniReset()}

  body {
    font-family: 'Nunito', 'Trebuchet MS', sans-serif;
    line-height: 1.364;
    background-color: #ffdf8c;
  }

  a {
    text-decoration: none;
  }
`;

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const pageLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <GlobalStyle />
      <UIDReset>
        <NextIntlProvider messages={pageProps.messages}>
          {pageLayout(<Component {...pageProps} />)}
        </NextIntlProvider>
      </UIDReset>
    </>
  );
};

export default App;
