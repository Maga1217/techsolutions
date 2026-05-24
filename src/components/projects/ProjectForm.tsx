import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { Project } from "../../models/Project";
import useFormErrors from "../../hooks/useForm";
import "../../styles/projectForm.css";

const ProjectForm: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { addProject } = useProjects();
  const { errors, setFormErrors, clearErrors } = useFormErrors();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = Project.validate({
      title,
      description,
    });

    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    clearErrors();
    addProject({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h2>Novo Projeto</h2>

      {errors.length > 0 && (
        <div className="error-box">
          {errors.map((err, index) => (
            <p key={index} className="error-message">
              ?? {err}
            </p>
          ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="projectName">Nome do Projeto</label>
        <input
          type="text"
          id="projectName"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Digite o nome do projeto"
        />
      </div>

      <div className="form-group">
        <label htmlFor="projectDescription">Descrição do Projeto</label>
        <textarea
          id="projectDescription"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Digite a descrição do projeto"
        />
      </div>

      <button type="submit" className="button primary">
        Criar Projeto
      </button>
    </form>
  );
};

export default ProjectForm;
