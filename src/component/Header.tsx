import { theme } from "../styles/theme";
import Modal from "react-modal";
import styled from "styled-components";
import { SiTodoist } from "react-icons/si";
import { IoIosNotifications, IoIosSettings, IoMdSearch } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { AiFillQuestionCircle, AiOutlinePlus } from "react-icons/ai";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { baseURL, initialData } from "../data/initial-data";
import { Project, ToDo } from "../type";
import { textColorOfBg } from "../utils/text-color";
import { clearState, selectAllTasks, setTasks } from "../store/tasksSlice";
import { useDispatch, useSelector } from "../store";
import { setProjectFilterName } from "../store/filterSlice";
import {
  setProjectModal,
  setProjectModalOpen,
} from "../store/projectModalSlice";
import { setTaskModal, setTaskModalOpen } from "../store/taskModalSlice";

export let loginId = "";

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
    padding: "100px",
    width: "800px",
    maxHeight: `${theme.modalDialogMaxHeight}`,
  },
};

const searchModalStyle = {
  overlay: {
    backgroundColor: "transparent",
  },
  content: {
    top: "50px",
    left: "auto",
    right: "20px",
    bottom: "auto",
    width: "800px",
    maxHeight: `${theme.modalDialogMaxHeight}`,
  },
};

