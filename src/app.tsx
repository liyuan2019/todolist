import React from "react";
import { Column } from "./component/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { Layout } from "./component/Layout";
import { useDrag } from "./hooks/useDrag";
import { useModal } from "./hooks/useModal";
import { TaskModal } from "./component/TaskModal";
import { ProjectModal } from "./component/ProjectModal";
import { useProjectModal } from "./hooks/useProjectModal";
import { textColorOfBg } from "./utils/text-color";

export const App: React.FC = () => {
  const { state, setState, onDragEnd } = useDrag();
  const useModalReturn = useModal(state, setState);
  const useProjectModalReturn = useProjectModal(state, setState);
  const { openModal, onClickTask } = useModalReturn;
  const {
    openProjectModal,
    onClickProjectEdit,
    projectFilterName,
    setProjectFilterName,
  } = useProjectModalReturn;

  const project = state.projects.find(({ name }) => name === projectFilterName);
  const projectColor = project?.color ?? "white";
  const projectTextColor = textColorOfBg(projectColor ?? "#172B4D");
  const projectIntrodution = project?.introduction ?? "";

  return (
    <Layout
      openModal={openModal}
      openProjectModal={openProjectModal}
      state={state}
      setState={setState}
      onClickTask={onClickTask}
      onClickProjectEdit={onClickProjectEdit}
      setProjectFilterName={setProjectFilterName}
    >
      <TaskModal
        useModalReturn={useModalReturn}
        projects={state.projects.map((p) => p.name)}
        openProjectModal={openProjectModal}
      />
      <ProjectModal useProjectModalReturn={useProjectModalReturn} />
      {projectFilterName !== "" && (
        <ProjectInfo>
          <StyledProject
            color={projectColor}
            projectTextColor={projectTextColor}
          >
            {projectFilterName}
          </StyledProject>
          <div>{projectIntrodution}</div>
        </ProjectInfo>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onClickTask={onClickTask}
                projects={state.projects}
              />
            );
          })}
        </Container>
      </DragDropContext>
    </Layout>
  );
};

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  width: 1000px;
  justify-content: space-between;

  @media screen and (max-width: 1047px) {
    width: 100%;
    padding: 0 12px;
  }
`;

const StyledProject = styled.div<{ color: string; projectTextColor: string }>`
  font-size: 14px;
  background-color: ${({ color }) => color};
  color: ${({ projectTextColor }) => projectTextColor};
  padding: 0 8px;
  border-radius: 4px;
  line-height: 30px;
  width: fit-content;
`;

const ProjectInfo = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 auto 10px;
  gap: 8px;
  align-items: center;
`;
