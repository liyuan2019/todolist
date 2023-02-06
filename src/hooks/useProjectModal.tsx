import { Board, Project } from "../type";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import lodash from "lodash";
import { useUpdateTasks } from "./useUpdateTasks";

export const useProjectModal = (
  state: Board,
  setState: React.Dispatch<React.SetStateAction<Board>>
) => {
  const [project, setProject] = useState<Project>({
    name: "",
    introduction: "",
    color: "#f44336",
  });
  const [name, setName] = useState<string>("未分類");
  const [introduction, setIntroduction] = useState<string>("");
  const [color, setColor] = useState<string>("#f44336");
  const [projectEditFlag, setProjectEditFlag] = useState<boolean>(false);
  const [projectEditName, setProjectEditName] = useState<string>("");
  const [projectFilterName, setProjectFilterName] = useState<string>("");
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
      newState.projects.unshift(project);
      setState(newState);
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  const editProject = useCallback(
    (project: Project, oldProjectName: string) => {
      const index = state.projects.findIndex(
        ({ name }) => name === oldProjectName
      );
      const newState = lodash.cloneDeep(state);
      newState.projects[index] = project;
      setState(newState);
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  const deleteProject = useCallback(
    (projectName: string) => {
      const index = state.projects.findIndex(
        ({ name }) => name === projectName
      );
      const newState = lodash.cloneDeep(state);
      const taskIds = Object.entries(newState.tasks)
        .filter(([key, value]) => value.content.projectName === projectName)
        .map(([key, value]) => key);
      taskIds.forEach(
        (id) => (newState.tasks[id].content.projectName = "未分類")
      );
      newState.projects.splice(index, 1);
      setState(newState);
      updateTasks(newState);
    },
    [setState, state, updateTasks]
  );

  const onClickProjectEdit = (project: Project) => {
    setProject(project);
    setProjectEditFlag(true);
    setProjectEditName(project.name);
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
    editProject(project, projectEditName);
    reset();
    closeProjectModal();
  };

  const onClickDelete = () => {
    // e.stopPropagation();
    deleteProject(projectEditName);
    reset();
    closeProjectModal();
  };

  return {
    projectModalOpen,
    name,
    introduction,
    color,
    projectEditFlag,
    projectEditName,
    projectFilterName,
    setProjectFilterName,
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
