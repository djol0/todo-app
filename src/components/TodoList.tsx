import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <div className="header">
        <h2>My Todos</h2>
        <div>
          <button className="btn btn-primary" onClick={() => setFilter("all")}>
            All
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>
      {filteredTodos.length === 0 ? (
        <div className="empty-list">
          <p>No todos found.</p>
        </div>
      ) : (
        filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}

export default TodoList;

const styles = {
  emptyList: {
    textAlign: "center",
    padding: "1rem",
    color: "var(--text-light-color)",
  },
  headerButton: {
    marginLeft: "0.5rem",
  },
};
