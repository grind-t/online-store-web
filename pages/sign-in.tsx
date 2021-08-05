import styled from 'styled-components';
import Head from 'next/head';
import Script from 'next/script';
import firebase from 'firebase/client';

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
  //@ts-ignore
  const ui = new window.firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', {
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
