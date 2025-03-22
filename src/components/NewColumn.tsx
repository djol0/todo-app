import { useEffect, useRef, useState } from "react";
import { useColumnStore } from "../store/todoStore";

function NewColumn() {
    const columns = useColumnStore((state) => state.columns);
    const addColumn = useColumnStore((state) => state.addColumn);
    const [newColumn, setNewColumn] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const getNewId = (): number => {
        return Math.max(...columns.map((col) => col.id)) + 1;
    }

    const handleAddColumn = (): void => {
        setNewColumn(true);
    }
    
    const handleClose = (): void => {
        setNewColumn(false);
    }
    
    const handleAdd = (): void => {
        if(inputRef.current?.value) {
            if(inputRef.current?.value.trim() !== '') {
                addColumn({title: inputRef.current?.value.trim(), id: getNewId()})
                inputRef.current.value = "";
            }
        }
        setNewColumn(false);
    }
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAdd();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [newColumn])
        
    return (
        <div>
            {
            newColumn ?         
                <div className="new-column">
                    <input 
                        ref={inputRef} 
                        className="add-column-input" 
                        type="text" 
                        onKeyDown={handleKeyDown}
                    />

                    <div className="add-column-buttons-container">
                        <div 
                            className="add-column-single-button" 
                            onClick={handleClose}
                        > 
                            x 
                        </div>

                        <div 
                            className="add-column-single-button" 
                            onClick={handleAdd}
                        >
                            ✓ 
                        </div>
                    </div>
                </div>
            :
                <div className="add-column-button" onClick={handleAddColumn}>
                <p> + </p>
                </div>
            }
        </div>
    );
}

export default NewColumn;
