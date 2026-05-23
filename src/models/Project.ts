import CTask from "./Task";

class CProject {
  id: number;
  title: string;
  description: string;
  progress: number = 0;
  tasks: CTask[];

  constructor(
    id: number,
    title: string,
    description: string,
    progress: number = 0,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.progress = progress;
    this.tasks = [];
  }

  addTask(task: CTask): void {
    this.tasks = [...this.tasks, task];

    this.updateProgress();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);

    this.updateProgress();
  }

  updateProgress(): void {
    if (this.tasks.length === 0) {
      this.progress = 0;
      return;
    }

    const completedTasks = this.tasks.filter((t) => t.status === "concluida");

    this.progress = Math.floor(
      (completedTasks.length / this.tasks.length) * 100,
    );
  }
}

export default CProject;
