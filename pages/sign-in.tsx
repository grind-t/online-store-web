import styled from 'styled-components';
import Head from 'next/head';
import Script from 'next/script';
import firebase from 'next-firebase/client-app/compat';
import 'firebase/compat/auth';
import { useEffect } from 'react';

//#region styled
const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;
//#endregion

function initUI() {
  // @ts-ignore
  const firebaseUI = window.firebaseui;
  if (!firebaseUI) return;

  const ui =
    firebaseUI.auth.AuthUI.getInstance() ||
    new firebaseUI.auth.AuthUI(firebase.auth());

  ui.start('#firebaseui-auth-container', {
    signInSuccessUrl: window.location.origin,
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'RU',
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  });
}

const SignIn = () => {
  useEffect(initUI, []);
  return (
    <Page>
      <Script
        src="https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth__ru.js"
        onLoad={initUI}
      />
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/images/favicon.ico" />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css"
        />
      </Head>

      <Main>
        <div id="firebaseui-auth-container" />
      </Main>
    </Page>
  );
};

export default SignIn;
