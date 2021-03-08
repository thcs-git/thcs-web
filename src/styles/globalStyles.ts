import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size:16px;
    font-family: 'Open Sans', sans-serif !important;
  }

  html, body, #root {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 100%;
    background-color: var(--background);

  }

  *, button, input {
    border: 0;
    background: none;
  }

  html {
    /* background: var(--primary); */
  }

  a, a:hover, a:visited, a:active {
    text-decoration: none;
    color: var(--black);
  }

  h1, h2, h3, h4, h5 {
    color: var(--primary);
  }

  .text-danger {
    color: var(--danger);
  }

  p, button, span {
    font-size: 14px !important;
  }

  :root {
    --primary: #16679A;
    --primary-foccus:#7AC7D8;
    --primary-hover: #16679A99;
    --secondary: #0899BA;
    --gray: #CCCCCC;
    --gray-light: #F2F2F2;
    --gray-dark: #666666;
    --outline: #2F3336;
    --success: #4FC66A;
    --sucess-button-hover:4EC86F0A;
    --success-hover: #4FC66A99;
    --button-hover:#4EC86F0A;
    --alert:#B00020
    --danger: #FF6565;
    --danger-hover:#FF6568;
    --warning: #f9ca24;
    --white: #FFFFFF;
    --background: #FAFAFA;
    --switch-hover: rgba(8, 153, 186, 0.04)
    --black: #333333;
    --disable: #CCCCCC38;
    --purple: #6447C6;
    --orange: #E57B00;
    --yellow: #EBB500;
    --cyan: #0899BA;
  }

  .blur {
    filter: blur(2px);
  }

  /* Spinner */
  body .spinner-loading {
    position: absolute !important;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff99;
    z-index: 300000;
    top: 0;
  }

  body .spinner-loading div {
    left: unset !important;
  }
`;
