import { theme } from "../styles/theme";
import Modal from "react-modal";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi";
import { RiCalendarTodoFill } from "react-icons/ri";
import BootstrapModal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { useAutoResizeTextArea } from "../hooks/useAutoResizeTextArea";
import { useTaskModal } from "../hooks/useTaskModal";
import { initialData, priorities } from "../data/initial-data";
import { Dropdown } from "react-bootstrap";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector, RootState } from "../store";
import { setProjectModalOpen } from "../store/projectModalSlice";
import { useState } from "react";

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

export const TaskModal: React.FC = () => {
  const dispatch = useDispatch();
  const { taskModalOpen, editFlag, editColumnId } = useSelector(
    (state: RootState) => state.taskModal
  );
  const projects = useSelector((state: RootState) =>
    state.tasks.projects.map((p) => p.name)
  );

  registerLocale("ja", ja);
  const today = new Date();

  const {
    title,
    memo,
    subTask,
    toDoDate,
    priority,
    projectName,
    resetTask,
    onChangeTitle,
    onChangeMemo,
    onChangeSubTask,
    onClickSubTaskAdd,
    onChangePriority,
    onChangeProjectName,
    setTodoDate,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  } = useTaskModal();

  const textAreaRef = useAutoResizeTextArea(memo);

  const [deleteDialogShow, setDeleteDialogShow] = useState(false);

  const handleDelete = () => {
    onClickDelete();
    setDeleteDialogShow(false);
  };

  return (
    <>
      <Modal
        isOpen={taskModalOpen}
        onRequestClose={resetTask}
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
          <Others>
            <TaskDate>
              <RiCalendarTodoFill color={theme.colors.primaryblue} />
              <div
                data-is-expired={
                  new Date(toDoDate) < new Date(new Date().toLocaleDateString())
                }
              >
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
            <TaskProject>
              <label>プロジェクト</label>
              <Dropdown as={ButtonWrapper} drop="up" id="project">
                <Dropdown.Toggle as={MenuButton}>
                  <Option>
                    <span>{projectName}</span>
                    <BiChevronDown size={16} color="#97A1AF" />
                  </Option>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {projects.map((p) => (
                    <Dropdown.Item
                      key={p}
                      onClick={(e) => onChangeProjectName(p)}
                    >
                      <Option>
                        <span>{p}</span>
                      </Option>
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item
                    onClick={() => dispatch(setProjectModalOpen())}
                  >
                    <Option>
                      <AiOutlinePlus color="green" size={18} />
                      <span>プロジェクト追加</span>
                    </Option>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </TaskProject>
            <TaskPriority>
              <label>優先度</label>
              <Dropdown as={ButtonWrapper} drop="end">
                <Dropdown.Toggle as={MenuButton}>
                  <Option>
                    <img
                      src={
                        priorities.filter((p) => p.priority === priority)[0]
                          .imgPath
                      }
                      alt=""
                      width={20}
                      height={20}
                    />
                    <span>
                      {
                        priorities.filter((p) => p.priority === priority)[0]
                          .text
                      }
                    </span>
                    <BiChevronDown size={16} color="#97A1AF" />
                  </Option>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {priorities
                    .filter((p) => p.priority !== priority)
                    .map(({ priority, text, imgPath }) => (
                      <Dropdown.Item
                        onClick={(e) => onChangePriority(priority)}
                        key={priority}
                      >
                        <Option>
                          <img src={imgPath} alt="" width={20} height={20} />
                          <span>{text}</span>
                        </Option>
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </TaskPriority>
          </Others>
        </CreateTask>
        <ModalFooter>
          {editFlag && (
            <DeleteButton onClick={() => setDeleteDialogShow(true)}>
              削除
            </DeleteButton>
          )}
          <Button onClick={resetTask}>キャンセル</Button>
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
      <BootstrapModal
        show={deleteDialogShow}
        onHide={() => setDeleteDialogShow(false)}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>タスクの削除</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          このタスクを本当に削除してよろしいですか？
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <BootstrapButton
            variant="secondary"
            onClick={() => setDeleteDialogShow(false)}
          >
            いいえ
          </BootstrapButton>
          <BootstrapButton variant="danger" onClick={handleDelete}>
            はい
          </BootstrapButton>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  font-size: 24px;
  font-weight: 600;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;

  .dropdown-toggle::after {
    display: none;
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

const Others = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  gap: 40px;
  margin-top: 10px;
`;

const TaskDate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 32px;
  /* padding: 0px 5px; */

  div[data-is-expired="true"] {
    .date-picker {
      color: red;
    }
  }

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

const TaskProject = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .dropup {
    background-color: ${theme.colors.backgroundInput};
  }

  .dropdown-menu {
    max-height: 150px;
    overflow-y: scroll;
  }
`;

const TaskPriority = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .dropend {
    background-color: ${theme.colors.backgroundInput};
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;

  img,
  svg {
    margin-right: 5px;
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
