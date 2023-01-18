import { theme } from "../styles/theme";
import { ToDo, ToDoColumn, ToDoTask } from "../type";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Task } from "./Task";

type ColumnProps = {
  column: ToDoColumn;
  tasks: ToDoTask[];
  onClickTask: (todo: ToDo, columnId: string, taskId: string) => void;
  // onClickDelete: (
  //   e: React.MouseEvent<HTMLButtonElement | SVGElement, MouseEvent>,
  //   cloumnId: string,
  //   taskId: string
  // ) => void;
};

export const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  onClickTask,
  // onClickDelete,
}) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                columnId={column.id}
                index={index}
                onClickTask={onClickTask}
                // onClickDelete={onClickDelete}
              />
            ))}
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
