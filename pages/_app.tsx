import AuthProvider from 'components/auth/auth-provider';
import Route from 'components/common/utils/route';
import { NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';
import { UIDReset } from 'react-uid';
import { createGlobalStyle } from 'styled-components';
import { miniReset, nunitoFont } from 'styles/mixins';

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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <UIDReset>
        <NextIntlProvider messages={pageProps.messages}>
          <AuthProvider>
            <Route isProtected={pageProps.isProtected}>
              <Component {...pageProps} />
            </Route>
          </AuthProvider>
        </NextIntlProvider>
      </UIDReset>
    </>
  );
};

export default App;
