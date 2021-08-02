import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { UIDReset } from 'react-uid';
import { ThemeProvider } from 'styled-components';
import { miniReset, nunitoFont } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

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
        <ThemeProvider theme={{ breakpoints }}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UIDReset>
    </>
  );
};

export default App;
