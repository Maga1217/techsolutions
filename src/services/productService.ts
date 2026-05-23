import IProject from "../models/Project";

type CreateProjectData = Omit<IProject, "id" | "progress"> & {
  progress: 0;
};

type UpdateProjectData = IProject;

const API_URL = "http://localhost:3001/projects";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
};

export const getProjectsApi = async (): Promise<IProject[]> => {
  const res = await fetch(API_URL);
  return handleResponse<IProject[]>(res);
};

export const getProjectByIdApi = async (id: number): Promise<IProject> => {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse<IProject>(res);
};

export const createProjectApi = async (
  project: CreateProjectData,
): Promise<IProject> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return handleResponse<IProject>(res);
};

export const updateProjectApi = async (
  project: UpdateProjectData,
): Promise<IProject> => {
  const res = await fetch(`${API_URL}/${project.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return handleResponse<IProject>(res);
};

export const deleteProjectApi = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Erro ao eliminar projeto: ${res.status}`);
  }
};
