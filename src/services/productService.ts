import IProject from "../models/Project";

const API_URL = "http://localhost:3001/projects";

export const getProjectsApi = async (): Promise<IProject[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProjectApi = async (
  project: IProject,
): Promise<IProject> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const updateProjectApi = async (
  project: IProject,
): Promise<IProject> => {
  const res = await fetch(`${API_URL}/${project.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const deleteProjectApi = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
