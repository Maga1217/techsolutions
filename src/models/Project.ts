import ITask from "./Task";

export default interface IProject {
  id: number;
  title: string;
  description: string;
  progress: number;
  tasks: ITask[];
}
