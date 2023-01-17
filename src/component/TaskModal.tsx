import { theme } from "../styles/theme";
import Modal from "react-modal";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi";
import { RiCalendarTodoFill } from "react-icons/ri";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { useAutoResizeTextArea } from "../hooks/useAutoResizeTextArea";
import { UseModalReturn } from "../hooks/useModal";
import { initialData } from "../data/initial-data";

Modal.setAppElement("#root");

const modalStyle = {
  overlay: {
    backgroundColor: `${theme.colors.backgroundOverlay}`,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "24px",
    width: `${theme.modalDialogWidth}`,
    maxHeight: `${theme.modalDialogMaxHeight}`,
  },
};

type TaskModalProps = {
  useModalReturn: UseModalReturn;
};

export const TaskModal: React.FC<TaskModalProps> = ({ useModalReturn }) => {
  registerLocale("ja", ja);
  const today = new Date();

  const {
    modalOpen,
    title,
    memo,
    subTask,
    toDoDate,
    editFlag,
    editColumnId,
    closeModal,
    onChangeTitle,
    onChangeMemo,
    onChangeSubTask,
    onClickSubTaskAdd,
    setTodoDate,
    onClickCancel,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  } = useModalReturn;

  const textAreaRef = useAutoResizeTextArea(memo);

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={modalStyle}
      contentLabel="タスクを作成"
    >
      <ModalHeader>
        <span>{editFlag ? "タスクを修正" : "タスクを作成"}</span>
        {editFlag && (
          <span
            className="status"
            data-type={initialData.columns[editColumnId].title}
          >
            {initialData.columns[editColumnId].title}
          </span>
        )}
      </ModalHeader>
      <CreateTask>
        <Title
          placeholder="タイトル"
          type="text"
          value={title}
          onChange={onChangeTitle}
        />
        <Memo
          placeholder="メモ"
          value={memo}
          onChange={onChangeMemo}
          ref={textAreaRef}
        ></Memo>
        <Subtask>
          {subTask.map(
            (sub, index) =>
              sub !== null && (
                <li key={`subtask_${index}`}>
                  <input
                    placeholder="サブタスク"
                    type="text"
                    value={sub}
                    onChange={(e) => onChangeSubTask(e, index)}
                    autoFocus={index === subTask.length - 1 ? true : false}
                  ></input>
                </li>
              )
          )}
        </Subtask>
        <SubtaskCreateButton id="subTaskAdd" onClick={onClickSubTaskAdd}>
          <HiPlus color={theme.colors.primaryblue} />
          <span>サブタスクを追加</span>
        </SubtaskCreateButton>
        <TaskDate>
          <RiCalendarTodoFill color={theme.colors.primaryblue} />
          <div>
            <DatePicker
              popperPlacement="right-start"
              className="date-picker"
              selected={new Date(toDoDate)}
              onChange={(date) =>
                setTodoDate(date ? date.toLocaleDateString() : "")
              }
              locale="ja"
              dateFormat="yyyy/MM/dd"
              minDate={today}
              dateFormatCalendar={"yyyy年 MM月"}
            />
          </div>
        </TaskDate>
      </CreateTask>
      <ModalFooter>
        {editFlag && <DeleteButton onClick={onClickDelete}>削除</DeleteButton>}
        <Button onClick={onClickCancel}>キャンセル</Button>
        <CreateButton
          editFlag={editFlag}
          disabled={title === ""}
          onClick={onClickAdd}
        >
          作成
        </CreateButton>
        <EditButton
          editFlag={editFlag}
          disabled={title === ""}
          onClick={onClickEdit}
        >
          修正
        </EditButton>
      </ModalFooter>
    </Modal>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  font-size: 20px;
  line-height: 1;

  .status {
    font-size: 12px;
    padding: 8px;
    border-radius: 3px;

    &[data-type="TO DO"] {
      background-color: #dee1e5;
    }

    &[data-type="IN PROGRESS"] {
      color: white;
      background-color: #eb8906;
    }

    &[data-type="DONE"] {
      color: white;
      background-color: #038859;
    }
  }
`;

const CreateTask = styled.div`
  height: 65%;
  border: 1px solid ${theme.colors.textInputBorder};
  border-radius: 3px;
  padding: 20px;
  overflow: hidden auto;
  margin-bottom: 22px;
`;

const Title = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: 600;

  &::placeholder {
    font-style: italic;
  }

  &:focus {
    outline: none;
  }
`;

const Memo = styled.textarea`
  resize: none;
  width: 100%;
  margin-top: 10px;
  font-size: 14px;

  &::placeholder {
    font-style: italic;
  }

  &:focus {
    outline: none;
  }
`;

const Subtask = styled.ul`
  list-style-type: disc;
  padding-left: 15px;

  li {
    padding: 2px 0;

    input {
      width: 100%;

      &::placeholder {
        font-style: italic;
      }

      &:focus {
        outline: none;
      }
    }
  }

  li::marker {
    color: ${theme.colors.primaryblue};
  }
`;

const MenuButton = styled.button`
  display: inline-flex;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  line-height: 32px;
  padding: 0px 4px;

  &:hover {
    color: ${theme.colors.primaryblue};
    background-color: ${theme.colors.backgroungHover};
  }
`;

const SubtaskCreateButton = styled(MenuButton)`
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 32px;
  padding: 0px 5px;
`;

const TaskDate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 32px;
  padding: 0px 5px;
  margin-top: 10px;

  .date-picker {
    background-color: ${theme.colors.backgroundInput};

    &:hover {
      color: ${theme.colors.primaryblue};
      background-color: ${theme.colors.backgroungHover};
    }

    &:focus {
      outline: none;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: ${theme.colors.primaryblue};
  border-radius: 3px;
  color: white;
  padding: 0px 10px;
  margin-left: 12px;
  height: 32px;

  &:hover {
    opacity: ${theme.opacity};
  }

  &:disabled {
    background-color: #f1f5f9;
    color: #cbd5e1;
  }

  @media screen and (max-width: 961px) {
    padding: 0px 6px;
  }
`;

const CreateButton = styled(Button)<{ editFlag: boolean }>`
  ${({ editFlag }) => editFlag && "display: none"};
`;

const EditButton = styled(Button)<{ editFlag: boolean }>`
  ${({ editFlag }) => !editFlag && "display: none"};
`;

const DeleteButton = styled.button`
  color: ${theme.colors.textLowEmphasis};
  text-decoration: underline;

  &:hover {
    color: red;
  }
`;
