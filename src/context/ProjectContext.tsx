import React, { createContext, useContext, useState, useEffect } from "react";
import IProject, { Project } from "../models/Project";
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
  loading: boolean; // ? agora é usado na UI
  error: string | null; // ? erros de API visíveis
  addProject: (project: CreateProjectData) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (project: IProject) => Promise<void>;
  addTaskToProject: (projectId: number, task: ITask) => Promise<void>;
  deleteTaskFromProject: (projectId: number, taskId: number) => Promise<void>;
  completeTask: (projectId: number, taskId: number) => Promise<void>;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProjectProviderProps = {
  children: React.ReactNode;
};

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, message: string) => {
    const detail = err instanceof Error ? err.message : "Erro desconhecido";
    setError(`${message}: ${detail}`);
    console.error(message, err);
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjectsApi();
        setProjects(data);
      } catch (err) {
        handleError(err, "Erro ao carregar projetos");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const addProject = async (project: CreateProjectData): Promise<void> => {
    try {
      setError(null);
      const apiProject = await createProjectApi({
        id: 0,
        ...project,
        progress: 0,
        tasks: [],
      });

      const newProject = new Project(apiProject);
      setProjects((prev) => [...prev, newProject]);
    } catch (err) {
      handleError(err, "Erro ao criar projeto");
    }
  };

  const deleteProject = async (id: number): Promise<void> => {
    try {
      setError(null);
      await deleteProjectApi(id);
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
    } catch (err) {
      handleError(err, "Erro ao eliminar projeto");
    }
  };

  const updateProject = async (project: IProject): Promise<void> => {
    try {
      setError(null);
      const updated = await updateProjectApi(project);
      setProjects((prev) =>
        prev.map((proj) => (proj.id === updated.id ? updated : proj)),
      );
    } catch (err) {
      handleError(err, "Erro ao atualizar projeto");
    }
  };

  const addTaskToProject = async (
    projectId: number,
    task: ITask,
  ): Promise<void> => {
    try {
      setError(null);
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      const updatedTasks = [...project.tasks, task];
      const completed = updatedTasks.filter(
        (t) => t.status === "concluida",
      ).length;

      const updatedProject: IProject = {
        ...project,
        tasks: updatedTasks,
        progress: Math.round((completed / updatedTasks.length) * 100),
      };

      await updateProjectApi(updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? updatedProject : p)),
      );
    } catch (err) {
      handleError(err, "Erro ao adicionar tarefa");
    }
  };

  const deleteTaskFromProject = async (
    projectId: number,
    taskId: number,
  ): Promise<void> => {
    try {
      setError(null);
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      const updatedTasks = project.tasks.filter((t) => t.id !== taskId);
      const completed = updatedTasks.filter(
        (t) => t.status === "concluida",
      ).length;

      const updatedProject: IProject = {
        ...project,
        tasks: updatedTasks,
        progress:
          updatedTasks.length === 0
            ? 0
            : Math.round((completed / updatedTasks.length) * 100),
      };

      await updateProjectApi(updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? updatedProject : p)),
      );
    } catch (err) {
      handleError(err, "Erro ao remover tarefa");
    }
  };

  const completeTask = async (
    projectId: number,
    taskId: number,
  ): Promise<void> => {
    try {
      setError(null);
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      const updatedTasks = project.tasks.map((t) =>
        t.id === taskId ? { ...t, status: "concluida" as const } : t,
      );
      const completed = updatedTasks.filter(
        (t) => t.status === "concluida",
      ).length;

      const updatedProject: IProject = {
        ...project,
        tasks: updatedTasks,
        progress: Math.round((completed / updatedTasks.length) * 100),
      };

      await updateProjectApi(updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? updatedProject : p)),
      );
    } catch (err) {
      handleError(err, "Erro ao concluir tarefa");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
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
