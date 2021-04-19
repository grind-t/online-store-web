import { AppProps } from 'next/app'
import { createGlobalStyle, css } from 'styled-components'
import { UIDReset } from 'react-uid'

const fontFaces = css`
  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/nunito-v16-latin_cyrillic-regular.eot');
    src: local(''),
      url('/fonts/nunito-v16-latin_cyrillic-regular.eot?#iefix')
        format('embedded-opentype'),
      url('/fonts/nunito-v16-latin_cyrillic-regular.woff2') format('woff2'),
      url('/fonts/nunito-v16-latin_cyrillic-regular.woff') format('woff'),
      url('fonts/nunito-v16-latin_cyrillic-regular.ttf') format('truetype'),
      url('/fonts/nunito-v16-latin_cyrillic-regular.svg#Nunito') format('svg');
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/nunito-v16-latin_cyrillic-700.eot');
    src: local(''),
      url('/fonts/nunito-v16-latin_cyrillic-700.eot?#iefix')
        format('embedded-opentype'),
      url('/fonts/nunito-v16-latin_cyrillic-700.woff2') format('woff2'),
      url('/fonts/nunito-v16-latin_cyrillic-700.woff') format('woff'),
      url('/fonts/nunito-v16-latin_cyrillic-700.ttf') format('truetype'),
      url('/fonts/nunito-v16-latin_cyrillic-700.svg#Nunito') format('svg');
  }
`

const reset = css`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Nunito', 'Trebuchet MS', sans-serif;
    background-color: #ffdf8c;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`

const GlobalStyle = createGlobalStyle`
  ${fontFaces}
  ${reset}
`

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <UIDReset>
        <Component {...pageProps} />
      </UIDReset>
    </>
  )
}

export default App
