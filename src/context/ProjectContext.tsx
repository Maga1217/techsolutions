import React, { createContext, useContext, useState } from "react";
import CProject from "../models/Project";
import CTask from "../models/Task";

type CreateProjectData = {
  title: string;
  description: string;
};

type ProjectContextType = {
  projects: CProject[];
  addProject: (project: CreateProjectData) => void;
  deleteProject: (id: number) => void;
  updateProject: (project: CProject) => void;
  addTaskToProject: (projectId: number, task: CTask) => void;
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
  const initialProject = new CProject(
    1,
    "Website Empresa",
    "Desenvolvimento institucional",
  );

  initialProject.addTask(
    new CTask(
      1,
      "Criar layout",
      "Desenvolver estrutura inicial",
      "25/05/2026",
      "concluida",
    ),
  );

  initialProject.addTask(
    new CTask(
      2,
      "Criar dashboard",
      "Adicionar cards",
      "30/05/2026",
      "em-progresso",
    ),
  );

  const [projects, setProjects] = useState<CProject[]>([initialProject]);

  const addProject = (project: CreateProjectData) => {
    const newProject = new CProject(
      projects.length + 1,
      project.title,
      project.description,
    );

    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const deleteProject = (id: number) => {
    setProjects((p) => p.filter((proj) => proj.id !== id));
  };

  const updateProject = (project: CProject) => {
    setProjects((p) =>
      p.map((proj) => (proj.id === project.id ? project : proj)),
    );
  };

  const addTaskToProject = (projectId: number, task: CTask) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          project.addTask(task);
        }
        return project;
      }),
    );
  };

  const deleteTaskFromProject = (projectId: number, taskId: number) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          project.deleteTask(taskId);
        }
        return project;
      }),
    );
  };

  const completeTask = (projectId: number, taskId: number) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const task = project.tasks.find((t) => t.id === taskId);

          if (task) {
            task.status = "concluida";
            project.updateProgress();
          }
        }
        return project;
      }),
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
