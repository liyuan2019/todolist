import GlobalStyle from "../styles/global";
import { theme } from "../styles/theme";
import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";
import { Board, Project, ToDo } from "../type";

type LayoutProps = {
  children: ReactNode;
  openModal: () => void;
  openProjectModal: () => void;
  state: Board;
  setState: React.Dispatch<React.SetStateAction<Board>>;
  onClickTask: (todo: ToDo, columnId: string, taskId: string) => void;
  onClickProjectEdit: (project: Project) => void;
  setProjectFilterName: React.Dispatch<React.SetStateAction<string>>;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  openModal,
  openProjectModal,
  state,
  setState,
  onClickTask,
  onClickProjectEdit,
  setProjectFilterName,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header
        openModal={openModal}
        openProjectModal={openProjectModal}
        state={state}
        setState={setState}
        onClickTask={onClickTask}
        onClickProjectEdit={onClickProjectEdit}
        setProjectFilterName={setProjectFilterName}
      />
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
