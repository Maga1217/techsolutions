import React from "react";
import "../../styles/header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header_left">
        <h1 className="title">Gestão de Projetos</h1>
      </div>

      <div className="header_right">
        <button className="button primary">Novo Projeto</button>
      </div>
    </header>
  );
};

export default Header;
