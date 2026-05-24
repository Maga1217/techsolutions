import { Task } from "./Task";

describe("Classe Task", () => {
  const dadosTarefa = {
    id: 1,
    title: "Fazer testes",
    description: "Escrever testes unitários",
    dueDate: "2099-12-31",
    status: "pendente" as const,
  };

  it("deve criar uma tarefa corretamente", () => {
    const task = new Task(dadosTarefa);

    expect(task.title).toBe("Fazer testes");
    expect(task.status).toBe("pendente");
  });

  it("isCompleted deve devolver false se a tarefa for pendente", () => {
    const task = new Task(dadosTarefa);
    expect(task.isCompleted()).toBe(false);
  });

  it("isCompleted deve devolver true se a tarefa for concluída", () => {
    const task = new Task({ ...dadosTarefa, status: "concluida" });
    expect(task.isCompleted()).toBe(true);
  });

  it("isOverdue deve devolver false se a data for no futuro", () => {
    const task = new Task(dadosTarefa); // data: 2099-12-31
    expect(task.isOverdue()).toBe(false);
  });

  it("isOverdue deve devolver true se a tarefa estiver atrasada", () => {
    const task = new Task({ ...dadosTarefa, dueDate: "2000-01-01" });
    expect(task.isOverdue()).toBe(true);
  });

  it("getStatusLabel deve devolver o texto correto", () => {
    const pendente = new Task({ ...dadosTarefa, status: "pendente" });
    const emProgresso = new Task({ ...dadosTarefa, status: "em-progresso" });
    const concluida = new Task({ ...dadosTarefa, status: "concluida" });

    expect(pendente.getStatusLabel()).toBe("Pendente");
    expect(emProgresso.getStatusLabel()).toBe("Em Progresso");
    expect(concluida.getStatusLabel()).toBe("Concluída");
  });

  describe("Task.validate", () => {
    it("deve devolver erro se o título estiver vazio", () => {
      const errors = Task.validate({ title: "", dueDate: "2099-12-31" });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]).toContain("título");
    });

    it("deve devolver erro se o título tiver menos de 3 caracteres", () => {
      const errors = Task.validate({ title: "Ab", dueDate: "2099-12-31" });
      expect(errors.length).toBeGreaterThan(0);
    });

    it("deve devolver erro se a data estiver em falta", () => {
      const errors = Task.validate({ title: "Tarefa válida", dueDate: "" });
      expect(errors).toContain("A data de conclusão é obrigatória.");
    });

    it("não deve devolver erros com dados válidos", () => {
      const errors = Task.validate({
        title: "Tarefa válida",
        dueDate: "2099-12-31",
      });
      expect(errors.length).toBe(0);
    });
  });
});
