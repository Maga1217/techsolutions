import React from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./styles/styles.css";

function App() {
  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: 20, flex: 1 }}>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
