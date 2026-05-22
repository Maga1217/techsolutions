import React from "react";
import TaskItem from "./TaskItem";
import { TaskStatus } from "../../models/Task";
import "../../styles/taskList.css";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
};

const TaskList: React.FC = () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Criar layout",
      description: "Desenvolver estrutura inicial",
      dueDate: "25/05/2026",
      status: "pendente",
    },
    {
      id: 2,
      title: "Criar dashboard",
      description: "Adicionar cards de projetos",
      dueDate: "28/05/2026",
      status: "em-progresso",
    },
    {
      id: 3,
      title: "Criar formulário",
      description: "Adicionar formulário de projetos",
      dueDate: "30/05/2026",
      status: "concluida",
    },
  ];

  return (
    <div className="task-list">
      <h2 className="task-list-title">Tarefas</h2>

      <div className="task-list-grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            status={task.status}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;