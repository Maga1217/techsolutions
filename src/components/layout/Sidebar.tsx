import React from "react";
import "../../styles/sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar_title">
          <h2 className="title">Menu</h2>
        </div>

        <nav className="sidebar_nav nav">
          <ul>
            <li className="nav-item">Dashboard</li>
            <li className="nav-item">Projetos</li>
            <li className="nav-item">Tarefas</li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
