import { Project } from "./Project";

describe("Classe Project", () => {
  const dadosProjeto = {
    id: 1,
    title: "Projeto Teste",
    description: "Descrição do projeto",
    progress: 0,
    tasks: [
      {
        id: 1,
        title: "Tarefa 1",
        description: "",
        dueDate: "2099-12-31",
        status: "concluida" as const,
      },
      {
        id: 2,
        title: "Tarefa 2",
        description: "",
        dueDate: "2099-12-31",
        status: "pendente" as const,
      },
      {
        id: 3,
        title: "Tarefa 3",
        description: "",
        dueDate: "2099-12-31",
        status: "pendente" as const,
      },
    ],
  };

  it("deve criar um projeto corretamente", () => {
    const project = new Project(dadosProjeto);
    expect(project.title).toBe("Projeto Teste");
    expect(project.tasks.length).toBe(3);
  });

  it("calculateProgress deve calcular corretamente a percentagem", () => {
    const project = new Project(dadosProjeto);
    expect(project.calculateProgress()).toBe(33);
  });

  it("calculateProgress deve devolver 0 se não houver tarefas", () => {
    const project = new Project({ ...dadosProjeto, tasks: [] });
    expect(project.calculateProgress()).toBe(0);
  });

  it("isCompleted deve devolver false se houver tarefas por concluir", () => {
    const project = new Project(dadosProjeto);
    expect(project.isCompleted()).toBe(false);
  });

  it("isCompleted deve devolver true se todas as tarefas estiverem concluídas", () => {
    const todasConcluidas = dadosProjeto.tasks.map((t) => ({
      ...t,
      status: "concluida" as const,
    }));
    const project = new Project({ ...dadosProjeto, tasks: todasConcluidas });
    expect(project.isCompleted()).toBe(true);
  });

  it("getTaskCountByStatus deve contar corretamente", () => {
    const project = new Project(dadosProjeto);
    expect(project.getTaskCountByStatus("concluida")).toBe(1);
    expect(project.getTaskCountByStatus("pendente")).toBe(2);
    expect(project.getTaskCountByStatus("em-progresso")).toBe(0);
  });

  describe("Project.validate", () => {
    it("deve devolver erro se o nome estiver vazio", () => {
      const errors = Project.validate({ title: "", description: "desc" });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]).toContain("nome");
    });

    it("deve devolver erro se a descrição estiver vazia", () => {
      const errors = Project.validate({ title: "Projeto", description: "" });
      expect(errors).toContain("A descrição é obrigatória.");
    });

    it("não deve devolver erros com dados válidos", () => {
      const errors = Project.validate({
        title: "Projeto válido",
        description: "Descrição válida",
      });
      expect(errors.length).toBe(0);
    });
  });
});
