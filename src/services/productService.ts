const API_URL = "http://localhost:3001/projects";

export const getProjectsApi = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProjectApi = async (project: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  return res.json();
};

export const updateProjectApi = async (project: any) => {
  const res = await fetch(`${API_URL}/${project.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  return res.json();
};

export const deleteProjectApi = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
