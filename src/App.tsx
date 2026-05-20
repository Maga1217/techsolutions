import React from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import "./styles/styles.css";

function App() {
  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: 20, flex: 1 }}>
          <h2>Dashboard aqui depois</h2>
        </main>
      </div>
    </div>
  );
}

export default App;
