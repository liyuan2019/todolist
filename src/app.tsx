import React from "react";
import { Column } from "./component/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { Layout } from "./component/Layout";
import { useDrag } from "./hooks/useDrag";
// import { useTaskModal } from "./hooks/useTaskModal";
import { TaskModal } from "./component/TaskModal";
import { ProjectModal } from "./component/ProjectModal";
// import { useProjectModal } from "./hooks/useProjectModal";
import { textColorOfBg } from "./utils/text-color";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./store/tasksSlice";
import { selectProjectFilterName } from "./store/filterSlice";

export const App: React.FC = () => {
  const tasks = useSelector(selectAllTasks);
  const projectFilterName = useSelector(selectProjectFilterName);

  const { onDragEnd } = useDrag();

  // const UseTaskModalReturn = useTaskModal();
  // const useProjectModalReturn = useProjectModal();
  // const { openTaskModal, onClickTask } = UseTaskModalReturn;
  // const {
  //   openProjectModal,
  //   onClickProjectEdit,
  //   projectFilterName,
  //   setProjectFilterName,
  // } = useProjectModalReturn;

  // const { onClickTask } = useTaskModal();

  const project = tasks.projects.find(({ name }) => name === projectFilterName);
  const projectColor = project?.color ?? "white";
  const projectTextColor = textColorOfBg(projectColor ?? "#172B4D");
  const projectIntrodution = project?.introduction ?? "";

  return (
    <Layout
    // onClickTask={onClickTask}
    // onClickProjectEdit={onClickProjectEdit}
    >
      <TaskModal
      // UseTaskModalReturn={UseTaskModalReturn}
      // openProjectModal={openProjectModal}
      />
      {/* <ProjectModal useProjectModalReturn={useProjectModalReturn} /> */}
      <ProjectModal />
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
          {tasks.columnOrder.map((columnId) => {
            const column = tasks.columns[columnId];
            const tasksOfcolumn = column.taskIds.map(
              (taskId) => tasks.tasks[taskId]
            );
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasksOfcolumn}
                // onClickTask={onClickTask}
                // projects={tasks.projects}
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
