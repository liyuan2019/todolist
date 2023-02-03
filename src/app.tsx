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

export const App: React.FC = () => {
  const { state, setState, onDragEnd } = useDrag();
  const useModalReturn = useModal(state, setState);
  const useProjectModalReturn = useProjectModal(state, setState);
  const { openModal, onClickTask } = useModalReturn;
  const { openProjectModal } = useProjectModalReturn;

  return (
    <Layout
      openModal={openModal}
      state={state}
      setState={setState}
      onClickTask={onClickTask}
    >
      <TaskModal
        useModalReturn={useModalReturn}
        projects={state.projects.map((p) => p.name)}
        openProjectModal={openProjectModal}
      />
      <ProjectModal useProjectModalReturn={useProjectModalReturn} />
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
                // onClickDelete={onClickDelete}
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
  justify-content: center;

  @media screen and (max-width: 1047px) {
    width: 100%;
    padding: 0 12px;
  }
`;
