import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { UIDReset } from 'react-uid';
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
        <Component {...pageProps} />
      </UIDReset>
    </>
  );
};

export default App;
