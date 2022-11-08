import { ColumnType, TaskType } from "@/type";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Task } from "./task";

type ColumnProps = {
  column: ColumnType;
  tasks: TaskType[];
};

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
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
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "skyblue" : "white"};
  flex-grow: 1;
  min-height: 100px;
`;
