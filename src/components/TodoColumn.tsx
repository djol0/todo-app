import { Todo } from "../types/todo";
import { useColumnStore } from "../store/todoStore";

interface TodoColumnProps {
    title: string;
    todos: Array<Todo>;
}

function TodoColumn({title, todos}: TodoColumnProps) {

    const columns = useColumnStore((state) => state.columns);
    const deleteColumn = useColumnStore((state) => state.deleteColumn);

    const handleDelete = () => {
        if(columns.length > 1) {
            deleteColumn(title)
        }
    }

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

            <div>
                Todo content
            </div>
        </div>
    );
}

export default TodoColumn;
