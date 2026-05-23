export type TaskStatus = "pendente" | "em-progresso" | "concluida";

export default interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}
