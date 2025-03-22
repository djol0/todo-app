import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { useColumnStore } from "../store/todoStore";
import TodoColumn from "./TodoColumn";
import NewColumn from "./NewColumn";

function TodoList() {
  const columns = useColumnStore((state) => state.columns);
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
          <button className="btn btn-primary btn-margin-right" onClick={() => setFilter("all")}>
            All
          </button>
          <button
            className="btn btn-primary btn-margin-right"
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

      <div className="all-columns">
        {columns.map((column) => (
          <TodoColumn key={column.id} title={column.title} todos={[]} />
        ))}
        
        <NewColumn />
      </div>

      {/* {filteredTodos.length === 0 ? (
        <div className="empty-list">
          <p>No todos found.</p>
        </div>
      ) : (
        filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )} */}
    </div>
  );
}

export default TodoList;

// const styles = {
//   emptyList: {
//     textAlign: "center",
//     padding: "1rem",
//     color: "var(--text-light-color)",
//   },
//   headerButton: {
//     marginLeft: "0.5rem",
//   },
// };
