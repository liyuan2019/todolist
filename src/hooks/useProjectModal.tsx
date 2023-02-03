import { Board, Project } from "../type";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import lodash from "lodash";
import { useUpdateTasks } from "./useUpdateTasks";

export const useProjectModal = (
  state: Board,
  setState: React.Dispatch<React.SetStateAction<Board>>
) => {
  //   const today = new Date().toLocaleDateString();
  //   const [modalOpen, setModalOpen] = useState(false);
  //   const { addTodo, editTodo, deleteTodo } = useToDoList(state, setState);
  const [project, setProject] = useState<Project>({
    name: "",
    introduction: "",
    color: "#f44336",
  });
  const [name, setName] = useState<string>("未分類");
  const [introduction, setIntroduction] = useState<string>("");
  const [color, setColor] = useState<string>("#f44336");
  const [projectEditFlag, setProjectEditFlag] = useState<boolean>(false);
  const [projectEditIndex, setProjectEditIndex] = useState<number>(-1);
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);

  const { updateTasks } = useUpdateTasks();

  useEffect(() => {
    setName(project.name);
    setIntroduction(project.introduction);
    setColor(project.color);
  }, [project.name, project.introduction, project.color]);

  function openProjectModal() {
    setProjectModalOpen(true);
  }

  function closeProjectModal() {
    setProjectModalOpen(false);
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

  // const onChangeColor = (color: string) => {
  //   setColor(color);
  // };

  const reset = () => {
    setName("");
    setIntroduction("");
    setColor("#f44336");
    setProject({
      name: "",
      introduction: "",
      color: "#f44336",
    });
    setProjectEditFlag(false);
  };

  const addProject = useCallback(
    (project: Project) => {
      const newState = lodash.cloneDeep(state);
      newState.projects.push(project);
      setState(newState);
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  const editProject = useCallback(
    (project: Project, projectEditIndex: number) => {
      const newState = lodash.cloneDeep(state);
      newState.projects[projectEditIndex] = project;
      setState(newState);
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  const deleteProject = useCallback(
    (projectEditIndex: number) => {
      const newState = lodash.cloneDeep(state);
      newState.projects.splice(projectEditIndex, 1);
      setState(newState);
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  const onClickProjectEdit = (project: Project, index: number) => {
    setProject(project);
    setProjectEditFlag(true);
    setProjectEditIndex(index);
    openProjectModal();
  };

  const onClickAdd = () => {
    const project: Project = {
      name,
      introduction,
      color,
    };
    addProject(project);
    reset();
    closeProjectModal();
  };

  const onClickCancel = () => {
    reset();
    closeProjectModal();
  };

  const onClickEdit = () => {
    const project: Project = {
      name,
      introduction,
      color,
    };
    editProject(project, projectEditIndex);
    reset();
    closeProjectModal();
  };

  const onClickDelete = () => {
    // e.stopPropagation();
    deleteProject(projectEditIndex);
    reset();
    closeProjectModal();
  };

  return {
    projectModalOpen,
    name,
    introduction,
    color,
    projectEditFlag,
    projectEditIndex,
    openProjectModal,
    closeProjectModal,
    onChangeName,
    onChangeIntroduction,
    // onChangeColor,
    setColor,
    onClickProjectEdit,
    onClickCancel,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  };
};

export type UseProjectModalReturn = ReturnType<typeof useProjectModal>;
