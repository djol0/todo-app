import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import CanbanPage from "./pages/CanbanPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todos" element={<CanbanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
