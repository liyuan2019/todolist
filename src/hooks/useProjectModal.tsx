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

  const [name, setName] = useState<string>("未分類");
  const [introduction, setIntroduction] = useState<string>("");
  const [color, setColor] = useState<string>("#f44336");

  const { updateTasks } = useUpdateTasks();

  const dispatch = useDispatch();

  useEffect(() => {
    setName(project.name);
    setIntroduction(project.introduction);
    setColor(project.color);
  }, [project.name, project.introduction, project.color]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

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

  const onClickAdd = () => {
    const project: Project = {
      name,
      introduction,
      color,
    };
    addProject(project);
    resetProject();
  };

  const onClickEdit = () => {
    const project: Project = {
      name,
      introduction,
      color,
    };
    editProject(project, editName);
    resetProject();
  };

  const onClickDelete = () => {
    deleteProject(editName);
    resetProject();
  };

  return {
    name,
    introduction,
    color,
    resetProject,
    onChangeName,
    onChangeIntroduction,
    setColor,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  };
};

export type UseProjectModalReturn = ReturnType<typeof useProjectModal>;
