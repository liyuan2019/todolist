import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
html,body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${theme.colors.text};
  text-decoration-skip-ink: auto;
  line-height: 20px;

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  ul,ol {
    list-style: none;
  }

  button {
    border: none;
    background-color: transparent;
  }

  input, textarea {
    border: none;
  }

  // @media screen and (max-width: 1047px) {
  //   font-size: 62.5%;
  //   line-height: 1.4;
  // }
}
`;
export default GlobalStyle;
