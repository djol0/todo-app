import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function TodoPage() {
  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="card">
        <TodoForm />
      </div>
      <div className="card">
        <TodoList />
      </div>
    </div>
  );
}

export default TodoPage;
