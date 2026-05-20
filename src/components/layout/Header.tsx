import React from "react";
import "../../styles/header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header_left">
        <h1>Gestão de Projetos</h1>
      </div>

      <div className="header_right">
        <button>Novo Projeto</button>
      </div>
    </header>
  );
};

export default Header;
