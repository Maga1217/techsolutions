import React,{ createContext, useContext, useState } from "react";

type Project = {
    id: number;
    title: string;
    description: string;
    progress: number;
};

type ProjectContextType = {
    projects: Project[];
    addProject: (project: Omit<Project, "id" | "progress">) => void;
    deleteProject: (id: number) => void;
    updateProject: (project: Project) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProjectProviderProps = {
    children: React.ReactNode;
};

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: "Website Empresa",
            description: "Desenvolvimento institucional",
            progress: 70,
        }
    ]);

    const addProject = (project: Omit<Project, "id" | "progress">) => {
        const newProject: Project = {
            id: projects.length + 1,
            progress: 0,
            ...project,
        };

        setProjects((prevProjects) => [...prevProjects, newProject]);
    }

    const deleteProject = (id: number) => {
        setProjects((p) => p.filter((proj) => proj.id !== id));
    }

    const updateProject = (project: Project) => {
        setProjects((p) => p.map((proj) => proj.id === project.id ? project : proj));
    }

    return(
        <ProjectContext.Provider value={{ projects, addProject, deleteProject, updateProject }} >
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
}