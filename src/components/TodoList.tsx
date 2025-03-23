import { useMemo, useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { useColumnStore } from "../store/todoStore";
import TodoColumn from "./TodoColumn";
import NewColumn from "./NewColumn";
import { Todo } from "../types/todo";

function TodoList() {
  const columns = useColumnStore((state) => state.columns);
  const todos = useTodoStore((state) => state.todos);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const groupedTodos = useMemo(() => {
    const map = new Map<number, Todo[]>();

    columns.forEach((column) => {
      map.set(column.id, []);
    });

    filteredTodos.forEach((todo) => {
      if (map.has(todo.columnId)) {
        map.get(todo.columnId)?.push(todo);
      }
    });

    return map;
  }, [columns, filteredTodos]);

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
          <TodoColumn 
            key={column.id} 
            title={column.title} 
            id={column.id} 
            todos={groupedTodos.get(column.id) || []} 
          />
        ))}
        <NewColumn />
      </div>
    </div>
  );
}

export default TodoList;
