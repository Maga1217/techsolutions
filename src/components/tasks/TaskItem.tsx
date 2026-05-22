import React from "react";
import { TaskStatus } from "../../models/Task";
import "../../styles/taskItem.css";

type TaskItemProps = {
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
};

const TaskItem: React.FC<TaskItemProps> = ({
    title,
    description,
    dueDate,
    status,
}) => {
    return(
        <div className={`task-item ${status.toLowerCase()}`}>
            <h3 className="task-title">{title}</h3>

            <p className="task-description">{description}</p>

            <small className="task-due-date">Prazo: {dueDate}</small>

            <span className="task-status">
                {status === "pendente" && "Pendente"}
                {status === "em-progresso" && "Em progresso"}
                {status === "concluida" && "Concluída"}
            </span>
        </div>
    );
}

export default TaskItem;
