import store from 'app/redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
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
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </UIDReset>
    </>
  );
};

export default App;
