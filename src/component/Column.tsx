import { theme } from "../styles/theme";
import { ToDoColumn, ToDoTask } from "../type";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Task } from "./Task";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type ColumnProps = {
  column: ToDoColumn;
  tasks: ToDoTask[];
};

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const projectFilterName = useSelector(
    (state: RootState) => state.filter.projectFilterName
  );
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map(
              (task, index) =>
                (projectFilterName === "" ||
                  task.content.projectName === projectFilterName) && (
                  <Task
                    key={task.id}
                    task={task}
                    columnId={column.id}
                    index={index}
                  />
                )
            )}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

const Container = styled.div`
  margin: 8px;
  /* border: 1px solid lightgrey; */
  border-radius: 2px;
  width: 300px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.textSubtlest};
  background-color: ${theme.colors.backgroundBorad};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const TaskList = styled.div`
  padding: 8px;
  background-color: ${theme.colors.backgroundBorad};
  flex-grow: 1;
  min-height: 100px;
  margin-top: 8px;
`;
