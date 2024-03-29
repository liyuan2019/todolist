import { theme } from "../styles/theme";
import { ToDoTask } from "../type";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { CgCalendarDue } from "react-icons/cg";
import { priorities } from "../data/initial-data";
import { textColorOfBg } from "../utils/text-color";
import { useDispatch, useSelector, RootState } from "../store";
import { selectProjectColor } from "../store/tasksSlice";
import { setTaskModal } from "../store/taskModalSlice";

type TaskProps = {
  task: ToDoTask;
  index: number;
  columnId: string;
};

export const Task: React.FC<TaskProps> = ({ task, index, columnId }) => {
  const dispatch = useDispatch();

  const projectColor = useSelector((state: RootState) =>
    selectProjectColor(state, task.content.projectName)
  );
  const projectTextColor = textColorOfBg(projectColor ?? "#172B4D");

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() =>
            dispatch(
              setTaskModal({ todo: task.content, columnId, taskId: task.id })
            )
          }
        >
          <Title>{task.content.title}</Title>
          <Memo>{task.content.memo}</Memo>
          <Others>
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
            <StyledProject
              color={projectColor}
              projectTextColor={projectTextColor}
            >
              {task.content.projectName}
            </StyledProject>
            <Priority>
              <img
                src={
                  priorities.filter(
                    (p) => p.priority === task.content.priority
                  )[0].imgPath
                }
                alt=""
                width={20}
                height={20}
              />
            </Priority>
          </Others>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  border-radius: 3px;
  box-shadow: rgba(23, 43, 77, 0.2) 0 1px 1px 0, rgba(23, 43, 77, 0.2) 0 0 1px 0;
  transition: background-color 140ms ease-in-out 0s, color 140ms ease-in-out 0s;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  color: ${theme.colors.text};

  &:hover {
    opacity: 0.6;
  }
`;

const Title = styled.div`
  word-wrap: break-word;
  word-break: break-word;
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

  span {
    margin-left: 2px;
    color: ${({ isExpired }) => (isExpired ? "red" : "inherit")};
  }
`;

const Others = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const Priority = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledProject = styled.div<{ color: string; projectTextColor: string }>`
  font-size: 10px;
  background-color: ${({ color }) => color};
  color: ${({ projectTextColor }) => projectTextColor};
  padding: 0 4px;
  border-radius: 4px;
  line-height: 20px;
`;
