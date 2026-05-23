import ITask, { Task, TaskStatus } from "./Task";

export default interface IProject {
  id: number;
  title: string;
  description: string;
  progress: number;
  tasks: ITask[];
}

export class Project implements IProject {
  id: number;
  title: string;
  description: string;
  progress: number;
  tasks: ITask[];

  constructor(data: IProject) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.tasks = data.tasks.map((t) => new Task(t));
    this.progress = this.calculateProgress();
  }

  calculateProgress(): number {
    if (this.tasks.length === 0) return 0;
    const completed = this.tasks.filter((t) => t.status === "concluida").length;
    return Math.round((completed / this.tasks.length) * 100);
  }

  getTaskCountByStatus(status: TaskStatus): number {
    return this.tasks.filter((t) => t.status === status).length;
  }

  isCompleted(): boolean {
    return this.tasks.length > 0 && this.progress === 100;
  }

  static validate(data: Partial<IProject>): string[] {
    const errors: string[] = [];

    if (!data.title || data.title.trim() === "") {
      errors.push("O nome do projeto é obrigatório.");
    }
    if (data.title && data.title.trim().length < 3) {
      errors.push("O nome deve ter pelo menos 3 caracteres.");
    }
    if (!data.description || data.description.trim() === "") {
      errors.push("A descrição é obrigatória.");
    }

    return errors;
  }
}
