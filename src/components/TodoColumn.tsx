import { Todo } from "../types/todo";
import { useColumnStore } from "../store/todoStore";
import TodoItem from "./TodoItem";
import { useState } from "react";
import PopupDelete from "./PopupDelete";

interface TodoColumnProps {
    title: string;
    id: number;
    todos: Array<Todo>;
    setTargetedTodo: Function;
    handleDrop: Function;
}

function TodoColumn({title, id, todos, setTargetedTodo, handleDrop }: TodoColumnProps) {
    const columns = useColumnStore((state) => state.columns);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false)
    const [dragOver, setDragOver] = useState<boolean>(false)

    const handleDelete = (): void => {
        if(columns.length > 1) {
            setShowDeletePopup(true)
        }
    }

    const handleDropTodo = (): void => handleDrop(id)


    const handleDragOverTrue = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault()
        setDragOver(true)
    }

    const handleDragOverFalse = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault()
        setDragOver(true)
    }

    return (
        <div 
            className={dragOver ? "column-container dragover-column" : "column-container"}
            onDragOver={handleDragOverTrue}
            onDragLeave={handleDragOverFalse}
            onDrop={handleDropTodo}
        >
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
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    setTargetedTodo={setTargetedTodo}
                />
            ))}

            {showDeletePopup && <PopupDelete close={() => setShowDeletePopup(false)} id={id}/>}
        </div>
    );
}

export default TodoColumn;
