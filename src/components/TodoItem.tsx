import { useTodoStore } from "../store/todoStore";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <div className="todo-content">
        <h4>{todo.title}</h4>
        {todo.description && <p>{todo.description}</p>}
        {todo.dueDate && (
          <p className="due-date">Due: {formatDate(todo.dueDate)}</p>
        )}
      </div>
      <div className="todo-actions">
        <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

