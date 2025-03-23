import { Todo } from "../types/todo";
import { useColumnStore } from "../store/todoStore";
import TodoItem from "./TodoItem";
import { useState } from "react";
import PopupDelete from "./PopupDelete";

interface TodoColumnProps {
    title: string;
    id: number;
    todos: Array<Todo>;
}

function TodoColumn({title, id, todos}: TodoColumnProps) {
    const columns = useColumnStore((state) => state.columns);
    const [showDeletePopup, setShowDeletePopup] = useState(false)

    const handleDelete = (): void => {
        if(columns.length > 1) {
            setShowDeletePopup(true)
        }
    }

    const handleClose = (): void => setShowDeletePopup(false)

    return (
        <div className="column-container">
            <div className="column-header">
                <p>{title} ({todos.length})</p>
                
                {columns.length > 1 && <div 
                    className="column-header-delete" 
                    onClick={handleDelete}
                >
                    x
                </div>}
            </div>

            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}/>
            ))}

            {showDeletePopup && <PopupDelete close={handleClose} id={id}/>}
        </div>
    );
}

export default TodoColumn;
