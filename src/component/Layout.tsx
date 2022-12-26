import GlobalStyle from "../styles/global";
import { theme } from "../styles/theme";
import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";
import { Board } from "@/type";

type LayoutProps = {
  children: ReactNode;
  openModal: () => void;
  setState: React.Dispatch<React.SetStateAction<Board>>;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  openModal,
  setState,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header openModal={openModal} setState={setState} />
      <Main>{children}</Main>
    </ThemeProvider>
  );
};

const Main = styled.main`
  margin: 80px auto;
  overflow: hidden;

  @media screen and (max-width: 1047px) {
    width: 100%;
    margin: 50px auto;
  }
`;