type SearchResult = {
  id: string;
  content: ToDo;
  columnId: string;
};

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [seachText, setSearchText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isLogged, setIsLogged] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [composing, setComposition] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  const onChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const openLoginModal = () => {
    setIsSignUp(false);
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setName("");
    setEmail("");
    setPassword("");
    setLoginError("");
    setLoginModalOpen(false);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const openSignUp = () => {
    setLoginError("");
    setIsSignUp(true);
  };

  const signUp = () => {
    setIsDisabled(true);
    setLoginError("");
    if (email === "" || password === "" || name === "") {
      setLoginError("All the inputs are required.");
      return;
    }
    const data = JSON.stringify({
      email: email,
      password: password,
      showname: name,
      data: initialData,
    });

    const config = {
      method: "post",
      url: `${baseURL}/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        setIsDisabled(false);
        setName("");
        setEmail("");
        setPassword("");
        setIsSignUp(false);
      })
      .catch((error) => {
        console.log(error);
        setIsDisabled(false);
        setLoginError(error.response.data.message);
      });
  };

  const login = () => {
    setSearchText("");
    setIsDisabled(true);
    setLoginError("");
    if (email === "" || password === "") {
      setLoginError("All the inputs are required.");
      return;
    }
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: "post",
      url: `${baseURL}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        setIsDisabled(false);
        setLoginModalOpen(false);
        setIsLogged(response.data.showname);
        dispatch(setTasks(response.data.data));
        loginId = response.data._id;
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setIsDisabled(false);
        setLoginError(error.response.data.message);
      });
  };

  const logout = () => {
    setIsLogged("");
    setSearchText("");
    dispatch(setProjectFilterName(""));
    dispatch(clearState());
  };

  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !composing) {
      const tasksList = tasks.tasks;

      let taskStatus: { [key: string]: string } = {};
      let result: SearchResult[] = [];
      for (const [columnId, { taskIds }] of Object.entries(tasks.columns)) {
        taskIds.forEach((taskId) => {
          taskStatus[taskId] = columnId;
        });
      }

      for (const [taskId, { content }] of Object.entries(tasksList)) {
        let searchContent: string[] = [];
        let { subTask, ...params } = content;
        searchContent.push(...Object.values(params));
        searchContent.push(...subTask);
        const searchContentStr = searchContent.join(",");
        if (searchContentStr.includes(seachText)) {
          result.push({
            ...tasksList[taskId],
            columnId: taskStatus[taskId],
          });
        }
      }
      setSearchResult(result);
      setSearchModalOpen(true);
    }
  };

  const handleProjectEdit = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    project: Project
  ) => {
    e.stopPropagation();
    let element = document.getElementById("project-dropdown");
    element?.classList.remove("show");
    dispatch(setProjectModal(project));
  };

  return (
    <>
      <HeaderStyle>
        <Nav>
          {/* <CgMenuGridR size={25} /> */}
          <LogoLink to="/">
            <SiTodoist size={20} color="#2684FF" />
            ToDo
          </LogoLink>
          <MenuBar>
            <Dropdown as={ButtonWrapper}>
              <Dropdown.Toggle as={MenuButton}>
                <span>プロジェクト</span>
                <BiChevronDown size={16} color="#97A1AF" />
              </Dropdown.Toggle>
              <Dropdown.Menu id="project-dropdown">
                {tasks.projects.map((project) => (
                  <Dropdown.Item
                    key={project.name}
                    onClick={() => dispatch(setProjectFilterName(project.name))}
                  >
                    <Item>
                      <span>{project.name}</span>
                      <StyledMdEdit
                        size={16}
                        className="project"
                        onClick={(e) => handleProjectEdit(e, project)}
                      />
                    </Item>
                  </Dropdown.Item>
                ))}
                <Dropdown.Item
                  onClick={() => dispatch(setProjectFilterName(""))}
                >
                  全部
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(setProjectModalOpen())}>
                  <Add>
                    <StyledAiOutlinePlus color="green" size={18} />
                    <span>プロジェクト追加</span>
                  </Add>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </MenuBar>
          <CreateButton
            onClick={() => dispatch(setTaskModalOpen())}
            disabled={loginId === ""}
          >
            <Txt>作成</Txt>
            <StyledMdAdd size={20} />
          </CreateButton>
          <Space />
        </Nav>
        <RightDiv>
          <SeachWrapper data-tip="検索">
            <Input
              type="text"
              placeholder="検索"
              enterKeyHint="search"
              value={seachText}
              onChange={onChangeSearchText}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
              onKeyDown={(e) => search(e)}
            />
            <SearchIcon />
          </SeachWrapper>
          <IconButtonSearch>
            <IoMdSearch size={24} color={theme.colors.textLowEmphasis} />
          </IconButtonSearch>
          <IconButton data-tip="通知">
            <StyledIoIosNotifications size={24} />
          </IconButton>
          <IconButton data-tip="へルプ">
            <AiFillQuestionCircle size={24} />
          </IconButton>
          <IconButton data-tip="設定">
            <IoIosSettings size={24} />
          </IconButton>
          {isLogged === "" ? (
            <Button data-tip="プロフィールと設定" onClick={openLoginModal}>
              {/* <ProfileImg /> */}
              LOGIN
            </Button>
          ) : (
            <Dropdown as={ButtonWrapper}>
              <Dropdown.Toggle as={MenuButton}>
                <span>{isLogged}</span>
                <BiChevronDown size={16} color="#97A1AF" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>ログアウト</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </RightDiv>
        {/* <ReactTooltip
          place="bottom"
          type="dark"
          effect="solid"
          className="react-tool-tip"
        /> */}
      </HeaderStyle>
      <Modal
        isOpen={loginModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeLoginModal}
        style={modalStyle}
        contentLabel="ログイン"
      >
        <ModalHeader>{isSignUp ? "サインアップ" : "ログイン"}</ModalHeader>
        <InputWrapper>
          {isSignUp && (
            <Input
              type="text"
              placeholder="name"
              value={name}
              onChange={onChangeName}
            />
          )}
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
          />
          <div>
            <Button onClick={isSignUp ? signUp : login} disabled={isDisabled}>
              {isSignUp ? "SIGN UP" : "LOGIN"}
            </Button>
            {loginError !== "" && <Error>{loginError}</Error>}
            {/* {isSystemError && <Error>システムの原因でログイン出来ないです</Error>} */}
          </div>
          {!isSignUp && (
            <MenuButtonStyled onClick={openSignUp}>
              サインアップ(SIGN UP)
            </MenuButtonStyled>
          )}
        </InputWrapper>
      </Modal>
      <Modal
        isOpen={searchModalOpen}
        onRequestClose={closeSearchModal}
        style={searchModalStyle}
        contentLabel="検索結果"
      >
        {searchResult.length === 0 && <p>No search results</p>}
        {searchResult.length > 0 && (
          <>
            <ModalHeader>検索結果</ModalHeader>
            <ResultWrapper>
              {searchResult.map(({ id, content, columnId }) => {
                const projectColor =
                  tasks.projects.find(
                    ({ name }) => name === content.projectName
                  )?.color ?? "white";
                const projectTextColor = textColorOfBg(
                  projectColor ?? "#172B4D"
                );
                return (
                  <Result
                    onClick={() =>
                      dispatch(
                        setTaskModal({ todo: content, columnId, taskId: id })
                      )
                    }
                    key={id}
                  >
                    <span>{content.title}</span>
                    <span
                      className="date"
                      data-is-expired={
                        new Date(content.toDoDate) <
                        new Date(new Date().toLocaleDateString())
                      }
                    >
                      {content.toDoDate}
                    </span>
                    <div className="project">
                      <StyledProject
                        color={projectColor}
                        projectTextColor={projectTextColor}
                      >
                        {content.projectName}
                      </StyledProject>
                    </div>

                    <div className="status">
                      <span data-type={initialData.columns[columnId].title}>
                        {initialData.columns[columnId].title}
                      </span>
                    </div>
                  </Result>
                );
              })}
            </ResultWrapper>
          </>
        )}
      </Modal>
    </>
  );
};

const ResultWrapper = styled.ul`
  padding-left: 0px;
`;

