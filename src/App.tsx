import React from "react";
import Panel from "./components/panel/Panel";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Panel />
    </Router>
  );
}

export default App;
