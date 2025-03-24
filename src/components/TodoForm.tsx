import { useEffect, useRef, useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { useColumnStore } from "../store/todoStore";

function TodoForm() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const columns = useColumnStore((state) => state.columns);
  const getNextOrderId = useTodoStore((state) => state.getNextOrderId)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string>("");

  const [columnId, setColumnId] = useState<number>(0)
  const [selected, setSelected] = useState<string>("Select column");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false)

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    setError(false)
    e.preventDefault();
    if (title.trim() && columnId > 0) {
      addTodo({
        id: Date.now().toString(),
        title: title,
        description,
        displayOrder: getNextOrderId(),
        dueDate,
        columnId: columnId,
        completed: false,
        createdAt: new Date(),
      });
      setTitle("");
      setDescription("");
      setDueDate("");
    } 
 
    if(columnId === 0) {
      setError(true)
    }

    setSelected("Select column")
    setColumnId(0)
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <div 
          ref={dropdownRef}
          className={"form-group"}
        >
          <label htmlFor="description">Column</label>
          <div
            className={error ? "select error-border" : "select"}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selected}
            <span> ▼ </span>
          </div>

          {isOpen && (
            <ul
              className="dropdown-menu"
              // style={{ position: "absolute" }}
            >
              {columns.map((column) => (
                <li
                  key={column.id}
                  className="dropdown-item"
                  onClick={() => {
                    setSelected(column.title);
                    setColumnId(column.id)
                    setIsOpen(false);
                  }}
                >
                  {column.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="form-input"
            value={dueDate}
            onChange={handleChangeDate}
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
