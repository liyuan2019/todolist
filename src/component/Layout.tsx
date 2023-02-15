import GlobalStyle from "../styles/global";
import { theme } from "../styles/theme";
import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Main>{children}</Main>
    </ThemeProvider>
  );
};

const Main = styled.main`
  margin: 20px auto;
  overflow: hidden;

  @media screen and (max-width: 1047px) {
    width: 100%;
    margin: 10px auto;
  }
`;
