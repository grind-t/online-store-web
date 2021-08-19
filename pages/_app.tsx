import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { UIDReset } from 'react-uid';
import { miniReset, nunitoFont } from 'styles/mixins';
import { initializeClientApp } from 'next-firebase/client-app';

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
  initializeClientApp();
  if (process.env.NODE_ENV === 'development') {
    const { getAuth, connectAuthEmulator } = require('firebase/auth');
    const {
      getFirestore,
      connectFirestoreEmulator,
    } = require('firebase/firestore');
    connectAuthEmulator(getAuth(), 'http://localhost:9099');
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
  }

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
