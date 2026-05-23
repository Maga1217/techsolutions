export type TaskStatus = "pendente" | "em-progresso" | "concluida";

class CTask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;

  constructor(
    id: number,
    title: string,
    description: string,
    dueDate: string,
    status: TaskStatus,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
  }

  completeTask(): void {
    this.status = "concluida";
  }
}

export default CTask;
