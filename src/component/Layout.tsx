import GlobalStyle from "../styles/global";
import { theme } from "../styles/theme";
import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";
import { Board, ToDo } from "../type";

type LayoutProps = {
  children: ReactNode;
  openModal: () => void;
  state: Board;
  setState: React.Dispatch<React.SetStateAction<Board>>;
  onClickTask: (todo: ToDo, columnId: string, taskId: string) => void;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  openModal,
  state,
  setState,
  onClickTask,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header
        openModal={openModal}
        state={state}
        setState={setState}
        onClickTask={onClickTask}
      />
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
