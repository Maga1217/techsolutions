import React, { createContext, useContext, useState, useEffect } from "react";
import IProject from "../models/Project";
import ITask from "../models/Task";
import {
  createProjectApi,
  getProjectsApi,
  deleteProjectApi,
  updateProjectApi,
} from "../services/productService";

type CreateProjectData = {
  title: string;
  description: string;
};

type ProjectContextType = {
  projects: IProject[];
  addProject: (project: CreateProjectData) => void;
  deleteProject: (id: number) => void;
  updateProject: (project: IProject) => void;
  addTaskToProject: (projectId: number, task: ITask) => void;
  deleteTaskFromProject: (projectId: number, taskId: number) => void;
  completeTask: (projectId: number, taskId: number) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProjectProviderProps = {
  children: React.ReactNode;
};

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjectsApi();

      setProjects(data);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const addProject = async (project: CreateProjectData) => {
    const newProject = await createProjectApi({
      title: project.title,
      description: project.description,
      progress: 0,
      tasks: [],
    });

    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const deleteProject = async (id: number) => {
    await deleteProjectApi(id);

    setProjects((p) => p.filter((proj) => proj.id !== id));
  };

  const updateProject = async (project: IProject) => {
    const updated = await updateProjectApi(project);

    setProjects((p) =>
      p.map((proj) => (proj.id === updated.id ? updated : proj)),
    );
  };

  const addTaskToProject = async (projectId: number, task: ITask) => {
    const project = projects.find((p) => p.id === projectId);

    if (!project) return;

    const updatedProject: IProject = {
      ...project,
      tasks: [...project.tasks, task],
    };

    updatedProject.progress = Math.floor(
      (updatedProject.tasks.filter((t) => t.status === "concluida").length /
        updatedProject.tasks.length) *
        100,
    );

    await updateProjectApi(updatedProject);

    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? updatedProject : p)),
    );
  };

  const deleteTaskFromProject = async (projectId: number, taskId: number) => {
    const project = projects.find((p) => p.id === projectId);

    if (!project) return;

    const updatedProject: IProject = {
      ...project,
      tasks: project.tasks.filter((t) => t.id !== taskId),
    };

    updatedProject.progress = Math.floor(
      (updatedProject.tasks.filter((t) => t.status === "concluida").length /
        (updatedProject.tasks.length || 1)) *
        100,
    );

    await updateProjectApi(updatedProject);

    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? updatedProject : p)),
    );
  };

  const completeTask = async (projectId: number, taskId: number) => {
    const project = projects.find((p) => p.id === projectId);

    if (!project) return;

    const updatedProject: IProject = {
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === taskId ? { ...t, status: "concluida" } : t,
      ),
    };

    updatedProject.progress = Math.floor(
      (updatedProject.tasks.filter((t) => t.status === "concluida").length /
        (updatedProject.tasks.length || 1)) *
        100,
    );

    await updateProjectApi(updatedProject);

    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? updatedProject : p)),
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        updateProject,
        addTaskToProject,
        deleteTaskFromProject,
        completeTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
