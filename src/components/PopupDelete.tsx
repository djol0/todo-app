import { useEffect, useRef, useState } from "react";
import { useColumnStore } from "../store/todoStore";
import { useTodoStore } from "../store/todoStore";

interface PopupDeleteProps {
    close: () => void;
    id: number;
}

function PopupDelete({ close, id }: PopupDeleteProps) {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const columns = useColumnStore((state) => state.columns);
    const [columnId, setColumnId] = useState<number>(0);
    const [selected, setSelected] = useState<string>("Delete all tasks");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const deleteColumn = useColumnStore((state) => state.deleteColumn);
    const deleteColumnTodos = useTodoStore((state) => state.deleteColumnTodos);
    const moveTodosToColumn = useTodoStore((state) => state.moveTodosToColumn);

    const filteredColumns = columns.filter((column) => column.id !== id);
    const columnsSelect = [...filteredColumns, {title:"Delete all tasks", id: 0}];

    const handleDelete = (): void => {
        deleteColumn(id);
        if(columnId === 0) {
            deleteColumnTodos(id);
        }
        else {
            moveTodosToColumn(id, columnId);
        }
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          close();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [close]);

    return (
        <div 
            className="popup-delete"
        >
            <div
                ref={popupRef} 
                className="popup-delete-content"
            >
                <p className="popup-p">
                    Do you really want to delete this column? If you proceed, you can either delete all tasks within this column or move them to another column. Please choose an option below.
                </p>

                <div 
                    ref={dropdownRef}
                    className="form-group"
                >
                    <div
                        className="select"
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
                        {columnsSelect.map((column) => (
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

                <div className="popup-delete-buttons">
                    <button
                        className="btn popup-delete-btn"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button 
                        className="btn popup-cancel-btn"
                        onClick={close}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupDelete;
