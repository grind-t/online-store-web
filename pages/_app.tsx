import { AppProps } from 'next/app'
import { createGlobalStyle, css } from 'styled-components'

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
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  html:focus-within {
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.5;
    font-family: 'Nunito', 'Trebuchet MS', sans-serif;
    background-color: #ffdf8c;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
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

const globalClasses = css`
  .sr-only {
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
`

const GlobalStyle = createGlobalStyle`
  ${fontFaces}
  ${reset}
  ${globalClasses}
`

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App