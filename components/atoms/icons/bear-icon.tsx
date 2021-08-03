interface BearIconProps {
  className?: string;
}

const BearIcon = ({ className }: BearIconProps) => (
  <svg
    width="61"
    viewBox="0 0 61 69"
    fill="#FE5F1E"
    className={className}
    aria-hidden
  >
    <path d="M27.1671 0.198708C27.1016 0.308517 26.7739 0.462242 26.4463 0.52813C24.9173 0.901474 22.6237 3.18546 22.1213 4.83256C21.6626 6.26005 21.9466 7.77539 23.148 10.1472C23.279 10.4327 23.0606 10.7182 22.0776 11.4869C19.9151 13.1559 17.3813 15.9889 16.5076 17.68C14.9786 20.6667 14.9349 20.7985 14.3888 22.6213C13.799 24.5978 13.4714 27.2771 13.4714 29.8027C13.4714 30.9886 13.4277 33.5141 13.3621 35.4028C13.2311 38.2798 13.2748 39.1363 13.6024 40.5637C13.8209 41.5081 14.083 42.3865 14.1922 42.5183C14.4325 42.8477 14.1922 43.0454 13.7553 42.8697C12.0516 42.2548 8.64399 38.4335 7.44261 35.7981C5.93542 32.5478 5.5204 31.1203 5.17091 28.2214C4.97432 26.3986 4.99616 25.63 5.28013 23.6096C5.65146 20.9961 5.95727 19.942 6.96206 17.8776C7.31155 17.1529 7.59552 16.4501 7.59552 16.3184C7.59552 16.1866 7.66105 16.0329 7.77026 15.9889C7.85764 15.945 8.36003 15.3521 8.88427 14.6273C9.97644 13.1559 12.5103 10.6084 13.0782 10.4327C13.4058 10.3229 13.8645 9.66407 13.5806 9.66407C13.4058 9.66407 10.5662 11.2233 10.4351 11.399C10.3696 11.4649 10.0638 11.7065 9.71432 11.9261C8.42556 12.7606 6.00095 15.3081 4.75589 17.1529C4.03506 18.207 3.44529 19.1733 3.44529 19.2612C3.44529 19.349 3.29238 19.7224 3.11764 20.0738C2.94289 20.4251 2.48418 21.6111 2.11285 22.7091C1.50123 24.5319 1.2828 25.8277 0.95515 29.5172C0.82409 31.0105 1.34833 36.7205 1.69782 37.6429C1.80704 37.9723 1.95994 39.7951 2.00363 41.6838C2.091 44.9121 2.44049 47.0424 3.00842 47.7671C3.09579 47.8769 3.2487 48.36 3.31423 48.8432C3.4016 49.3044 3.59819 49.9852 3.77294 50.3805C3.92584 50.7538 4.23165 51.5005 4.45008 52.0496C5.76068 55.2779 7.92317 57.9132 10.1075 58.9674C11.1778 59.4725 11.7894 59.6043 13.4058 59.6921C15.5465 59.8019 16.5731 59.5823 17.5124 58.8356C18.2551 58.2427 18.2551 57.4521 17.425 54.9045C16.2236 51.1052 16.3547 48.3161 17.5998 50.8856C17.8837 51.4786 18.2551 52.2252 18.4298 52.5547C18.6045 52.906 18.7356 53.2794 18.7356 53.4112C18.7356 53.8504 21.6408 59.6482 22.58 61.0757C23.4756 62.4373 25.7036 64.853 26.8395 65.7315C27.6258 66.3245 29.5699 67.2029 30.946 67.5763C32.7153 68.0814 35.7079 68.1473 37.1277 67.73C38.3509 67.3566 39.4867 66.8076 39.7489 66.4343C40.0765 65.995 39.9018 64.9409 39.2902 63.6012C38.4383 61.7345 37.6519 58.5062 37.3898 55.6951C37.2587 54.3555 37.6301 51.0393 37.9577 50.6221C38.0451 50.4903 38.198 50.1609 38.2854 49.8534C38.3727 49.546 38.7441 48.931 39.1154 48.4698C39.6833 47.7451 39.8581 47.6353 40.5352 47.7012C41.1031 47.7451 41.4526 47.9647 41.9114 48.5357C42.4574 49.2165 42.5667 49.5899 42.7196 51.3687C42.9161 53.6088 42.7196 56.0026 42.2172 57.5179C41.7148 59.0113 41.7803 61.9322 42.3264 62.9863C43.1346 64.5456 43.4185 64.6774 45.7995 64.6774C47.4159 64.6774 48.1585 64.5675 48.9012 64.2381C50.4739 63.5573 52.1122 62.4373 53.1607 61.3173C54.3402 60.0655 56.0003 56.8371 56.8522 54.1359C57.1798 53.0378 57.5512 52.0056 57.6385 51.8299C57.8788 51.3687 58.5996 48.7334 59.0365 46.669C59.2331 45.7027 59.5389 44.3191 59.6918 43.5944C59.8666 42.8697 60.0631 41.7277 60.1505 41.0689C60.216 40.41 60.3253 39.6633 60.3908 39.4218C60.4345 39.1802 60.5437 37.2037 60.6092 35.0075C60.7184 31.867 60.6529 30.5713 60.3689 28.7485C60.1724 27.4967 59.9102 26.2669 59.801 26.0253C59.7136 25.7837 59.5389 25.3884 59.4515 25.1469C59.3642 24.8614 59.1676 25.5641 58.9273 27.2332C58.2283 32.0208 57.2672 34.173 54.6678 36.8083C51.9811 39.5535 48.9449 40.8273 45.1442 40.8492C44.2267 40.8492 44.052 40.9371 43.2875 41.7716C41.7148 43.5505 40.841 43.836 39.312 43.0893C37.6738 42.2548 36.5161 42.0791 34.9652 42.3865C33.7201 42.6281 33.4798 42.6281 32.8464 42.2767C32.1911 41.9254 31.1863 40.6736 31.1863 40.1904C31.1863 40.0806 31.0989 39.9708 30.9679 39.9708C30.8586 39.9708 30.7494 39.839 30.7494 39.6853C30.7494 39.2241 30.0941 38.719 28.7835 38.2139C26.0313 37.1597 23.7596 35.6224 22.6456 34.0851C22.3616 33.6898 22.0121 33.2286 21.881 33.0969C21.3786 32.5259 20.2865 29.3634 20.0462 27.7383C19.8933 26.794 19.7404 25.8277 19.6967 25.5861C19.5438 24.7955 20.2865 20.4691 20.9199 18.4925C21.5534 16.538 22.6237 14.4516 23.8469 12.8485C24.1964 12.3653 24.5241 11.9261 24.5678 11.8822C24.6115 11.8163 24.9828 11.9481 25.3978 12.1457C26.5337 12.6947 27.0797 12.6069 28.1501 11.7065C28.6743 11.2453 29.1549 10.828 29.2204 10.7621C29.5699 10.3888 31.8634 9.00523 32.1692 9.00523C32.5624 9.00523 33.5891 8.41227 33.9822 7.92912C34.6375 7.11655 34.2007 4.72275 32.9993 2.52661C32.1256 0.945396 30.4655 0.00105286 28.5651 0.00105286C27.8661 0.00105286 27.2327 0.0888977 27.1671 0.198708ZM36.9311 43.9458C37.3243 44.0556 38.198 44.1435 38.8751 44.1435C39.5523 44.1435 40.1639 44.2313 40.2294 44.3411C40.4479 44.6705 39.0936 45.6588 38.2198 45.8125C37.2587 46.0102 35.3584 45.6368 34.572 45.1098C34.2662 44.9121 33.8512 44.4509 33.6764 44.0776L33.3269 43.4187L34.7904 43.5944C35.5768 43.6823 36.5379 43.836 36.9311 43.9458Z" />
    <path d="M52.2654 4.33707C50.7364 5.14954 49.6225 6.53293 48.8798 8.53117C48.2901 10.1122 48.5522 10.7051 50.2996 11.7371C51.7412 12.5716 52.7678 13.4499 53.576 14.5039C55.4326 16.8974 57.8134 16.4143 59.9758 13.1864L60.9369 11.7591L60.8495 10.1122C60.784 9.21189 60.6092 8.22375 60.4345 7.91633C59.0147 5.41304 56.7868 3.96377 54.3841 3.96377C53.4667 3.98573 52.6804 4.11748 52.2654 4.33707Z" />
    <path d="M30.4217 22.7626C29.6354 22.9822 28.0409 24.1899 27.3419 25.1122C25.4635 27.6375 25.5072 30.8215 27.4293 32.666C28.0846 33.3028 28.3248 33.3906 29.3733 33.3906C30.9896 33.3906 31.8415 32.7758 33.6107 30.3164C33.9165 29.8772 34.4626 29.2404 34.7902 28.8891C35.3144 28.2962 35.38 28.1205 35.2707 27.1324C35.0742 25.4196 34.7465 24.5193 33.9602 23.619C33.3049 22.8724 33.1302 22.7846 32.0381 22.7187C31.4046 22.6968 30.662 22.7187 30.4217 22.7626Z" />
    <path d="M45.4503 24.9368C43.965 25.5736 42.0647 29.2407 42.8947 29.8556C43.1568 30.0312 44.4455 32.7321 44.6421 33.4787C44.8387 34.3132 46.4987 35.9381 47.3287 36.1357C47.8311 36.2455 48.2898 36.1577 49.0543 35.7844C50.3867 35.1256 50.6924 34.8182 51.2604 33.5666C52.2433 31.3487 51.5661 27.9451 49.7751 26.1445C48.3335 24.6953 46.8919 24.3 45.4503 24.9368Z" />
    <path d="M34.0705 37.3874C33.5682 37.629 33.2187 38.4636 33.4589 38.8369C33.5245 38.9467 34.0269 39.2542 34.5729 39.5177C35.119 39.7812 35.949 40.3303 36.4077 40.7695L37.2814 41.5381L38.1551 40.9891C38.6356 40.6597 39.269 40.4181 39.553 40.4181C40.2301 40.4181 41.4533 39.8032 41.4533 39.4738C41.4533 38.8369 41.1693 38.2879 40.7325 38.0024C39.5748 37.2776 35.1408 36.8823 34.0705 37.3874Z" />
  </svg>
);

export default BearIcon;
export type { BearIconProps };
