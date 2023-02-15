import GlobalStyle from "../styles/global";
import { theme } from "../styles/theme";
import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
  // openTaskModal: () => void;
  // openProjectModal: () => void;
  // onClickTask: (todo: ToDo, columnId: string, taskId: string) => void;
  // onClickProjectEdit: (project: Project) => void;
  // setProjectFilterName: React.Dispatch<React.SetStateAction<string>>;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  // openTaskModal,
  // openProjectModal,
  // onClickTask,
  // onClickProjectEdit,
  // setProjectFilterName,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header
      // openTaskModal={openTaskModal}
      // openProjectModal={openProjectModal}
      // onClickTask={onClickTask}
      // onClickProjectEdit={onClickProjectEdit}
      // setProjectFilterName={setProjectFilterName}
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