const Result = styled.li`
  display: flex;
  justify-content: space-between;
  line-height: 1;
  align-items: center;
  padding: 8px;

  span:first-child {
    width: 400px;
  }

  span:nth-child(2) {
    width: 100px;
  }

  .date {
    &[data-is-expired="true"] {
      color: red;
    }
  }

  .project {
    width: 100px;
  }

  .status {
    width: 100px;
    font-size: 12px;

    span {
      padding: 3px;
      border-radius: 3px;
    }

    span[data-type="TO DO"] {
      background-color: #dee1e5;
    }

    span[data-type="IN PROGRESS"] {
      color: white;
      background-color: #eb8906;
    }

    span[data-type="DONE"] {
      color: white;
      background-color: #038859;
    }
  }

  &:hover {
    /* text-decoration: underline; */
    cursor: pointer;
    /* color: ${theme.colors.primaryblue}; */
    background-color: ${theme.colors.backgroungHover};
  }
`;

const Error = styled.p`
  font-size: 12px;
  color: red;
  text-align: center;
`;

const ModalHeader = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 1px solid ${theme.colors.textInputBorder};
  border-radius: 3px;
  padding: 40px;
`;

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 56px;
  position: relative;
  background-color: #ffffff;
  color: ${theme.colors.textMenu};

  .dropdown-toggle::after {
    display: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    top: 100%;
    height: 4px;
    background: linear-gradient(
      rgba(9, 30, 66, 0.13) 0px,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }

  .react-tool-tip {
    padding: 6px;
    font-size: 10px;
    line-height: 1;
    margin-top: 8px !important;

    &::after {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-weight: 500;
  height: 100%;
`;

const Space = styled.div`
  min-width: 80px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${theme.colors.text};
  gap: 10px;
`;

const MenuBar = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 20px;
  height: 100%;
  position: relative;

  .dropdown-item {
    &:hover {
      .project {
        display: block;
      }
    }
  }

  .selected {
    color: ${theme.colors.primaryblue};
    &::after {
      position: absolute;
      bottom: 0px;
      left: 4px;
      right: 4px;
      content: "";
      height: 3px;
      background-color: ${theme.colors.primaryblue};
      border-top-left-radius: 1px;
      border-top-right-radius: 1px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
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
  color: ${theme.colors.textMenu};
  font-weight: 500;

  &:hover {
    color: ${theme.colors.primaryblue};
    background-color: ${theme.colors.backgroungHover};
  }
`;

const MenuButtonStyled = styled(MenuButton)`
  font-size: 12px;
  text-decoration: underline;
`;

const Button = styled.button`
  background-color: ${theme.colors.primaryblue};
  border-radius: 3px;
  color: white;
  padding: 0px 10px;
  height: 32px;
  width: 100%;

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

const CreateButton = styled(Button)`
  margin-left: 12px;
`;

const Txt = styled.span`
  @media screen and (max-width: 961px) {
    display: none;
  }
`;

const StyledMdAdd = styled(MdAdd)`
  display: none;
  @media screen and (max-width: 961px) {
    display: block;
  }
`;

const RightDiv = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  svg {
    flex-shrink: 0;
  }
`;

const SeachWrapper = styled.div`
  position: relative;
  max-width: 100%;
  min-width: 200px;
  margin-right: 4px;

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const Input = styled.input`
  height: 32px;
  width: 100%;
  padding: 0px 12px 0px 30px;
  border-radius: 5px;
  line-height: 20px;
  border: 2px solid ${theme.colors.borderInput};

  ::placeholder {
    color: ${theme.colors.textSubtlest};
  }
`;

const SearchIcon = styled(IoMdSearch)`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  left: 8px;
  color: ${theme.colors.textSubtlest}; ;
`;

const IconButton = styled.div`
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.backgroungHover};
    opacity: ${theme.opacity};
    color: ${theme.colors.primaryblue};
  }
`;

const IconButtonSearch = styled(IconButton)`
  display: none;

  @media screen and (max-width: 650px) {
    display: flex;
  }
`;

const StyledIoIosNotifications = styled(IoIosNotifications)`
  transform: rotate(45deg);
`;

// const ProfileImg = styled.div`
//   height: 24px;
//   width: 24px;
//   background-image: url(https://dummyimage.com/24x24.png);
//   border-radius: 50%;
//   flex-shrink: 0;
// `;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledMdEdit = styled(MdEdit)`
  display: none;
  transform: translateX(10px);
  border-radius: 4px;

  &:hover {
    background-color: #97a1af;
  }
`;
const Add = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAiOutlinePlus = styled(AiOutlinePlus)`
  margin-right: 8px;
`;

const StyledProject = styled.div<{ color: string; projectTextColor: string }>`
  font-size: 12px;
  background-color: ${({ color }) => color};
  color: ${({ projectTextColor }) => projectTextColor};
  padding: 0 4px;
  border-radius: 4px;
  line-height: 20px;
  width: fit-content;
`;
