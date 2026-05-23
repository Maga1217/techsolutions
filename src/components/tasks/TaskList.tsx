import React from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import CTask from "../../models/Task";
import "../../styles/taskList.css";

type TaskListProps = {
  projectId: number;
  tasks: CTask[];
};

const TaskList: React.FC<TaskListProps> = ({ projectId, tasks }) => {
  return (
    <div className="task-form-list">
      <TaskForm projectId={projectId} />

      <div className="task-list">
        <h3>Tarefas</h3>
        <div className="task-list-grid">
          {tasks.length === 0 ? (
            <p>Sem tarefas</p>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} projectId={projectId} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
