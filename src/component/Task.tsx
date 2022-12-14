import { theme } from "../styles/theme";
import { ToDo, ToDoTask } from "@/type";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { CgCalendarDue } from "react-icons/cg";
// import { AiOutlineCloseCircle } from "react-icons/ai";

type TaskProps = {
  task: ToDoTask;
  index: number;
  columnId: string;
  onClickTask: (todo: ToDo, columnId: string, taskId: string) => void;
  // onClickDelete: (
  //   e: React.MouseEvent<HTMLButtonElement | SVGElement, MouseEvent>,
  //   cloumnId: string,
  //   taskId: string
  // ) => void;
};

export const Task: React.FC<TaskProps> = ({
  task,
  index,
  columnId,
  onClickTask,
  // onClickDelete,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => onClickTask(task.content, columnId, task.id)}
        >
          {/* <Title>
            <span>{task.content.title}</span>
            <StyledAiOutlineCloseCircle
              onClick={(e) => onClickDelete(e, columnId, task.id)}
            />
          </Title> */}
          <Title>{task.content.title}</Title>
          <Memo>{task.content.memo}</Memo>
          {task.content.toDoDate && (
            <ScheduledDate
              isExpired={
                new Date(task.content.toDoDate) <
                new Date(new Date().toLocaleDateString())
              }
            >
              <CgCalendarDue />
              <span>{task.content.toDoDate}</span>
            </ScheduledDate>
          )}
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  /* border: 1px solid lightgrey; */
  border-radius: 3px;
  box-shadow: rgba(23, 43, 77, 0.2) 0 1px 1px 0, rgba(23, 43, 77, 0.2) 0 0 1px 0;
  transition: background-color 140ms ease-in-out 0s, color 140ms ease-in-out 0s;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  color: ${theme.colors.text};

  &:hover {
    opacity: 0.6;

    /* svg {
      display: inline-block;
    } */
  }
`;

// const StyledAiOutlineCloseCircle = styled(AiOutlineCloseCircle)`
//   display: none;
// `;

const Title = styled.div`
  word-wrap: break-word;
  word-break: break-word;

  /* display: flex;
  justify-content: space-between; */
`;

const Memo = styled.p`
  font-size: 12px;
  color: grey;
  word-wrap: break-word;
  word-break: break-all;
  margin-top: 8px;
`;

const ScheduledDate = styled.div<{ isExpired: boolean }>`
  display: flex;
  align-items: center;

  font-size: 12px;
  color: grey;
  margin-top: 8px;

  span {
    margin-left: 2px;
    color: ${({ isExpired }) => (isExpired ? "red" : "inherit")};
  }
`;
