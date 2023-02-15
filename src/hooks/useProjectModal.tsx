import { Project } from "../type";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import lodash from "lodash";
import { useUpdateTasks } from "./useUpdateTasks";
import { selectAllTasks, setTasks } from "../store/tasksSlice";
import { RootState, useDispatch, useSelector } from "../store";
import { resetProjectModal } from "../store/projectModalSlice";

export const useProjectModal = () => {
  const tasks = useSelector(selectAllTasks);
  const { project, editName } = useSelector(
    (state: RootState) => state.projectModal
  );

  // const [project, setProject] = useState<Project>({
  //   name: "",
  //   introduction: "",
  //   color: "#f44336",
  // });
  const [name, setName] = useState<string>("未分類");
  const [introduction, setIntroduction] = useState<string>("");
  const [color, setColor] = useState<string>("#f44336");
  // const [projectEditFlag, setProjectEditFlag] = useState<boolean>(false);
  // const [projectEditName, setProjectEditName] = useState<string>("");
  // const [projectFilterName, setProjectFilterName] = useState<string>("");
  // const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);

  const { updateTasks } = useUpdateTasks();

  const dispatch = useDispatch();

  useEffect(() => {
    setName(project.name);
    setIntroduction(project.introduction);
    setColor(project.color);
  }, [project.name, project.introduction, project.color]);

  // function openProjectModal() {
  //   dispatch(setProjectModalOpen(true));
  // }

  // function closeProjectModal() {
  //   dispatch(setProjectModalOpen(false));
  // }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

  // const onChangeColor = (color: string) => {
  //   setColor(color);
  // };

  const resetProject = () => {
    setName("");
    setIntroduction("");
    setColor("#f44336");
    dispatch(resetProjectModal());
  };

  const addProject = useCallback(
    (project: Project) => {
      const newState = lodash.cloneDeep(tasks);
      newState.projects.unshift(project);
      dispatch(setTasks(newState));
      updateTasks(newState);
    },
    [dispatch, tasks, updateTasks]
  );

  const editProject = useCallback(
    (project: Project, oldProjectName: string) => {
      const index = tasks.projects.findIndex(
        ({ name }) => name === oldProjectName
      );
      const newState = lodash.cloneDeep(tasks);
      newState.projects[index] = project;
      dispatch(setTasks(newState));
      updateTasks(newState);
    },
    [dispatch, tasks, updateTasks]
  );

  const deleteProject = useCallback(
    (projectName: string) => {
      const index = tasks.projects.findIndex(
        ({ name }) => name === projectName
      );
      const newState = lodash.cloneDeep(tasks);
      const taskIds = Object.entries(newState.tasks)
        .filter(([key, value]) => value.content.projectName === projectName)
        .map(([key, value]) => key);
      taskIds.forEach(
        (id) => (newState.tasks[id].content.projectName = "未分類")
      );
      newState.projects.splice(index, 1);
      dispatch(setTasks(newState));
      updateTasks(newState);
    },
    [dispatch, tasks, updateTasks]
  );

  // const onClickProjectEdit = (project: Project) => {
  //   setProject(project);
  //   setProjectEditFlag(true);
  //   setProjectEditName(project.name);
  //   openProjectModal();
  // };

  const onClickAdd = () => {
    const project: Project = {
      name,
      introduction,
      color,
    };
    addProject(project);
    // dispatch(resetProjectModal());
    resetProject();
  };

  // const onClickCancel = () => {
  //   reset();
  //   closeProjectModal();
  // };

  const onClickEdit = () => {
    const project: Project = {
      name,
      introduction,
      color,
    };
    editProject(project, editName);
    // dispatch(resetProjectModal());
    resetProject();
  };

  const onClickDelete = () => {
    // e.stopPropagation();
    deleteProject(editName);
    // dispatch(resetProjectModal());
    resetProject();
  };

  return {
    // projectModalOpen,
    name,
    introduction,
    color,
    // projectEditFlag,
    // // projectEditName,
    // projectFilterName,
    // setProjectFilterName,
    // openProjectModal,
    // closeProjectModal,
    resetProject,
    onChangeName,
    onChangeIntroduction,
    // onChangeColor,
    setColor,
    // onClickProjectEdit,
    // onClickCancel,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  };
};

export type UseProjectModalReturn = ReturnType<typeof useProjectModal>;
