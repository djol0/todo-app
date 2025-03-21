import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

function TodoForm() {
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({
        id: Date.now().toString(),
        title: title,
        description,
        dueDate,
        completed: false,
        createdAt: new Date(),
      });
      setTitle("");
      setDescription("");
      setDueDate(undefined);
    }
  };

  return (
    <div>
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={tittle}
            onChange={(e) => setTittle(e.target.value)}
            placeholder="Enter todo title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
