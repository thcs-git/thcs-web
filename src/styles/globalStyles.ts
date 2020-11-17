import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 100%;
  }

  *, button, input {
    border: 0;
    background: none;
  }

  html {
    background: var(--primary);
  }
  :root {
    --primary: #000;
    --secondary: #15181C;
    --gray: #7A7A7A;
    --outline: #2F3336;
  }
`;
