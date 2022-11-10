import React from "react";
import { Column } from "./component/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { Layout } from "./component/Layout";
import { useDrag } from "./hooks/useDrag";
import { useModal } from "./hooks/useModal";
import { TaskModal } from "./component/TaskModal";

export const App: React.FC = () => {
  const { state, setState, onDragEnd } = useDrag();
  const useModalReturn = useModal(state, setState);
  const { openModal, onClickTask } = useModalReturn;

  return (
    <Layout openModal={openModal}>
      <TaskModal useModalReturn={useModalReturn} />
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
