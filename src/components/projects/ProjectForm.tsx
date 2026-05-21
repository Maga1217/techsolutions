import React, { useState } from "react";
import "../../styles/projectForm.css";

const ProjectForm: React.FC = () => {
    const [projectName, setProjectName] = React.useState("");
    const [projectDescription, setProjectDescription] = React.useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if(!projectName || !projectDescription) {
            alert("Preencha todos os campos!");
            return;
        }

        console.log({
            projectName,
            projectDescription,
        });

        setProjectName("");
        setProjectDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="project-form">
            <h2>Novo Projeto</h2>

            <div className="form-group">
                <label htmlFor="projectName">Nome do Projeto</label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    placeholder="Digite o nome do projeto"
                />
            </div>

            <div className="form-group">
                <label htmlFor="projectDescription">Descrição do Projeto</label>
                <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(event) => setProjectDescription(event.target.value)}
                    placeholder="Digite a descrição do projeto"
                />
            </div>

            <button type="submit" className="button primary">Criar Projeto</button>
        </form>
    );
}

export default ProjectForm;
