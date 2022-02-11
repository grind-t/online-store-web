import { css } from 'styled-components';

const precision = 4;

function rem(value: number, base = 16): string {
  return (value / base).toFixed(precision) + 'rem';
}

function em(value: number, base = 16): string {
  return (value / base).toFixed(precision) + 'em';
}

function lerp(x0: number, x1: number, y0: number, y1: number) {
  const slope = (y1 - y0) / (x1 - x0);
  const base = y0 - x0 * slope;
  return [slope, base];
}

function lerpByEM(
  from: number,
  to: number,
  fromEM: number,
  toEM: number
): string {
  const [slope, base] = lerp(fromEM, toEM, from, to);
  const em = slope.toFixed(precision) + 'em';
  const px = base.toFixed(precision) + 'px';
  return `calc(${em} + ${px})`;
}

function lerpByVW(
  from: number,
  to: number,
  fromVW: number,
  toVW: number
): string {
  const [slope, base] = lerp(fromVW, toVW, from, to);
  const vw = (100 * slope).toFixed(precision) + 'vw';
  const px = base.toFixed(precision) + 'px';
  return `calc(${vw} + ${px})`;
}

function up(minWidth: number) {
  return `(min-width: ${minWidth}px)`;
}

function hideVisually() {
  return css`
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
  `;
}

function miniReset() {
  return css`
    html {
      box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
      padding: 0;
      margin: 0;
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
  `;
}

function nunitoFont() {
  return css`
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
  `;
}

export { rem, em, lerpByEM, lerpByVW, up, hideVisually, miniReset, nunitoFont };
