import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NonExistingComponent />} />
      <Route path="/todos" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
