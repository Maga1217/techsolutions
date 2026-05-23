export type TaskStatus = "pendente" | "em-progresso" | "concluida";

export default interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export class Task implements ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;

  constructor(data: ITask) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.status = data.status;
  }

  isCompleted(): boolean {
    return this.status === "concluida";
  }

  isOverdue(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(this.dueDate);
    return due < today && !this.isCompleted();
  }

  getStatusLabel(): string {
    const labels: Record<TaskStatus, string> = {
      pendente: "Pendente",
      "em-progresso": "Em Progresso",
      concluida: "Concluída",
    };
    return labels[this.status];
  }

  static validate(data: Partial<ITask>): string[] {
    const errors: string[] = [];

    if (!data.title || data.title.trim() === "") {
      errors.push("O título é obrigatório.");
    }
    if (data.title && data.title.trim().length < 3) {
      errors.push("O título deve ter pelo menos 3 caracteres.");
    }
    if (!data.dueDate) {
      errors.push("A data de conclusão é obrigatória.");
    }
    if (data.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(data.dueDate);
      if (due < today) {
        errors.push("A data não pode ser no passado.");
      }
    }

    return errors;
  }
}
