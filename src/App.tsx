import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import CanbanPage from "./pages/CanbanPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/todos" element={<CanbanPage />} />
      
    </Routes>
  );
}

export default App;
