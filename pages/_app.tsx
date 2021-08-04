import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { UIDReset } from 'react-uid';
import { miniReset, nunitoFont } from 'styles/mixins';
import { FirebaseAppProvider } from 'reactfire';

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

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <UIDReset>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <Component {...pageProps} />
        </FirebaseAppProvider>
      </UIDReset>
    </>
  );
};

export default App;
