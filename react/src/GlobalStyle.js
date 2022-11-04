import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; padding: 0; box-sizing: border-box;
  }
  ul,ol,li {
    list-style: none;
  }
  a {
    text-decoration: none; color: #777;
  }
  body {
    background: #efefef;
  }
`;

export default GlobalStyle;